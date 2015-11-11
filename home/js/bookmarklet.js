//////////////////// DETECT ECOMMERCE ////////////////////////////////////
window.emporyoumode;

if(selectedProduct){emporyoumode='reaction'};console.log(selectedProduct);
if(!emporyoumode){emporyoumode='magento'};
var jsondata={};
if(emporyoumode=='reaction'){
prodJSON=selectedProduct();
prodJSON.fromreaction=true;
    window.optNum=document.getElementsByClassName('variant-select-option');
    window.cidx=0;
    var imgSrc=document.getElementsByClassName('img-responsive')[0].src;
    prodJSON.image=[];
    var imgObj={'url':imgSrc,'name':'mainExternal'};
    prodJSON.image.push(imgObj);
    processVariants();
}else if(emporyoumode=="magento"){
    
}else{console.log('error:unsupported ecommerce')};
//////////////////////////////////////////////////////////////////////////
gio={att:function(e,a,v){if(e){if(v){e.setAttribute(a,v);}else{return e.getAttribute(a)}}return false},ins:function(p,tag,aa,_html,b){var i;var elm=document.createElement(tag);if(_html){elm.innerHTML=_html;}if(aa){for(i=0;i<aa.length;i+=2){this.att(elm,aa[i],aa[i+1]);}}if(p){if(b==true){return p.insertBefore(elm,p.firstChild);}else if(b){return p.insertBefore(elm,b);}else{return p.appendChild(elm);}}else{return elm}}}
function finishData(){window.f=gio.ins(document.body,'form',['method','post','target','_blank','action','http://emporyou.com/merchant/metaframe?page=merchant/coupon.html','enctype','multipart/form-data']);
var i=gio.ins(f,'textarea',['name','jdata'],JSON.stringify(prodJSON));setTimeout('f.submit()',250);}
function processVariants(){
    var v=optNum[cidx];
    if(!v){
        finishData();
    }else{
        cidx++;
        v.click();
        setTimeout(_processVariants,250)
    }
}
function _processVariants(){
    var imgSrc=document.getElementsByClassName('img-responsive')[0].src;
    var imgObj={'url':imgSrc,'name':optNum[cidx-1].innerHTML,'isvariant':true,'optNum':cidx};

    prodJSON.image.push(imgObj);
    processVariants()
}
