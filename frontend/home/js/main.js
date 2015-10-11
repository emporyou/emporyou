var cartPosition=450;
function addProduct(p){
    var element = document.createElement("div");
    element.appendChild(document.createTextNode(p));
    element.className='flag';
    document.getElementById('bought-container').appendChild(element);
    cartPosition+=20;
    document.getElementById('basket').style.top='-'+cartPosition+'px';
}