'use strict'


var gId = 0

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [

    ]


}

_createMemes()

function getMeme() {
    return gImgs.find(meme => meme.id === +gMeme.selectedImgId)
}

function setTextLine(txt, size, color) {
    gMeme.lines.push(
        {
            txt,
            pos: {},
            width: 0,
            size,
            color,
        }
    )
}

function setImg(id) {
    gMeme.selectedImgId = id
    gMeme.lines = [

    ]
}

function removeLine() {
    const idx = getSelectedLineIdx()
    console.log(idx)
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
    _createMeme('meme-imgs/meme-imgs (square)/6.jpg', [''])
    _createMeme('meme-imgs/meme-imgs (square)/7.jpg', ['baby', 'funny'])
    _createMeme('meme-imgs/meme-imgs (square)/8.jpg', ['trump'])
    _createMeme('meme-imgs/meme-imgs (square)/9.jpg', ['trump'])
    _createMeme('meme-imgs/meme-imgs (square)/10.jpg', ['trump'])
    _createMeme('meme-imgs/meme-imgs (square)/11.jpg', ['trump'])
    _createMeme('meme-imgs/meme-imgs (square)/12.jpg', ['trump'])
    _createMeme('meme-imgs/meme-imgs (square)/13.jpg', ['trump'])
    _createMeme('meme-imgs/meme-imgs (square)/14.jpg', ['trump'])
    _createMeme('meme-imgs/meme-imgs (square)/15.jpg', ['trump'])
    _createMeme('meme-imgs/meme-imgs (square)/16.jpg', ['trump'])
    _createMeme('meme-imgs/meme-imgs (square)/17.jpg', ['trump'])
    _createMeme('meme-imgs/meme-imgs (square)/18.jpg', ['trump'])
}

function _createMeme(url, keywords) {
    gId++
    gImgs.push({ id: gId, url, keywords })
}