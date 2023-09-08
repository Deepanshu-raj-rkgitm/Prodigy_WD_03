const cells = document.querySelectorAll('[data-cell]');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Winning combinations
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Event listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (gameActive && !gameBoard[index]) {
            makeMove(cell, index);
            if (checkWin(currentPlayer)) {
                gameActive = false;
                statusElement.textContent = `${currentPlayer} wins!`;
            } else if (isBoardFull()) {
                gameActive = false;
                statusElement.textContent = "It's a tie!";
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                statusElement.textContent = `${currentPlayer}'s turn`;
                if (currentPlayer === 'O') {
                    setTimeout(() => {
                        makeComputerMove();
                    }, 500);
                }
            }
        }
    });
});

resetButton.addEventListener('click', resetGame);

function makeMove(cell, index) {
    cell.textContent = currentPlayer;
    gameBoard[index] = currentPlayer;
}

function checkWin(player) {
    return winCombos.some(combination => {
        return combination.every(index => gameBoard[index] === player);
    });
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

function makeComputerMove() {
    const emptyCells = gameBoard.map((cell, index) => (cell === '' ? index : -1)).filter(index => index !== -1);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cellIndex = emptyCells[randomIndex];
    if (cellIndex !== undefined) {
        const cell = cells[cellIndex];
        makeMove(cell, cellIndex);
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusElement.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

statusElement.textContent = `${currentPlayer}'s turn`;
