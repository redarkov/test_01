<?php
$connection = require("./db.php"); 

if($_SERVER['REQUEST_METHOD'] === "GET") {
  $sql = "SELECT id, title, price, colors FROM products";

  $result = $connection->query($sql);

  $products= $result->fetch_all(MYSQLI_ASSOC);

  echo json_encode($products);

}

?>