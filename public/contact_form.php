<?php

require "vendor/autoload.php";
use Mailgun\Mailgun;

# Instantiate the client.
$mgClient = new Mailgun('key-d01b6d0615061c7b4548d2feaa874ea5');
$domain = "sandboxd0f6cb698a59404ab912146e1111eb38.mailgun.org";

// Your email address
$to = 'katinaandted@gmail.com';

$subject = 'RSVP Notification ';

// Don't edit below unless you know what you're doing
if($to) {
	$name = $_POST['name'];
	$email = $_POST['email'];

	$subject .= "from " . $name;

	$fields = array(
		0 => array(
			'text' => 'Name',
			'val' => $_POST['name']
		),
		1 => array(
			'text' => 'Email address',
			'val' => $_POST['email']
		),
		2 => array(
			'text' => 'Phone',
			'val' => $_POST['phone']
		),
		3 => array(
			'text' => 'Number Attending',
			'val' => $_POST['number']
		),
		4 => array(
			'text' => 'Message',
			'val' => $_POST['message']
		)
	);

	$message = "";

	foreach($fields as $field) {
		$message .= $field['text'].": " . htmlspecialchars($field['val'], ENT_QUOTES) . PHP_EOL;
	}

	$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
	$headers .= "From: \"" . $name . "\" \r\n";
	$headers .= "Reply-To: " .  $email . "\r\n";
	$message = utf8_decode($message);

//	mail($to, $subject, $message, $headers);

	$response = $mgClient->sendMessage(
			$domain,
			array(
					'from'    => $email,
					'to'      => $to,
					'subject' => $subject,
					'text'    => $message
			)
	);

	$httpResponseCode = $response->http_response_code;

	if ($message){
	echo 'sent';
	}else{
	echo 'failed';
	}
} else {
	echo "Don't access this file directly";
}
?>