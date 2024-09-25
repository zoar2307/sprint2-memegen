'use strict'


function renderGallery() {
    renderGallery()
}

function renderGallery() {
    const elImageGallery = document.querySelector('.image-gallery')
    const images = getImages()
    const strHtmls = images.map(img => `
            <img src="${img.url}" alt="" onclick="onImgSelected('${img.id}')">
         `)

    elImageGallery.innerHTML = strHtmls.join('')
}

function onImgSelected(id) {
    setImg(id)
    renderMeme()
}