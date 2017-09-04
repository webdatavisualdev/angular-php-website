<?php
    session_start();
    include('sql_functions.php');
    header('access-control-allow-origin:*');
    header('Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);

    $tblName = 'tbl_users';

    if(isset($_REQUEST['type']) && !empty($_REQUEST['type'])){
        $type = $_REQUEST['type'];
        switch($type){
            case 'get':
                getUsers();
                break;
            case 'insert':
                addUser();
                break;
            case 'update':
                updateUser();
                break;
            case 'delete':
                deleteUser();

        }
    }    

    function getUsers()
    {           
        if($result = getJoinedRows('tbl_users', 'tbl_roles', 'roleid')){
            $resp['status'] = true;
            $resp['data'] = $result->fetch_all();
        }
        else{            
            $resp['status'] = false;
        }
        echo json_encode($resp);
    }

    function addUser(){
        global $tblName;
        if(!empty($_POST['data'])){
            if($result = insertRow($tblName,$_POST['data'])){
                $resp['status'] = true;
                $resp['data'] = $result;
            }
            else{
                $resp['status'] = false;
                $resp['data'] = 'insert err';
            }
        }
        else{
            $resp['status'] = false;
            $resp['data'] = 'insert err';
        }
    }

    function updateUser(){
        global $tblName;
        if(!empty($_POST['data'])){
            if($result = updateRow($tblName,$_POST['data']),"userid=".$_POST['uid'])){
                $resp['status'] = true;
                $resp['data'] = $result;
            }
            else{
                $resp['status'] = false;
                $resp['data'] = 'update err';
            }
        }
        else{
            $resp['status'] = false;
            $resp['data'] = 'update err';
        }
    }

    function deleteUser(){
        global $tblName;
        if(!empty($_POST['uid'])){
            if($result = deleteRow($tblName,"userid=".$_POST['uid'])){
                $resp['status'] = true;
                $resp['data'] = $result;
            }
            else{
                $resp['status'] = false;
                $resp['data'] = 'delete err';
            }
        }
        else{
            $resp['status'] = false;
            $resp['data'] = 'delete err';
        }
    }
?>