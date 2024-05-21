'use strict'

const WALL = '🟦'
const FOOD = '♨'
const EMPTY = ' '
const SUPER_FOOD = '🍔'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false,
    foodCounter: 0,
}
var gBoard
var gCherryInterval

function onInit() {
    gGame.foodCounter = 0
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard)
    updateScore(-gGame.score)
    gGame.isOn = true
    var elGameOverModal = document.querySelector('.game-over')
    elGameOverModal.hidden = true
    gCherryInterval = setInterval(() => addCherry(gBoard), 15000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCounter++
            if (i === 0 || i === size - 1 || j === 0 || j === size - 1 || (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCounter--
            }
            var lastRowIdx = size - 2
            var lastColIdx = size - 2
            if (
                (i === 1 && j === 1) ||
                (i === 1 && j === lastColIdx) ||
                (i === lastRowIdx && j === 1) ||
                (i === lastRowIdx && j === lastColIdx)
            ) {
                board[i][j] = SUPER_FOOD
                gGame.foodCounter--
            }
        }
    }
    console.log('board:', board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 } , ''
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, EMPTY)
    var elGameOverModal = document.querySelector('.game-over')
    var elGameOverModalH2 = elGameOverModal.querySelector('h2')
    elGameOverModalH2.innerText = !gGame.foodCounter ? 'You Won!' : 'You Lost!'
    elGameOverModal.hidden = false
}
function addCherry(board) {
    var location = getEmptyLocation(board)
    if (location) {
        board[location.i][location.j] = CHERRY
        renderBoard(board)
    }
}
