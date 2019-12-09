

var lis = document.querySelectorAll('li')
console.log(lis)
for(var i = 0;i < lis.length;i++) {
    lis[i].onclick = function(){
        console.log(i)
    }
}
