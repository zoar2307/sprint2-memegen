'use strict'

function isLineClicked(clickedPos) {
    const { x, y } = clickedPos
    let lineIdx = 0
    let clickedLine = 0
    clickedLine = gMeme.lines.find((line, idx) => {
        lineIdx = idx
        return (
            x >= line.pos.x - line.width && x <= line.pos.x + line.width &&
            y >= line.pos.y - line.size && y <= line.pos.y + line.size
        )
    })
    if (clickedLine) {
        setSelectedLine(lineIdx)
        return `${lineIdx}`
    }
}

function isCircleClicked(clickedPos) {
    const { x, y } = clickedPos
    let lineIdx = 0

    const isCircle = gMeme.lines.find((line, idx) => {
        lineIdx = idx

        const distance = Math.sqrt((line.pos.x + line.width + line.size / 8 - x) ** 2 + (line.pos.y + line.size - line.size / 4 - y) ** 2)
        console.log(distance)
        return distance <= line.size / 4
    })
    if (isCircle) {
        setSelectedLine(lineIdx)

        return isCircle
    }

}

