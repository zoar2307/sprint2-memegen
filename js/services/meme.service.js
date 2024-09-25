'use strict'


var gId = 0

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add Text...'
            ,
            size: 20,
            color: 'white'
        }
    ]


}

_createMemes()

function getMeme(id = 3) {
    return gImgs.find(meme => meme.id === id)
}

function setTextLine(txt, size, color) {
    gMeme.lines.push(
        {
            txt,
            size,
            color
        }
    )
}

function setImg(id) {
    gMeme.selectedImgId = id
    gMeme.lines = [
        {
            txt: 'Add Text...'
            ,
            size: 20,
            color: 'white'
        }
    ]
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