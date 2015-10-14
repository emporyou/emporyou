rendercart=function(){
		if(!window.cartemplatepreloaded){ooo.preload('products-cart.xml',function(){window.cartemplatepreloaded=true;setTimeout('rendercart();',250)})}
	else{
	var cartdata=ooo.sel("//div[@id='cart-data']/textarea",document);
window.cartTotalItems=0;
window.cartTotalSub=0;
window.cartTotalTax=0;
window.cartTotalShipment=0;
	if(cartdata.length>0){
		var cartXML='<response>';var pxml='';var pxmlD=null;
		for(var c=0;c<cartdata.length;c++){
			window.cartTotalItems+=parseInt(cartdata[c].className.replace('a',''));
			pxml='<product>'+cartdata[c].value+'<cart_qt>'+cartdata[c].className.replace('a','')+'</cart_qt></product>';
			pxmlD=ooo.parsexml(pxml);
			window.cartTotalSub+=parseFloat(ooo.ixml(ooo.selone('//variants[optionTitle]/price',pxmlD)));
			cartXML+=pxml;}
		cartXML+='</response>';
		window.cartTotalTax=(cartTotalSub/100)*22;
		var fff=ooo.parsexml(cartXML);var ttt=ooo.parsexml('<tmpdoc>'+ooo.preloaded('products-cart.xml').documentElement.innerHTML+'</tmpdoc>');
		ooo.syncrender(document.getElementById('products-cart-target'),ttt.documentElement,fff.documentElement,'normal');

}	}	};
cartTotalItems=function(){
	ooo.sel("//div[@id='cart-data']/textarea",document);
	
	
};
removeproduct=function(pid){
	
};