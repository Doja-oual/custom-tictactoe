
// Variables globales du jeu
var gridSize = 3;
var winCondition = 3;
var player1Symbol = 'X';
var player2Symbol = 'O';
var currentPlayer = 1;
var gameBoard = [];
var gameOver = false;
var scores = { player1: 0, player2: 0 };

// Initialisation du jeu
function initGame() {
    loadGameData();
    createGameBoard();
    updateGameInfo();
    updateScoreDisplay();
    setupEvents();
}

// Configuration des événements
function setupEvents() {
    document.getElementById('apply-config').onclick = applyConfiguration;
    document.getElementById('new-game').onclick = newGame;
    document.getElementById('reset-scores').onclick = resetScores;
    document.getElementById('settings').onclick = openModal;
    document.getElementById('close-modal').onclick = closeModal;
    document.getElementById('apply').onclick = applyModalSettings;
    document.getElementById('cancel').onclick = closeModal;
    
    // Fermer modal en cliquant dehors
    document.getElementById('modal').onclick = function(e) {
        if (e.target.id === 'modal') closeModal();
    };
}

// Créer la grille de jeu
function createGameBoard() {
    var board = document.getElementById('game-board');
    board.innerHTML = '';
    board.style.gridTemplateColumns = 'repeat(' + gridSize + ', 1fr)';
    
    // Initialiser le tableau
    gameBoard = [];
    for (var i = 0; i < gridSize; i++) {
        gameBoard[i] = [];
        for (var j = 0; j < gridSize; j++) {
            gameBoard[i][j] = null;
        }
    }
    
    
    for (var row = 0; row < gridSize; row++) {
        for (var col = 0; col < gridSize; col++) {
            var cell = document.createElement('button');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            
        // event click
            (function(r, c) {
                cell.onclick = function() { playMove(r, c); };
            })(row, col);
            
            board.appendChild(cell);
        }
    }
}
