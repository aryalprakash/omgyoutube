<?php
$connect=mysqli_connect('localhost','omgyoutube','ChangeMe123','omgyoutu_blog');

if(mysqli_connect_errno($connect))
{
		echo 'Failed to connect';
}

$type= $_POST['type'];
$id= $_POST['id'];
$title= $_POST['title'];
$date = date('Y-m-d');

mysqli_query($connect, "INSERT INTO downloads(type, id, title, date) VALUES('$type','$id', '$title', '$date')");
echo 'ok';
?>