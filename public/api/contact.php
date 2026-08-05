<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid payload"]);
    exit();
}

$to = "info@secondesk.ke";
$type = isset($data['type']) ? $data['type'] : 'General Inquiry';
$name = isset($data['name']) ? htmlspecialchars($data['name']) : 'N/A';
$email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : '';
$phone = isset($data['phone']) ? htmlspecialchars($data['phone']) : 'N/A';
$company = isset($data['company']) ? htmlspecialchars($data['company']) : 'N/A';
$location = isset($data['location']) ? htmlspecialchars($data['location']) : 'N/A';
$teamSize = isset($data['teamSize']) ? htmlspecialchars($data['teamSize']) : 'N/A';
$date = isset($data['date']) ? htmlspecialchars($data['date']) : 'N/A';
$message = isset($data['message']) ? htmlspecialchars($data['message']) : 'N/A';

$subject = isset($data['subject']) ? $data['subject'] : "SECONDDESK — New $type from $name";

if (empty($email)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Email address required"]);
    exit();
}

// Construct Luxury HTML Email Template
$body = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Secondesk Notification</title>
    <style>
        body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; background-color: #FAFAF8; color: #1D1D1D; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #E7E7E7; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; }
        .header { background-color: #00468b; padding: 30px; text-align: center; border-bottom: 4px solid #E31B23; }
        .logo { font-size: 24px; font-weight: 900; letter-spacing: 3px; color: #ffffff; text-transform: uppercase; text-decoration: none; }
        .logo-red { color: #E31B23; }
        .content { padding: 30px; }
        .title { font-size: 18px; font-weight: 700; color: #00468b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; border-bottom: 2px solid #FAFAF8; padding-bottom: 10px; }
        .info-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
        .info-table th { background-color: #00468b; color: #ffffff; text-align: left; padding: 12px 15px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
        .info-table td { padding: 12px 15px; border-bottom: 1px solid #E7E7E7; font-size: 13px; color: #1D1D1D; }
        .info-table tr:nth-child(even) { background-color: #FAFAF8; }
        .label { font-weight: 700; color: #00468b; width: 35%; }
        .message-box { background: #FAFAF8; border-left: 4px solid #E31B23; padding: 15px; margin-top: 15px; font-size: 13px; line-height: 1.6; color: #333333; }
        .footer { background-color: #1D1D1D; color: #999999; padding: 20px; text-align: center; font-size: 11px; letter-spacing: 1px; }
        .footer a { color: #D8C3A5; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">SECOND<span class="logo-red">DESK</span></div>
            <p style="color: #FAFAF8; font-size: 11px; margin: 8px 0 0 0; letter-spacing: 2px; text-transform: uppercase;">Boutique Coworking & Executive Offices</p>
        </div>
        <div class="content">
            <div class="title">' . htmlspecialchars($type) . '</div>
            
            <table class="info-table">
                <thead>
                    <tr>
                        <th colspan="2">Inquiry Specifications</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="label">Full Name</td>
                        <td>' . $name . '</td>
                    </tr>
                    <tr>
                        <td class="label">Business Email</td>
                        <td><a href="mailto:' . $email . '" style="color: #00468b; font-weight: bold;">' . $email . '</a></td>
                    </tr>
                    <tr>
                        <td class="label">Phone Number</td>
                        <td>' . $phone . '</td>
                    </tr>
                    <tr>
                        <td class="label">Company Name</td>
                        <td>' . $company . '</td>
                    </tr>';

if ($type === 'Spatial Tour Booking') {
    $body .= '
                    <tr>
                        <td class="label">Preferred Node</td>
                        <td>Secondesk ' . ucfirst($location) . '</td>
                    </tr>
                    <tr>
                        <td class="label">Team Footprint</td>
                        <td>' . $teamSize . '</td>
                    </tr>
                    <tr>
                        <td class="label">Tour Date</td>
                        <td>' . $date . '</td>
                    </tr>';
}

$body .= '
                </tbody>
            </table>';

if (!empty($message) && $message !== 'N/A' && $message !== 'None') {
    $body .= '
            <div style="font-weight: 700; color: #00468b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-top: 15px;">User Message / Special Notes:</div>
            <div class="message-box">' . nl2br($message) . '</div>';
}

$body .= '
        </div>
        <div class="footer">
            © ' . date('Y') . ' SECONDDESK LTD. ALL RIGHTS RESERVED.<br>
            MOMBASA, KENYA  |  <a href="https://secondesk.ke">WWW.SECONDDESK.KE</a>
        </div>
    </div>
</body>
</html>
';

$headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: Secondesk Website <noreply@secondesk.ke>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion()
);

$headersString = implode("\r\n", $headers);

$mailSent = @mail($to, $subject, $body, $headersString);

if ($mailSent) {
    echo json_encode(["success" => true, "message" => "Email dispatched successfully"]);
} else {
    // If local PHP mail fails or is not enabled, return 200 with fallback instruction so JS falls back to FormSubmit
    echo json_encode(["success" => false, "fallback" => true, "message" => "PHP mail unavailable, fallback to FormSubmit"]);
}
