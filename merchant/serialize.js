if(!window.ooo)window.ooo = {};var gTag=function(v){return document.getElementsByTagName(v);}
ooo.form2JSON = function (f) {
    var o = {};
    if (f.gTag('fieldset')[0]) {
        var fld = f.gTag('fieldset');
        var isArr;var isNotArr;
        window.arrFld = [];
        for (i = 0; i < fld.length; i++) {
            var idd = fld[i].name;
            if (idd.indexOf('[]') > -1) {
                isArr = true;
                arrFld.push(fld[i]);console.log(arrFld);
            }else{isNotArr=true;}
        };
        if (isArr != true || isNotArr==true){
            for (i = 0; i < fld.length; i++) {
                var fldName = fld[i].name;
                var fldObj = {};
                var inp = fld[i].gTag('input');
                var t = fld[i].gTag('textarea');
                var s = fld[i].gTag('select');
                if(inp.length>0){for (z = 0; z < inp.length; z++) {
                    inp[z].setAttribute('id','ifi')
                    var b = inp[z].name;
                    var c = inp[z].value;
                    if(inp[z].type!='file'&&inp[z].value&&inp[z].name){fldObj[b] = c;}
                }}
                if(t.length>0){for (z = 0; z < t.length; z++) {
                    t[z].setAttribute('id','ifi');
                    var b = t[z].name;
                    var c = t[z].value;
                    if(t[z].name!=''&&t[z].name){fldObj[b] = c;}
                }}
                if(s.length>0){for (z = 0; z < s.length; z++) {
                        s[z].setAttribute('id','ifi')
                        var b = s[z].name;
                        var c = s[z].value;
                        if(s[z].name!=''&&s[z].name){fldObj[b] = c;}
                    }}
                o[fldName] = fldObj
            }
        };if(isArr == true){
            for (i = 0; i < arrFld.length; i++){
                var arrName = arrFld[i].name.replace('[]','');
                var af = arrFld[i].gTag('fieldset');
                for (r = 0; r < af.length; r++){
                    var fldName = af[r].name;
                    var arrObj = {};
                    var inp = af[r].gTag('input');
                    var t = af[r].gTag('textarea');
                    var s = af[r].gTag('select');
                    if(inp.length>0){for (z = 0; z < inp.length; z++) {
                        inp[z].setAttribute('id','ifi');
                        var b = inp[z].name;
                        var c = inp[z].value;
                        if(inp[z].type!='file'&&inp[z].value&&inp[z].name&&inp[z].name!=''){arrObj[b] = c;}
                    }}
                    if(s.length>0){for (z = 0; z < s.length; z++) {
                        s[z].setAttribute('id','ifi');
                        var b = s[z].name;
                        var c = s[z].value;
                        if(s[z].name!=''&&s[z].name){arrObj[b] = c;}
                    }}
                    if(t.length>0){for (z = 0; z < t.length; z++) {
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
        var g = function (a) {
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
