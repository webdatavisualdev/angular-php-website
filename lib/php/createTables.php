<?php

include ('config.php');

$sql = "CREATE TABLE users (
user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
firstName VARCHAR(100),
username VARCHAR(100),
password VARCHAR(200),
user_status VARCHAR(20),
isAdmin BOOLEAN,
join_date TIMESTAMP
)";

if ($con->query($sql) === TRUE) {
    echo "Created table users<br>";
} else {
    echo "Error creating table: " . $con->error;
}

?>