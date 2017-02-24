<?php
$connect=mysqli_connect('localhost','root','root','omgyoutube');

if(mysqli_connect_errno($connect))
{
		echo 'Failed to connect';
}

$page= $_POST['page'];
$date = date('Y-m-d');

mysqli_query($connect, "INSERT INTO visits(page, date) VALUES('$page', '$date')");
echo 'ok';
?>
				
				