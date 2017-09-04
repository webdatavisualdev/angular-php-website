<?php
    session_start();
    include('sql_functions.php');
    header('access-control-allow-origin:*');
    header('Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);   
    
    getUser();

    function getUser()
    {
        $username = $_GET['username'];
        $password = $_GET['password'];
        $query = "Select * from tbl_users u, tbl_roles r where u.roleid=r.roleid and u.usr_username='".$username."' and u.usr_password='".$password."'";
        if($result = doQuery($query)){
            $_SESSION['user'] = $username;
            $resp['status'] = true;
            $resp['data'] = $result->fetch_assoc();
        }
        else{
            session_unset();
            session_destroy();
            $resp['status'] = false;
        }
        echo json_encode($resp);
    }
?>