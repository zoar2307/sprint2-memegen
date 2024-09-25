'use strict'

var gElCanvas
var gCtx
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    renderGallery()
    addListeners()

}

function resizeCanvas() {
    const elContainer = document.querySelector('.main-canvas')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
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
            if (idx === gMeme.selectedLineIdx) {
                drawRect()

            }

        })
    }
}

function onDrawText(text, size = 40, color = 'white', x, y, idx) {

    gCtx.lineWidth = 2.
    gCtx.strokeStyle = 'black'

    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

    setLineCoords(x, y, idx)
    setLineTextWidth(gCtx.measureText(text).width, idx)

    const elInput = document.querySelector('.line-txt-input')
    elInput.value = getSelectedLineText()
    elInput.addEventListener('input', function () {
        updateSelectedLineText(elInput.value)
        renderMeme()
    })

}


function drawRect() {
    const pos = getSelectedLineCoords()
    const line = getLine(getSelectedLineIdx())

    gCtx.beginPath()

    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'purple'
    gCtx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    gCtx.rect(pos.x - line.width / 2 - 5, pos.y - line.size / 2 - 5, line.width + 10, line.size + 10)
    gCtx.stroke()
    gCtx.fill()

}

function addTextLine() {
    const elColorInput = document.querySelector('.fill-color')

    setTextLine('NewLine', 40, elColorInput.value)

    setSelectedLine(gMeme.lines.length - 1)
    renderMeme()
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onChangeFontSize(diff) {
    updateLineFontSize(diff)
    renderMeme()
}



function onSelectedLine() {
    setSelectedLine(getSelectedLineIdx() + 1)
    if (getSelectedLineIdx() === getMemeLinesCount() || !getSelectedLineIdx()) {
        setSelectedLine(0)
    }
    console.log(getSelectedLineIdx())
    const elInput = document.querySelector('.line-txt-input')
    elInput.value = getSelectedLineText()
    elInput.addEventListener('input', function () {
        updateSelectedLineText(elInput.value)
        renderMeme()
    })

    renderMeme()
}


function onCanvasClick(ev) {
    const pos = getEvPos(ev)

    if (!isLineClicked(pos)) return
    renderMeme()

    const idx = getSelectedLineIdx()
    console.log(idx)

    const elInput = document.querySelector('.line-txt-input')
    elInput.value = getSelectedLineText()
    elInput.addEventListener('input', function () {
        updateSelectedLineText(elInput.value)
        renderMeme()
    })

}

function onRemoveLine() {
    removeLine()
    const elInput = document.querySelector('.line-txt-input')
    elInput.value = ''
    renderMeme()
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.clientX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.clientY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function addListeners() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
    const elInput = document.querySelector('.line-txt-input')
    elInput.addEventListener('blur', function () {
        elInput.value = ''
        setSelectedLine()
        renderMeme()

    })
}