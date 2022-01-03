var nav = document.getElementById("nav").getElementsByTagName("a");
var div = document.getElementById("content").getElementsByTagName("div");
var inputs = document.getElementsByTagName("input");
var spans = document.getElementsByTagName("span");
var btnSubmits = document.getElementsByClassName("btn");//获取授权并登录按钮
for (var i = 0; i < 2; i++) {
	nav[i].onclick = function() {
		change(this);
	}
}
function change(obj) {
	for (var i = 0; i < 2; i++) {
		if (obj == nav[i]) {
			nav[i].className = "on";
			div[i].className = "in";
		} else {
			nav[i].className = " ";
			div[i].className = " ";
		}
	}
}
for (var i = 0; i < 10; i++) {
	if (i == 0) {
		inputs[i].onclick = function() {
			this.style.border = "1px solid deepskyblue"; //注意this
			spans[0].style.display = "none"; //用户名提示隐藏
		}
	}
	if (i == 5) {
		inputs[i].onclick = function() {
			this.style.border = "1px solid deepskyblue"; //注意this
			spans[2].style.display = "none"; //微信提示隐藏
		}
	}
	if (i == 1) {
		inputs[i].onclick = function() {
			this.style.border = "1px solid deepskyblue"; 
			if(inputs[0].value==""){
				inputs[0].style.border = "1px solid red";
				spans[0].style.display = "block"; //用户名提示显示
			}
		}
	}
	if (i == 6) {
		inputs[i].onclick = function() {
			this.style.border = "1px solid deepskyblue"; //注意this
			if(inputs[5].value==""){
				inputs[5].style.border = "1px solid red";
				spans[2].style.display = "block"; //微信提示显示
			}
		}
	}
}

// var subBtn=document.getElementById("btn");
var subBtn=document.querySelector("[type=submit]");
//勾选服务协议
subBtn.onclick = function(e){
	if (inputs[3].checked != true||inputs[4].checked != true) {
		spans[1].style.display = "block";
		// alert("000");
		e.preventDefault();
	}
 	// else if(inputs[3].checked == true&&inputs[4].checked == true&&inputs[0].value!=""&&inputs[1].value!=""){
 	// 	window.location.href="zhuce.html";
 	// }
}

// btnSubmits[1].onclick = function(e){
// 	if (inputs[8].checked != true||inputs[9].checked != true) {
// 		spans[3].style.display = "block";
// 		e.preventDefault();
	// }
 	// else if(inputs[8].checked == true&&inputs[9].checked == true&&inputs[5].value!=""&&inputs[6].value!=""){
 	// 	window.location.href="zhuce.html";
 	// }
// }