<?php 
$connection = require("./db.php");
// $connection = new mysqli();

if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $jsonInput = file_get_contents("php://input");
  $input = json_decode($jsonInput, true);

  if(isset($input["id"])) {
    $connection->begin_transaction();
    $statement= $connection->prepare("DELETE FROM products WHERE id = ?");

    $statement->bind_param("i", $input["id"]);

    $statement->execute();

    $connection->commit();
    echo json_encode(["result" => $statement->error]);

    $connection->close();
  }
  
}
exit();
?>