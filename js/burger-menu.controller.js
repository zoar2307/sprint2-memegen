'use strict'

function onBurgerMenu(elBurger) {
    const elNav = document.querySelector('.main-nav')
    elNav.classList.toggle('open')
    elBurger.classList.toggle('change')
}