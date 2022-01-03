// var index = 0;
// //改变图片
// function changeImg() {
//   index++;
//   var a = document.getElementsByClassName("carimg");
//   if (index >= a.length) index = 0;
//   for (var i = 0; i < a.length; i++) {
//     a[i].style.display = "none";
//   }
//   a[index].style.display = "block";
// }
// //设置定时器，每隔4秒切换下一张图片
// setInterval(changeImg, 4000);

var index = 0;
// 下一张显示
var indexNext = 0;
// 作为计时器
var timer;
//封装函数
function scrollPlay() {
  $(".car .carimg")
    .eq(indexNext)
    .addClass("ondiv")
    .siblings()
    .removeClass("ondiv");
  //	当前显示小于下一张显示
  if (index < indexNext) {
    $(".car .carimg").eq(index).stop().css("display", "none");
    $(".car .carimg").eq(indexNext).stop().css("display", "block");
  }
  //	当前显示大于下一张显示
  if (index > indexNext) {
    $(".car .carimg").eq(index).stop().css("display", "none");
    $(".car .carimg").eq(indexNext).stop().css("display", "block");
  }
}

//计时
function autoPlay() {
  timer = setInterval(function () {
    if (indexNext >= 1) {
      indexNext = 0;
    } else {
      indexNext++;
    }
    scrollPlay();
    index = indexNext;
  }, 4000);
}
autoPlay();

//点击左箭头
$(".carousel #leftSpan").click(function () {
  clearInterval(timer);
  if (indexNext <= 0) {
    indexNext = 1;
  } else {
    indexNext--;
  }
  scrollPlay();
  index = indexNext;
  autoPlay();
});

//点击右箭头
$(".carousel #rightSpan").click(function () {
  clearInterval(timer);
  if (indexNext >= 1) {
    indexNext = 0;
  } else {
    indexNext++;
  }
  scrollPlay();
  index = indexNext;
  autoPlay();
});
