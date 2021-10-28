
const gameBoard = (function() {
 
    // Create array with nine blank values
    const boardArray = () => [ , , , , , , , , ];

    // Create game board
    const createBoard = () => {
        let current = 0;
        // Create three rows
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div');
            row.classList.add('row');

            // Create three boxes in each row
            for (let j = 0; j < 3; j++) {
                const div = document.createElement('div');
                div.textContent = boardArray()[current];
                div.classList.add('box');
                div.setAttribute('data-number', current);
                div.addEventListener('click', displayController.boxClick);
                row.appendChild(div);
                current++;
            }
            // Add each box to game board
            const board = document.querySelector('#board');
            board.appendChild(row);
        }
    };

    return {
        boardArray,
        createBoard,
    };

})();

const Player = (name) => {
    // Set this to true or false depending on whose turn it is
    const current = false;

    return {
        name,
        current,
    };
};


const displayController = (function() {

    let turnNum = 0;
    const thisArray = gameBoard.boardArray();

    let playerOne = Player('first');
    let playerTwo = Player('second');

    // Set this value depending on whether there is an active game
    let play = false;

    const boxClick = (e) => {

        // Log which box is being clicked on based on the data-number attribute
        const box = e.target.dataset.number;
        const currBox = document.querySelector(`[data-number='${box}']`);

       // If game is active & box is empty, allow player to make move
       if (play == true) {
            if (thisArray[box] == undefined) {
                if (playerOne.current) {
                    thisArray[box] = "x";
                    currBox.style.color = '#71C8AE'; 
                    currBox.textContent = 'x';
                    turnNum++;
                    checkStatus();
                } else {
                    thisArray[box] = 'o';
                    currBox.style.color = '#D379C2';
                    currBox.textContent = 'o';
                    turnNum++;
                    checkStatus();
                }
            }
        } 
    };

    // Check whether game has been won or tied
    const checkStatus = () => {
        let currentLetter = "";
        let currentPlayer = "";
        let otherPlayer = "";

        // Check which player is currently making a move & set variables accordingly
        if (playerOne.current) {
            currentLetter = 'x';
            currentPlayer = playerOne;
            otherPlayer = playerTwo;
        } else {
            currentLetter = 'o';
            currentPlayer = playerTwo;
            otherPlayer = playerOne;
        }

        const scoreBoard = document.querySelector('#score');

        // Check whether game has been won or tied
        if (checkRow(currentLetter) || checkColumn(currentLetter) || checkDiagonal(currentLetter)) {
            scoreBoard.textContent = `${currentPlayer.name} wins!`;
            play = false;
        } else if (turnNum == 9) {
            scoreBoard.textContent = "It's a tie!";
            play = false;
        } else {
            currentPlayer.current = false;
            otherPlayer.current = true;
        }
    }; 

    // Series of functions to check every game-winning possibility
    const checkRow = (letter) => {
        for (i = 0; i < 9; i += 3) {
            if (thisArray[i] == letter && thisArray[i+1] == letter && thisArray[i+2] == letter) {
                return true;
            } 
        }
    };

    const checkColumn = (letter) => {
        for (i = 0; i < 3; i++) {
            if (thisArray[i] == letter && thisArray[i+3] == letter && thisArray[i+6] == letter) {
                return true;
            }
        }
    };

    const checkDiagonal = (letter) => {
        if (thisArray[0] == letter && thisArray[4] == letter && thisArray[8] == letter) {
            return true;
        } else if (thisArray[2] == letter && thisArray[4] == letter && thisArray[6] == letter) {
            return true;
        }
    }; 

    // Start new game when button is clicked
    const startGame = (event) => {

        event.preventDefault();

        // Prevent empty form from being submitted
        if (document.getElementById('nameOne').value == "" || document.getElementById('nameTwo').value == "") {
            alert("Please fill out every field.");
        } else {
            // Set player names
            playerOne.name = `${document.getElementById('nameOne').value}`;
            playerOne.current = true;
            playerTwo.name = `${document.getElementById('nameTwo').value}`;
  
            // Change display to show player names
            const firstName = document.querySelector('#firstPlayer');
            firstName.textContent = `${document.getElementById('nameOne').value}`;

            const secondName = document.querySelector('#secondPlayer');
            secondName.textContent = `${document.getElementById('nameTwo').value}`;

            // Reset game board
            for (let i = 0; i < 9; i++) {
                thisArray[i] = undefined;
                const thisBox = document.querySelector(`[data-number='${i}']`);
                thisBox.textContent = "";
            }

            // Erase notice of previous winner
            const scoreBoard = document.querySelector('#score');
            scoreBoard.textContent = "";

            // Set 'play' boolean to true & set turn # to 0
            play = true;
            turnNum = 0;
    
            hidePopup();

            // Reset form
            const form = document.getElementById("form");
            form.reset();
        }
    };

    // Display popup
    const displayPopup = () => {
        document.getElementById('formpopup').style.display = "block";
        document.getElementById('modal').style.display = "block";
    };

    // Hide popup
    const hidePopup = () => {
        document.getElementById('formpopup').style.display = "none";
        document.getElementById('modal').style.display = "none";
    };

    return {
        boxClick,
        checkStatus,
        startGame,
        displayPopup,
    };

})();


gameBoard.createBoard();





