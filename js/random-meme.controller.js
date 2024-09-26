'use strict'


function onRandomMemeClicked() {
    const elEditorPage = document.querySelector('.main-editor-page')
    const elGallery = document.querySelector('.main-gallery-page')
    const elLiA = document.querySelector('.main-nav-list li a.active')
    const elGalleryHeader = document.querySelector('.gallery-header')
    elEditorPage.classList.remove('hidden')
    elLiA.classList.remove('active')
    elGallery.classList.add('hidden')
    elGalleryHeader.classList.add('hidden')
    setRandomImg()
    renderMeme()
    resizeCanvas()
}