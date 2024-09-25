'use strict'


function renderGallery() {
    renderGallery()
}

function renderGallery() {
    const elImageGallery = document.querySelector('.main-gallery-page')
    const images = getImages()
    const strHtmls = images.map(img => `
            <img src="${img.url}" alt="" onclick="onImgSelected('${img.id}')">
         `)

    elImageGallery.innerHTML = strHtmls.join('')
}

function onImgSelected(id) {
    const elEditorPage = document.querySelector('.main-editor-page')
    const elGallery = document.querySelector('.main-gallery-page')
    const elGalleryHeader = document.querySelector('.gallery-header')
    elEditorPage.classList.remove('hidden')
    elGallery.classList.add('hidden')
    elGalleryHeader.classList.add('hidden')
    setImg(id)
    renderMeme()
    resizeCanvas()
}