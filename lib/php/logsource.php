<?php
    session_start();
    include('sql_functions.php');
    header('access-control-allow-origin:*');
    header('Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);    
    
    $tbl_Users = 'tbl_users';
    $tbl_Platform = 'tbl_platform';
    $tbl_Log = 'logsources';

    if(isset($_REQUEST['type']) && !empty($_REQUEST['type'])){
        $type = $_REQUEST['type'];
        switch($type){
            case 'get':
                getLogs();
                break;
            case 'insert':
                addLog();
                break;
            case 'update':
                updateLog();
                break;
            case 'delete':
                deleteLog();

        }
    }

    function getLogs()
    {           
        if($result = getJoinedRows('tbl_users', 'tbl_roles', 'roleid')){
            $resp['status'] = true;
            $resp['data'] = $result->fetch_all(MYSQLI_ASSOC);            
        }
        else{            
            $resp['status'] = false;
        }
        echo json_encode($resp);
    }

    function getUser($uid=0){
        if($result = getJoinedRows('tbl_users', 'tbl_roles', 'roleid', 'tbl_users.userid='.$uid)){        
            return $result->fetch_array(MYSQLI_ASSOC);
        }
        else{
            return null;
        }
    }

    function addUser(){
        global $tblName;       
        
        if(!empty($_POST['data'])){
            $data = $_POST['data'];           
            
            $target_dir = $_SERVER['DOCUMENT_ROOT']. '/upload_files'. '/';
            
            $target_file = $target_dir . basename($_FILES["file"]["name"]);
            
            

            $resp['file'] = move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);

            if($result = insertRow($tblName,$data)){
                $resp['status'] = true;
                $resp['data'] = getUser($result);
            }
            else{
                $resp['status'] = false;
                $resp['data'] = $result;
            }
        }
        else{
            $resp['status'] = false;
            $resp['data'] = 'input err';
        }
        echo json_encode($resp);
    }

    function uploadFile(){
        $target_dir = $_SERVER['DOCUMENT_ROOT']. '/upload_files'. '/';
        $target_file = $target_dir . basename($_FILES["file"]["name"]);

        $uploadOk = 1;
        return $target_file;
        $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
        
        if (file_exists($target_file)) {
            $uploadOk = 0;
        }
        if ($_FILES["file"]["size"] > 500000) {
            $uploadOk = 0;
        }
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" ) {
            $uploadOk = 0;
        }
        if ($uploadOk == 0) {
        } else {
            if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
                return $target_file;
            } else {
            }
        }
        return false;
    }    

    function updateUser(){
        global $tblName;
        if(!empty($_POST['data'])){
            if($result = updateRow($tblName,json_encode($_POST['data']),"userid=".$_POST['uid'])){
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
        echo json_encode($resp);
    }

    function deleteUser(){        
        global $tblName;
        if(!empty($_POST['uid'])){
            if($result = deleteRow($tblName, "userid=".$_POST['uid'])){
                $resp['status'] = true;
                $resp['data'] = $_POST['uid'];
            }
            else{
                $resp['status'] = false;
                $sql="DELETE FROM ".$tblName." WHERE "."userid=".$_POST['uid'].";";
                $resp['data'] = $sql;
            }
        }
        else{
            $resp['status'] = false;
            $resp['data'] = 'input data error';
        }
        echo json_encode($resp);
    }
?>
