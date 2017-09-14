<?php
    // $servername = "172.18.242.121"; //your server name
    // $username = "myuser"; // your username
    // $password = "mypass"; //your password
    // $database = "db_alert"; //your database name, leave it as it is if you have already run "setup.php"

      $servername = "172.18.242.121"; //your server name
      $username = "myuser"; // your username
      $password = "mypass"; //your password
      $database = "db_alert";
    $con=mysqli_connect($servername, $username, $password, $database);
    //$con1=mysqli_connect($servername, $username, $password, "dblogsources");
    $con2=mysqli_connect($servername, $username, $password);
?>
