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
function openDataUser(eid){
    var conData=document.getElementsByClassName('con-data');
    for(var i=0;i<conData.length;i++){
        conData[i].setAttribute('style','display:none;width:0%')
    }
    document.getElementById('con-dati').setAttribute('style','left:0');
    document.getElementById('con-'+eid).setAttribute('style','display:block;width:70%');
}
function userselect(e){
        var allfie=document.getElementsByClassName('user-page-field');
        for(var i=0;i<allfie.length;i++){
            allfie[i].classList.remove('selectedfield')
        }
        e.classList.toggle('selectedfield');
    }
    function openUserContent(eid){
        var allcon=document.getElementsByClassName('content-target-user');
        for(var i=0;i<allcon.length;i++){
            if(allcon[i].classList.contains('hidden')){}else{allcon[i].classList.add('hidden')}};
        document.getElementById('con-'+eid).classList.toggle('hidden');
        
    }
function dataselect(e){
    if(e.className=='new-data-user selecteddata'){
        e.classList.toggle('selecteddata');
        var conData=document.getElementsByClassName('con-data');
    for(var i=0;i<conData.length;i++){
        conData[i].setAttribute('style','display:none;width:0%')
    }
    document.getElementById('con-dati').setAttribute('style','left:20%');
    }else{
        var allfie=document.getElementsByClassName('new-data-user');
        for(var i=0;i<allfie.length;i++){
            allfie[i].classList.remove('selecteddata')
        }
        e.classList.toggle('selecteddata');
        var conData=document.getElementsByClassName('con-data');
    for(var i=0;i<conData.length;i++){
        conData[i].setAttribute('style','display:none;width:0%')
    }
    document.getElementById('con-dati').setAttribute('style','left:0');
    document.getElementById('con-'+e.id).setAttribute('style','display:block;width:70%');
    }}
    function openUserContent(eid){
        var allcon=document.getElementsByClassName('content-target-user');
        for(var i=0;i<allcon.length;i++){
            if(allcon[i].classList.contains('hidden')){}else{allcon[i].classList.add('hidden')}};
        document.getElementById('con-'+eid).classList.toggle('hidden');
        
    }