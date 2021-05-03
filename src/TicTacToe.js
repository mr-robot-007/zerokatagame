import { useContext, useState } from "react";
import { BoardContext } from "./App";
import produce from "immer";
import React from "react";
// import { createProxy } from "immer/dist/internal";



function TicTacToe() {

  let { board, setBoard } = useContext(BoardContext);
  let [player, setPlayer] = useState("O");
  let steps = 0;

  let checkWinner = (board) => {
    const lines = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [[a, b], [c, d], [e, f]] = lines[i];
      if (board[a][b] === board[c][d] &&
        board[c][d] === board[e][f] &&
        board[e][f] !== -1) {
        return player;
      }
    }
    return null;

  };
  return (
    <div id="root" style={{
      display: "flex",
      width: "100vw",
      height: "100vh",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

    }}>
      <h1>Zero Kata Game </h1>
      <h1>{player}'s Turn </h1>
      {
        board.map(function (row, rowIndex) {
          return (
            <div style={{
              display: "flex",
              flexDirection: "row",
            }}>
              {
                row.map(function (item, colIndex) {
                  return <button style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor : "cyan",
                    borderRadius : "10px",

                  }} onClick={function () {
                    const updated = produce(board, draftState => {
                      if (draftState[rowIndex][colIndex] === -1) {
                        draftState[rowIndex][colIndex] = player;
                      }

                    });
                    steps++;
                    setBoard(updated);
                    let answer = checkWinner(updated);
                    if (answer === null && steps === 9) {
                      window.alert(
                        "Unfortunately the game is Tied. Try once more ! :)"
                      );
                      window.location.reload();
                    }
                    else if (answer === "X" || answer === "O") {
                      window.alert(
                        "Congratulations " + answer + " You won "
                      );
                      window.location.reload();
                    }
                    if(item === -1 ){
                    setPlayer(player === "O" ? "X" : "O");
                  }

                  }}>
                    {item === -1 ? " " : item}</button>
                })
              }
            </div>
          )


        })
      }
      <h4>This game is created by <a href = "https://instagram.com/anuj_gusain108" alt = "" target ="_blank" rel = "noreferrer">Anuj Gusain</a></h4>
    </div>
  );
}


export default TicTacToe;
