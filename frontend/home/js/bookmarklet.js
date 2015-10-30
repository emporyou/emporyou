var myForm=document.createElement('form');
var myInput=document.createElement('input');
myInput.setAttribute('type','hidden');
myInput.setAttribute('id','jsondata');
myInput.setAttribute('name','jsondata')
myInput.setAttribute('value','JSON.stringify(selectedProduct())');
myForm.setAttribute('action','http://emporyou.com/metaframe?page=vendor/product-edit.xml');
myForm.setAttribute('method','post');
myForm.setAttribute('target','_blank');
myForm.setAttribute('enctype','multipart/form-data');
myForm.style.display="none";
myForm.appendChild(myInput);
document.body.appendChild(myForm);
myForm.submit();


