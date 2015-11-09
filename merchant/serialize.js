window.uno={};
uno.xml={};
uno.xml._add = function (a) {
    var n = [];
    for (var i = 0; i < a.length; i++) {
        var v = a[i];
        if (v != null) {
            n.push(v);
        }
    }
    return n;
};

uno.xml.test = function (f){
    window.o={};
    var i = uno.xml._add(f.getElementsByTagName('input'));console.log(i);
    var fld = uno.xml._add(f.getElementsByTagName('fieldset'));console.log(fld);
    o.field=fld;
}
