<?php
include('config.php');
error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);
function getRows($table,$cond='1=1',$groupby=0,$sort=0,$dbNum=0)
{
	global $con;
	global $con2;
	if(!isset($cond))
	{
		$cond="1=1";
	}
	$sql="SELECT * FROM ".$table." WHERE ".$cond."";
	if($groupby!=0)
	{
		$sql.=" ORDER BY ".$groupby;
		if($sort!=0)
		{
			$sql.=" ".$sort;
		}
		else $sql.=" ASC";
	}
	
	if($dbNum==0)
		$res=$con->query($sql);
	else
		$res=$con2->query($sql);

	if($res->num_rows>0)
		return $res;
	else return $sql;
}

function insertRow($table,$jvals,$dbNum=1)
{	
	global $con;
	global $con2;
	
	$vals=json_decode($jvals,true);	
	
	$connect = $con;

	$col="";
	
	$val="";
	
	$i=0;

	if (!is_array($vals))
	{
		return false;
	}
	foreach($vals as $x=>$value)
	{
		$col.=$x;
		if(gettype($value)=="integer")
		{
			$val.=filter_var($value,FILTER_SANITIZE_STRING);
		}
		else $val.="'".filter_var($value,FILTER_SANITIZE_STRING)."'";
		if($i!=(count($vals)-1))
		{
			$col.=",";$val.=",";
		}
		$i++;
	}	
	
	$sql="INSERT INTO ".$table."(".$col.") VALUES(".$val.");";

	if($dbNum==2)		
		$connect == $con2;

	if($connect->query($sql)){
		if($connect->insert_id!=0){
			return $connect->insert_id;
		}else{
		 	return true;
		}
	}else{ 
		return false;
	}
}

function updateRow($table,$jvals,$cond='1=1',$dbNum=1)
{
	global $con;
	global $con2;

	$connect=$con;

	if($dbNum==2)		
		$connect=$con2;

	$vals=json_decode($jvals,true);
	$set="";
	$i=0;
	
	if (!is_array($vals))
	{	echo "not array";
		return false;
	}
	if(!getRows($table,$cond)){
		return insertRow($table,$jvals,$dbNum);
	}else{
		foreach($vals as $x=>$value)
		{
			$set.=$x."=";
			if(gettype($value)=="integer")
			{
				$set.=filter_var($value,FILTER_SANITIZE_STRING);
			}
			else $set.="'".filter_var($value,FILTER_SANITIZE_STRING)."'";
			if($i!=(count($vals)-1))
			{
				$set.=",";
			}
			$i++;
		}	
		$sql="UPDATE ".$table." SET ".$set." WHERE ".$cond.";";	
		if($connect->query($sql)) return true; else return $sql;
	}	
}

function deleteRow($table,$cond='1=1',$dbNum=1)
{
	global $con;
	global $con2;

	$connect=$con;

	if($dbNum==2)		
		$connect=$con2;

	$sql="DELETE FROM ".$table." WHERE ".$cond.";";	

	if($connect->query($sql)) return true; else return false;
}

function getJoinedRows($left,$right,$col,$cond='1=1',$type='INNER',$groupby=0,$sort=0,$dbNum=1)
{	global $con;
	global $con2;

	if(!isset($left)||!isset($right)||!isset($col))
	{
		return false;
	}
	if(!isset($type))
	{
		$type="INNER";
	}
	$sql="SELECT * FROM ".$left." ".$type." JOIN ".$right." ON ".$left.".".$col."=".$right.".".$col." ";
	if(isset($cond))
	{
		$sql.="WHERE ".$cond."";
	}
	if($groupby!=0)
	{
		$sql.=" ORDER BY ".$groupby;
		if($sort!=0)
		{
			$sql.=" ".$sort;
		}
		else $sql.=" ASC";
	}
	if($dbNum==1)
		$res=$con->query($sql);
	else
		$res=$con2->query($sql);
	
	if($res->num_rows>0)
		return $res;	
	else return false;
}

function doQuery($sql, $dbNum=1)
{
	global $con;
	global $con2;

	$connect=$con;
	
	if($dbNum==2)		
		$connect=$con2;

	if($res=$connect->query($sql)) 
	{
		if($res->num_rows>0)
			return $res;	
		else return false; 
	}
	else return false;	
}


?>