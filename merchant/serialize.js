window.uno = {};
uno.xml = {};
uno.xml.test = function (f) {
    window.o = {};
    if (f.getElementsByTagName('fieldset')[0]) {
        var fld = f.getElementsByTagName('fieldset');
        var isArr;
        window.arrFld = [];
        for (i = 0; i < fld.length; i++) {
            var idd = fld[i].id;
            if (idd.indexOf('[]') > -1) {
                isArr = true;
                console.log('is array');
                arrFld.push(fld[i])
            }
        }
        if (isArr != true) {
            for (i = 0; i < fld.length; i++) {
                var fldName = fld[i].name;
                var fldObj = {};
                var inp = fld[i].getElementsByTagName('input');
                var t = fld[i].getElementsByTagName('textarea');
                for (z = 0; z < inp.length; z++) {
                    var b = inp[z].name;
                    var c = inp[z].value
                    fldObj[b] = c;
                }
                for (z = 0; z < t.length; z++) {
                    var b = t[z].name;
                    var c = t[z].value
                    fldObj[b] = c;
                }
                o[fldName] = fldObj
            }
        } else {
            for (i = 0; i < arrFld.length; i++) {
                var arrName = arrFld[i].name;
                var af = arrFld[i].getElementsByTagName('fieldset');
                for (i = 0; i < af.length; i++) {
                    var fldName = af[i].name;
                    var arrObj = {};
                    var inp = af[i].getElementsByTagName('input');
                    var t = af[i].getElementsByTagName('textarea');
                    for (z = 0; z < inp.length; z++) {
                        var b = inp[z].name;
                        var c = inp[z].value
                        arrObj[b] = c;
                    }
                    for (z = 0; z < t.length; z++) {
                        var b = t[z].name;
                        var c = t[z].value
                        arrObj[b] = c;
                    }
                    if (!o[arrName]) {
                        o[arrName] = []
                    }
                    o[arrName].push(arrObj);
                }

            }
        }
    } else {
        var t = f.getElementsByTagName('textarea');
        var i = f.getElementsByTagName('input');
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
}