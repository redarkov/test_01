<?php 
$connection = require("./db.php");

if($_SERVER['REQUEST_METHOD'] === "POST") {
  $jsonInput = file_get_contents("php://input");
  $input = json_decode($jsonInput, true);
  
  if(isset($input['title'], $input["price"])) {
    $connection->begin_transaction();

    $statement = $connection->prepare("INSERT INTO products (title, price) VALUES (?, ?)");

    $statement->bind_param("ss", $input["title"], $input["price"]);

    $statement->execute();

    $connection->commit();
    
    $statement->close();

    echo json_encode(['message'=> "Success"]);
    
    
  }

}
exit();

?>

