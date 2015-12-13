var descOpened=false;
function openDesc(eid){
    if(descOpened==false){
        eid.parentElement.classList.remove('height200');descOpened=true;
        eid.style.display='none'
    }else{
        eid.parentElement.classList.add('height200');descOpened=false;
        eid.style.display='block'
    }
}
