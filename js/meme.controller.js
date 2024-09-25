'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    renderMeme()
}

function renderMeme(src = 'meme-imgs/meme-imgs (square)/1.jpg') {
    const elImg = new Image()
    let x
    let y
    const id = gMeme.selectedImgId

    elImg.src = getMeme(+id).url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach((line, idx) => {

            if (idx === 0) {
                x = gElCanvas.width / 2
                y = 40
            } else if (idx === 1) {
                x = gElCanvas.width / 2
                y = gElCanvas.height - 40
            } else if (idx > 2) {
                x = gElCanvas.width / 2
                y = gElCanvas.height / 2
            }
            onDrawText(line.txt, line.size, line.color, x, y)
        })
    }
}

function onDrawText(text, size = 40, color = 'white', x, y) {

    gCtx.lineWidth = 2.
    gCtx.strokeStyle = 'black'

    gCtx.fillStyle = color
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'


    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)


}

function addTextLine(elInput, text, size = 40, color = 'white') {
    setTextLine(text, size, color)
    elInput.value = ''
    renderMeme()
}