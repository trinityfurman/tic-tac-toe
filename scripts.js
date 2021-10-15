
// Create array for each square in gameboard
const gameBoard = (function() {

    // Create row with three values
    const createRow = () => {
        const obj = {
            0: "1",
            1: "1",
            2: "1",
        };
        return obj;
    };
    
    // Create array with three rows
    const boardArray = () => [createRow(), createRow(), createRow()];

    // Create board connected to array?
    const createBoard = () => {
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div');
            row.classList.add('row');

            for (let j = 0; j < 3; j++) {
                const div = document.createElement('div');
                div.textContent = boardArray()[i][j];
                div.classList.add('box');
                row.appendChild(div);
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

};

gameBoard.createBoard();
