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

$name = !empty($data['name']) ? htmlspecialchars($data['name']) : (!empty($data['Full Name']) ? htmlspecialchars($data['Full Name']) : 'N/A');
$email = !empty($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : (!empty($data['Business Email']) ? filter_var($data['Business Email'], FILTER_SANITIZE_EMAIL) : '');
$phone = !empty($data['phone']) ? htmlspecialchars($data['phone']) : (!empty($data['Phone Number']) ? htmlspecialchars($data['Phone Number']) : 'N/A');
$company = !empty($data['company']) ? htmlspecialchars($data['company']) : (!empty($data['Company Name']) ? htmlspecialchars($data['Company Name']) : 'N/A');
$location = !empty($data['location']) ? htmlspecialchars($data['location']) : (!empty($data['Preferred Node']) ? htmlspecialchars($data['Preferred Node']) : 'N/A');
$teamSize = !empty($data['teamSize']) ? htmlspecialchars($data['teamSize']) : (!empty($data['Team Footprint']) ? htmlspecialchars($data['Team Footprint']) : 'N/A');
$date = !empty($data['date']) ? htmlspecialchars($data['date']) : (!empty($data['Preferred Tour Date']) ? htmlspecialchars($data['Preferred Tour Date']) : 'N/A');
$message = !empty($data['message']) ? htmlspecialchars($data['message']) : (!empty($data['Inquiry Details']) ? htmlspecialchars($data['Inquiry Details']) : (!empty($data['Special Notes']) ? htmlspecialchars($data['Special Notes']) : 'N/A'));

$type = isset($data['type']) ? $data['type'] : (!empty($date) && $date !== 'N/A' ? 'Spatial Tour Booking' : 'Contact Inquiry');
$subject = isset($data['subject']) ? $data['subject'] : "SECONDESK — New $type from $name";

if (empty($email)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Email address required"]);
    exit();
}

// 1. Send Admin Notification Email
$adminHeaders = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: SECONDESK Web <noreply@secondesk.ke>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion()
);
$adminHeadersString = implode("\r\n", $adminHeaders);
$mailSentAdmin = @mail($to, $subject, $body, $adminHeadersString, "-f noreply@secondesk.ke");
if (!$mailSentAdmin) {
    // Retry without 5th parameter if host disables custom envelope sender
    $mailSentAdmin = @mail($to, $subject, $body, $adminHeadersString);
}

// 2. Send Client Confirmation Email directly to the guest ($email)
$clientSubject = (!empty($date) && $date !== 'N/A') 
    ? "Booking Confirmation — Your SECONDESK Tour Itinerary Pass" 
    : "SECONDESK — We Received Your Inquiry";

$clientBody = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>SECONDESK Tour Confirmation</title>
    <style>
        body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; background-color: #FAFAF8; color: #1D1D1D; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #E7E7E7; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; }
        .header { background-color: #1D1D1D; padding: 32px 20px; text-align: center; border-bottom: 4px solid #E31B23; }
        .logo { font-size: 26px; font-weight: 900; letter-spacing: 3px; color: #ffffff; text-transform: uppercase; text-decoration: none; }
        .logo-red { color: #E31B23; }
        .content { padding: 30px; }
        .badge { display: inline-block; background-color: #E6F4EA; color: #137333; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 14px; border-radius: 20px; margin-bottom: 15px; }
        .headline { font-size: 22px; font-weight: 300; color: #1D1D1D; margin: 0 0 10px 0; letter-spacing: -0.5px; }
        .subtitle { font-size: 13px; color: #666666; margin-bottom: 25px; line-height: 1.5; }
        
        .ticket-card { background: #FAFAF8; border: 1px solid #E7E7E7; border-left: 4px solid #D8C3A5; padding: 20px; margin-bottom: 25px; }
        .ticket-title { font-size: 11px; font-weight: 700; uppercase; color: #999999; letter-spacing: 1.5px; margin-bottom: 12px; }
        .ticket-row { display: flex; justify-content: space-between; border-bottom: 1px solid #EEEEEE; padding: 8px 0; font-size: 13px; }
        .ticket-label { font-weight: 700; color: #1D1D1D; }
        .ticket-val { color: #444444; text-align: right; }

        .checklist { background-color: #FFFFFF; border: 1px solid #E7E7E7; padding: 20px; margin-bottom: 25px; }
        .checklist-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #1D1D1D; margin-bottom: 12px; }
        .checklist-item { font-size: 13px; color: #444444; padding: 4px 0; }
        .checklist-item span { color: #E31B23; font-weight: bold; margin-right: 6px; }

        .contact-box { background-color: #1D1D1D; color: #ffffff; padding: 20px; text-align: center; border-radius: 4px; margin-bottom: 25px; }
        .contact-box h4 { margin: 0 0 6px 0; font-size: 14px; font-weight: 700; letter-spacing: 1px; uppercase; }
        .contact-box p { margin: 0; font-size: 12px; color: #CCCCCC; }
        .contact-box a { color: #D8C3A5; text-decoration: none; font-weight: bold; }

        .footer { background-color: #FAFAF8; color: #888888; padding: 20px; text-align: center; font-size: 11px; border-top: 1px solid #E7E7E7; letter-spacing: 0.5px; }
        .footer a { color: #1D1D1D; text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">SECON<span class="logo-red">DESK</span></div>
            <p style="color: #FAFAF8; font-size: 10px; margin: 8px 0 0 0; letter-spacing: 2px; text-transform: uppercase;">Boutique Coworking & Executive Offices</p>
        </div>
        <div class="content">
            <div class="badge">Pass Confirmed</div>
            <h1 class="headline">Hello ' . $name . ',</h1>
            <p class="subtitle">Thank you for scheduling a visit with SECONDESK. Your spatial walkthrough itinerary pass has been generated. We look forward to welcoming you.</p>
            
            <div class="ticket-card">
                <div class="ticket-title">Spatial Tour Pass Itinerary</div>
                <div class="ticket-row">
                    <span class="ticket-label">Guest Name:</span>
                    <span class="ticket-val">' . $name . '</span>
                </div>
                <div class="ticket-row">
                    <span class="ticket-label">Host Node:</span>
                    <span class="ticket-val">' . (!empty($location) && $location !== 'N/A' ? $location : 'SECONDESK Nyali Executive Hub') . '</span>
                </div>
                <div class="ticket-row">
                    <span class="ticket-label">Preferred Date:</span>
                    <span class="ticket-val">' . (!empty($date) && $date !== 'N/A' ? $date : 'Flexible / Upon Arrival') . '</span>
                </div>
                <div class="ticket-row">
                    <span class="ticket-label">Company / Team:</span>
                    <span class="ticket-val">' . $company . '</span>
                </div>
            </div>

            <div class="checklist">
                <div class="checklist-title">Your Tour Experience Includes:</div>
                <div class="checklist-item"><span>✓</span> Individual 1-on-1 corporate strategy review</div>
                <div class="checklist-item"><span>✓</span> Guided spatial walkthrough of shared desks, private suites & boardrooms</div>
                <div class="checklist-item"><span>✓</span> Speed diagnostics on dedicated redundant fiber internet</div>
                <div class="checklist-item"><span>✓</span> Complimentary coffee tasting from Second Cup Cafe</div>
            </div>

            <div class="contact-box">
                <h4>Need to Reschedule or Have Questions?</h4>
                <p>Call or WhatsApp Reception directly: <a href="tel:+254719688992">+254 719 688 992</a></p>
            </div>
        </div>

        <div class="footer">
            Please present this email pass at the reception desk upon arrival.<br>
            © ' . date('Y') . ' SECONDESK LTD. Mombasa, Kenya. | <a href="https://secondesk.ke">secondesk.ke</a>
        </div>
    </div>
</body>
</html>
';

$clientHeaders = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: SECONDESK <noreply@secondesk.ke>',
    'Reply-To: SECONDESK Concierge <info@secondesk.ke>',
    'X-Mailer: PHP/' . phpversion()
);
$clientHeadersString = implode("\r\n", $clientHeaders);
$mailSentClient = @mail($email, $clientSubject, $clientBody, $clientHeadersString, "-f noreply@secondesk.ke");
if (!$mailSentClient) {
    $mailSentClient = @mail($email, $clientSubject, $clientBody, $clientHeadersString);
}

if ($mailSentAdmin || $mailSentClient) {
    echo json_encode([
        "success" => true, 
        "message" => "Email dispatched successfully",
        "adminDispatched" => $mailSentAdmin,
        "clientDispatched" => $mailSentClient
    ]);
} else {
    echo json_encode(["success" => false, "fallback" => true, "message" => "PHP mail unavailable, fallback active"]);
}

