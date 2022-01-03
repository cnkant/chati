<?php
	echo "<meta charset='utf-8'>";
	$username=trim($_POST['username']);
	$password=md5(trim($_POST['password']));
	$conn=mysqli_connect("127.0.0.1","root","root","wangke");
	mysqli_set_charset($conn,"utf8");
	$sql="SELECT * FROM user WHERE username='$username' AND password='$password'";
	$result=mysqli_query($conn,$sql);
	$num=mysqli_num_rows($result);	//查看影响条数
	if($num>0){
		echo "<script type='text/javascript'>alert('登录成功');window.location.href='../JDW/index.html';</script>";
	}else{
		echo "<script type='text/javascript'>alert('用户名或密码有误');window.history.back();</script>";
	}
	mysqli_close($conn);
?>