<?php
	echo "<meta charset='utf-8'>";
	// 通过post请求，根据name属性，获取前端表单数据
	// trim()清除前后的空格，md5()加密
	$username=trim($_POST["username"]);
	$password=md5(trim($_POST["password"]));
	$phone=trim($_POST["phone"]);
	// 连接数据库(ip,用户名，密码，数据库，端口-默认3306)
	$conn=mysqli_connect("127.0.0.1","root","root","wangke");
	// 设置字符集(数据库，字符格式)
	mysqli_set_charset($conn,"utf8");
	// 准备SQL语句
	$sql="insert into user(username,password,phone) values('$username','$password','$phone')";
	// 发送SQL语句
	$result=mysqli_query($conn,$sql);
	// 判断结果
	if($result){
		// 弹窗并返回上一级页面
		echo "<script type='text/javascript'>alert('注册成功');window.location.href='../denglu.html';</script>";
	}else{
		echo "<script type='text/javascript'>alert('注册失败');window.history.back();</script>";
	}
	// 关闭数据库连接
	mysqli_close($conn);
?>
