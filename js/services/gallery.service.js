'use strict'

var gImgs = []


const gQueryOptions = {
    filterBy: { keyword: '' },
}


function _filterImages(filterBy) {
    let images = gImgs.slice()

    console.log(gQueryOptions.filterBy.keyword)
    // Filter
    if (filterBy.keyword) {
        images = images.filter(img => img.keywords.some(keyword => keyword === gQueryOptions.filterBy.keyword))
    }
    console.log(images)
    return images
}

function deleteSavedMeme(id) {
    const idx = gSaveMemes.findIndex(meme => meme.id === id)
    gSaveMemes.splice(idx, 1)
    _saveMemes()
}

function updateFilterBy(key) {
    gQueryOptions.filterBy.keyword = key
}

function getImages(options = {}) {
    const filterBy = options.filterBy
    return _filterImages(filterBy)
}

function getSavedMemes() {
    return gSaveMemes
}
function getSavedMemesById(id) {
    return gSaveMemes.find(meme => meme.id === id)
}
