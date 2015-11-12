var descOpened=false;
function openDesc(){
    if(descOpened==false){
        document.getElementById('main-desc-container').classList.remove('height200');descOpened=true;
        document.getElementById('layer-desc').style.opacity='0'
    }else{
        document.getElementById('main-desc-container').classList.add('height200');descOpened=false;
        document.getElementById('layer-desc').style.opacity='1'
    }
}
