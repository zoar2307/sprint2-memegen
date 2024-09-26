'use strict'

var gElCanvas
var gCtx
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
let gLastPos



function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    renderGallery()
    addListeners()
    renderSearchOptions()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.main-canvas')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function renderMeme() {
    const elImg = new Image()
    let x
    let y

    elImg.src = getMeme().url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach((line, idx) => {


            onDrawText(line.txt, line.size, line.color, idx)
            if (idx === gMeme.selectedLineIdx) {
                drawRect()

            }

        })
    }
}

function onDrawText(text, size = 40, color = 'white', idx) {
    const pos = getLineCoords(idx)
    const textAlignment = getLineTextAlignment(idx)
    const fontFam = getFontLine(idx)
    gCtx.lineWidth = 2.
    gCtx.strokeStyle = 'black'

    gCtx.fillStyle = color
    gCtx.font = `${size}px ${fontFam}`
    gCtx.textAlign = `${textAlignment}`
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, pos.x, pos.y)
    gCtx.strokeText(text, pos.x, pos.y)

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
    const textAlignment = getLineTextAlignment(getSelectedLineIdx())
    console.log(pos)
    console.log(textAlignment)


    gCtx.beginPath()

    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'purple'
    gCtx.fillStyle = 'rgba(255, 255, 255, 0.3)'

    // if (textAlignment === 'start') {
    //     gCtx.rect(pos.x - 5, pos.y - line.size / 2 - 5, line.width + 10, line.size + 10)
    // } else if (textAlignment === 'end') {
    //     gCtx.rect(pos.x - line.width - 5, pos.y - line.size / 2 - 5, line.width + 10, line.size + 10)
    // } else if (textAlignment === 'center') {
    //     gCtx.rect(pos.x - line.width / 2 - 5, pos.y - line.size / 2 - 5, line.width + 10, line.size + 10)

    // }

    gCtx.rect(pos.x - line.width - 5, pos.y - line.size / 2 - 5, line.width * 2 + 10, line.size + 10)

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
    setSelectedLine()
    renderMeme()
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent

}

function onChangeFontSize(diff) {
    updateLineFontSize(diff)
    renderMeme()
}

function onFontChange(value) {
    setFontLine(getSelectedLineIdx(), value)
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

    if (!isLineClicked(pos)) {
        setSelectedLine()
        return
    }
    renderMeme()


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

function onAlignText(alignment) {
    setLineTextAlignment(alignment)
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
    addMouseListeners()
    addTouchListeners()
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


function onDown(ev) {
    const pos = getEvPos(ev)

    if (!isLineClicked(pos)) return
    setLineDrag(true)

    gLastPos = pos

    gElCanvas.style.cursor = 'grabbing'
}

function onMove(ev) {
    const line = getLine(getSelectedLineIdx())
    if (!getLine(getSelectedLineIdx()) && getLine(getSelectedLineIdx()) !== 0) return

    const isDrag = line.isDrag
    if (!isDrag) return


    const pos = getEvPos(ev)
    const dx = pos.x - gLastPos.x
    const dy = pos.y - gLastPos.y
    moveLine(dx, dy)
    gLastPos = pos
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    gElCanvas.style.cursor = 'grab'
}


function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

