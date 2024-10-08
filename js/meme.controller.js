'use strict'

var gElCanvas
var gCtx
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
var gLastPos
var gImageSize
var gLastScreenX



function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    renderGallery()
    renderSavedGallery()

    addListeners()
    renderSearchOptions()
    renderInputOptions()
    renderMoreSearchOptions()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.main-canvas')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = (elContainer.offsetHeight * gImageSize.h) / gImageSize.w
}

function renderMeme() {
    const elImg = new Image()

    elImg.src = getMeme().url
    elImg.onload = function () {
        gImageSize = {
            w: this.width,
            h: this.height
        }
        resizeCanvas()

        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach((line, idx) => {

            onDrawText(line.txt, line.size, line.color, line.strokeColor, idx)
            if (idx === gMeme.selectedLineIdx) {
                drawRect()
                drawArc()
            }

        })

    }
}


function onDrawText(text, size = 40, color = 'white', strokeColor, idx) {
    const pos = getLineCoords(idx)
    const textAlignment = getLineTextAlignment(idx)
    const fontFam = getFontLine(idx)
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor

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
        // updateSelectedLineText(elInput.value)
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

    gCtx.rect(pos.x - line.width - 5, pos.y - line.size / 2 - 5, line.width * 2 + 10, line.size + 10)

    gCtx.stroke()
    gCtx.fill()
}

function drawArc() {
    const pos = getSelectedLineCoords()
    const line = getLine(getSelectedLineIdx())


    gCtx.beginPath()
    gCtx.lineWidth = 2

    //* The x,y cords of the center , The radius, The starting angle, The ending angle, in radians
    // gCtx.arc(x, y, 70, 0, Math.PI) //* draws a circle
    gCtx.arc(pos.x + line.width + line.size / 8, pos.y + line.size - line.size / 4, line.size / 4, 0, Math.PI * 2) //* draws a circle
    gCtx.fillStyle = 'black'
    gCtx.fill()
    gCtx.strokeStyle = 'purple'
    gCtx.stroke()
}

function addTextLine(txt = 'NewLine') {
    const elFillColorInput = document.querySelector('.fill-color')
    const elStrokeColorInput = document.querySelector('.stroke-color')

    setTextLine(txt, 40, elFillColorInput.value, elStrokeColorInput.value)

    setSelectedLine(gMeme.lines.length - 1)
    renderMeme()
}

function onColorsChange() {
    const elFillColorInput = document.querySelector('.fill-color')
    const elStrokeColorInput = document.querySelector('.stroke-color')

    updateSelectedLinesColors(elFillColorInput.value, elStrokeColorInput.value)
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


    const elInput = document.querySelector('.line-txt-input')
    elInput.value = getSelectedLineText()
    elInput.addEventListener('input', function () {
        // updateSelectedLineText(elInput.value)
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
        // updateSelectedLineText(elInput.value)
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
    window.addEventListener('keydown', onKeyDown)
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

    window.onclick = function (event) {

        if (!event.target.matches('.dropbtn')) {
            const elDropDownContent = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < elDropDownContent.length; i++) {
                const openDropdown = elDropDownContent[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
        if (!event.target.matches('canvas') && !event.target.matches('.btn img') && !event.target.matches('select') && !event.target.matches('.input')) {
            if (getSelectedLineIdx() || getSelectedLineIdx() === 0) {
                setSelectedLine()
                renderMeme()

            }
        }
    }
}

function onDropBtn() {
    document.querySelector(".dropdown-content").classList.toggle("show");
}

function onKeyDown(ev) {
    ev.preventDefault()
    const selectedIdx = getSelectedLineIdx()
    if (selectedIdx || selectedIdx === 0) {
        let lineText = getSelectedLineText()
        if (ev.which > 47 && ev.which < 90 || ev.which === 32) {
            lineText = `${lineText}${ev.key}`
            updateSelectedLineText(lineText)
            renderMeme()
        }
        if (ev.which === 8) {
            updateSelectedLineText(lineText.slice(0, - 1))
            renderMeme()
        }
    }
}

function onDown(ev) {
    const pos = getEvPos(ev)

    if (isCircleClicked(pos)) {
        setLineResize(true)
        gElCanvas.style.cursor = 'col-resize'
        gLastScreenX = ev.screenX

    }
    if (!isLineClicked(pos)) return
    setLineDrag(true)

    gLastPos = pos

    gElCanvas.style.cursor = 'grabbing'
}

function onMove(ev) {
    const line = getLine(getSelectedLineIdx())

    if (!getLine(getSelectedLineIdx()) && getLine(getSelectedLineIdx()) !== 0) return
    const isResize = line.isResize

    if (isResize) {
        const diff = ev.screenX + (gLastScreenX * -1)
        if (line.size >= 10) {
            gLastScreenX = ev.screenX
            updateSelectedLineTextSize(line.size + diff)

        } else {
            updateSelectedLineTextSize(10)
        }

        gElCanvas.style.cursor = 'col-resize'
        renderMeme()

    }

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
    setLineResize(false)
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

function onSaveMeme() {
    const canvasData = gElCanvas.toDataURL('image/jpeg')


    function onSuccess(uploadedImgUrl) {
        createSavedMeme(uploadedImgUrl)
    }

    uploadImg(canvasData, onSuccess)
}


function onShareToFB() {

    const canvasData = gElCanvas.toDataURL('image/jpeg')


    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)

    }

    uploadImg(canvasData, onSuccess)
}


function onShare() {
    const canvasData = gElCanvas.toDataURL('image/jpeg')



    function onSuccess(uploadedImgUrl) {

        try {
            navigator.share({
                title: "My meme",
                text: "Look at my new meme from MEMECO",
                url: uploadedImgUrl,
            });
            console.log("Data was shared successfully");
        } catch (err) {
            console.error("error:", err.message);
        }
    }

    uploadImg(canvasData, onSuccess)


}
