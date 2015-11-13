function myInit() {
    window.nDetail = 0;
    window.count = 0;
    window.nOption = 0;
    ooo.render('coupon-form', 'select-category.xml', 'http://emporyou.com/api/get?k=50&output=xml', false, 'append')
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    if(initialjdata){
	 if (!initialjdata.variants) {
        addOption(document.getElementById('options-voucher-container'),true, false,true);
        //TODO//document.getElementsByClassName('fileso')[0].addEventListener('change', handleFileSelecto, false);
    }
    if (initialjdata.fromreaction) {
        document.getElementById('product-title').value = initialjdata.title;
        document.getElementById('product-descrizione').value = initialjdata.description;
        document.getElementById('product-altreinfo').value = initialjdata.pageTitle;
        var span = document.createElement('span');
        span.innerHTML = '<img class="thumb main-image" id="main-image-created" src="' + initialjdata.image[0].url + '" title="mainImage"/>';
        document.getElementById('list').insertBefore(span, null);
        for (i = 0; i < initialjdata.variants.length; i++) {
            addOption(document.getElementId('options-voucher-container'),true, i == 0,i == 0);
            if (i == 0) {
                document.getElementById('image_0').style.backgroundImage = "url('" + initialjdata.image[0].url + "')"
            }
            if (initialjdata.variants[i].optionTitle) {
                document.getElementById('optionName_' + i).value = initialjdata.variants[i].optionTitle;
            } else {
                document.getElementById('optionName_' + i).value = initialjdata.variants[i].title;
            }
            document.getElementById('priceName_' + i).value = initialjdata.variants[i].price;

            //var opturl='optionurl'+i
            //document.getElementById('priceName_'+i).nextSibling.style.backgroundImage="url('"+initialjdata.image[0].opturl+"')"


        }
        for (i = 0; i < initialjdata.metafields.length; i++) {
            addDetail();
            document.getElementById('key_' + i).value = initialjdata.metafields[i].key;
            document.getElementById('value_' + i).value = initialjdata.metafields[i].value;
        }
        for (y = 0; y < initialjdata.image.length; y++) {
            if (initialjdata.image[y].optNum) {
                document.getElementById('priceName_' + initialjdata.image[y].optNum).nextSibling.style.backgroundImage = "url('" + initialjdata.image[y].url + "')"
            }
        }
    }
}else{addOption(document.getElementId('options-voucher-container'),true, false,true);}}

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
    key.setAttribute('id', 'key_' + nDetail);
    key.setAttribute('name', 'key');
    valu.setAttribute('class', 'value detail');
    valu.setAttribute('name', 'value');
    valu.setAttribute('id', 'value_' + nDetail);
    key.setAttribute('placeholder', 'Dettaglio..');
    valu.setAttribute('placeholder', 'Valore..');
    del.appendChild(ics);
    det.appendChild(del);
    det.appendChild(key);
    det.appendChild(valu);
    nDetail++;
    document.getElementById('details-cont').insertBefore(det, document.getElementById('details-cont').firstChild);
}

function oldOption(allowChange, hideX,isMain) {
    count++;
    var opt = document.createElement('fieldset');
    var del = document.createElement('div');
    var ics = document.createTextNode('x');
    var qta = document.createElement('textarea');
    del.appendChild(ics)
    var name = document.createElement('textarea');
    var price = document.createElement('textarea');
    opt.setAttribute('class', 'new-option');
    del.setAttribute('class', 'delete-option');
    del.setAttribute('onclick', 'var c=this.parentElement;c.parentNode.removeChild(c)')
    name.setAttribute('class', 'optionName detail');
    name.setAttribute('id', 'optionName_' + nOption)
    name.setAttribute('name', 'option');
    qta.setAttribute('class', 'qtaName detail');
    qta.setAttribute('id', 'qtaName_' + nOption)
    qta.setAttribute('name', 'quantity');
    opt.setAttribute('name', 'option[]');
    price.setAttribute('class', 'priceName option');
    price.setAttribute('id', 'priceName_' + nOption);
    price.setAttribute('name', 'price');
    name.setAttribute('placeholder', 'Opzione..');
    price.setAttribute('placeholder', 'Prezzo..');
    qta.setAttribute('placeholder', 'Qty..');
    if (!hideX) {
        opt.appendChild(del);
    }
    if(isMain==true){
        var mainInp=document.createElement('input');
        mainInp.setAttribute('name','isMain');
        mainInp.setAttribute('value',true);
        mainInp.setAttribute('type','hidden');
        opt.appendChild(mainInp);
    }
    opt.appendChild(name);
    opt.appendChild(qta);
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
    img.setAttribute('id', 'image_' + nOption);
    if (allowChange) {
        img.appendChild(inp);
        inp.addEventListener('change', handleFileSelecto, false);
    }
    opt.appendChild(img);
    nOption++;
    document.getElementById('option-cont').insertBefore(opt, document.getElementById('option-cont').firstChild);
}

function sendCoupon(preview,detailsview) {
    var myJSON = ooo.form2JSON(document.getElementById('coupon-form'));
	 if(initialjdata){if(initialjdata.image){
    for (var p = 0; p < initialjdata.image.length; p++) {
        var pname = initialjdata.image[p].name;
        if (pname == 'mainExternal') {
            for (var xx = 0; xx < initialjdata.variants.length; xx++) {
                if (initialjdata.variants[xx].isMain == true) {
                    for(ii=0;ii<myJSON.variants.length;ii++){
                        if(myJSON.variants[ii].isMain==true){
                        myJSON.variants[xx].image = initialjdata.image[p].url;
                        }
                    }

                }
            }
        } else {
            for (var ww = 0; ww < initialjdata.variants.length; ww++) {
                if (myJSON.variants[ww].option == initialjdata.image[p].name) {
                    myJSON.variants[ww].image = initialjdata.image[p].url;
                }
            }
        }

    }

    myJSON.images = initialjdata.image;
	 }}
    var jsondata = JSON.stringify(myJSON);
	 if(preview){
		 if(detailsview){myJSON.PREVIEWdetails=true; jsondata = JSON.stringify(myJSON);}
		 var f=ooo.ins(document.body,'form',['enctype','multipart/form-data','method','post','target','_blank','action','http://emporyou.com/metaframe?page=home/index.html']);
		 var i=ooo.ins(f,'textarea',['name','jdata'],jsondata);setTimeout(function(){f.submit();},100);
	 }else{
		 document.getElementById('send-target').value = jsondata;
			document.getElementById('send-form').submit();
	 }
    
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
        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                document.getElementById('files').style.backgroundImage="url('"+e.target.result+"')";
                //var span = document.createElement('span');
                evt.target.name = "mainImage_" + count;
                evt.target.id = "mainImage_" + count;
                
                //document.getElementById('list').insertBefore(span, null);
                var rr = ooo.ins('image-target', 'input', ['type', 'file', 'id', 'files']);
                rr.addEventListener('change', handleFileSelect, false);
                ooo.move(evt.target, 'send-form');
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
        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                var imgCont = evt.target.parentElement;
                imgCont.style.backgroundImage = "url('" + e.target.result + "')";
                evt.target.name = "varimg_" + evt.target.previousSibling.value;
                evt.target.id = "varimg_" + evt.target.previousSibling.value;
                ooo.move(evt.target, 'send-form');
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);

    }
}

function removeThis(n) {
    n.parentNode.removeChild(n);
}

function addOption(v,allowChange, hideX,isMain){

var FLD=ooo.ins(v.parentElement,'fieldset',['class','nuovaOpzione'],false,v);
var OC=ooo.ins(FLD,'div',['class','voucher-option-container']);
    ooo.ins(FLD,'div',['class','ics-voucher','onclick','removeThis(this.parentElement.parentElement.nextSibling);removeThis(this.parentElement);'],'x');
var TRI=ooo.ins(OC,'div',['class','tri39']);
	ooo.ins(TRI,'textarea',['class','opt-name inv-text','placeholder','Nome opzione..','name','option']);
	ooo.ins(TRI,'div',['class','opt-img','style','background-image:url("../home/img/coperta.jpg")']);
var TRI=ooo.ins(OC,'div',['class','tri25']);
	ooo.ins(TRI,'textarea',['class','value-opt-voucher inv-text','placeholder','Valore..','name','valore']);
	ooo.ins(TRI,'textarea',['class','qta-opt-voucher inv-text','placeholder','Quantità..','name','quantity']);
var TRI=ooo.ins(OC,'div',['class','tri33']);
	ooo.ins(TRI,'textarea',['class','prezzo-finale-opzione inv-text','readonly','readonly','name','price'],'0,00€');
    ooo.ins(FLD,'div',['class','divider-voucher']);


}
function newDetail(v){

var FLD=ooo.ins('details-voucher-container','fieldset',['class','nuovoDettaglio'],false,v);
var TRI=ooo.ins(FLD,'div',['class','tri100']);
	ooo.ins(TRI,'textarea',['class','dettaglio-det-voucher inv-text','placeholder','Dettaglio..','name','key']);
	ooo.ins(TRI,'textarea',['class','value-det-voucher inv-text','placeholder','Attributo..','name','value']);
    ooo.ins(FLD,'div',['class','divider-voucher']);

/*<fieldset class="nuovoDettaglio"><div class="divider-voucher"></div><div class="tri100"><textarea class="dettaglio-det-voucher inv-text" placeholder="Dettaglio.."></textarea><textarea class="value-det-voucher inv-text" placeholder="Attributo.."></textarea>
         </div></fieldset><div class="divider-voucher"></div>*/
}
