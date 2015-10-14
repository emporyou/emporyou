rendercart=function(){
		if(!window.cartemplatepreloaded){ooo.preload('products-cart.xml',function(){window.cartemplatepreloaded=true;setTimeout('rendercart();',250)})}
	else{
	var cartdata=ooo.sel("//div[@id='cart-data']/textarea",document);
window.cartTotalItems=0;
window.cartTotalSub=0;
window.cartTotalTotal=0;
window.cartTotalTax=0;
window.cartTotalShipment=0;
	
		var cartXML='<response>';var pxml='';var pxmlD=null;var pnum=0;
		for(var c=0;c<cartdata.length;c++){pnum=parseInt(cartdata[c].className.replace('a',''));
			window.cartTotalItems+=pnum;
			pxml='<product>'+cartdata[c].value+'<cart_qt>'+cartdata[c].className.replace('a','')+'</cart_qt></product>';
			pxmlD=ooo.parsexml(pxml);
			window.cartTotalSub+=pnum*parseFloat(ooo.ixml(ooo.selone('//variants[optionTitle]/price',pxmlD.documentElement)));
			cartXML+=pxml;}
		cartXML+='</response>';
		window.cartTotalTax=(cartTotalSub/100)*22;
		window.cartTotalTax=Math.round(window.cartTotalTax*100)/100;
		window.cartTotalSub=Math.round(window.cartTotalSub*100)/100;
		window.cartTotalShipment=Math.round(window.cartTotalShipment*100)/100;
		window.cartTotalTotal=window.cartTotalTax+window.cartTotalSub+window.cartTotalShipment;	
		window.cartTotalTotal=Math.round(window.cartTotalTotal*100)/100;		
		var fff=ooo.parsexml(cartXML);var ttt=ooo.parsexml('<tmpdoc>'+ooo.preloaded('products-cart.xml').documentElement.innerHTML+'</tmpdoc>');
		ooo.syncrender(document.getElementById('products-cart-target'),ttt.documentElement,fff.documentElement,'normal');

}	};

removeProduct=function(NONUSED2,NONUSED1,PRDid){
	var elm=document.getElementById(PRDid);
    if(elm){
        var qt=parseInt(elm.className.replace('a',''));qt--;
		if(qt>0){
			elm.className='a'+qt;
		}else{
			elm.parentNode.removeChild(elm);
		};
		rendercart();
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
emptyCart=function(){
    ooo.clearchilds('products-cart-data');renderCart();
}