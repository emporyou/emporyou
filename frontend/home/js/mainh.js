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

doItProducts=function(){



$(function() {
    $(".thumb-product").hover(function(e) {
        var el_pos = $(this).offset();
        var edge = closestEdge(e.pageX - el_pos.left, e.pageY - el_pos.top, $(this).width(), $(this).height());
		var startC='bar-n';if(edge=='right'){startC='bar-e';}else if(edge=='bottom'){startC='bar-s';}else if(edge=='left'){startC='bar-w';}	
		var fly=jQuery(e.currentTarget).find('.product-bar');
	fly=jQuery(fly).get(0);
	fly.classList.add(startC);
	setTimeout(function(){fly.style.display='block';fly.classList.add("product-bar-in")},35);	
	setTimeout(function(){fly.classList.remove(startC)},50);
    }, function(e) {
        var el_pos = $(this).offset();
        var edge = closestEdge(e.pageX - el_pos.left, e.pageY - el_pos.top, $(this).width(), $(this).height());
		var startC='bar-n';if(edge=='right'){startC='bar-e';}else if(edge=='bottom'){startC='bar-s';}else if(edge=='left'){startC='bar-w';}	
        var fly=jQuery(e.currentTarget).find('.product-bar');
	fly=jQuery(fly).get(0);
	fly.classList.add(startC);
	setTimeout(function(){fly.classList.remove("product-bar-in")},25);
	setTimeout(function(){fly.style.display='none';fly.classList.remove(startC)},350);
    });
});
}
function closestEdge(x,y,w,h) {
        var topEdgeDist = distMetric(x,y,w/2,0);
        var bottomEdgeDist = distMetric(x,y,w/2,h);
        var leftEdgeDist = distMetric(x,y,0,h/2);
        var rightEdgeDist = distMetric(x,y,w,h/2);
    
        var min = Math.min(topEdgeDist,bottomEdgeDist,leftEdgeDist,rightEdgeDist);
        switch (min) {
            case leftEdgeDist:
                return "left";
            case rightEdgeDist:
                return "right";
            case topEdgeDist:
                return "top";
            case bottomEdgeDist:
                return "bottom";
        }
}
    
function distMetric(x,y,x2,y2) {
    var xDiff = x - x2;
    var yDiff = y - y2;
    return (xDiff * xDiff) + (yDiff * yDiff);
}






