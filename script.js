
document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll('.cell');
    const winnerPopup = document.getElementById('winnerPopup');
    const winnerName = document.getElementById('winnerName');
    const restartBtn = document.getElementById('restartBtn');
    const startBtn = document.getElementById('startBtn');
    const player1NameInput = document.getElementById('player1Name');
    const player2NameInput = document.getElementById('player2Name');
    const playerTurn = document.getElementById('playerTurn');
    const singlePlayerBtn = document.getElementById('singlePlayerBtn');
    const twoPlayerBtn = document.getElementById('twoPlayerBtn');
    const startMenu = document.getElementById('startMenu');
    const playerNames = document.getElementById('playerNames');
    const gameBoard = document.getElementById('gameBoard');
    
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let player1Name = '';
    let player2Name = '';
    let gameMode = ''; 


    singlePlayerBtn.addEventListener('click', () => {
        gameMode = 'single';
        startMenu.style.display = 'none';
        playerNames.style.display = 'block';
        player2NameInput.style.display = 'none'; 
    });

    twoPlayerBtn.addEventListener('click', () => {
        gameMode = 'two';
        startMenu.style.display = 'none';
        playerNames.style.display = 'block';
        player2NameInput.style.display = 'inline-block'; 
    });

    startBtn.addEventListener('click', () => {
        player1Name = player1NameInput.value || 'Player 1';
        
       
        if (gameMode === 'single') {
            player2Name = 'Bot 🤖';
        } else {
            player2Name = player2NameInput.value || 'Player 2';
        }

        playerTurn.textContent = `Current Turn: ${player1Name}`;
        startGame();
    });

    function startGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.addEventListener('click', cellClick, { once: true });
        });
        winnerPopup.style.display = 'none';
        playerNames.style.display = 'none';
        gameBoard.style.display = 'grid';
        board = ['', '', '', '', '', '', '', '', ''];
        if (gameMode === 'single' && currentPlayer === 'O') {
            botMove(); 
        }
    }

    function cellClick(e) {
        const cellIndex = Array.from(cells).indexOf(e.target);
        board[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWin()) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerTurn.textContent = `Current Turn: ${currentPlayer === 'X' ? player1Name : player2Name}`;
            if (gameMode === 'single' && currentPlayer === 'O') {
                botMove(); 
            }
        }
    }

    function checkWin() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winConditions.some(condition => {
            if (board[condition[0]] && board[condition[0]] === board[condition[1]] && board[condition[0]] === board[condition[2]]) {
                return true;
            }
        });
    }

    function isDraw() {
        return board.every(cell => cell !== '');
    }

    function endGame(draw) {
       
        setTimeout(() => {
            if (draw) {
                winnerName.textContent = "It's a Draw!";
            } else {
                winnerName.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} Wins!`;
            }
            winnerPopup.style.display = 'flex'; 
        }, 1000); 
    }
    
    function botMove() {
        setTimeout(() => {
            let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
            let randomMove = availableCells[Math.floor(Math.random() * availableCells.length)];
            board[randomMove] = 'O';
            cells[randomMove].textContent = 'O';
            if (checkWin()) {
                endGame(false);
            } else if (isDraw()) {
                endGame(true);
            } else {
                currentPlayer = 'X';
                playerTurn.textContent = `Current Turn: ${player1Name}`;
            }
        }, 500); 
    }

    
    restartBtn.addEventListener('click', () => {
        winnerPopup.style.display = 'none';
        startMenu.style.display = 'none';  
        playerNames.style.display = 'none';  
        gameBoard.style.display = 'none';  

        
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];

        
        if (gameMode === 'single') {
            
            playerTurn.textContent = `Current Turn: ${player1Name}`;
            startGame();
        } else if (gameMode === 'two') {
            
            playerTurn.textContent = `Current Turn: ${player1Name}`;
            startGame();
        }
    });
});





