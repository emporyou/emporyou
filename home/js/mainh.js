//--------------------------------------------------------------------------- CART
server_syncart=function(){
	var xml=document.getElementById('cart-data').innerHTML;
	var elm=document.getElementById('post-responses');
	if(!elm){elm=ooo.ins(document.body,'iframe',['style','display:none','id','post-responses','name','post-responses']);}
	var f=document.getElementById('cart-sync-form');if(f){f.parentElement.removeChild(f)}
	f=ooo.ins(document.body,'form',['id','cart-sync-form','style','display:none','enctype','multipart/form-data','method','post','target','post-responses','action','http://emporyou.com/syncart']);
	var i=ooo.ins(f,'textarea',['name','xdata'],'<html>'+xml+'</html>');setTimeout(function(){f.submit();},100);
};
rendercart=function(){
	if(!window.cartemplatepreloaded){ooo.preload('products-cart.xml',function(){window.cartemplatepreloaded=true;setTimeout('rendercart();',250)})}
	else{
	var cartdata=ooo.sel("//div[@id='cart-data']/textarea",document);
window.cartTotalItems=0;
window.cartTotalSub=0;
window.cartTotalTotal=0;
window.cartTotalTax=0;
window.cartTotalShipment=0;
		var cartXML=getcartXML();
		var d='none';if(window.cartTotalItems>0){d=''}
		ooo.$$('bought-container').style.display=d;
		ooo.$$('flag-text').innerHTML=window.cartTotalItems+'<div class="flagcheck">Checkout</div>';
        document.getElementsByClassName('flag')[0].classList.toggle('check');
        document.getElementsByClassName('flag-text')[0].classList.toggle('check');
        setTimeout("document.getElementsByClassName('flag')[0].classList.toggle('check');document.getElementsByClassName('flag-text')[0].classList.toggle('check');",2000)
		window.cartTotalTax=(cartTotalSub/100)*22;
		window.cartTotalTax=Math.round(window.cartTotalTax*100)/100;
		window.cartTotalSub=Math.round(window.cartTotalSub*100)/100;
		window.cartTotalShipment=Math.round(window.cartTotalShipment*100)/100;
		window.cartTotalTotal=window.cartTotalTax+window.cartTotalSub+window.cartTotalShipment;	
		window.cartTotalTotal=Math.round(window.cartTotalTotal*100)/100;		
		var fff=ooo.parsexml(cartXML);var ttt=ooo.parsexml('<tmpdoc>'+ooo.preloaded('products-cart.xml').documentElement.innerHTML+'</tmpdoc>');
		ooo.syncrender(document.getElementById('products-cart-target'),ttt.documentElement,fff.documentElement,'normal');
}	};
getcartXML=function(){var cartdata=ooo.sel("//div[@id='cart-data']/textarea",document);
	var cartXML='<response>';var pxml='';var pxmlD=null;var pnum=0;
	for(var c=0;c<cartdata.length;c++){pnum=parseInt(cartdata[c].className.replace('a',''));
		window.cartTotalItems+=pnum;
		pxml='<doc>'+cartdata[c].value+'<cart_qt>'+cartdata[c].className.replace('a','')+'</cart_qt></doc>';
		pxmlD=ooo.parsexml(pxml);
		var ddd=ooo.ixml(ooo.selone('//variants/price',pxmlD.documentElement));
		window.cartTotalSub+=pnum*parseFloat(ddd.replace('<![CDATA[','').replace(']]>',''));
		cartXML+=pxml;}cartXML+='</response>';return cartXML;};
addProduct=function(productName,XMLid,PRDid){
   var elm=document.getElementById(PRDid);
   if(elm){var qt=parseInt(elm.className.replace('a',''));qt++;elm.className='a'+qt;}
	else{elm=ooo.ins(document.getElementById('cart-data'),'textarea',['id',PRDid,'class','a1'],document.getElementById(XMLid).value);}
	server_syncart();rendercart();};
removeProduct=function(PRDid){var elm=document.getElementById(PRDid);if(elm){
   var qt=parseInt(elm.className.replace('a',''));qt--;
	if(qt>0){elm.className='a'+qt;}else{elm.parentNode.removeChild(elm);};server_syncart();rendercart();}};
updateCartFlag=function(){console.log('remove all calls to updateCartFlag')}
emptyCart=function(){ooo.clearchilds('cart-data');server_syncart();rendercart();}
openCart=function(){rendercart();document.body.classList.add('cart-isin');};
toggleCart=function(){if(document.body.classList.toggle('cart-isin')){rendercart();}};
closeCart=function(){document.body.classList.remove('cart-isin');};
//---------------------------------------------------------------------- MAP
ensureMapIsOpened=function(){if(!document.body.classList.contains('map-isin')){toggleMap()}};
ensureMapIsClosed=function(){if(document.body.classList.contains('map-isin')){toggleMap()}};
//---------------------------------------------------------------------- FANTASMINO
doItProducts=function(){$(function(){$(".thumb-product").hover(function(e) {
   var el_pos = $(this).offset();
   var edge = closestEdge(e.pageX - el_pos.left, e.pageY - el_pos.top, $(this).width(), $(this).height());
	var startC='bar-n';if(edge=='right'){startC='bar-e';}else if(edge=='bottom'){startC='bar-s';}else if(edge=='left'){startC='bar-w';}	
	var fly=jQuery(e.currentTarget).find('.product-bar');
	fly=jQuery(fly).get(0);fly.classList.add(startC);
	setTimeout(function(){fly.style.display='block';fly.classList.add("product-bar-in")},35);	
	setTimeout(function(){fly.classList.remove(startC)},50);
    },function(e) {
      var el_pos = $(this).offset();
      var edge = closestEdge(e.pageX - el_pos.left, e.pageY - el_pos.top, $(this).width(), $(this).height());
		var startC='bar-n';if(edge=='right'){startC='bar-e';}else if(edge=='bottom'){startC='bar-s';}else if(edge=='left'){startC='bar-w';}	
        var fly=jQuery(e.currentTarget).find('.product-bar');
	fly=jQuery(fly).get(0);fly.classList.add(startC);
	setTimeout(function(){fly.classList.remove("product-bar-in")},25);
	setTimeout(function(){fly.style.display='none';fly.classList.remove(startC)},350);
});});};
closestEdge=function(x,y,w,h) {
   var topEdgeDist=distMetric(x,y,w/2,0);var bottomEdgeDist=distMetric(x,y,w/2,h);
   var leftEdgeDist=distMetric(x,y,0,h/2);var rightEdgeDist = distMetric(x,y,w,h/2);
   var min=Math.min(topEdgeDist,bottomEdgeDist,leftEdgeDist,rightEdgeDist);
   switch (min) {
      case leftEdgeDist:
         return "left";
      case rightEdgeDist:
         return "right";
      case topEdgeDist:
         return "top";
      case bottomEdgeDist:
         return "bottom";
}}; 
distMetric=function(x,y,x2,y2){var xDiff=x-x2;var yDiff=y-y2;return (xDiff*xDiff)+(yDiff*yDiff);}
//---------
window.cartREVemplatepreloaded
function openCheckout(event,elm,idd){
	if(!window.cartREVemplatepreloaded){ooo.preload('cart-review.xml',function(){window.cartREVemplatepreloaded=true;setTimeout('openCheckout();',250)})}
	 document.body.classList.remove('Bmode');document.body.classList.remove('Pmode');
	 document.body.classList.add('Cmode');closeCart();
	 
	 var cartXML=getcartXML();
		var d='none';if(window.cartTotalItems>0){d=''}
		ooo.$$('bought-container').style.display=d;
		ooo.$$('flag-text').innerHTML=window.cartTotalItems;
		window.cartTotalTax=(cartTotalSub/100)*22;
		window.cartTotalTax=Math.round(window.cartTotalTax*100)/100;
		window.cartTotalSub=Math.round(window.cartTotalSub*100)/100;
		window.cartTotalShipment=Math.round(window.cartTotalShipment*100)/100;
		window.cartTotalTotal=window.cartTotalTax+window.cartTotalSub+window.cartTotalShipment;	
		window.cartTotalTotal=Math.round(window.cartTotalTotal*100)/100;		
		var fff=ooo.parsexml(cartXML);var ttt=ooo.parsexml('<tmpdoc>'+ooo.preloaded('cart-review.xml').documentElement.innerHTML+'</tmpdoc>');
		ooo.syncrender(document.getElementById('checkout-target'),ttt.documentElement,fff.documentElement,'normal');
	 }
function closeCheckout(event,elm,idd){document.body.classList.remove('Cmode');document.body.classList.remove('Pmode');
	 document.body.classList.add('Bmode');}
//---------------------------------------------------------------------- UPDATE SEARCH
function updateProductList(){
	var ee=ooo.sel("//*[(contains(@class,'category'))and(contains(@class,'select'))]",document);
	var rel=false;if(ee.length>0){
		rel=ee[0].firstChild.value;
		if(ee.length>1){
			for(var e=1;e<ee.length;e++){
				rel+=','+ee[e].firstChild.value;
}	}	}
	var price=false;var jfind={};
	var pmin=parseInt(document.getElementById('jfind-min').value);
	var pmax=parseInt(document.getElementById('jfind-max').value);
	if((pmin>0)||(pmax<1000)){
		jfind.variants={"$elemMatch":{"price":{"$gt":pmin,"$lt":pmax}}};
	}
	var geo=false;
	var lat=parseFloat(document.getElementById('jfind-lat').value);
	var lng=parseFloat(document.getElementById('jfind-lng').value);
	if(lat){if(lng){if(lat!=''){if(lng!=''){geo=true}}}}
	if(geo){
		jfind.geo={"$near":{"$geometry":{"type":"Point","coordinates":[lat,lng]},"$maxDistance":1000,"$minDistance":0}};
	}	
	var pattern=false;
	var url='http://emporyou.com/api/get/?';
	if(rel){url+='rel='+rel+'&'}
	console.log(url+'jfind='+JSON.stringify(jfind));
	url+='jfind='+encodeURIComponent(JSON.stringify(jfind))+'&'
	ooo.render('thumb-wrap','products-template-uni.xml',url);
}



//---------------------------------------------------------------------- MAP STYLERS

//window.overridestyleidx=-1;
window.overridestyleidx=0;
getmapstyle=function(){var x=-1;
	if(window.overridestyleidx>-1){x=window.overridestyleidx}
	else{x=Math.floor(Math.random()*mapstyles.length);}
	console.log('Choosen style was : '+mapstyles[x].name);
	return mapstyles[x].value;
}
mapstyles=[
{name:'kike01',value:[
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#c1deec"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "weight": "1.25"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            },
            {
                "weight": "1.79"
            },
            {
                "visibility": "on"
            },
            {
                "color": "#0c2d4d"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -31
            },
            {
                "lightness": -33
            },
            {
                "weight": 2
            },
            {
                "gamma": 0.8
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": 30
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#84d0e6"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#b8d4ff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#82c4db"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            },
            {
                "color": "#b6e8ab"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#0e300e"
            },
            {
                "weight": "1.15"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "1.34"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#30758d"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "30"
            },
            {
                "lightness": "-8"
            },
            {
                "color": "#64c8cd"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "weight": "2.10"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#0c2d4d"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": "0.72"
            },
            {
                "color": "#0c2d4d"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            }
        ]
    }
]},
{name:'Love Lock 4',value:[{"featureType":"all","elementType":"geometry","stylers":[{"lightness":"-5"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"lightness":"-10"},{"saturation":"-100"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"},{"lightness":"0"},{"gamma":"1"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":"0"},{"gamma":"1"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"hue":"#d700ff"},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"hue":"#ff0000"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"},{"saturation":"0"},{"lightness":"0"},{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"lightness":"50"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"lightness":"25"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"weight":"1"},{"lightness":"0"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"lightness":"25"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"lightness":"30"},{"gamma":"1.00"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"lightness":"53"},{"gamma":"1.00"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"lightness":"-20"},{"gamma":"1.00"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"lightness":"30"},{"gamma":"1"},{"visibility":"on"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.stroke","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"lightness":"-10"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"lightness":"-40"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":"18"},{"saturation":"-100"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"lightness":"-30"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"},{"lightness":"50"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"0"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"weight":"1"},{"saturation":"0"},{"lightness":"83"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"0"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"lightness":"80"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"0"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"lightness":"80"},{"gamma":"1"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"saturation":"0"},{"lightness":"-15"},{"weight":".25"},{"gamma":"1"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"lightness":"0"},{"gamma":"1.00"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ffc1d9"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"saturation":"-100"},{"lightness":"-5"},{"gamma":"0.5"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"weight":".75"},{"visibility":"off"}]}]},
{name:'napa',value:[{"featureType":"all","elementType":"geometry","stylers":[{"color":"#97005e"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#97005e"},{"saturation":"-82"},{"lightness":"51"},{"gamma":"1.07"},{"weight":"0.89"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#56004e"},{"weight":"1.02"},{"lightness":"-60"},{"gamma":"1.95"},{"saturation":"-72"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"},{"saturation":"-64"},{"lightness":"-67"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":-33},{"weight":2},{"gamma":0.8}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":30}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20}]}]},
{name:'Muted Monotone',value:[{"stylers":[{"visibility":"on"},{"saturation":-100},{"gamma":0.54}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#4d4946"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"gamma":0.48}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"gamma":7.18}]}]},
{name:'Veins',value:[{"stylers":[{"hue":"#B61530"},{"saturation":60},{"lightness":-40}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"water","stylers":[{"color":"#B61530"}]},{"featureType":"road","stylers":[{"color":"#B61530"},{}]},{"featureType":"road.local","stylers":[{"color":"#B61530"},{"lightness":6}]},{"featureType":"road.highway","stylers":[{"color":"#B61530"},{"lightness":-25}]},{"featureType":"road.arterial","stylers":[{"color":"#B61530"},{"lightness":-10}]},{"featureType":"transit","stylers":[{"color":"#B61530"},{"lightness":70}]},{"featureType":"transit.line","stylers":[{"color":"#B61530"},{"lightness":90}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.station","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]}]},
{name:'even lighter',value:[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#e6f3d6"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f4d2c5"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#f4f4f4"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#eaf6f8"}]}]},
{name:'50 shades of blue',value:[{"featureType":"landscape.natural","stylers":[{"color":"#bcddff"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#5fb3ff"}]},{"featureType":"road.arterial","stylers":[{"color":"#ebf4ff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#ebf4ff"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#93c8ff"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#c7e2ff"}]},{"featureType":"transit.station.airport","elementType":"geometry","stylers":[{"saturation":100},{"gamma":0.82},{"hue":"#0088ff"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#1673cb"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"saturation":58},{"hue":"#006eff"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#4797e0"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#209ee1"},{"lightness":49}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#83befc"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#3ea3ff"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"saturation":86},{"hue":"#0077ff"},{"weight":0.8}]},{"elementType":"labels.icon","stylers":[{"hue":"#0066ff"},{"weight":1.9}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"hue":"#0077ff"},{"saturation":-7},{"lightness":24}]}]},
{name:'Snazzy Maps',value:[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#333739"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2ecc71"}]},{"featureType":"poi","stylers":[{"color":"#2ecc71"},{"lightness":-7}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-28}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"visibility":"on"},{"lightness":-15}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-18}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-34}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#333739"},{"weight":0.8}]},{"featureType":"poi.park","stylers":[{"color":"#2ecc71"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#333739"},{"weight":0.3},{"lightness":10}]}]},
{name:'pro-black',value:[{"featureType":"all","elementType":"geometry","stylers":[{"weight":"6.59"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"saturation":"-100"},{"lightness":"11"},{"gamma":"0.84"},{"weight":"0.12"},{"invert_lightness":true},{"hue":"#ff0049"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"saturation":"-99"},{"weight":"0.01"},{"gamma":"3.10"}]},{"featureType":"all","elementType":"labels","stylers":[{"color":"#000000"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#090808"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#737373"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"color":"#b30033"},{"saturation":"0"}]},{"featureType":"poi.attraction","elementType":"geometry","stylers":[{"visibility":"on"},{"weight":"9.39"},{"invert_lightness":true},{"hue":"#ff005f"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"lightness":"-26"}]}]},
{name:'PFF lokacije',value:[{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"color":"#ffc40d"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#dfdedf"}]},{"featureType":"poi.attraction","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#808080"}]},{"featureType":"poi.government","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.medical","elementType":"all","stylers":[{"color":"#ffdc72"}]},{"featureType":"poi.medical","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#949493"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"color":"#ffdb70"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#7f7f7f"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.icon","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"color":"#ffdc70"}]},{"featureType":"poi.school","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#808080"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"color":"#fce4a3"}]},{"featureType":"poi.sports_complex","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a7a7a6"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"color":"#efeeee"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"all","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#808080"}]},{"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#efefec"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#767573"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"transit.station.bus","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.rail","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#bfc1be"}]}]},
{name:'Black and Gold',value:[{"featureType":"administrative","elementType":"all","stylers":[{"color":"#090909"},{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"color":"#f6e7e7"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"color":"#141212"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"color":"#0b0b0b"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"color":"#c55353"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"color":"#050505"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#090909"},{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"color":"#030303"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"color":"#050505"},{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"color":"#050505"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"color":"#030303"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"color":"#080707"}]},{"featureType":"poi","elementType":"all","stylers":[{"color":"#f2ecec"},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"color":"#030303"}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#e3be7d"},{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"color":"#e3be7d"},{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"color":"#fcf3f3"},{"visibility":"on"},{"saturation":"22"},{"weight":"0.01"},{"invert_lightness":true}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#4d4c4c"},{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#292828"}]}]},
{name:'Soft Orange Contrast',value:[{"featureType":"all","elementType":"geometry","stylers":[{"color":"#d55940"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":-33},{"weight":2},{"gamma":0.8}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":30}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#d55940"},{"lightness":"0"},{"saturation":"100"},{"gamma":"3.84"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#ff6633"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#333333"}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#979797"},{"lightness":"-9"},{"weight":"4.44"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]}]},
{name:'Dark yellow',value:[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.province","elementType":"labels.text.fill","stylers":[{"color":"#e3b141"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#e0a64b"}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"color":"#0e0d0a"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#d1b995"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#12120f"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"lightness":"-77"},{"gamma":"4.48"},{"saturation":"24"},{"weight":"0.65"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"lightness":29},{"weight":0.2}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"color":"#f6b044"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#4f4e49"},{"weight":"0.36"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#c4ac87"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"color":"#262307"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#a4875a"},{"lightness":16},{"weight":"0.16"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#deb483"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0f252e"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#080808"},{"gamma":"3.14"},{"weight":"1.07"}]}]},
//{name:'',value:,
];

