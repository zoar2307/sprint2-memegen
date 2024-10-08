'use strict'


function renderGallery() {
    const elImageGallery = document.querySelector('.main-gallery-page')
    const images = getImages(gQueryOptions)
    const strHtmls = images.map((img, idx) => `
         
            <img src="${img.url}" alt="" onclick="onImgSelected('${img.id}' )"></img>
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
    const strHtmls = memes.map(m =>
        `   

            <div>
            <img onclick="onSetSavedMeme('${m.id}' , '${m.meme.selectedImgId}')" src="${m.url}" alt="">
            <button onclick="onDeleteSavedMeme('${m.id}')" class="delete-btn">Delete</button>
            </div>
         `)

    elSaveMemesPage.innerHTML = strHtmls.join('')
}

function onSetSavedMeme(memeID, imgId) {
    const elEditorPage = document.querySelector('.main-editor-page')
    const elSavedGallery = document.querySelector('.main-saved-page')
    const elLiA = document.querySelector('.main-nav-list li a.active')
    const elGalleryHeader = document.querySelector('.gallery-header')
    const elMoreKeywordsContainer = document.querySelector('.more-keywords-container')

    elMoreKeywordsContainer.classList.add('close')
    elEditorPage.classList.remove('hidden')
    elLiA.classList.remove('active')
    elGalleryHeader.classList.add('hidden')
    elSavedGallery.classList.add('hidden')
    setSavedImg(memeID, imgId)

    renderMeme()
    resizeCanvas()
}

function onSetFilterBy(value) {
    console.log(value)
    gQueryOptions.filterBy.keyword = value

}

function onDeleteSavedMeme(id) {
    deleteSavedMeme(id)
    renderSavedGallery()
}


function renderSearchOptions() {
    const elKeyWordList = document.querySelector('.key-words')
    const keywords = getKeyWords()
    const selectedKeyWords = keywords.slice(0, 5)
    let strHtmls = selectedKeyWords.map(keyword => `
                <div style="font-size:${10 + (keyword[1] + 1) * 1 >= 32 ? 32 : 10 + (keyword[1] + 1) * 1}px ;cursor:pointer;" class="word"
                onclick="onKeyClicked('${keyword[0]}')">
                ${keyword[0]}
                </div>
     `)

    elKeyWordList.innerHTML = strHtmls.join('')

}

function renderInputOptions() {
    const elKeyWordList = document.querySelector('datalist')
    const keywords = getKeyWords()
    const selectedKeyWords = keywords.slice(0, keywords.length)
    let strHtmls = selectedKeyWords.map(keyword => `
                                        <option value="${keyword[0]}">
     `)

    elKeyWordList.innerHTML = strHtmls.join('')
}
function onKeyClicked(key) {
    const elFilter = document.querySelector('.filter-input')
    elFilter.value = key
    updateFilterBy(key)
    updateKeyWordsCount(key)
    renderGallery()
    renderSearchOptions()
    renderMoreSearchOptions()

}


function renderMoreSearchOptions() {
    const elMoreKeywordssFilter = document.querySelector('.more-keywords')
    const keywords = getKeyWords()
    const selectedKeyWords = keywords.slice(5, keywords.length)
    let strHtmls = selectedKeyWords.map(keyword => `
                <div style="font-size:${10 + (keyword[1] + 1) * 1 >= 32 ? 32 : 10 + (keyword[1] + 1) * 1}px ;cursor:pointer;" class="word"
                onclick="onKeyClicked('${keyword[0]}')">
                ${keyword[0]}
                </div>
     `)
    elMoreKeywordssFilter.innerHTML = strHtmls.join('')

}

function onFilterInput(key) {
    updateFilterBy(key)
    updateKeyWordsCount(key)
    renderGallery()
}

function onClearInput() {
    const elFilterInput = document.querySelector('.filter-input')
    elFilterInput.value = ''
    updateFilterBy('')
    renderGallery()

}


function onImgSelected(id) {

    const elEditorPage = document.querySelector('.main-editor-page')
    const elGallery = document.querySelector('.main-gallery-page')
    const elLiA = document.querySelector('.main-nav-list li a.active')
    const elGalleryHeader = document.querySelector('.gallery-header')
    const elMoreKeywordsContainer = document.querySelector('.more-keywords-container')

    elMoreKeywordsContainer.classList.add('close')
    elEditorPage.classList.remove('hidden')
    elLiA.classList.remove('active')
    elGallery.classList.add('hidden')
    elGalleryHeader.classList.add('hidden')
    setImg(id)
    renderMeme()
    resizeCanvas()
}


function onMoreKeywords(elMoreText) {
    const elMoreKeywordsContainer = document.querySelector('.more-keywords-container')
    elMoreKeywordsContainer.classList.toggle('close')

    if (!elMoreKeywordsContainer.classList.contains('close')) {
        elMoreText.innerText = 'less'
    } else {
        elMoreText.innerText = 'more'
    }

}


