if(!window.ooo)window.ooo = {};
ooo.form2JSON = function (f) {
    var o = {};/*Create object*/
    if (f.getElementsByTagName('fieldset')[0]) {
        var fld = f.getElementsByTagName('fieldset');
        var isArr;var isNotArr;var outSideArr;
        window.arrFld = [];/*Create array of fieldset*/
        for (var i = 0; i < fld.length; i++) {/*Cycling fieldset*/
            var idd = fld[i].name;
            if (idd.indexOf('[]') > -1) {/*If fieldset has [] in name*/
                isArr = true;/*Fieldset is an array*/
                arrFld.push(fld[i]);console.log(arrFld);/*Store the fieldset in the array*/
            }else if(idd.indexOf('{}') > -1){/*If fieldset has {} in name*/
                outSideArr=true/*Solitary fieldsets exist*/}else{
                    isNotArr=true;/*No fieldsets*/}
        };
        if (isArr != true && isNotArr==true){/*If arrays don't exist*/
            for (var i = 0; i < fld.length; i++) {/*Cycling fieldset*/
                var fldName = fld[i].name;
                var fldObj = {};/*Creating fieldset object*/
                var inp = fld[i].getElementsByTagName('input');
                var t = fld[i].getElementsByTagName('textarea');
                var s = fld[i].getElementsByTagName('select');
                if(inp.length>0){for (var z = 0; z < inp.length; z++) {/*Cycling inputs*/
                    inp[z].setAttribute('id','ifi')
                    var b = inp[z].name;
                    var c = inp[z].value;
                    if(inp[z].type!='file'&&inp[z].value&&inp[z].name){fldObj[b] = c;}
                }}
                if(t.length>0){for (var z = 0; z < t.length; z++) {/*Cycling textareas*/
                    t[z].setAttribute('id','ifi');
                    var b = t[z].name;
                    var c = t[z].value;
                    if(t[z].name!=''&&t[z].name){fldObj[b] = c;}
                }}
                if(s.length>0){for (var z = 0; z < s.length; z++) {/*Cycling selects*/
                        s[z].setAttribute('id','ifi')
                        var b = s[z].name;
                        var c = s[z].value;
                        if(s[z].name!=''&&s[z].name){fldObj[b] = c;}
                    }}
                o[fldName] = fldObj
            }
        };if(isArr == true){/*If fieldset array exists*/
            for (var i = 0; i < arrFld.length; i++){/*Cycling fieldset*/
                var arrName = arrFld[i].name.replace('[]','');/*Replacing [] in fieldset name*/
                var af = arrFld[i].getElementsByTagName('fieldset');
                for (var r = 0; r < af.length; r++){
                    var fldName = af[r].name;
                    var arrObj = {};
                    var inp = af[r].getElementsByTagName('input');
                    var t = af[r].getElementsByTagName('textarea');
                    var s = af[r].getElementsByTagName('select');
                    if(inp.length>0){for (var z = 0; z < inp.length; z++) {/*Cycling inputs*/
                        inp[z].setAttribute('id','ifi');
                        var b = inp[z].name;
                        var c = inp[z].value;
                        if(inp[z].type!='file'&&inp[z].value&&inp[z].name&&inp[z].name!=''){arrObj[b] = c;}
                    }}
                    if(s.length>0){for (var z = 0; z < s.length; z++) {/*Cycling selects*/
                        s[z].setAttribute('id','ifi');
                        var b = s[z].name;
                        var c = s[z].value;
                        if(s[z].name!=''&&s[z].name){arrObj[b] = c;}
                    }}
                    if(t.length>0){for (var z = 0; z < t.length; z++) {/*Cycling textareas*/
                        t[z].setAttribute('id','ifi');
                        var b = t[z].name;
                        var c = t[z].value;
                        if(t[z].name!=''&&t[z].name){arrObj[b] = c;}
                    }}
                    if(!o[arrName]){o[arrName] = [];}
                    o[arrName].push(arrObj);
                }
            }
        }
    } 
        var t = f.getElementsByTagName('textarea');
        var i = f.getElementsByTagName('input');
        var s = f.getElementsByTagName('select');
        var g = function (a) {/*Add all the field outside the arrays*/
            for (var i = 0; i < a.length; i++){
                if(a[i].type!='file'){
                var idifi=a[i].id
                if(idifi.indexOf('ifi') == -1){
                var v = a[i];
                if (v != null) {
                    if(a[i].name!=''||!a[i].name){
                    var b = a[i].name;
                    var c = a[i].value;
                    o[b] = c;
                    a[i].setAttribute('id','');}}
                }
            }}
        }
        g(t);
        g(i);
        g(s);
    
    return o;
}
