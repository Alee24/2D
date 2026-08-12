<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataDir = __DIR__ . '/data';
if (!file_exists($dataDir)) {
    @mkdir($dataDir, 0755, true);
}
$dataFile = $dataDir . '/analytics.json';

// Helper to load data
function getAnalyticsData($file) {
    if (!file_exists($file)) {
        return [
            "totalViews" => 0,
            "uniqueVisitors" => [],
            "dailyStats" => [],
            "pageViews" => [],
            "deviceStats" => ["desktop" => 0, "mobile" => 0, "tablet" => 0],
            "logs" => []
        ];
    }
    $content = @file_get_contents($file);
    $json = @json_decode($content, true);
    if (!$json || !is_array($json)) {
        return [
            "totalViews" => 0,
            "uniqueVisitors" => [],
            "dailyStats" => [],
            "pageViews" => [],
            "deviceStats" => ["desktop" => 0, "mobile" => 0, "tablet" => 0],
            "logs" => []
        ];
    }
    return $json;
}

// Helper to save data safely
function saveAnalyticsData($file, $data) {
    @file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX);
}

$action = isset($_GET['action']) ? $_GET['action'] : ($_SERVER['REQUEST_METHOD'] === 'POST' ? 'track' : 'stats');

if ($action === 'track') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    $path = isset($data['path']) ? $data['path'] : '/';
    
    // Ignore tracking for the secret count dashboard itself
    if ($path === '/count' || strpos($path, '/api/') === 0) {
        echo json_encode(["success" => true, "ignored" => true]);
        exit();
    }

    $visitorId = isset($data['visitorId']) ? preg_replace('/[^a-zA-Z0-9_\-]/', '', $data['visitorId']) : 'anon_' . substr(md5($_SERVER['REMOTE_ADDR'] ?? ''), 0, 10);
    $device = isset($data['device']) ? $data['device'] : 'desktop';
    $browser = isset($data['browser']) ? htmlspecialchars($data['browser']) : 'Unknown';
    $referrer = isset($data['referrer']) ? htmlspecialchars($data['referrer']) : 'Direct';

    $db = getAnalyticsData($dataFile);

    $today = date('Y-m-d');
    $now = date('Y-m-d H:i:s');

    // Total Views
    $db['totalViews'] = ($db['totalViews'] ?? 0) + 1;

    // Unique Visitor
    if (!isset($db['uniqueVisitors']) || !is_array($db['uniqueVisitors'])) {
        $db['uniqueVisitors'] = [];
    }
    if (!in_array($visitorId, $db['uniqueVisitors'])) {
        $db['uniqueVisitors'][] = $visitorId;
    }

    // Daily Stats
    if (!isset($db['dailyStats'][$today])) {
        $db['dailyStats'][$today] = ["views" => 0, "visitors" => []];
    }
    $db['dailyStats'][$today]['views'] += 1;
    if (!in_array($visitorId, $db['dailyStats'][$today]['visitors'])) {
        $db['dailyStats'][$today]['visitors'][] = $visitorId;
    }

    // Page Views Breakdown
    if (!isset($db['pageViews'][$path])) {
        $db['pageViews'][$path] = 0;
    }
    $db['pageViews'][$path] += 1;

    // Device Stats
    if (!isset($db['deviceStats'][$device])) {
        $db['deviceStats'][$device] = 0;
    }
    $db['deviceStats'][$device] += 1;

    // Recent Visit Logs (keep last 500)
    if (!isset($db['logs'])) {
        $db['logs'] = [];
    }

    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    // Anonymize IP last octet for privacy
    $anonymizedIp = preg_replace('/(\d+)\.(\d+)\.(\d+)\.(\d+)/', '$1.$2.$3.***', $ip);

    array_unshift($db['logs'], [
        "timestamp" => $now,
        "path" => $path,
        "visitorId" => substr($visitorId, 0, 8),
        "device" => $device,
        "browser" => $browser,
        "ip" => $anonymizedIp,
        "referrer" => $referrer
    ]);

    if (count($db['logs']) > 500) {
        $db['logs'] = array_slice($db['logs'], 0, 500);
    }

    saveAnalyticsData($dataFile, $db);

    echo json_encode(["success" => true]);
    exit();
}

// Action: Stats for /count dashboard
if ($action === 'stats') {
    $db = getAnalyticsData($dataFile);

    $today = date('Y-m-d');
    $yesterday = date('Y-m-d', strtotime('-1 day'));

    $todayViews = isset($db['dailyStats'][$today]) ? $db['dailyStats'][$today]['views'] : 0;
    $todayVisitors = isset($db['dailyStats'][$today]) ? count($db['dailyStats'][$today]['visitors']) : 0;

    $yesterdayViews = isset($db['dailyStats'][$yesterday]) ? $db['dailyStats'][$yesterday]['views'] : 0;
    $yesterdayVisitors = isset($db['dailyStats'][$yesterday]) ? count($db['dailyStats'][$yesterday]['visitors']) : 0;

    // Format top pages
    $topPages = [];
    if (isset($db['pageViews']) && is_array($db['pageViews'])) {
        arsort($db['pageViews']);
        foreach ($db['pageViews'] as $path => $count) {
            $topPages[] = ["path" => $path, "views" => $count];
        }
    }

    // Format daily timeline (last 14 days)
    $timeline = [];
    for ($i = 13; $i >= 0; $i--) {
        $dayKey = date('Y-m-d', strtotime("-$i days"));
        $shortDate = date('M d', strtotime("-$i days"));
        $views = isset($db['dailyStats'][$dayKey]) ? $db['dailyStats'][$dayKey]['views'] : 0;
        $visitors = isset($db['dailyStats'][$dayKey]) ? count($db['dailyStats'][$dayKey]['visitors']) : 0;
        $timeline[] = [
            "date" => $dayKey,
            "label" => $shortDate,
            "views" => $views,
            "visitors" => $visitors
        ];
    }

    echo json_encode([
        "success" => true,
        "metrics" => [
            "totalViews" => $db['totalViews'] ?? 0,
            "totalUniqueVisitors" => count($db['uniqueVisitors'] ?? []),
            "todayViews" => $todayViews,
            "todayUniqueVisitors" => $todayVisitors,
            "yesterdayViews" => $yesterdayViews,
            "yesterdayUniqueVisitors" => $yesterdayVisitors,
        ],
        "deviceStats" => $db['deviceStats'] ?? ["desktop" => 0, "mobile" => 0, "tablet" => 0],
        "topPages" => array_slice($topPages, 0, 10),
        "timeline" => $timeline,
        "recentLogs" => array_slice($db['logs'] ?? [], 0, 50)
    ]);
    exit();
}

// Action: Reset stats (protected action)
if ($action === 'reset') {
    if (isset($_GET['confirm']) && $_GET['confirm'] === 'yes') {
        saveAnalyticsData($dataFile, [
            "totalViews" => 0,
            "uniqueVisitors" => [],
            "dailyStats" => [],
            "pageViews" => [],
            "deviceStats" => ["desktop" => 0, "mobile" => 0, "tablet" => 0],
            "logs" => []
        ]);
        echo json_encode(["success" => true, "message" => "Analytics reset successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Confirm param required"]);
    }
    exit();
}

http_response_code(400);
echo json_encode(["success" => false, "error" => "Invalid action"]);
