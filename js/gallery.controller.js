'use strict'


function renderGallery() {
    const elImageGallery = document.querySelector('.main-gallery-page')
    const images = getImages(gQueryOptions)
    const strHtmls = images.map(img => `
            <img src="${img.url}" alt="" onclick="onImgSelected('${img.id}')">
         `)

    elImageGallery.innerHTML = strHtmls.join('')
}

function onSetFilterBy(value) {
    console.log(value)
    gQueryOptions.filterBy.keyword = value

    renderGallery()
}

function renderSearchOptions() {
    const elKeyWordList = document.querySelector('.key-words-list')
    const keywords = getKeyWords()
    const strHtmls = keywords.map(keyword => `
                            <option value="${keyword}">
     `)

    elKeyWordList.innerHTML = strHtmls.join('')

}


function onImgSelected(id) {
    const elEditorPage = document.querySelector('.main-editor-page')
    const elGallery = document.querySelector('.main-gallery-page')
    const elLiA = document.querySelector('.main-nav-list li a.active')
    const elGalleryHeader = document.querySelector('.gallery-header')
    elEditorPage.classList.remove('hidden')
    elLiA.classList.remove('active')
    elGallery.classList.add('hidden')
    elGalleryHeader.classList.add('hidden')
    setImg(id)
    renderMeme()
    resizeCanvas()
}