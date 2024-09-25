'use strict'

var gElCanvas
var gCtx
var gSize = 40
var gLastRect = { x: 0, y: 0, width: 0, size: 0 }

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    renderMeme()
    updateFontSizeDisplay()
    updateSelectedLineDisplay()
}

function renderMeme(src = 'meme-imgs/meme-imgs (square)/1.jpg') {
    const elImg = new Image()
    let x
    let y

    elImg.src = getMeme().url
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
            onDrawText(line.txt, line.size, line.color, x, y, idx)
            if (getLine(idx).isSelected) {
                drawRect()
            }

        })
    }
}

function onDrawText(text, size = 40, color = 'white', x, y, idx) {

    gCtx.lineWidth = 2.
    gCtx.strokeStyle = 'black'

    gCtx.fillStyle = color
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

    setLineCoords(x, y, idx)
    setLineTextWidth(gCtx.measureText(text).width, idx)
    drawRect()

}


function drawRect() {
    const pos = getSelectedLineCoords()
    const line = getLine(getSelectedLineIdx())

    gLastRect = { x: pos.x, y: pos.y, width: line.width, size: line.size }
    gCtx.beginPath()

    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'purple'
    gCtx.rect(pos.x - line.width, pos.y - line.size, line.width * 2, line.size * 2)
    gCtx.stroke()
    //* THE SAME

}

function addTextLine() {
    const elColorInput = document.querySelector('.fill-color')
    const elLineTextInput = document.querySelector('.line-txt-input')

    if (!elLineTextInput.value.trim()) return
    setTextLine(elLineTextInput.value, gSize, elColorInput.value)
    elLineTextInput.value = ''

    setSelectedLine(gMeme.lines.length - 1)
    updateSelectedLineDisplay()
    renderMeme()
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onChangeFontSize(diff) {
    if (gSize === 80 && diff === 1) {
        return
    }
    if (gSize === 16 && diff === -1) {
        return
    }

    gSize += 2 * diff
    updateFontSizeDisplay()
}

function updateFontSizeDisplay() {
    const elFontSizeSpan = document.querySelector('.font-size-span')
    elFontSizeSpan.innerText = gSize
}

function onSelectedLine(diff) {
    if (getSelectedLineIdx() === gMeme.lines.length - 1 && diff === 1) {
        return
    }
    if (getSelectedLineIdx() === 0 && diff === -1) {
        return
    }

    setSelectedLine(getSelectedLineIdx() + diff)
    updateSelectedLineDisplay()
    drawRect()
}

function updateSelectedLineDisplay() {
    const elLineSelectedSpan = document.querySelector('.line-selected-span')
    elLineSelectedSpan.innerText = getSelectedLineIdx() + 1
    renderMeme()

}


