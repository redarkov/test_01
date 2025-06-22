<?php
// $connection = new mysqli();
$connection = require("./db.php");

if($_SERVER['REQUEST_METHOD'] === "POST") {
  $jsonInput = file_get_contents("php://input");
  $input  = json_decode($jsonInput, true);

  if(isset($input["id"])) {
    $statement = $connection->prepare("UPDATE products SET title = ? WHERE id = ?");

    $statement->bind_param("si", $input["title"], $input["id"]);

    $statement->execute();

    $connection->commit();

    echo json_encode(["result" => $statement->error]);

    $connection->close();
  }
}
exit();

?>