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
			window.cartTotalSub+=parseFloat(ooo.ixml(ooo.selone('//variants[optionTitle]/price',pxmlD.documentElement)));
			cartXML+=pxml;}
		cartXML+='</response>';
		window.cartTotalTax=(cartTotalSub/100)*22;
		var fff=ooo.parsexml(cartXML);var ttt=ooo.parsexml('<tmpdoc>'+ooo.preloaded('products-cart.xml').documentElement.innerHTML+'</tmpdoc>');
		ooo.syncrender(document.getElementById('products-cart-target'),ttt.documentElement,fff.documentElement,'normal');

}	}	};

removeProduct=function(NONUSED2,NONUSED1,PRDid){
	var elm=document.getElementById(PRDid);
    if(elm){
        var qt=parseInt(elm.className.replace('a',''));qt--;
		if(qt>0){
			elm.className='a'+qt;
		}else{
			elm.parentElement.removeChild(elm);
		}
		renderCart();
    }
	
};
updateCartFlag=function(){
	if(total==1){
        var element = document.createElement("div");
        var name = document.createElement("div");
    name.appendChild(document.createTextNode(total.toString()));
    name.className='flag-text';
    element.className='flag';
        element.appendChild(name);
    document.getElementById('bought-container').appendChild(element);
    cartPosition-=25;}else{document.getElementsByClassName('flag-text')[0].innerHTML=total.toString();
                          document.getElementsByClassName('qt-items')[0].innerHTML=total.toString()};
    if(cartPosition!=0){
    document.getElementById('basket').style.top='-'+cartPosition+'px';
    }/*else{
        document.getElementById('else').style.display='block'
    }*/
 if(cartPosition!=450){
    document.getElementById('basket').style.top='-400px';
    setTimeout("document.getElementById('basket').style.top='-425px';",100);
    }
};