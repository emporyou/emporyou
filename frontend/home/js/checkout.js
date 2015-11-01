function stepCheckout(elm){
    for(i=0;i<5;i++){
        document.getElementsByClassName('left-square')[i].classList.remove('open');
        document.getElementsByClassName('left-square')[i].classList.remove('closed');
        document.getElementsByClassName('left-square')[i].classList.add('closed');
        document.getElementsByClassName('single-container')[i].setAttribute('style','display:none');
    }
    elm.classList.add('open');
    document.getElementsByClassName('menu-opened')[0].classList.add('menu-closed');
    document.getElementsByClassName('menu-opened')[0].classList.remove('menu-opened');
    elm.firstElementChild.setAttribute('style','');
    elm.parentElement.classList.remove('menu-closed');
    elm.parentElement.classList.add('menu-opened');
}