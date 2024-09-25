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
