
// Todo: ensure players can't add marker after game is won 
// Add button to start/restart game
// Update interface
const gameBoard = (function() {
 
    // Create array with three rows
    const boardArray = () => [ , , , , , , , , ];

    // Create board connected to array?
    const createBoard = () => {
        let current = 0;
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div');
            row.classList.add('row');

            for (let j = 0; j < 3; j++) {
                const div = document.createElement('div');
                div.textContent = boardArray()[current];
                div.classList.add('box');
                div.setAttribute('data-number', current);
                // Figure out what function to attach on click
                div.addEventListener('click', displayController.boxClick);
                row.appendChild(div);
                current++;
            }
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
 
    // set this to true or false depending on whose turn it is
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

    //let playerOne = "";
    //let playerTwo = "";


    const boxClick = (e) => {

 
        // Log which box is being clicked on based on the data-number attribute
        const box = e.target.dataset.number;

        //thisArray[box] = 'x';
        //console.log(thisArray[box]);
        // The below two lines WORK
        const currBox = document.querySelector(`[data-number='${box}']`);
        //currBox.textContent = 'x';

       //Check if chosen box is free
       if (thisArray[box] == undefined) {
            if (playerOne.current) {
                thisArray[box] = "x";
                currBox.textContent = 'x';
                turnNum++;
                checkStatus();
            } else {
                thisArray[box] = 'o';
                currBox.textContent = 'o';
                turnNum++;
                checkStatus();
            }
        } 
    };

    const checkStatus = () => {
        let currentLetter = "";
        let currentPlayer = "";
        let otherPlayer = "";

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

        if (checkRow(currentLetter) || checkColumn(currentLetter) || checkDiagonal(currentLetter)) {
            //trigger game win function w congrats message to current player
            scoreBoard.textContent = `${currentPlayer.name} wins!`;
        } else if (turnNum == 9) {
            scoreBoard.textContent = "It's a tie!";
        } else {
            currentPlayer.current = false;
            otherPlayer.current = true;
            // do feature where player's name lights up to signify turn?
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

    // When game is over, display winner and reset
    const startGame = (event) => {

        event.preventDefault();

        // Prevent empty form from being submitted
        if (document.getElementById('nameOne').value == "" || document.getElementById('nameTwo').value == "") {
            alert("Please fill out every field.");
        } else {

            // Create new book object based on info from form
            playerOne.name = `${document.getElementById('nameOne').value}`;
            playerOne.current = true;
            playerTwo.name = `${document.getElementById('nameTwo').value}`;
  
            const firstName = document.querySelector('#firstPlayer');
            firstName.textContent = `${document.getElementById('nameOne').value}`;

            const secondName = document.querySelector('#secondPlayer');
            secondName.textContent = `${document.getElementById('nameTwo').value}`;
    
            // Add new book to library array and create table
            hidePopup();

            // Reset form
            const form = document.getElementById("form");
            form.reset();

            return [playerOne, playerTwo];

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



//const playerOne = Player('TestPlayer');
//playerOne.current = true;

//const playerTwo = Player('SecondPlayer');



