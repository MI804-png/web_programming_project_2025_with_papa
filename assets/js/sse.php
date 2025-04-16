<?php
// filepath: c:\xampp\htdocs\try\website-project\assets\sse.php

header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");

$time = date("H:i:s");
echo "data: The current server time is: {$time}\n\n";
flush();
sleep(1);
?>