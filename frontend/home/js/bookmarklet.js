var myForm=document.createElement('form');
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
window.form=document.getElementById('jsondata');
window.myIn=document.getElementById('jsonmyin');
    document.forms['formname'].submit();
}