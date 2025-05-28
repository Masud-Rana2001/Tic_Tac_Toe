import React from 'react';
import { useState } from 'react';



const Square = ({ value ,onSquareClick}) => {

  return (
    <button onClick={onSquareClick}
      className="w-20 h-20 border-amber-300   border-4 focus:border-s-fuchsia-500 text-5xl font-bold 
    bg-gradient-to-br from-blue-400 m-1 to-purple-600 text-white 
    rounded-lg shadow-lg hover:scale-105 hover:from-purple-500 hover:to-blue-500 
    transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
    >
      {value}
    </button>
  );
};



function Board({xIsNext,squares,onPlay }) {

 
  
  
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Congratulation Winner :${winner} `
  }else{
    status = `Next Player : ${xIsNext ? 'X' : 'O'}`;
  }
  


  const handleClick = (i) => {
    if (squares[i]  || winner) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares)
  }
  return (
    <>
       
      <div>
        <div>
          <h1 className="text-3xl font-semibold text-white mb-6 text-center">
            {status}
          </h1>
          <div className="flex ">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="flex">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="flex">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>
      </div>
    </>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0;  i < lines.length; i++){
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
  

}


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];


  const handlePlay = (nextSquares) =>{
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0,currentMove+1),nextSquares]
    setHistory( nextHistory)
    setCurrentMove(nextHistory.length -1)
  }
  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 ===0)
  }

  const moves = history.map((squares, move) => { 
    let description;
    if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = 'Go to start the Game';
    }
    return (
      <li key={move}>
        <button
          className="bg-cyan-800 text-white px-4 my-1 py-2 rounded-lg shadow-md hover:bg-gray-400 transition-all duration-200 w-full text-left"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-700 via-black to-emerald-900 text-white  ">
      <h1 className="text-6xl p-2 font-bold text-center 
        
        ">Tic-Tac-Toe</h1>
      <div className="flex  items-center justify-around p-8">
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
      </div>
  );
}