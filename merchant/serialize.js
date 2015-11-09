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
    o.fields=[];
    window.fld = uno.xml._add(f.getElementsByTagName('fieldset'));
    for(i=0;i<fld.length;i++){
        var inp=fld[i].getElementsByTagName('input');
        var t=fld[i].getElementsByTagName('textarea');
        var ob={};
        for(z=0;z<inp.length;z++){
            if(inp[z].name){var cc=inp[z].value;var ni=inp[z].name;ob.ni=cc;}
        }
        for(z=0;z<t.length;z++){
            if(t[z].name){var cc=t[z].value;var nt=t[z].name;ob.nt=cc;}
        }
        o.fields.push(ob);
        }
}
