if(!window.ooo)window.ooo = {};
ooo.form2JSON = function (f) {
    var o = {};
    if (f.getElementsByTagName('fieldset')[0]) {
        var fld = f.getElementsByTagName('fieldset');
        var isArr;var isNotArr;
        window.arrFld = [];
        for (i = 0; i < fld.length; i++) {
            var idd = fld[i].name;
            if (idd.indexOf('[]') > -1) {
                isArr = true;
                arrFld.push(fld[i]);
            }else{isNotArr=true;}
        };
        if (isArr != true || isNotArr==true) {
            for (i = 0; i < fld.length; i++) {
                var fldName = fld[i].name;
                var fldObj = {};
                var inp = fld[i].getElementsByTagName('input');
                var t = fld[i].getElementsByTagName('textarea');
                var s = f.getElementsByTagName('select');
                if(inp.length>0){for (z = 0; z < inp.length; z++) {
                    var b = inp[z].name;
                    var c = inp[z].value
                    fldObj[b] = c;
                }}
                if(t.length>0){for (z = 0; z < t.length; z++) {
                    var b = t[z].name;
                    var c = t[z].value
                    fldObj[b] = c;
                }}
                if(s.length>0){for (z = 0; z < s.length; z++) {
                        var b = s[z].name;
                        var c = s[z].value
                        fldObj[b] = c;
                    }}
                o[fldName] = fldObj
            }
        };if(isArr == true){
            for (i = 0; i < arrFld.length; i++) {
                var arrName = arrFld[i].name;
                var af = arrFld[i].getElementsByTagName('fieldset');
                for (r = 0; r < af.length; r++) {
                    var fldName = af[r].name;
                    var arrObj = {};
                    var inp = af[r].getElementsByTagName('input');
                    var t = af[r].getElementsByTagName('textarea');
                    var s = f.getElementsByTagName('select');
                    if(inp.length>0){for (z = 0; z < inp.length; z++) {
                        var b = inp[z].name;
                        var c = inp[z].value
                        arrObj[b] = c;
                    }}
                    if(s.length>0){for (z = 0; z < s.length; z++) {
                        var b = s[z].name;
                        var c = s[z].value
                        arrObj[b] = c;
                    }}
                    if(t.length>0){for (z = 0; z < t.length; z++) {
                        var b = t[z].name;
                        var c = t[z].value
                        arrObj[b] = c;
                    }}
                    o[arrName] = [];
                    o[arrName].push(arrObj);
                }
            }
        }
    } else {
        var t = f.getElementsByTagName('textarea');
        var i = f.getElementsByTagName('input');
        var s = f.getElementsByTagName('select');
        var g = function (a) {
            for (var i = 0; i < a.length; i++) {
                var v = a[i];
                if (v != null) {
                    var b = a[i].name;
                    var c = a[i].value;
                    o[b] = c;
                }
            }
        }
        g(t);
        g(i);
    }
    return o;
}
