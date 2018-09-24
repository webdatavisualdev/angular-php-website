<?php

include('sql_functions.php');
header('access-control-allow-origin:*');
header('Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$_ANG=json_decode(file_get_contents('php://input'),true);
if(isset($_ANG)&&count($_ANG)>0){
	$_POST=$_ANG;
	if(isset($_ANG['login'])){
		login();
	}
	if(isset($_ANG['getAlerts'])){		
		getAlerts();
	}
	if(isset($_ANG['getFilterConfig'])){
		getFilterConfig();
	}
	if(isset($_ANG['getDetails'])){
		getDetails();
	}
	if(isset($_ANG['updateStatus'])){
		updateStatus();
	}
	
}

function getAlerts(){
	if($rs=getRows('tbl_alarms')){
		$resp['status']='true';
		$resp['alerts']=[];
		while($r=$rs->fetch_assoc()){
			if($rs_client=getRows('tbl_clients','clientid='.$r['clientid'])){
				$r_client=$rs_client->fetch_assoc();
				$r['client_name']=$r_client['cl_name'];
			}
			if($rs_category=getRows('tbl_categories','cateid='.$r['al_category'])){
				$r_category=$rs_category->fetch_assoc();
				$r['category_name']=$r_category['ca_name'];
			}
			$date=explode(' ',$r['al_incidenttime']);
			$r['date']=$date[0];
			if($rs_assettype=getRows('tbl_platform','platid='.$r['PlatID'])){
				$r_at=$rs_assettype->fetch_assoc();
				$r['asset_type']=$r_at['pl_description'];
			}else{
				$r['asset_type']='';
			}
			if($rs_cat=getRows('tbl_categories','cateid='.$r['al_category'])){
				$r_at=$rs_cat->fetch_assoc();
				$r['ca_name']=$r_at['ca_name'];
			}else{
				$r['ca_name']='';
			}
			array_push($resp['alerts'],$r);
		}
	}else{
		$resp['status']='no alerts';
	}
	echo json_encode($resp);
}

function getFilterConfig(){
	$resp['clients']=[];
	$resp['partners']=[];
	$resp['cats']=[];
	$post=$_POST['getFilterConfig'];
	
	if($rs=getRows('tbl_clients')){
		
		while($r=$rs->fetch_assoc()){
			array_push($resp['clients'],$r['clientid']);
		}
	}
	if($rs=doQuery('SELECT DISTINCT(cl_partnerid) FROM tbl_alarms')){
		
		while($r=$rs->fetch_assoc()){
			array_push($resp['partners'],$r['cl_partnerid']);
		}
	}
	if($rs=getRows('tbl_categories','1=1 ORDER BY cateid ASC')){
		while($r=$rs->fetch_assoc()){
			array_push($resp['cats'],$r);
		}
	}
	if($post==2){
		$resp['asset_type']=[];
		if($rs=getRows('tbl_platform','1=1 ORDER BY platid ASC')){
			while($r=$rs->fetch_assoc()){
				array_push($resp['asset_type'],$r);
			}
		}
		$resp['alert_no']=[];
		if($rs=doQuery('SELECT DISTINCT(alarmid) FROM tbl_alarms')){
			while($r=$rs->fetch_assoc()){
				array_push($resp['alert_no'],$r['alarmid']);
			}
		}
		$resp['alert_name']=[];
		if($rs=doQuery('SELECT DISTINCT(al_name) FROM tbl_alarms')){
			while($r=$rs->fetch_assoc()){
				if($r['al_name']==''){continue;}
				array_push($resp['alert_name'],$r['al_name']);
			}
		}
		$resp['logsourceid']=[];
		if($rs=doQuery('SELECT DISTINCT(logsourceid) FROM tbl_alarms')){
			while($r=$rs->fetch_assoc()){
				array_push($resp['logsourceid'],$r['logsourceid']);
			}
		}
		

	}
	echo json_encode($resp);
}

function getDetails(){

	$post=$_POST['getDetails'];
	if($rs=getRows('tbl_alarms','1=1')){
		$resp['status']='true';
		$resp['details']=[];
		while($r=$rs->fetch_assoc()){
			array_push($resp['details'],$r);
		}
	}else{
		$resp['status']='Failed to retrieve';
	}
	echo json_encode($resp);
}

function updateStatus(){

	$post=$_POST['updateStatus'];
	$col['al_incidentstatus']=$post['al_incidentstatus']+0;
	if($rs=getRows('tbl_alarms','al_sequence='.$post['al_sequence'])){
		$r=$rs->fetch_assoc();
		$resp['prev']=$r['al_incidentstatus'];
		if(updateRow('tbl_alarms',json_encode($col),'al_sequence='.$post['al_sequence'])){
			$resp['status']='true';
		}else{
			$resp['status']='Failed to update';
		}
	}else{
		$resp['status']='Invalid alert';
	}
	
	echo json_encode($resp);
}
//endf
?>
