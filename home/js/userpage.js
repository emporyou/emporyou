function showContent(v){
    var st=document.getElementsByClassName('info-step-cont');
    var stct=document.getElementsByClassName('step-container');
    for(var i=0;i<st.length;i++){
        st[i].setAttribute('style','display:none;');
        if(stct[i].id){stct[i].removeAttribute('id')}
    }
    if(!v.id){
    v.getElementsByTagName('div')[0].setAttribute('style','display:block;');
        v.id='opened';
    }else{
     v.getElementsByTagName('div')[0].setAttribute('style','display:none;');
        v.removeAttribute('id');
    }
}