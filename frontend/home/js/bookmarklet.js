/*var myForm=document.createElement('form');
var myInput=document.createElement('input');
myInput.setAttribute('type','hidden');
myInput.setAttribute('name','jsondata')
myInput.setAttribute('value','JSON.stringify(selectedProduct())');
myForm.setAttribute('action','http://emporyou.com/metaframe?page=vendor/product-edit.xml');
myForm.setAttribute('method','post');
myForm.setAttribute('id','formname');
myInput.setAttribute('id','jsonmyin');
myForm.setAttribute('name','formname');
myForm.setAttribute('target','_blank');
myForm.setAttribute('enctype','multipart/form-data');
myForm.style.display="none";
myForm.appendChild(myInput);
document.body.appendChild(myForm);
setTimeout(formsub,500);
function formsub(){
window.myFm=document.getElementById('formname');
window.myIn=document.getElementById('jsonmyin');
    document.forms['formname'].submit();
}*/
gio={att:function(e,a,v){if(e){if(v){e.setAttribute(a,v);}else{return e.getAttribute(a)}}return false},ins:function(p,tag,aa,_html,b){var i;var elm=document.createElement(tag);if(_html){elm.innerHTML=_html;}if(aa){for(i=0;i<aa.length;i+=2){this.att(elm,aa[i],aa[i+1]);}}if(p){if(b==true){return p.insertBefore(elm,p.firstChild);}else if(b){return p.insertBefore(elm,b);}else{return p.appendChild(elm);}}else{return elm}}}
var f=gio.ins(document.body,'form',['method','post','target','_blank','action','http://emporyou.com/metaframe?page=vendor/product-edit.xml']);
var i=gio.ins(f,'input',['name','jsondata']);i.value=JSON.stringify(selectedProduct());f.submit();