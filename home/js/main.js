var cartPosition=450;var total=0;var set=0;var cartOpened=0;var productOpened=0;
var gClass=function(v){return document.getElementsByClassName(v);}

//--------------------------------------------------------------------------- PRODUCT PAGE
function openProduct(event,elm,idd){document.body.classList.remove('Bmode');document.body.classList.remove('Cmode');
	 document.body.classList.add('Pmode');elm.parentElement.parentElement.classList.add('selected');}
function closeProduct(elm){document.body.classList.remove('Pmode');document.body.classList.remove('Cmode');
	 document.body.classList.add('Bmode');jQuery('.zero-thumb.selected').removeClass('selected');}
function checkMobile(){console.log('remove all calls to checkmobile')}
//--------------------------------------------------------------------------- MAP
window.ismaploadedonce=false;function toggleMap(){
	if(!window.ismaploadedonce){window.doloadmaponce=function(){setTimeout(initMap,500);}
	ooo.ins(document.getElementsByTagName('head')[0],'script',['type','text/javascript','src','https://maps.googleapis.com/maps/api/js?fg=0&libraries=places&callback=doloadmaponce']);}
	document.body.classList.toggle('map-isin');}
function openMap(){toggleMap()}

//--------------------------------------------------------------------------- 
function scrollTo(element, to, duration) {
    if (duration < 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}
function defaultPage(){
    document.getElementById('checkout-main-container').setAttribute('style','display:none');
    productOpened=0;
    if(cartOpened==1){closeCart()};
    if(set==1){openMap()}else{gClass('google-map-container')[0].style.top="13%"}
    if(gClass('products-page-main')[0].style.display!="none"){gClass('products-page-main')[0].classList.add('hidden');}
    gClass('products-main')[0].style.top="25%";
    gClass('products-main')[0].style.display="block";
    document.getElementById('product-page-target').style.top="58%";
    document.getElementById('basket-container').style.top="0";
    scrollTo(document.body, 0, 200);
}
function share(){
    document.getElementById('fbb').style.display="block";
    document.getElementById('shb').style.display="none"
}
function shareDialog(elm){
    if (elm.src == "../img/share.png")
        {
            elm.src = "../img/diamond.png";
        }
}
function openCat(e){
    for(i=0;i<10;i++){
        if(gClass('search')[i]){
            gClass('cat-cont')[i].style.height="50px";
            gClass('cat-cont')[i].style.lineHeight="50px";
            gClass('search')[i].style.height="0";
            gClass('search')[i].style.display="none";
            gClass('cat-cont')[i].classList.remove('selected');
        }
    }
    e.style.height="40px";
    e.style.lineHeight="40px";
    e.classList.add('selected');
    var n = e.nextSibling;
    while(n && n.nodeType != 1) {
    n = n.nextSibling
}
    n.style.height="auto";
    n.style.display="block";
}
function clean(elm){
    for(i=0;i<30;i++){if(elm.value!='all'&&elm.value!='recents'){
        if(gClass('orders-button')[i]&&gClass('orders-button')[i].value!='all'&&gClass('orders-button')[i].value!='recents'){gClass('orders-button')[i].classList.remove('select')}
    }else{elm.classList.add('select');
        if(elm.value=='all'){document.getElementById('recentOrders').classList.remove('select');}else{
            document.getElementById('allOrders').classList.remove('select');
        }
    }}
}

function checkRange(xx,yy,cc){
    if(cc){
        if(xx.value<=yy.value){xx.previousSibling.value=yy.previousSibling.value}
    }else{
        if(xx.value>=yy.value){xx.previousSibling.value=yy.previousSibling.value}
    }
}