"use strict";

//module pattern:
// const gameBoard = (() => {
    
// })();


const gameBoard = (() => {
    const marksArray = ["","","","","","","","",""];

    const addMark = (position, mark) => {
        marksArray[index] = mark;
    };
    const resetGrid = () => {
        for(let i = 0; i < marksArray.length; i++) {
            marksArray[i] = "";
        }
    }

})();

const UIChanger = (() => {
    const gridSquares = document.querySelectorAll(".game-grid-square");

})();