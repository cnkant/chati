var lis = document.querySelectorAll(".lists");
console.log(lis.length);
var items = document.querySelectorAll('.item');
for (var i = 0; i < lis.length; i++) {
    lis[i].setAttribute('index',i);
    lis[i].onmouseover = function () {
        var index = this.getAttribute('index');
        for(var i=0; i < items.length ; i++){
            items[i].style.display = 'none';
        }
        items[index].style.display = 'block';
    }
}