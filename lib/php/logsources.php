<?php
    include('config.php');
    session_start();
    include('sql_functions.php');
    header('access-control-allow-origin:*');
    header('Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);    
    
    $tblName = 'db_logsources.logsources';

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
            case 'config':
                getFilterConfig();
        }
    }

    function getFilterConfig(){        
        $resp['platform']=[];
        $resp['countries']=[];
        $resp['locations']=[];
        $resp['priorities']=[];        

        if($rs=getRows('tbl_platform','1=1 ORDER BY platid ASC')){            
            $resp['platform'] = $rs->fetch_all(MYSQLI_ASSOC); 
        }

        if($rs=getRows('dblogsources.tbl_locations','1=1 ORDER BY locationid ASC',0,0,2)){
			$resp['locations'] = $rs->fetch_all(MYSQLI_ASSOC);
        }       

        if($rs=getRows('dblogsources.tbl_country','1=1 ORDER BY Name ASC',0,0,2)){
			$resp['countries'] = $rs->fetch_all(MYSQLI_ASSOC);
        }

        if($rs=getJoinedRows('tbl_users', 'tbl_roles', 'roleid')){
			$resp['users'] = $rs->fetch_all(MYSQLI_ASSOC);
        }

        $resp['status'] = true;
        echo json_encode($resp);
    }

    function getLogs()    {
        global $tblName;

        if($result = getJoinedRows($tblName, 'dbalert.tbl_platform', 'platid','1=1','INNER',0,0,2)){-       
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

            if($result = insertRow($tblName,$data,2)){
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
            $resp['data'] = 'input err';
        }
        echo json_encode($resp);
    }    

    function updateLog(){
        global $tblName;

        if(!empty($_POST['data'])){
            if($result = updateRow($tblName,$_POST['data'],"ls_sequence=".$_POST['uid'],2)){
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
            if($result = deleteRow($tblName, "userid=".$_POST['uid'],2)){
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
