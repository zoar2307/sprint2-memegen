'use strict'


function onGalleryClicked(elBtnA) {
    const elEditorPage = document.querySelector('.main-editor-page')
    const elGallery = document.querySelector('.main-gallery-page')
    const elGalleryHeader = document.querySelector('.gallery-header')
    const elLiA = document.querySelector('.main-nav-list li a.active')
    if (elLiA) {
        elLiA.classList.remove('active')
    }

    elEditorPage.classList.add('hidden')
    elGallery.classList.remove('hidden')
    elBtnA.classList.add('active')
    elGalleryHeader.classList.remove('hidden')
}


function onMemesClicked(elBtnA) {
    const elGallery = document.querySelector('.main-gallery-page')
    const elMemes = document.querySelector('.main-memes-page')
    const elGalleryHeader = document.querySelector('.gallery-header')
    const elLiA = document.querySelector('.main-nav-list li a.active')
    if (elLiA) {
        elLiA.classList.remove('active')
    }
    elGallery.classList.add('hidden')
    elBtnA.classList.add('active')
    elGalleryHeader.classList.add('hidden')
    elMemes.classList.remove('hidden')
}