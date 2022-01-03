<?php
	
	$problem=trim($_POST['problem']);
	// 如果问题中含有''，则将'替换成\'，因为在SQL查询语句中''内不能再次使用''，需要将问题中的''进行转义
	$problem_2=str_replace("'","\'",$problem);
	// echo $problem_2;
	$conn=mysqli_connect("127.0.0.1","root","root","wangke");
	mysqli_set_charset($conn,"utf8");
	$sql="SELECT * FROM answers WHERE problem REGEXP '$problem_2'";
	$result=mysqli_query($conn,$sql);
	if (!$result) {
	    printf("Error: %s\n", mysqli_error($conn));
	    exit();
	}
	$num=mysqli_num_rows($result);
	if($num<=0){
			$arr_2=array();
			$arr = [
				'problem'=>'警告',
			    'answer' => '该题目未收录'   
			];
			array_push($arr_2,$arr);
			echo json_encode($arr_2,JSON_UNESCAPED_UNICODE);;
			exit();
	}
	if($num%10==0){
		// 总页数
		$page_count=$num/10;
	}else{
		$page_count=floor($num/10)+1;
	}
	
	// 将id存入数组中
	$array_id=array();
	for($i=0;$i<$page_count;$i++){
		$j=0;
		$sql="SELECT * FROM answers WHERE problem REGEXP '$problem_2'";
		$result=mysqli_query($conn,$sql);
		while($row1=mysqli_fetch_assoc($result)){
			if($j==$i*10){
				array_push($array_id,$row1['id']);
			}
			$j++;
		}
	}
	// echo json_encode($array_id,JSON_UNESCAPED_UNICODE);
	//根据下标取id
	$page_num=0;	//页码
	$id=$array_id["$page_num"];
	// 根据id取数据
	$sql="SELECT * FROM answers WHERE problem REGEXP '$problem_2' ";
	$result2=mysqli_query($conn,$sql);
	$array=array();
	while($row2=mysqli_fetch_assoc($result2)){
		$id=$row2['id'];
		array_push($array,$row2);
	}
	// echo "<meta charset='utf-8'>";
	echo json_encode($array,JSON_UNESCAPED_UNICODE);
	// echo "id为".$id;
	// echo "<br><a href='index.html'>返回继续查询</a>";
?>