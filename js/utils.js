'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getTime() {
    return new Date().toString().split(' ')[4]
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getEmptyLocation(board) {
    const emptyLocations = []

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            const currCell = board[i][j]
            if (currCell === EMPTY) {
                emptyLocations.push({ i, j })
            }
        }
    }

    if (!emptyLocations.length) return null

    const randomIdx = getRandomIntInclusive(0, emptyLocations.length - 1)
    return emptyLocations[randomIdx]
}

function playSound(src) {
    const sound = new Audio(src)
    sound.play()
}

function getRandomColor2() {
    var colors = ['blue', 'red', 'pink', 'orange', 'yellow', 'lightblue']

    var colorIdx = getRandomIntInclusive(0, 5)
    return colors[colorIdx]
}
