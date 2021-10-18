//Todo: add event listener to each 'box' for on click, to signify when player clicks
// Create array for each square in gameboard
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
        // Add event listeners to each div. pass the event listener to controller function

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

    // set a property that states whose turn it is
    // alternate turns in for loop until someone wins or it is a tie

    let turnNum = 0;
    const thisArray = gameBoard.boardArray();

    const boxClick = (e) => {
        //console.log(e.target.dataset.number);

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
                console.log(playerOne);
                console.log(playerTwo);
                checkStatus();
            } else {
                thisArray[box] = 'o';
                currBox.textContent = 'o';
                turnNum++;
                checkStatus();
            }
        } 

        //check if box has already been clicked by array value is empty
        //let box = e.target.dataset.index;
        //if not, increase turn num!
        // then in check status, see if turn num is 9, which means game over (tie)
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
            console.log(otherPlayer);
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
    const endGame = () => {

    };


    return {
        boxClick,
        checkStatus,
    };

})();


gameBoard.createBoard();

const playerOne = Player('TestPlayer');
playerOne.current = true;

const playerTwo = Player('SecondPlayer');



