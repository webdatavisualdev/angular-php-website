<?php
    $servername = "localhost"; //your server name
    $username = "root"; // your username
    $password = "root"; //your password
    $database = "sac"; //your database name, leave it as it is if you have already run "setup.php"

    $con=mysqli_connect($servername, $username, $password, $database);
    //$con1=mysqli_connect($servername, $username, $password, "dblogsources");
    $con2=mysqli_connect($servername, $username, $password);
?>
