'use strict'


var gId = 0

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

function setTextLine(txt, size, color) {
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
            isDrag: false,
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



function setFontLine(idx, font) {
    gMeme.lines[idx].font = font
}
function getFontLine(idx) {
    return gMeme.lines[idx].font
}

function setLineDrag(isDrag) {
    console.log(getSelectedLineIdx())
    gMeme.lines[getSelectedLineIdx()].isDrag = isDrag
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

function _createMemes() {
    _createMeme('meme-imgs/meme-imgs (square)/1.jpg', ['trump'])
    _createMeme('meme-imgs/meme-imgs (square)/2.jpg', ['dog'])
    _createMeme('meme-imgs/meme-imgs (square)/3.jpg', ['dog', 'baby'])
    _createMeme('meme-imgs/meme-imgs (square)/4.jpg', ['cat'])
    _createMeme('meme-imgs/meme-imgs (square)/5.jpg', ['baby'])
    _createMeme('meme-imgs/meme-imgs (square)/6.jpg', ['smart'])
    _createMeme('meme-imgs/meme-imgs (square)/7.jpg', ['baby', 'funny'])
    _createMeme('meme-imgs/meme-imgs (square)/8.jpg', ['funny'])
    _createMeme('meme-imgs/meme-imgs (square)/9.jpg', ['funny', 'baby'])
    _createMeme('meme-imgs/meme-imgs (square)/10.jpg', ['obama'])
    _createMeme('meme-imgs/meme-imgs (square)/11.jpg', ['funny'])
    _createMeme('meme-imgs/meme-imgs (square)/12.jpg', ['funny'])
    _createMeme('meme-imgs/meme-imgs (square)/13.jpg', ['cool'])
    _createMeme('meme-imgs/meme-imgs (square)/14.jpg', ['cool'])
    _createMeme('meme-imgs/meme-imgs (square)/15.jpg', ['smart'])
    _createMeme('meme-imgs/meme-imgs (square)/16.jpg', ['funny'])
    _createMeme('meme-imgs/meme-imgs (square)/17.jpg', ['putin'])
    _createMeme('meme-imgs/meme-imgs (square)/18.jpg', ['baz'])
}

function _createMeme(url, keywords) {
    gId++
    gImgs.push({ id: gId, url, keywords })
}