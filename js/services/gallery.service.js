'use strict'

var gImgs = []


const gQueryOptions = {
    filterBy: { keyword: '' },
}


function _filterImages(filterBy) {
    var images = gImgs.slice()

    // Filter
    if (filterBy.keyword) {
        const regex = new RegExp(filterBy.keyword, 'i')
    }

    return images
}


function getImages(options = {}) {
    const filterBy = options.filterBy
    return _filterImages(filterBy)
}

