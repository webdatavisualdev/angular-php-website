<?php
    session_start();
    include('sql_functions.php');
    header('access-control-allow-origin:*');
    header('Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);

    $tblName = 'tbl_roles';

    if(isset($_REQUEST['type']) && !empty($_REQUEST['type'])){
        $type = $_REQUEST['type'];
        switch($type){
            case 'get':
                getRoles();
                break;           
        }
    }    

    function getRoles()
    {    
        global $tblName;        
        if($result = getRows()){            
            $resp['status'] = true;
            $resp['data'] = $result->fetch_all();
        }
        else{            
            $resp['status'] = false;
        }
        echo json_encode($resp);
    }    
?>