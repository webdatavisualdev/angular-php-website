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

    function getFilterConfig(){
        $resp['platform']=[];
        $resp['country']=[];
        $resp['location']=[];        

        // if($rs=doQuery('SELECT DISTINCT(cl_partnerid) FROM tbl_alarms')){
            
        //     while($r=$rs->fetch_assoc()){
        //         array_push($resp['partners'],$r['cl_partnerid']);
        //     }
        // }
    }

    function getLogs()    {                
        if($result = getJoinedRows('db_logsources.logsources', 'db_alert.tbl_platform', 'platid','1=1','INNER',0,0,2)){-       
            $resp['status'] = true;
            $resp['data'] = $result->fetch_all(MYSQLI_ASSOC);
        }
        else{            
            $resp['status'] = false;
        }
        echo json_encode($resp);
    }

    function getLog($uid=0){
        if($result = getJoinedRows('tbl_users', 'tbl_roles', 'roleid', 'tbl_users.userid='.$uid)){        
            return $result->fetch_array(MYSQLI_ASSOC);
            //return $result->fetch_all();            
        }
        else{
            return null;
        }
    }

    function addLog(){
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
        // Check if image file is a actual image or fake image
        
        // Check if file already exists
        if (file_exists($target_file)) {
            //echo "Sorry, file already exists.";
            $uploadOk = 0;
        }
        // Check file size
        if ($_FILES["file"]["size"] > 500000) {
            //echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }
        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" ) {
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

    function updateLog(){
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

    function deleteLog(){        
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
