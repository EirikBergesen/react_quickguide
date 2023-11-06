// https://react.dev/learn/tutorial-tic-tac-toe

// usestate is a special fuction that you can call from a component
// to allow it to 'remember things'
import { useState } from "react";

// Default keyword tells other files this is 
// the main function of this file

// export keyword makes this function available outside of 
// this file


/*

This code creates a react component. 
In React, a component is a piece of reusable code that 
represents a part of a user interface. 
Components are used to render, manage, and update the 
UI elements in your application. 

export default function Square() {
  return <button className="square">X</button>;
  / This returns a button. <button> is a jsx element
  / square is a css class, classname is css styling
}
*/

function Board( { xIsNext, squares, onPlay }) {
  // State is a way to store data in a component
  // private to that component
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [xIsNext, setxIsNext] = useState(true);

  const winner = calculateVinner(squares);
  let status;
  if (winner) {
    status = "Winner is: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(squareIndex) {
    if (squares[squareIndex] || calculateVinner(squares)) {
      return;
    }
    const nextSquares = [...squares];
    // nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[squareIndex] = 'X';
    }
    else {
      nextSquares[squareIndex] = 'O';
    }
    onPlay(nextSquares)
  }
    
    // setxIsNext(!xIsNext);
    // setSquares(newSquares);
    // setSquare will re-render component, as well as child components, board, and squares
  

  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
    </>
    /*
    fragments <></> are used to return multiple adjacent jsx elements
    */
  );
}

// function Square({ value }) { // { value } indicates this component can be passed a prop called value
  // Functions need to start with capital letters.

function Square({ value, onSquareClick }) {
  return <button
    className="square"
    onClick={onSquareClick}
    >
      {value}
  </button>
  /*
  // null here is a initial value
  const [value, setValue] = useState(null);
  

  function handleClick() {
    console.log('Clicked!');
    setValue('X');
  }
  return (
    <button
      className="square"
      onClick={handleClick}
      >
      {value}
    </button>
  );
  */
}
// function calculateVinner(squares) {
const calculateVinner = (squares) => {
  const winningLines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // column 1
    [1, 4, 7], // column 2
    [2, 5, 8], // column 3
    [0, 4, 8], // diagonal 1
    [2, 4, 6] // diagonal 2
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    const sign = squares[a]
    if (squares[b] === sign && squares[c] === sign) {
      return sign
    }
  }
  return null;
}



export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;


  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    // ...history is syntax for, enumerate all items in history
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)
  }

  
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }


  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      /*
      'key' is a special and preserved property in react.
      when an element is created, react extracts the key property and stores the key 
      directly on the returned element.
      React automatically uses key to decide which components to update.

      It’s strongly recommended that you assign proper keys whenever you build dynamic lists.
      If you don’t have an appropriate key, you may want to consider restructuring your data so that you do.

      If no key is specified, React will report an error and use the array index as a key by default.
      Using the array index as a key is problematic when trying to re-order a list’s items or inserting/removing list items.
      Explicitly passing key={i} silences the error but has the same problems as array indices and is not recommended in most cases.

      Keys do not need to be globally unique; they only need to be unique between components and their siblings.
      */
      <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
    
  });


  return (
    <div
      className="game"
      >
        <div
        className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div
          className="game-info"
          >
            <ol>{moves}</ol>
          </div>
      </div>
  )
}