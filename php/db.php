<?php
$serverName= 'localhost';
$username="root";
$password="";
$database='practice';

$connection = new mysqli($serverName, $username, $password, $database);

if($connection->connect_error) {
  die("Error connection");
}

return $connection;
?>