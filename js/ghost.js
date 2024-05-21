'use strict'

const GHOST = `<img class='ghost' src="images/ghost.gif">`
var gGhosts = []
var gDeadGhosts = []
var gIntervalGhosts

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3,
        },
        currCellContent: FOOD,
        color: getRandomColor2(),
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []

    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL || nextCell === GHOST) return

    if (nextCell === PACMAN) {
        if (!gPacman.isSuper) gameOver()
        else return
    }
    ghost.currCellContent = nextCell === CHERRY ? CHERRY : ghost.currCellContent
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    renderCell(ghost.location, ghost.currCellContent)

    ghost.location = nextLocation
    ghost.currCellContent = nextCell

    gBoard[ghost.location.i][ghost.location.j] = GHOST
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1:
            return { i: 0, j: 1 }
        case 2:
            return { i: 1, j: 0 }
        case 3:
            return { i: 0, j: -1 }
        case 4:
            return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    const color = gPacman.isSuper ? 'isSuper' : ghost.color

    // Create a mapping of colors to CSS filter values
    const colorFilters = {
        blue: 'invert(24%) sepia(91%) saturate(6259%) hue-rotate(222deg) brightness(88%) contrast(122%)',
        red: 'invert(16%) sepia(80%) saturate(7482%) hue-rotate(357deg) brightness(95%) contrast(122%)',
        pink: 'invert(70%) sepia(20%) saturate(7458%) hue-rotate(316deg) brightness(99%) contrast(89%)',
        orange: 'invert(55%) sepia(64%) saturate(643%) hue-rotate(347deg) brightness(94%) contrast(91%)',
        yellow: 'invert(15%) sepia(14%) saturate(643%) hue-rotate(347deg) brightness(94%) contrast(91%)',
        lightblue: 'invert(25%) sepia(64%) saturate(23%) hue-rotate(347deg) brightness(94%) contrast(91%)',
        isSuper: 'hue-rotate(210deg) saturate(100%) brightness(100%) contrast(100%)',
    }

    const filter = colorFilters[color] || 'none'

    return `<span style="filter:${filter};">${GHOST}</span>`
}

function removeGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currLocation = gGhosts[i].location
        if (currLocation.i === location.i && currLocation.j === location.j) {
            const removedGhost = gGhosts.splice(i, 1)[0]
            ghostCellContent(removedGhost)
            gDeadGhosts.push(removedGhost)
        }
    }
}

function reviveGhosts() {
    for (var i = 0; i < gDeadGhosts.length; i++) {
        gGhosts.push(gDeadGhosts[i])
    }
    gDeadGhosts = []
}

function ghostCellContent(ghost) {
    if (ghost.currCellContent === FOOD) {
        updateScore(1)
        ghost.currCellContent = EMPTY
    }
}

function updateGhosts(ghosts) {
    for (var i = 0; i < ghosts.length; i++) {
        var ghost = ghosts[i]
        renderCell(ghost.location, getGhostHTML(ghost))
    }
}
