var inputs = document.getElementsByTagName("input");
var select = document.getElementsByTagName("select");
var phoneBox = document.getElementsByClassName("phoneBox");
var phones = document.getElementsByClassName("phone");
var spans = document.getElementsByTagName("span");
var passTxt = document.getElementsByClassName("passTxt");
var sendCode = document.getElementById("sendCode");
var btnCheck = document.getElementById("checkBox");
var server = document.getElementsByClassName("server");
//点击select控制昵称和密码的边框颜色及其相应提示信息的显示
select[0].onclick = function() {
	select[0].style.border = "1px solid deepskyblue"; //点击时边框变蓝
	for (j = 0; j <= 1; j++) {
		if (inputs[j].value == "") { //如果昵称或者密码为空，昵称和密码的边框变红
			inputs[j].style.border = "1px solid red";
			spans[0].style.display = "block"; //昵称提示显示
			passTxt[0].style.height = "110px"; //密码提示显示
		}
	}
}
//input标签的点击
for (var i = 0; i < 4; i++) {
	if (i == 2) { //点击手机号码
		inputs[2].onclick = function() {
			phoneBox[0].style.height = "120px"; //点击手机号码验证码部分弹出
			this.style.border = "1px solid deepskyblue"; //注意this
			for (j = 0; j <= 1; j++) {
				if (j == 0 && inputs[j].value == "") { //如果昵称为空，昵称边框变红
					inputs[j].style.border = "1px solid red";
					spans[0].style.display = "block"; //昵称提示显示
				} else if (j == 0 && inputs[j].value != "") { //如果昵称不为空，昵称边框变蓝
					inputs[j].style.border = "1px solid deepskyblue";
					spans[0].style.display = "none"; //昵称提示隐藏
				} else if (j == 1 && inputs[j].value == "") { //如果密码为空，密码边框变红
					inputs[j].style.border = "1px solid red";
					passTxt[0].style.height = "110px"; //密码提示显示
				} else { //如果密码不为空，密码边框变蓝
					inputs[j].style.border = "1px solid deepskyblue";
					passTxt[0].style.height = "50px"; //密码提示隐藏
				}
			}
		}
	} else if (i == 0) {
		inputs[i].onclick = function() {
			this.style.border = "1px solid deepskyblue"; //注意this
			spans[0].style.display = "none"; //昵称提示隐藏
			passTxt[0].style.height = "50px"; //密码提示隐藏
			phoneBox[0].style.height = "50px"; //手机验证码部分隐藏
		}
	} else if (i == 1) {
		inputs[i].onclick = function() {
			this.style.border = "1px solid deepskyblue"; //注意this
			if (inputs[0].value == "") {
				inputs[0].style.border = "1px solid red"; //点击密码时，如果昵称为空，昵称边框变红
				passTxt[0].style.height = "110px"; //密码提示显示
				phoneBox[0].style.height = "50px"; //手机验证码部分隐藏
				spans[0].style.display = "block"; //昵称提示显示
			}
		}
	} else if (i == 3 ) { //输入短信验证码但是手机号为空
		inputs[i].onclick = function() {
			if(inputs[2].value == ""){   //输入短信验证码但是手机号为空
				this.style.border = "1px solid deepskyblue"; //注意this
				phoneBox[0].style.height = "50px"; //手机验证码部分隐藏
			}
			else{  //输入短信验证码同时手机号不为空
				this.style.border = "1px solid deepskyblue"; //注意this
				phoneBox[0].style.height = "120px"; //手机验证码部分弹出
			}
		}
	}
}
//验证码
sendCode.onclick = function() {
	sendCode.disabled = true; //当点击后倒计时时候不能点击此按钮
	var time = 5; //倒计时5秒
	var timer = setInterval(fun1, 1000); //设置定时器
	function fun1() {
		time--;
		if (time >= 0) {
			if(inputs[2].value!=""){
				sendCode.value = time + "s后重新发送";
			}
			else{
				sendCode.value = "请输入手机号码";
			}
		} 
		else if(time<0){
			if(inputs[2].value!=""){
				sendCode.value = "重新发送验证码";
							sendCode.disabled = false; //倒计时结束能够重新点击发送的按钮
							clearTimeout(timer); //清除定时器
							time = 5; //设置循环重新开始条件
			}
			else{
				sendCode.value = "请输入手机号码";
			}
		}
	}
}
var subBtn=document.querySelector("[type=submit]");
subBtn.onclick=function(e){
	//底部服务协议没有勾选出现警告
	if (inputs[5].checked != true) {
		server[0].style.height = "65px";
	}
	for(var j=0;j<3;j++){
		if(inputs[j].value==""){
			alert("请完善用户名、密码信息");    //如果信息输入不完整，无法进行注册
			e.preventDefault();	// 禁止点击
			break;
		}
	}
	if(inputs[3].value!="1234"){
		alert("请输入正确的验证码");    //跳转到登录页面
		e.preventDefault();	// 禁止点击
	}
	if(btnCheck.checked != true){
		alert("请先勾选协议!")
		e.preventDefault();	// 禁止点击
	}
}

// 检查用户名是否存在
var userValue=document.getElementById("username");
userValue.onblur=function(){
	var Data="username="+userValue.value;
	// 构造数据结构
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			if(xhr.responseText!=0){
				// 目前数据库有此名
				alert("用户名已经存在")
			}
		}
	}
	xhr.open("POST","php/ajaxUser.php",true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(Data);
}

// 检查手机号是否被注册
var userPhone=document.getElementById("phoneValue");
userPhone.onblur=function(){
	var Data="phone="+userPhone.value;
	// 构造数据结构
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			if(xhr.responseText!=0){
				// 目前数据库有此名
				alert("手机号已被注册")
			}
		}
	}
	xhr.open("POST","php/ajaxPhone.php",true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(Data);
}
