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

function updateFilterBy(key) {
    gQueryOptions.filterBy.keyword = key
}

function getImages(options = {}) {
    const filterBy = options.filterBy
    return _filterImages(filterBy)
}

