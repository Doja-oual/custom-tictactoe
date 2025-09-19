
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
    
    // Créer les cellules
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

// Jouer un coup
function playMove(row, col) {
    if (gameOver || gameBoard[row][col] !== null) return;
    
  
    var symbol = (currentPlayer === 1) ? player1Symbol : player2Symbol;
    gameBoard[row][col] = currentPlayer;
    

    var cell = document.querySelector('[data-row="' + row + '"][data-col="' + col + '"]');
    cell.textContent = symbol;
    cell.classList.add('filled', currentPlayer === 1 ? 'x' : 'o');
    
  
    if (checkWin(row, col)) {
        endGame(currentPlayer);
        return;
    }
    
  
    if (isBoardFull()) {
        endGame(0);
        return;
    }
    

    currentPlayer = (currentPlayer === 1) ? 2 : 1;
    updateGameInfo();
}


function checkWin(row, col) {
    var player = gameBoard[row][col];
    var directions = [[0,1], [1,0], [1,1], [1,-1]];
    
    for (var i = 0; i < directions.length; i++) {
        var dRow = directions[i][0];
        var dCol = directions[i][1];
        var count = 1;
        var winCells = [[row, col]];
        
        
        var r = row + dRow, c = col + dCol;
        while (r >= 0 && r < gridSize && c >= 0 && c < gridSize && gameBoard[r][c] === player) {
            winCells.push([r, c]);
            count++;
            r += dRow;
            c += dCol;
        }
        
      
        r = row - dRow;
        c = col - dCol;
        while (r >= 0 && r < gridSize && c >= 0 && c < gridSize && gameBoard[r][c] === player) {
            winCells.unshift([r, c]);
            count++;
            r -= dRow;
            c -= dCol;
        }
        
        if (count >= winCondition) {
            highlightWinningCells(winCells);
            return true;
        }
    }
    return false;
}


function highlightWinningCells(cells) {
    for (var i = 0; i < cells.length; i++) {
        var cell = document.querySelector('[data-row="' + cells[i][0] + '"][data-col="' + cells[i][1] + '"]');
        cell.classList.add('winning');
    }
}


function isBoardFull() {
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (gameBoard[i][j] === null) return false;
        }
    }
    return true;
}


function endGame(winner) {
    gameOver = true;
    
    if (winner === 0) {
        showMessage(' Match nul !', 'draw');
    } else {
        var symbol = (winner === 1) ? player1Symbol : player2Symbol;
        scores['player' + winner]++;
        updateScoreDisplay();
        saveGameData();
        showMessage(' Joueur ' + symbol + ' gagne !', 'winner');
    }
}


function newGame() {
    gameOver = false;
    currentPlayer = 1;
    createGameBoard();
    updateGameInfo();
    hideMessage();
}

// Appliquer configuration principale
function applyConfiguration() {
    var newGridSize = parseInt(document.getElementById('live-grid-input').value);
    var newWinCondition = parseInt(document.getElementById('live-win-input').value);
    var newSymbol1 = document.getElementById('live-symbol1-input').value.trim();
    var newSymbol2 = document.getElementById('live-symbol2-input').value.trim();
    
    
    if (newGridSize < 3 || newGridSize > 10) {
        showMessage('Taille de grille invalide (3-10)', 'error');
        return;
    }
    if (newWinCondition < 3 || newWinCondition > newGridSize) {
        showMessage('Nombre d\'alignements invalide', 'error');
        return;
    }
    if (newSymbol1 === '' || newSymbol2 === '' || newSymbol1 === newSymbol2) {
        showMessage('Symboles invalides ou identiques', 'error');
        return;
    }
    
    
    gridSize = newGridSize;
    winCondition = newWinCondition;
    player1Symbol = newSymbol1;
    player2Symbol = newSymbol2;
    
    newGame();
    saveGameData();
    showMessage('Configuration appliquée !', 'success');
}


function openModal() {
    document.getElementById('grid-input').value = gridSize;
    document.getElementById('win-input').value = winCondition;
    document.getElementById('symbol1-input').value = player1Symbol;
    document.getElementById('symbol2-input').value = player2Symbol;
    document.getElementById('modal').classList.add('show');
}

// Fermer modal
function closeModal() {
    document.getElementById('modal').classList.remove('show');
}


function applyModalSettings() {
    var newGridSize = parseInt(document.getElementById('grid-input').value);
    var newWinCondition = parseInt(document.getElementById('win-input').value);
    var newSymbol1 = document.getElementById('symbol1-input').value.trim();
    var newSymbol2 = document.getElementById('symbol2-input').value.trim();
    
  
    if (newGridSize < 3 || newGridSize > 10) {
        alert('Taille de grille invalide (3-10)');
        return;
    }
    if (newWinCondition < 3 || newWinCondition > newGridSize) {
        alert('Nombre d\'alignements invalide');
        return;
    }
    if (newSymbol1 === '' || newSymbol2 === '' || newSymbol1 === newSymbol2) {
        alert('Symboles invalides ou identiques');
        return;
    }
    
  
    gridSize = newGridSize;
    winCondition = newWinCondition;
    player1Symbol = newSymbol1;
    player2Symbol = newSymbol2;
    
    
    document.getElementById('live-grid-input').value = gridSize;
    document.getElementById('live-win-input').value = winCondition;
    document.getElementById('live-symbol1-input').value = player1Symbol;
    document.getElementById('live-symbol2-input').value = player2Symbol;
    
    newGame();
    saveGameData();
    closeModal();
    showMessage('Paramètres appliqués !', 'success');
}


function resetScores() {
    if (confirm('Remettre les scores à zéro ?')) {
        scores = { player1: 0, player2: 0 };
        updateScoreDisplay();
        saveGameData();
        showMessage('Scores remis à zéro', 'success');
    }
}


function updateGameInfo() {
    var symbol = (currentPlayer === 1) ? player1Symbol : player2Symbol;
    document.getElementById('current-player').textContent = symbol;
    document.getElementById('grid-size').textContent = gridSize + '×' + gridSize;
    document.getElementById('win-condition').textContent = winCondition;
}

// Mettre à jour scores
function updateScoreDisplay() {
    document.getElementById('symbol-x').textContent = player1Symbol;
    document.getElementById('symbol-o').textContent = player2Symbol;
    document.getElementById('score-x').textContent = scores.player1;
    document.getElementById('score-o').textContent = scores.player2;
}

// Afficher message
function showMessage(text, type) {
    var msg = document.getElementById('message');
    msg.textContent = text;
    msg.className = 'message ' + type + ' show';
    
    if (type === 'success') {
        setTimeout(hideMessage, 2000);
    }
}


function hideMessage() {
    document.getElementById('message').classList.remove('show');
}

// Sauvegarder données
function saveGameData() {
    try {
        var data = {
            gridSize: gridSize,
            winCondition: winCondition,
            player1Symbol: player1Symbol,
            player2Symbol: player2Symbol,
            scores: scores
        };
        localStorage.setItem('ticTacToeGame', JSON.stringify(data));
    } catch (e) {
        console.log('Erreur sauvegarde:', e);
    }
}

// Charger données
function loadGameData() {
    try {
        var saved = localStorage.getItem('ticTacToeGame');
        if (saved) {
            var data = JSON.parse(saved);
            gridSize = data.gridSize || 3;
            winCondition = data.winCondition || 3;
            player1Symbol = data.player1Symbol || 'X';
            player2Symbol = data.player2Symbol || 'O';
            scores = data.scores || { player1: 0, player2: 0 };
            
            // Synchroniser les champs
            document.getElementById('live-grid-input').value = gridSize;
            document.getElementById('live-win-input').value = winCondition;
            document.getElementById('live-symbol1-input').value = player1Symbol;
            document.getElementById('live-symbol2-input').value = player2Symbol;
        }
    } catch (e) {
        console.log('Erreur chargement:', e);
    }
}

// Démarrer le jeu
document.addEventListener('DOMContentLoaded', initGame);