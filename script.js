

const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameOver = false;

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] || isGameOver) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        alert(`Player ${currentPlayer} wins!`);
        isGameOver = true;
        return;
    }

    if (gameState.every(cell => cell !== null)) {
        alert('It\'s a draw!');
        isGameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    isGameOver = false;
}