<?php
	$username = $_POST["username"];
	$conn = mysqli_connect("127.0.0.1","root","root","wangke");
	mysqli_set_charset($conn, "utf8");
	$sql = "select * from user where username='$username' ";
	$result = mysqli_query($conn, $sql);
	$num = mysqli_num_rows($result);
//	将查询的数据条数返回前端
	echo $num;
	mysqli_close($conn);
?>