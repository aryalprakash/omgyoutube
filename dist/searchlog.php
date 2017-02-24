<?php
$connect=mysqli_connect('localhost','root','root','omgyoutube');

if(mysqli_connect_errno($connect))
{
		echo 'Failed to connect';
}

$query= $_POST['query'];
$type= $_POST['type'];
$date = date('Y-m-d');

mysqli_query($connect, "INSERT INTO search(query, type, date) VALUES('$query', '$type', '$date')");
echo 'ok';
?>
				
				