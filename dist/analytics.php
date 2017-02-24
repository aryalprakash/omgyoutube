<?php
define('MYSQL_BOTH',MYSQLI_BOTH);
define('MYSQL_NUM',MYSQLI_NUM);
define('MYSQL_ASSOC',MYSQLI_ASSOC);

$connect=mysqli_connect('localhost','root','root','omgyoutube');

$start = date('Y-m-d');
$end = date('Y-m-d');

if(isset($_GET['date']) && !empty($_GET["date"])){
		$date = $_GET['date'];
		
		if($date == 'today'){
			$start = date('Y-m-d');
			$end = date('Y-m-d');
		} else if($date == 'yesterday'){
			$start = date('Y-m-d', strtotime("-1 days"));
			$end = date('Y-m-d', strtotime("-1 days"));
		} else if($date == 'thismonth'){
			$start = date('Y-m'.'-1');
			$end = date('Y-m-d');			
		} else if($date == 'previousmonth'){
			$start = date('Y-m'.'-1', strtotime(date('Y-m')." -1 month"));
			$end = date('Y-m'.'-30', strtotime(date('Y-m')." -1 month"));
		}
		
		if($date == 'all'){
		$myArray1 = [];
		$myArray2 = [];
		$myArray3 = [];
	
	if ($result = $mysqli->query("SELECT * FROM visits ")) {

		while($row = $result->fetch_array(MYSQL_ASSOC)) {
				$myArray1[] = $row;
		}
	}
	
	if($result = $mysqli->query("SELECT * FROM downloads")){
		while($row = $result->fetch_array(MYSQL_ASSOC)) {
				$myArray2[] = $row;
		}
	}
	
	if($result = $mysqli->query("SELECT * FROM search")){
		while($row = $result->fetch_array(MYSQL_ASSOC)) {
				$myArray3[] = $row;
		}
	}
	
	$myArray[]=array('totalVisits'=>sizeof($myArray1), 'totalSearch'=>sizeof($myArray3), 'totalDownloads'=>sizeof($myArray2), 'visits'=>$myArray1,  'search'=>$myArray3,  'downloads'=>$myArray2);
	echo json_encode($myArray);

} else {
	
	$myArray1 = [];
	$myArray2 = [];
	$myArray3 = [];
	
	if ($result = $mysqli_query($connect, "SELECT * FROM visits WHERE date between '$start' AND '$end' ")) {

		while($row = $result->fetch_array(MYSQL_ASSOC)) {
				$myArray1[] = $row;
		}
	}
	
	if($result = $mysqli_query($connect, "SELECT * FROM downloads WHERE date between '$start' AND '$end' ")){
		while($row = $result->fetch_array(MYSQL_ASSOC)) {
				$myArray2[] = $row;
		}
	}
	
	if($result = $mysqli_query($connect, "SELECT * FROM search WHERE date between '$start' AND '$end' ")){
		while($row = $result->fetch_array(MYSQL_ASSOC)) {
				$myArray3[] = $row;
		}
	}
	
	$myArray[]=array('totalVisits'=>sizeof($myArray1), 'totalSearch'=>sizeof($myArray3), 'totalDownloads'=>sizeof($myArray2), 'visits'=>$myArray1, 'search'=>$myArray3, 'downloads'=>$myArray2);
	echo json_encode($myArray);
}

}

$myArray = array();
$result->close();
$mysqli->close();
?>
				
				