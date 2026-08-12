<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Analytics-Pin");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

define('SECURITY_PIN', '5459');

$dataDir = __DIR__ . '/data';
if (!file_exists($dataDir)) {
    @mkdir($dataDir, 0777, true);
    @chmod($dataDir, 0777);
}
$dataFile = $dataDir . '/analytics.json';

function getAnalyticsData($file) {
    if (!file_exists($file)) {
        return [
            "totalViews" => 0,
            "uniqueVisitors" => [],
            "dailyStats" => [],
            "hourlyStats" => [],
            "pageViews" => [],
            "pageTimeSpent" => [],
            "deviceStats" => ["desktop" => 0, "mobile" => 0, "tablet" => 0],
            "osStats" => [],
            "browserStats" => [],
            "referrerStats" => ["Direct" => 0, "Google" => 0, "Social" => 0, "WhatsApp" => 0, "External" => 0],
            "activeVisitors" => [],
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
            "hourlyStats" => [],
            "pageViews" => [],
            "pageTimeSpent" => [],
            "deviceStats" => ["desktop" => 0, "mobile" => 0, "tablet" => 0],
            "osStats" => [],
            "browserStats" => [],
            "referrerStats" => ["Direct" => 0, "Google" => 0, "Social" => 0, "WhatsApp" => 0, "External" => 0],
            "activeVisitors" => [],
            "logs" => []
        ];
    }
    return $json;
}

function saveAnalyticsData($file, $data) {
    $dir = dirname($file);
    if (!file_exists($dir)) {
        @mkdir($dir, 0777, true);
        @chmod($dir, 0777);
    }
    @file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX);
    @chmod($file, 0666);
}

function checkPinAuth() {
    $pin = $_GET['pin'] ?? $_POST['pin'] ?? $_SERVER['HTTP_X_ANALYTICS_PIN'] ?? '';
    if ($pin !== SECURITY_PIN) {
        http_response_code(401);
        echo json_encode([
            "success" => false, 
            "error" => "Invalid Security PIN. Access Restricted.",
            "authRequired" => true
        ]);
        exit();
    }
}

$action = isset($_GET['action']) ? $_GET['action'] : ($_SERVER['REQUEST_METHOD'] === 'POST' ? 'track' : 'stats');

// ACTION: Background Silent Tracking / Heartbeat Ping
if ($action === 'track' || $action === 'ping') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data || !is_array($data)) {
        if (!empty($_POST)) {
            $data = $_POST;
        } else {
            parse_str($rawInput, $parsed);
            if (!empty($parsed) && is_array($parsed)) {
                $data = $parsed;
            } else {
                $data = $_GET;
            }
        }
    }

    $path = isset($data['path']) ? trim($data['path']) : ($_GET['path'] ?? '/');
    
    // Ignore tracking for the secret count dashboard itself
    if ($path === '/count' || strpos($path, '/api/') === 0) {
        echo json_encode(["success" => true, "ignored" => true]);
        exit();
    }

    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['HTTP_CLIENT_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    $ipParts = explode(',', $ip);
    $ip = trim($ipParts[0]);

    $visitorId = isset($data['visitorId']) && !empty($data['visitorId']) 
        ? preg_replace('/[^a-zA-Z0-9_\-]/', '', $data['visitorId']) 
        : 'v_' . substr(md5($ip . ($_SERVER['HTTP_USER_AGENT'] ?? '')), 0, 12);
        
    $sessionId = isset($data['sessionId']) && !empty($data['sessionId'])
        ? preg_replace('/[^a-zA-Z0-9_\-]/', '', $data['sessionId']) 
        : 's_' . substr(md5(microtime()), 0, 10);

    $device = isset($data['device']) ? htmlspecialchars($data['device']) : 'desktop';
    $os = isset($data['os']) ? htmlspecialchars($data['os']) : 'Unknown OS';
    $browser = isset($data['browser']) ? htmlspecialchars($data['browser']) : 'Unknown Browser';
    $screen = isset($data['screen']) ? htmlspecialchars($data['screen']) : 'N/A';
    $language = isset($data['language']) ? htmlspecialchars($data['language']) : 'N/A';
    $referrer = isset($data['referrer']) ? htmlspecialchars($data['referrer']) : 'Direct';
    $timeSpent = isset($data['timeSpent']) ? (int)$data['timeSpent'] : 0;

    // Referrer Categorization
    $refCategory = 'Direct';
    $refLower = strtolower($referrer);
    if (strpos($refLower, 'google') !== false || strpos($refLower, 'bing') !== false || strpos($refLower, 'duckduckgo') !== false) {
        $refCategory = 'Google';
    } elseif (strpos($refLower, 'whatsapp') !== false || strpos($refLower, 'wa.me') !== false) {
        $refCategory = 'WhatsApp';
    } elseif (strpos($refLower, 'instagram') !== false || strpos($refLower, 'facebook') !== false || strpos($refLower, 'tiktok') !== false || strpos($refLower, 'twitter') !== false || strpos($refLower, 't.co') !== false || strpos($refLower, 'linkedin') !== false) {
        $refCategory = 'Social';
    } elseif ($referrer !== 'Direct' && !empty($referrer)) {
        $refCategory = 'External';
    }

    $db = getAnalyticsData($dataFile);

    $nowTimestamp = time();
    $today = date('Y-m-d');
    $hour = date('H');
    $nowFormatted = date('Y-m-d H:i:s');

    if ($action === 'track') {
        // Total Views
        $db['totalViews'] = ($db['totalViews'] ?? 0) + 1;

        // Unique Visitors
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

        // Hourly Peak Traffic Stats for Today
        if (!isset($db['hourlyStats'][$today])) {
            $db['hourlyStats'][$today] = array_fill_keys(range(0, 23), 0);
        }
        $hourInt = (int)$hour;
        $db['hourlyStats'][$today][$hourInt] = ($db['hourlyStats'][$today][$hourInt] ?? 0) + 1;

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

        // OS Stats
        if (!isset($db['osStats'][$os])) {
            $db['osStats'][$os] = 0;
        }
        $db['osStats'][$os] += 1;

        // Browser Stats
        if (!isset($db['browserStats'][$browser])) {
            $db['browserStats'][$browser] = 0;
        }
        $db['browserStats'][$browser] += 1;

        // Referrer Category Stats
        if (!isset($db['referrerStats'][$refCategory])) {
            $db['referrerStats'][$refCategory] = 0;
        }
        $db['referrerStats'][$refCategory] += 1;

        // Recent Visit Logs (keep last 500)
        if (!isset($db['logs'])) {
            $db['logs'] = [];
        }

        $anonymizedIp = preg_replace('/(\d+)\.(\d+)\.(\d+)\.(\d+)/', '$1.$2.$3.***', $ip);

        array_unshift($db['logs'], [
            "timestamp" => $nowFormatted,
            "path" => $path,
            "visitorId" => substr($visitorId, 0, 8),
            "sessionId" => substr($sessionId, 0, 8),
            "device" => $device,
            "os" => $os,
            "browser" => $browser,
            "screen" => $screen,
            "language" => $language,
            "ip" => $anonymizedIp,
            "referrer" => $referrer,
            "refCategory" => $refCategory
        ]);

        if (count($db['logs']) > 500) {
            $db['logs'] = array_slice($db['logs'], 0, 500);
        }
    }

    // Update Page Time Spent Total
    if ($timeSpent > 0) {
        if (!isset($db['pageTimeSpent'][$path])) {
            $db['pageTimeSpent'][$path] = 0;
        }
        $db['pageTimeSpent'][$path] += 1; // Increment duration
    }

    // Active Live Visitors (Updated timestamp per visitorId)
    if (!isset($db['activeVisitors']) || !is_array($db['activeVisitors'])) {
        $db['activeVisitors'] = [];
    }
    
    $existingTimeSpent = isset($db['activeVisitors'][$visitorId]['timeSpent']) ? $db['activeVisitors'][$visitorId]['timeSpent'] : 0;
    $newTimeSpent = max($timeSpent, $existingTimeSpent + 4);

    $db['activeVisitors'][$visitorId] = [
        "lastSeen" => $nowTimestamp,
        "path" => $path,
        "device" => $device,
        "browser" => $browser,
        "os" => $os,
        "timeSpent" => $newTimeSpent,
        "ip" => preg_replace('/(\d+)\.(\d+)\.(\d+)\.(\d+)/', '$1.$2.$3.***', $ip)
    ];

    // Clean up stale active visitors older than 45 seconds
    foreach ($db['activeVisitors'] as $vId => $vData) {
        if ($nowTimestamp - $vData['lastSeen'] > 45) {
            unset($db['activeVisitors'][$vId]);
        }
    }

    saveAnalyticsData($dataFile, $db);

    echo json_encode(["success" => true, "recorded" => true]);
    exit();
}

// ACTION: Stats for /count dashboard (Protected by PIN 5459)
if ($action === 'stats') {
    checkPinAuth();

    $db = getAnalyticsData($dataFile);

    $today = date('Y-m-d');
    $yesterday = date('Y-m-d', strtotime('-1 day'));
    $nowTimestamp = time();

    // Active Live Visitors count (Active in last 45 seconds)
    $activeLiveCount = 0;
    $liveVisitorsList = [];
    if (isset($db['activeVisitors']) && is_array($db['activeVisitors'])) {
        foreach ($db['activeVisitors'] as $vId => $vData) {
            if ($nowTimestamp - $vData['lastSeen'] <= 45) {
                $activeLiveCount++;
                $diffSec = $nowTimestamp - $vData['lastSeen'];
                $agoStr = $diffSec < 4 ? 'just now' : $diffSec . 's ago';
                
                $spentSec = $vData['timeSpent'] ?? 0;
                $spentStr = $spentSec >= 60 ? floor($spentSec / 60) . 'm ' . ($spentSec % 60) . 's' : $spentSec . 's';

                $liveVisitorsList[] = [
                    "visitorId" => substr($vId, 0, 8),
                    "path" => $vData['path'],
                    "device" => $vData['device'],
                    "browser" => $vData['browser'],
                    "os" => $vData['os'] ?? 'Device',
                    "timeSpentStr" => $spentStr,
                    "timeSpentSec" => $spentSec,
                    "ago" => $agoStr
                ];
            }
        }
    }

    $todayViews = isset($db['dailyStats'][$today]) ? $db['dailyStats'][$today]['views'] : 0;
    $todayVisitors = isset($db['dailyStats'][$today]) ? count($db['dailyStats'][$today]['visitors']) : 0;

    $yesterdayViews = isset($db['dailyStats'][$yesterday]) ? $db['dailyStats'][$yesterday]['views'] : 0;
    $yesterdayVisitors = isset($db['dailyStats'][$yesterday]) ? count($db['dailyStats'][$yesterday]['visitors']) : 0;

    // Top Pages & Average Time Spent per Page
    $topPages = [];
    if (isset($db['pageViews']) && is_array($db['pageViews'])) {
        arsort($db['pageViews']);
        foreach ($db['pageViews'] as $pPath => $count) {
            $totalSec = $db['pageTimeSpent'][$pPath] ?? 0;
            $avgSec = $count > 0 ? round($totalSec / $count) : 0;
            $avgStr = $avgSec >= 60 ? floor($avgSec / 60) . 'm ' . ($avgSec % 60) . 's' : $avgSec . 's';

            $topPages[] = [
                "path" => $pPath, 
                "views" => $count,
                "avgTimeSpent" => $avgStr
            ];
        }
    }

    // Top Browsers
    $topBrowsers = [];
    if (isset($db['browserStats']) && is_array($db['browserStats'])) {
        arsort($db['browserStats']);
        foreach ($db['browserStats'] as $bName => $bCount) {
            $topBrowsers[] = ["name" => $bName, "count" => $bCount];
        }
    }

    // Top OS
    $topOS = [];
    if (isset($db['osStats']) && is_array($db['osStats'])) {
        arsort($db['osStats']);
        foreach ($db['osStats'] as $osName => $osCount) {
            $topOS[] = ["name" => $osName, "count" => $osCount];
        }
    }

    // 14-Day Timeline
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

    // Today's Hourly Traffic Curve (00:00 to 23:00)
    $todayHourly = [];
    $rawHourly = $db['hourlyStats'][$today] ?? array_fill_keys(range(0, 23), 0);
    for ($h = 0; $h < 24; $h++) {
        $todayHourly[] = [
            "hour" => sprintf("%02d:00", $h),
            "views" => $rawHourly[$h] ?? 0
        ];
    }

    echo json_encode([
        "success" => true,
        "authenticated" => true,
        "metrics" => [
            "totalViews" => $db['totalViews'] ?? 0,
            "totalUniqueVisitors" => count($db['uniqueVisitors'] ?? []),
            "activeLiveVisitors" => $activeLiveCount,
            "todayViews" => $todayViews,
            "todayUniqueVisitors" => $todayVisitors,
            "yesterdayViews" => $yesterdayViews,
            "yesterdayUniqueVisitors" => $yesterdayVisitors,
        ],
        "liveVisitorsList" => $liveVisitorsList,
        "deviceStats" => $db['deviceStats'] ?? ["desktop" => 0, "mobile" => 0, "tablet" => 0],
        "referrerStats" => $db['referrerStats'] ?? ["Direct" => 0, "Google" => 0, "Social" => 0, "WhatsApp" => 0, "External" => 0],
        "topBrowsers" => array_slice($topBrowsers, 0, 6),
        "topOS" => array_slice($topOS, 0, 6),
        "topPages" => array_slice($topPages, 0, 15),
        "timeline" => $timeline,
        "todayHourly" => $todayHourly,
        "recentLogs" => array_slice($db['logs'] ?? [], 0, 100)
    ]);
    exit();
}

// ACTION: Reset (Protected by PIN 5459)
if ($action === 'reset') {
    checkPinAuth();
    if (isset($_GET['confirm']) && $_GET['confirm'] === 'yes') {
        saveAnalyticsData($dataFile, [
            "totalViews" => 0,
            "uniqueVisitors" => [],
            "dailyStats" => [],
            "hourlyStats" => [],
            "pageViews" => [],
            "pageTimeSpent" => [],
            "deviceStats" => ["desktop" => 0, "mobile" => 0, "tablet" => 0],
            "osStats" => [],
            "browserStats" => [],
            "referrerStats" => ["Direct" => 0, "Google" => 0, "Social" => 0, "WhatsApp" => 0, "External" => 0],
            "activeVisitors" => [],
            "logs" => []
        ]);
        echo json_encode(["success" => true, "message" => "Analytics database reset successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Confirm param required"]);
    }
    exit();
}

http_response_code(400);
echo json_encode(["success" => false, "error" => "Invalid action"]);
