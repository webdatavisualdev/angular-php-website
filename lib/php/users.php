<?php
    session_start();
    include('sql_functions.php');
    header('access-control-allow-origin:*');
    header('Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);   
    
    //getUsers();
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

    function uploadFile(){
        $target_dir = $_SERVER['DOCUMENT_ROOT']. '/upload_files'. '/';            
        $target_file = $target_dir . basename($_FILES["file"]["name"]);

        $uploadOk = 1;        
        $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
        // Check if image file is a actual image or fake image
        
        // Check if file already exists
        if (file_exists($target_file)) {
            //echo "Sorry, file already exists.";
            $uploadOk = 0;
        }        
        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
            //echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }
        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            //echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
                //echo "The file ". basename( $_FILES["file"]["name"]). " has been uploaded.";
                return $target_file;
            } else {
                //echo "Sorry, there was an error uploading your file.";
            }
        }
        return false;
    }

    function getUsers() {           
        if($result = getJoinedRows('tbl_users', 'tbl_roles', 'roleid')){
        //if($result = getRows('tbl_users')){
            $resp['status'] = true;
            $resp['data'] = $result->fetch_all(MYSQLI_ASSOC);
            $resp['server'] = $target_dir = $_SERVER['DOCUMENT_ROOT']. '/upload_files'. '/';
        }
        else{            
            $resp['status'] = false;
        }
        echo json_encode($resp);
    }

    function getUser($uid=0){
        if($result = getJoinedRows('tbl_users', 'tbl_roles', 'roleid', 'tbl_users.userid='.$uid)){        
            return $result->fetch_array(MYSQLI_ASSOC);
            //return $result->fetch_all();            
        }
        else{
            return null;
        }
    }

    function addUser(){
        global $tblName;       
        
        if(!empty($_POST['data'])){
            $data = $_POST['data'];
            uploadFile();

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

    function updateUser(){
        global $tblName;
        
        if(!empty($_POST['data'])){
            uploadFile();

            if($result = updateRow($tblName,$_POST['data'],"userid=".$_POST['uid'])){
                $resp['status'] = true;
                $resp['data'] = $result;
            }
            else{
                $resp['status'] = false;
                $resp['data'] = $result;
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
