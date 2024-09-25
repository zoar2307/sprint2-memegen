'use strict'


var gId = 0

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add Text...',
            pos: {},
            width: 0,
            size: 20,
            color: 'white',
            isSelected: false
        }
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
            isSelected: false
        }
    )
}

function setImg(id) {
    gMeme.selectedImgId = id
    gMeme.lines = [
        {
            txt: 'Add Text...',
            pos: {},
            width: 0,
            size: 20,
            color: 'white',
            isSelected: false
        }
    ]
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
    for (let i = 0; i < gMeme.lines.length; i++) {
        gMeme.lines[i].isSelected = false
    }
    gMeme.lines[idx].isSelected = true
    gMeme.selectedLineIdx = idx
}

function _createMemes() {
    _createMeme('meme-imgs/meme-imgs (square)/1.jpg', ['trump'])
    _createMeme('meme-imgs/meme-imgs (square)/2.jpg', ['dog'])
    _createMeme('meme-imgs/meme-imgs (square)/3.jpg', ['dog', 'baby'])
    _createMeme('meme-imgs/meme-imgs (square)/4.jpg', ['cat'])
    _createMeme('meme-imgs/meme-imgs (square)/5.jpg', ['baby'])
    // _createImage('meme-imgs/meme-imgs (square)/6.jpg', [''])
    // _createImage('meme-imgs/meme-imgs (square)/7.jpg', ['baby', 'funny'])
    // _createImage('meme-imgs/meme-imgs (square)/8.jpg', ['trump'])
    // _createImage('meme-imgs/meme-imgs (square)/9.jpg', ['trump'])
    // _createImage('meme-imgs/meme-imgs (square)/10.jpg', ['trump'])
    // _createImage('meme-imgs/meme-imgs (square)/11.jpg', ['trump'])
    // _createImage('meme-imgs/meme-imgs (square)/12.jpg', ['trump'])
    // _createImage('meme-imgs/meme-imgs (square)/13.jpg', ['trump'])
    // _createImage('meme-imgs/meme-imgs (square)/14.jpg', ['trump'])
    // _createImage('meme-imgs/meme-imgs (square)/15.jpg', ['trump'])
    // _createImage('meme-imgs/meme-imgs (square)/16.jpg', ['trump'])
    // _createImage('meme-imgs/meme-imgs (square)/17.jpg', ['trump'])
    // _createImage('meme-imgs/meme-imgs (square)/18.jpg', ['trump'])
}

function _createMeme(url, keywords) {
    gId++
    gImgs.push({ id: gId, url, keywords })

}