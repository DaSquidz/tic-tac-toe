"use strict";

const gameBoard = (() => {
    let currentMark = "O";
    const gridSquares = document.querySelectorAll(".game-grid-square");
    const restartButton = document.getElementById('restart-btn');
    const marksArray = ["","","","","","","","",""];
  
    const drawArrayToGrid = () => {
      for(let i = 0; i < marksArray.length; i++) {
        gridSquares[i].innerText = marksArray[i];
      };
    };
    const addMark = (position, mark) => {
        if(position <= 8 && marksArray[position] === ""  && gameManager.gameOver === false) {
          marksArray[position] = mark;
          drawArrayToGrid();
          gameManager.checkVictory();
          if(gameManager.gameOver === true) return;
          changeCurrentMark();
        };
    };
    const resetArray = () => {
        for(let i = 0; i < marksArray.length; i++) {
            marksArray[i] = "";
          drawArrayToGrid();
          gameManager.gameOver = false;
          currentMark = "O";
          if(UIManager.playerBoxes[1].classList.contains("current-turn")) UIManager.changeTurnIndication();
        };
      UIManager.playerBoxes[0].innerText = `Player 1`;
      UIManager.playerBoxes[1].innerText = `Player 2`;
    };
    const setUserInput = () => {
      for(let i = 0; i < gridSquares.length; i++) {
        gridSquares[i].addEventListener("click", () => 
                                        addMark(i, currentMark));
      };
    };
    const restartGame = () => {
      restartButton.addEventListener("click", () => resetArray());
    };
    const changeCurrentMark = () => {
      if (currentMark === "O") {
        currentMark = "X";
        UIManager.changeTurnIndication();
      }
      else {
        currentMark = "O";
        UIManager.changeTurnIndication();
      };
    };
  
    return {
      gridSquares,
      marksArray,
      addMark,
      resetArray,
      setUserInput,
      restartGame,
      currentMark,
    };
})();

const gameManager = (() => {
  let gameOver = false;
  const checkVictory = () => {
    //For the love of god please refactor this monstrosity later
    if (gameBoard.marksArray[0] === gameBoard.marksArray[1] && gameBoard.marksArray[0] === gameBoard.marksArray[2] && gameBoard.marksArray[0] !== ""
       ||
        gameBoard.marksArray[3] === gameBoard.marksArray[4] && gameBoard.marksArray[3] === gameBoard.marksArray[5] && gameBoard.marksArray[3] !== ""
       ||
       gameBoard.marksArray[6] === gameBoard.marksArray[7] && gameBoard.marksArray[6] === gameBoard.marksArray[8] && gameBoard.marksArray[6] !== ""
       ||
       gameBoard.marksArray[0] === gameBoard.marksArray[4] && gameBoard.marksArray[0] === gameBoard.marksArray[8] && gameBoard.marksArray[0] !== ""
       ||
       gameBoard.marksArray[2] === gameBoard.marksArray[4] && gameBoard.marksArray[2] === gameBoard.marksArray[6] && gameBoard.marksArray[2] !== ""
       ||
       gameBoard.marksArray[0] === gameBoard.marksArray[3] && gameBoard.marksArray[0] === gameBoard.marksArray[6] && gameBoard.marksArray[0] !== ""
       ||
       gameBoard.marksArray[1] === gameBoard.marksArray[4] && gameBoard.marksArray[1] === gameBoard.marksArray[7] && gameBoard.marksArray[1] !== ""
       ||
       gameBoard.marksArray[2] === gameBoard.marksArray[5] && gameBoard.marksArray[2] === gameBoard.marksArray[8] && gameBoard.marksArray[2] !== "") {
      gameManager.gameOver = true;
      UIManager.playerBoxes[0].classList.contains("current-turn") ? UIManager.playerBoxes[0].innerText = `Player 1
      👑` : UIManager.playerBoxes[1].innerText = `Player 2
      👑`;
    }
    else if (gameBoard.marksArray[0] !== "" &&
            gameBoard.marksArray[1] !== "" &&
            gameBoard.marksArray[2] !== "" &&
            gameBoard.marksArray[3] !== "" &&
            gameBoard.marksArray[4] !== "" &&
            gameBoard.marksArray[5] !== "" &&
            gameBoard.marksArray[6] !== "" &&
            gameBoard.marksArray[7] !== "" &&
            gameBoard.marksArray[8] !== "") {
      console.log("It's a draw!");
      gameManager.gameOver = true;
      UIManager.playerBoxes[0].innerText = `Player 1
      ✔️`;
      UIManager.playerBoxes[1].innerText = `Player 2
      ✔️`;
    };
  };
  return {
    checkVictory,
    gameOver,
  };
})();

const UIManager = (() => {
  const playerBoxes = document.querySelectorAll(".player-box");
  
  const changeTurnIndication = () => playerBoxes.forEach(e => e.classList.toggle("current-turn"));
  
  return {
    changeTurnIndication,
    playerBoxes,
  }
})();

gameBoard.setUserInput();
gameBoard.restartGame();