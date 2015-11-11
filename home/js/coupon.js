function myInit() {window.nDetail = 0;window.count=0;
window.nOption = 0;
    ooo.render('coupon-form', 'select-category.xml', 'http://emporyou.com/api/get?k=50&output=xml', false, 'append')
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    document.getElementById('defaultOpt').addEventListener('change', handleFileSelecto, false);
    if(initialjdata.fromreaction){
        document.getElementById('product-title').value=initialjdata.title;
        document.getElementById('product-descrizione').value=initialjdata.description;
        document.getElementById('product-altreinfo').value=initialjdata.pageTitle;
        for(i=0;i<initialjdata.variants.length;i++){
            addOption();
            document.getElementById('optionName_'+i).value=initialjdata.variants[i].title;
            document.getElementById('pricename'+i).value=initialjdata.variants[i].price;
        }
    }
}

function clearContents(element) {
    element.value = '';
}

function addDetail() {
    var det = document.createElement('fieldset');
    var del = document.createElement('div');
    var ics = document.createTextNode('x');
    var key = document.createElement('textarea');
    var valu = document.createElement('textarea');
    det.setAttribute('class', 'new-detail');
    det.setAttribute('name', 'detail[]');
    del.setAttribute('class', 'delete-detail');
    del.setAttribute('onclick', 'var c=this.parentElement;c.parentNode.removeChild(c)')
    key.setAttribute('class', 'key detail');
    key.setAttribute('name', 'key');
    valu.setAttribute('class', 'value detail');
    valu.setAttribute('name', 'value');
    key.setAttribute('placeholder', 'Dettaglio..');
    valu.setAttribute('placeholder', 'Valore..');
    del.appendChild(ics);
    det.appendChild(del);
    det.appendChild(key);
    det.appendChild(valu);
    nDetail++;
    document.getElementById('details-cont').insertBefore(det, document.getElementById('details-cont').firstChild);
}

function addOption() {count++;
    var opt = document.createElement('fieldset');
    var del = document.createElement('div');
    var ics = document.createTextNode('x');
    var name = document.createElement('textarea');
    var price = document.createElement('textarea');
    opt.setAttribute('class', 'new-option');
    del.setAttribute('class', 'delete-option');
    del.setAttribute('onclick', 'var c=this.parentElement;c.parentNode.removeChild(c)')
    name.setAttribute('class', 'optionName detail');
    name.setAttribute('id','optionName_'+nOption)
    name.setAttribute('name', 'option');
    opt.setAttribute('name', 'option[]');
    price.setAttribute('class', 'priceName option');
    price.setAttribute('id','priceName_'+nOption);
    price.setAttribute('name', 'price');
    name.setAttribute('placeholder', 'Opzione..');
    price.setAttribute('placeholder', 'Prezzo..');
    del.appendChild(ics);
    opt.appendChild(del);
    opt.appendChild(name);
    opt.appendChild(price);
    var img = document.createElement('div');
    img.setAttribute('class', 'image-target-option transition-1');
    var inp = document.createElement('input');
    inp.setAttribute('type', 'file');
    inp.setAttribute('class', 'fileso');
    var hid = document.createElement('input');
    hid.setAttribute('type', 'hidden');
    hid.setAttribute('name', 'v_id');
    hid.setAttribute('value', count);
    var out = document.createElement('output');
    out.setAttribute('id', 'listo');
    img.appendChild(out);
    img.appendChild(hid);
    img.appendChild(inp);
    inp.addEventListener('change', handleFileSelecto, false);
    opt.appendChild(img);
    nOption++;
    document.getElementById('option-cont').insertBefore(opt, document.getElementById('option-cont').firstChild);
}

function sendCoupon() {
    var jsondata = JSON.stringify(ooo.form2JSON(document.getElementById('coupon-form')));
    document.getElementById('send-target').value = jsondata;
    document.getElementById('send-form').submit();
}

function handleFileSelect(evt) {
    count++;
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb main-image" id="main-image'+count+'" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
          evt.target.name="mainImage_"+count;
          evt.target.id="mainImage_"+count;
          var rr=ooo.ins('image-target','input',['type','file','id','files']);
          rr.addEventListener('change', handleFileSelect, false);
          ooo.move(evt.target,'send-form');
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
      
    }
  }

function handleFileSelecto(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
            var imgCont=evt.target.parentElement;
            imgCont.style.backgroundImage="url('"+e.target.result+"')";
          evt.target.name="varimg_"+evt.target.previousSibling.value;
          evt.target.id="varimg_"+evt.target.previousSibling.value;
          ooo.move(evt.target,'send-form');
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
      
    }
  }