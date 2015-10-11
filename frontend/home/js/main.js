var cartPosition=450;
function addProduct(p){
    if(cartPosition!=0){
        var element = document.createElement("div");
        var name = document.createElement("div");
    name.appendChild(document.createTextNode(p));
    name.className='flag-text';
    element.className='flag';
        element.appendChild(name);
    document.getElementById('bought-container').appendChild(element);
    cartPosition-=25;}
    if(cartPosition!=0){
    document.getElementById('basket').style.top='-'+cartPosition+'px';
    }else{
        document.getElementById('else').style.display='block'
    }
}
function checkMobile(){
    if(innerWidth<innerHeight){
        document.getElementsByClassName('products-container')[0].style.width='90%'
    }else{
        document.getElementsByClassName('products-container')[0].style.width='50%'
    }
}