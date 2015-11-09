window.uno={};
uno.xml={};
uno.xml._collect = function (a, f) {
    var n = [];
    for (var i = 0; i < a.length; i++) {
        var v = f(a[i]);
        if (v != null) {
            n.push(v);
        }
    }
    return n;
};
uno.xml._serialize = function (f) {
    var g = function (n) {
        return f.getElementsByTagName(n)
    };
    var nv = function (e) {
        if (e.name) return encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value);
        else return ''
    };
    var c1 = function (i) {
        if ((i.type != 'radio' && i.type != 'checkbox') || i.checked) return nv(i)
    };
    var i = uno.xml._collect(g('input'), c1);
    var s = uno.xml._collect(g('select'), nv);
    var t = uno.xml._collect(g('textarea'), nv);
    return i.concat(s).concat(t).join('&');
};

uno.xml._serialize(document.getElementById('coupon-form'))