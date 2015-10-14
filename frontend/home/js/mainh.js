rendercart=function(){
	if(!cartemplatepreloaded){ooo.preload('products-cart.xml',function(){window.cartemplatepreloaded=true;setTimeout('rendercart();',250)})}
	else{
	var cartdata=ooo.sel("//div[@id='cart-data']/textarea",document);
	if(cartdata.length>0){
		var cartXML='<?xml version="1.0" encoding="UTF-8"?><response>';
		for(var c=0;c<cartdata.length;c++){cartXML+='<product>'+cartdata[c].value+'</product>';}cartXML+='</response>';
		var fff=ooo.parsexml(cartXML);
		ooo.syncrender('products-cart-target',fff.documentElement,ooo.preloaded('products-cart.xml').documentElement);
}	}	};