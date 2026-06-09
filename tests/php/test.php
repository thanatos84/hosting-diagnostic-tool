<?php
// test.php — Server-side PHP test
// If the hosting server supports PHP, it will execute this and return JSON.

header('Content-Type: application/json');

$response = array(
    "status" => "PHP_EXECUTED",
    "php_version" => phpversion(),
    "php_sapi" => php_sapi_name(),
    "timestamp" => gmdate("c"),
    "server_software" => isset($_SERVER['SERVER_SOFTWARE']) ? $_SERVER['SERVER_SOFTWARE'] : "unknown",
    "server_name" => isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : "unknown",
    "document_root" => isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] : "unknown",
    "request_method" => isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : "unknown",
    "extensions" => get_loaded_extensions(),
    "cgi" => true
);

echo json_encode($response, JSON_PRETTY_PRINT);
?>
