'use strict'

var gElCanvas
var gCtx
var gSize = 40

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    renderMeme()
    updateFontSizeDisplay()
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
            } else if (idx > 1) {
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

function addTextLine() {
    const elColorInput = document.querySelector('.fill-color')
    const elLineTextInput = document.querySelector('.line-txt-input')

    if (!elLineTextInput.value.trim()) return
    setTextLine(elLineTextInput.value, gSize, elColorInput.value)
    elLineTextInput.value = ''
    renderMeme()
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onChangeFontSize(diff) {
    if (gSize >= 80 && diff === 1) {
        updateFontSizeDisplay()
        return
    }
    if (gSize <= 16 && diff === -1) {
        updateFontSizeDisplay()
        return
    }

    gSize += 2 * diff
    console.log(gSize)
    updateFontSizeDisplay()
}

function updateFontSizeDisplay() {
    const elFontSizeSpan = document.querySelector('.font-size-span')
    elFontSizeSpan.innerText = gSize
}