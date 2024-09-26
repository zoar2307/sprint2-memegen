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




function renderSavedGallery() {
    const elSaveMemesPage = document.querySelector('.main-saved-page')
    const memes = getSavedMemes()
    console.log(memes)
    const strHtmls = memes.map(m =>
        `
            <img onclick="onSetSavedMeme(...${m.meme.lines} , '${m.meme.selectedImgId}')" src="${m.url}" alt="" onclick="onImgSelected('${m.meme.id}')">
         `)

    elSaveMemesPage.innerHTML = strHtmls.join('')
}

function onSetSavedMeme({ meme }, id) {
    const elEditorPage = document.querySelector('.main-editor-page')
    const elGallery = document.querySelector('.main-gallery-page')
    const elLiA = document.querySelector('.main-nav-list li a.active')
    const elGalleryHeader = document.querySelector('.gallery-header')
    elEditorPage.classList.remove('hidden')
    elLiA.classList.remove('active')
    elGallery.classList.add('hidden')
    elGalleryHeader.classList.add('hidden')
    setSavedImg(meme, id)

    renderMeme()
    resizeCanvas()
}

function onSetFilterBy(value) {
    console.log(value)
    gQueryOptions.filterBy.keyword = value

}


function renderSearchOptions() {
    const elKeyWordList = document.querySelector('.key-words')
    const keywords = getKeyWords()
    const selectedKeyWords = keywords.slice(0, 5)
    let strHtmls = selectedKeyWords.map(keyword => `
                <div style="font-size:${10 + (keyword[1] + 1) * 2 >= 22 ? 22 : 10 + (keyword[1] + 1) * 2}px ;cursor:pointer;" class="word"
                onclick="onKeyClicked('${keyword[0]}')">
                ${keyword[0]}
                </div>
     `)

    elKeyWordList.innerHTML = strHtmls.join('')

}

function onKeyClicked(key) {
    updateFilterBy(key)
    updateKeyWordsCount(key)
    renderGallery()
    renderSearchOptions()

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