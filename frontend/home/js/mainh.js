cartemplatepreloaded=false;
rendercart=function(){
	if(!cartemplatepreloaded){ooo.preload('products-cart.xml',function(){cartemplatepreloaded=true;rendercart();})}
	var cartdata=document.getElementById('cart-data');
	var cartXML='<?xml version="1.0" encoding="UTF-8"?><response>';
	cartXML+='</response>';
	ooo.syncrender('products-cart-target',ooo.parsexml(cartXML).documentElement,ooo.preloaded('products-cart.xml'));this.value='CLEAR';}
};