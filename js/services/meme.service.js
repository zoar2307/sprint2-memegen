'use strict'

const SAVE_MEME = 'save_memes'

var gId = 0
var gSaveMemes

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [

    ]


}

var sentences = [
    'NICE TRY,MOM',
    'It\'s Friday...',
    'HERE WE GO AGAIN',
]

_createMemes()
_loadSaveMemes()
var gKeywordSearchCountMap = genKeyWordMap()
var gKeywordSearchCountMapArray = Object.keys(gKeywordSearchCountMap).map((key) => [key, gKeywordSearchCountMap[key]])

function getKeyWords() {
    gKeywordSearchCountMapArray = Object.keys(gKeywordSearchCountMap).map((key) => [key, gKeywordSearchCountMap[key]])
    const selectedKeyWords = gKeywordSearchCountMapArray.splice(0, gKeywordSearchCountMapArray.length)
    return selectedKeyWords
}

function updateKeyWordsCount(key) {
    gKeywordSearchCountMap[key]++
}

function genKeyWordMap() {
    let keywords = []
    gImgs.forEach(img => {
        img.keywords.map(key => {
            keywords.push(key)
        })
    })
    const keywordsMap = keywords.reduce((acc, key) => {
        if (!acc[key]) acc[key] = 0
        acc[key] = 0
        return acc
    }, {})
    return keywordsMap
}

function getMeme() {
    return gImgs.find(meme => meme.id === +gMeme.selectedImgId)
}

function setTextLine(txt, size, color, strokeColor) {
    let pos
    if (getMemeLinesCount() === 0) {
        pos = { x: gElCanvas.width / 2, y: 40 }
    } else if (getMemeLinesCount() === 1) {
        pos = { x: gElCanvas.width / 2, y: gElCanvas.height - 40 }
    } else if (getMemeLinesCount() > 1) {
        pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    }
    gMeme.lines.push(
        {
            txt,
            pos,
            width: 0,
            size,
            color,
            rotate: 0,
            strokeColor,
            isDrag: false,
            isResize: false,
            textAlignment: 'center',
            font: 'Impact',
        }
    )
}

function setRandomImg() {
    gMeme.selectedImgId = getRandomIntInclusive(0, gImgs.length - 1)
    gMeme.lines = [
    ]
    setTextLine(sentences[getRandomIntInclusive(0, sentences.length - 1)], 40, 'white')

}

function setImg(id) {
    gMeme.selectedImgId = id
    gMeme.lines = [

    ]
}

function setSavedImg(memeId, imgId) {

    gMeme.selectedImgId = imgId
    console.log()
    gMeme.lines = getSavedMemesById(memeId).meme.lines
}

function updateSelectedLinesColors(color, strokeColor) {
    gMeme.lines[getSelectedLineIdx()].color = color
    gMeme.lines[getSelectedLineIdx()].strokeColor = strokeColor
}

function setFontLine(idx, font) {
    gMeme.lines[idx].font = font
}
function getFontLine(idx) {
    return gMeme.lines[idx].font
}

function setLineDrag(drag) {
    gMeme.lines[getSelectedLineIdx()].isDrag = drag
}
function setLineResize(resize) {
    gMeme.lines[getSelectedLineIdx()].isResize = resize
}

function updateSelectedLineTextSize(newSize) {
    gMeme.lines[getSelectedLineIdx()].size = newSize
}

function updateSelectedLineRotation(newDeg) {
    gMeme.lines[getSelectedLineIdx()].rotate = newDeg
}
function getSelectedLineRotation() {
    return gMeme.lines[getSelectedLineIdx()].rotate
}

function removeLine() {
    const idx = getSelectedLineIdx()
    gMeme.lines.splice(idx, 1)
}

function updateLineFontSize(diff) {
    if (gMeme.lines[getSelectedLineIdx()].size === 80 && diff === 1) {
        return
    }
    if (gMeme.lines[getSelectedLineIdx()].size === 16 && diff === -1) {
        return
    }
    gMeme.lines[getSelectedLineIdx()].size += diff * 2

}

function moveLine(dx, dy) {
    gMeme.lines[getSelectedLineIdx()].pos.x += dx
    gMeme.lines[getSelectedLineIdx()].pos.y += dy
}

function setLineTextAlignment(alignment) {
    gMeme.lines[getSelectedLineIdx()].textAlignment = alignment
}

function getLineTextAlignment(idx) {
    return gMeme.lines[idx].textAlignment
}

function getMemeLinesCount() {
    return gMeme.lines.length
}

function updateSelectedLineText(text) {
    gMeme.lines[getSelectedLineIdx()].txt = text
}

function getSelectedLineText() {
    if (!getSelectedLineIdx() && getSelectedLineIdx() !== 0) return null
    return gMeme.lines[getSelectedLineIdx()].txt
}

function setLineTextWidth(width, idx) {
    gMeme.lines[idx].width = width
}

function getLine(idx) {
    return gMeme.lines[idx]
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}

function setLineCoords(x, y, idx) {
    gMeme.lines[idx].pos = { x, y }
}

function getSelectedLineCoords() {
    return gMeme.lines[getSelectedLineIdx()].pos
}

function getLineCoords(idx) {
    return gMeme.lines[idx].pos
}

function setSelectedLine(idx) {
    if (!idx && idx !== 0) gMeme.selectedLineIdx = null
    gMeme.selectedLineIdx = idx
}

// function _createMemes() {
//     _createMeme('meme-imgs/meme-imgs (square)/1.jpg', ['trump'])
//     _createMeme('meme-imgs/meme-imgs (square)/2.jpg', ['dog'])
//     _createMeme('meme-imgs/meme-imgs (square)/3.jpg', ['dog', 'baby'])
//     _createMeme('meme-imgs/meme-imgs (square)/4.jpg', ['cat'])
//     _createMeme('meme-imgs/meme-imgs (square)/5.jpg', ['baby'])
//     _createMeme('meme-imgs/meme-imgs (square)/6.jpg', ['smart'])
//     _createMeme('meme-imgs/meme-imgs (square)/7.jpg', ['baby', 'funny'])
//     _createMeme('meme-imgs/meme-imgs (square)/8.jpg', ['funny'])
//     _createMeme('meme-imgs/meme-imgs (square)/9.jpg', ['funny', 'baby'])
//     _createMeme('meme-imgs/meme-imgs (square)/10.jpg', ['obama'])
//     _createMeme('meme-imgs/meme-imgs (square)/11.jpg', ['funny'])
//     _createMeme('meme-imgs/meme-imgs (square)/12.jpg', ['funny'])
//     _createMeme('meme-imgs/meme-imgs (square)/13.jpg', ['cool'])
//     _createMeme('meme-imgs/meme-imgs (square)/14.jpg', ['cool'])
//     _createMeme('meme-imgs/meme-imgs (square)/15.jpg', ['smart'])
//     _createMeme('meme-imgs/meme-imgs (square)/16.jpg', ['funny'])
//     _createMeme('meme-imgs/meme-imgs (square)/17.jpg', ['putin'])
//     _createMeme('meme-imgs/meme-imgs (square)/18.jpg', ['baz'])
// }


function _createMemes() {
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/2.jpg', ['happy'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/003.jpg', ['trump'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/004.jpg', ['dog'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/5.jpg', ['baby'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/005.jpg', ['baby', 'dog'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/006.jpg', ['cat', 'sleep'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/8.jpg', ['funny'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/9.jpg', ['baby', 'funny'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/12.jpg', ['smart'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/19.jpg', ['shock'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/Ancient-Aliens.jpg', ['funny', 'smart'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/drevil.jpg', ['cool'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/img2.jpg', ['baby', 'funny', 'cool'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/img4.jpg', ['trump'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/img5.jpg', ['baby', 'funny'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/img6.jpg', ['dog', 'funny'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/img11.jpg', ['obama'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/img12.jpg', ['funny'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/leo.jpg', ['cool', 'smart'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/meme1.jpg', ['cool'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/One-Does-Not-Simply.jpg', ['smart'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/Oprah-You-Get-A.jpg', ['happy'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/patrick.jpg', ['smart', 'funny'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/putin.jpg', ['putin'])
    _createMeme('meme-imgs/meme-imgs (various aspect ratios)/X-Everywhere.jpg', ['baz', 'toy-story'])

}

function _createMeme(url, keywords) {
    gId++
    gImgs.push({ id: gId, url, keywords })
}


function _loadSaveMemes() {
    gSaveMemes = loadFromStorage(SAVE_MEME)

    if (gSaveMemes && gSaveMemes.length !== 0) return

    gSaveMemes = []


    _saveMemes()
}


function createSavedMeme(url) {
    gSaveMemes.push({
        id: makeid(),
        meme: gMeme,
        url
    })
    _saveMemes()

}

function _saveMemes() {
    saveToStorage(SAVE_MEME, gSaveMemes)
}
