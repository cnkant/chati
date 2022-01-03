var timer = setInterval(function () {
  var index = Math.floor(Math.random() * 8);
  $(".latticeUl>li").eq(index).stop().addClass("hover");
  $(".latticeUl>li").eq(index).siblings().stop().removeClass("hover");
}, 2000);
