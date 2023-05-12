<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Processing request to save the email
    $email = $_POST['email'];

    // Checking if the entered email matches any of the saved ones.
    $emailFile = 'emails.txt';
    $emails = file($emailFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (in_array($email, $emails)) {
        $response = ['success' => false, 'message' => 'This mail is already exist'];
    } else {
        file_put_contents($emailFile, $email . PHP_EOL, FILE_APPEND);
        $response = ['success' => true, 'message' => 'mail saved correctly'];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Processing request to retrieve the list of emails
    $emailFile = 'emails.txt';
    $emails = file($emailFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    $response = ['success' => true, 'emails' => $emails];
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>List of emails</title>
    <script src="script.js"></script>
</head>
<body>
    <h1>List of saved emails</h1>
    <form onsubmit="saveEmail(event)">
        <input type="email" id="email" required>
        <button type="submit">send</button>
    </form>
    <div id="message"></div>
    <button onclick="showEmails()">Show Mail</button>
    <div id="emailsList"></div>
</body>
</html>
