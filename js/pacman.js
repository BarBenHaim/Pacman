'use strict'

const PACMAN_IMG = 'images/pacman.gif'
const PACMAN = `<img class='pacman' src="${PACMAN_IMG}">`

var gPacman

function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6,
        },
        isSuper: false,
        deg: 0,
    }
    gGame.foodCounter--

    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return

    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            removeGhost(nextLocation)
            setTimeout(reviveGhosts, 3000)
        } else {
            gameOver()
            return
        }
    } else if (nextCell === FOOD) {
        updateScore(1)
        gGame.foodCounter--
        playSound('audio/eating-sound.mp3')
    } else if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        updateScore(1)
        playSound('audio/super-food.mp3')
        updateGhosts(gGhosts)
        setTimeout(() => {
            gPacman.isSuper = false
        }, 5000)
    } else if (nextCell === CHERRY) {
        updateScore(10)
        playSound('audio/eating-sound.mp3')
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    gPacman.location = nextLocation

    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    renderCell(gPacman.location, getPacmanHTML(gPacman.deg))

    if (!gGame.foodCounter) {
        gameOver()
        return
    }
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            gPacman.deg = -90
            break
        case 'ArrowDown':
            nextLocation.i++
            gPacman.deg = 90

            break
        case 'ArrowLeft':
            nextLocation.j--
            gPacman.deg = 180

            break
        case 'ArrowRight':
            nextLocation.j++
            gPacman.deg = 0

            break
        default:
            return null
    }
    return nextLocation
}

function getPacmanHTML(deg) {
    return `<img class='pacman' style='transform: rotate(${deg}deg)' src='${PACMAN_IMG}'>`
}
