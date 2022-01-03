var tabs = document.getElementById("tab").getElementsByTagName("li");
var divs = document.getElementById("edulunbo").getElementsByTagName("div");

for (var i = 0; i < tabs.length; i++) {
  tabs[i].onmouseover = function () {
    change(this);
  };
}

function change(obj) {
  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i] == obj) {
      tabs[i].className = "on";
      divs[i].className = "eduOn";
    } else {
      tabs[i].className = "";
      divs[i].className = "";
    }
  }
}
