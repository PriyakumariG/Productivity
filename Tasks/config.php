<?php
$server = "localhost:3307";
$username = "root";
$password = "";
$dbname = "user_db";

$conn = mysqli_connect($server, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
 
?>