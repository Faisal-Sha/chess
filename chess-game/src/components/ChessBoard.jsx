// import React, { useState } from 'react';

// const ChessBoard = () => {
//   const initialBoard = [
//     ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
//     ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
//     ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
//   ];

//   const [board, setBoard] = useState(initialBoard);
//   const [selectedPiece, setSelectedPiece] = useState(null);
//   const [currentPlayer, setCurrentPlayer] = useState('white');
//   const [validMoves, setValidMoves] = useState([]);

//   // Move validation functions
//   const isInsideBoard = (row, col) => {
//     return row >= 0 && row < 8 && col >= 0 && col < 8;
//   };

//   const isOpponentPiece = (piece1, piece2) => {
//     return (piece1 === piece1.toUpperCase()) !== (piece2 === piece2.toUpperCase());
//   };

//   const isPathClear = (fromRow, fromCol, toRow, toCol) => {
//     const rowStep = fromRow === toRow ? 0 : (toRow - fromRow) / Math.abs(toRow - fromRow);
//     const colStep = fromCol === toCol ? 0 : (toCol - fromCol) / Math.abs(toCol - fromCol);

//     let currentRow = fromRow + rowStep;
//     let currentCol = fromCol + colStep;

//     while (currentRow !== toRow || currentCol !== toCol) {
//       if (board[currentRow][currentCol]) return false;
//       currentRow += rowStep;
//       currentCol += colStep;
//     }

//     return true;
//   };

//   const isValidMove = (fromRow, fromCol, toRow, toCol, piece) => {
//     if (!isInsideBoard(toRow, toCol)) return false;
    
//     const pieceType = piece.toLowerCase();
//     const targetPiece = board[toRow][toCol];
    
//     // Can't capture own piece
//     if (targetPiece && !isOpponentPiece(piece, targetPiece)) return false;

//     switch (pieceType) {
//       case 'p': // Pawn
//         const direction = piece === piece.toUpperCase() ? -1 : 1;
//         const startRow = piece === piece.toUpperCase() ? 6 : 1;

//         // Regular move
//         if (fromCol === toCol && !targetPiece) {
//           if (toRow === fromRow + direction) return true;
//           // Initial two-square move
//           if (fromRow === startRow && 
//               toRow === fromRow + 2 * direction && 
//               !board[fromRow + direction][fromCol]) {
//             return true;
//           }
//         }

//         // Capture move
//         if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow + direction) {
//           if (targetPiece && isOpponentPiece(piece, targetPiece)) {
//             return true;
//           }
//         }
//         return false;

//       case 'r': // Rook
//         if (fromRow !== toRow && fromCol !== toCol) return false;
//         return isPathClear(fromRow, fromCol, toRow, toCol);

//       case 'n': // Knight
//         const rowDiff = Math.abs(toRow - fromRow);
//         const colDiff = Math.abs(toCol - fromCol);
//         return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);

//       case 'b': // Bishop
//         if (Math.abs(toRow - fromRow) !== Math.abs(toCol - fromCol)) return false;
//         return isPathClear(fromRow, fromCol, toRow, toCol);

//       case 'q': // Queen
//         if ((fromRow !== toRow && fromCol !== toCol) && 
//             (Math.abs(toRow - fromRow) !== Math.abs(toCol - fromCol))) return false;
//         return isPathClear(fromRow, fromCol, toRow, toCol);

//       case 'k': // King
//         return Math.abs(toRow - fromRow) <= 1 && Math.abs(toCol - fromCol) <= 1;

//       default:
//         return false;
//     }
//   };

//   const calculateValidMoves = (row, col) => {
//     const piece = board[row][col];
//     const moves = [];

//     // Check all possible positions
//     for (let i = 0; i < 8; i++) {
//       for (let j = 0; j < 8; j++) {
//         if (isValidMove(row, col, i, j, piece)) {
//           moves.push([i, j]);
//         }
//       }
//     }

//     return moves;
//   };

//   const isCurrentPlayerPiece = (piece) => {
//     if (!piece) return false;
//     return currentPlayer === 'white' ? piece === piece.toUpperCase() : piece === piece.toLowerCase();
//   };

//   const handleSquareClick = (row, col) => {
//     const piece = board[row][col];

//     if (selectedPiece) {
//       const [selectedRow, selectedCol] = selectedPiece;
//       const isValidMoveTarget = validMoves.some(([r, c]) => r === row && c === col);

//       if (isValidMoveTarget) {
//         // Make the move
//         const newBoard = board.map(row => [...row]);
//         newBoard[row][col] = board[selectedRow][selectedCol];
//         newBoard[selectedRow][selectedCol] = '';
        
//         setBoard(newBoard);
//         setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
//         setSelectedPiece(null);
//         setValidMoves([]);
//       } else if (isCurrentPlayerPiece(piece)) {
//         setSelectedPiece([row, col]);
//         setValidMoves(calculateValidMoves(row, col));
//       } else {
//         setSelectedPiece(null);
//         setValidMoves([]);
//       }
//     } else if (isCurrentPlayerPiece(piece)) {
//       setSelectedPiece([row, col]);
//       setValidMoves(calculateValidMoves(row, col));
//     }
//   };

//   const getSquareColor = (row, col) => {
//     const isSelected = selectedPiece && selectedPiece[0] === row && selectedPiece[1] === col;
//     const isValidMove = validMoves.some(([r, c]) => r === row && c === col);

//     if (isSelected) return 'bg-blue-400';
//     if (isValidMove) return 'bg-green-300';
//     return (row + col) % 2 === 0 ? 'bg-gray-200' : 'bg-gray-600';
//   };

//   const getPieceSymbol = (piece) => {
//     const symbols = {
//       'k': '♔', 'q': '♕', 'r': '♖', 'b': '♗', 'n': '♘', 'p': '♙',
//       'K': '♚', 'Q': '♛', 'R': '♜', 'B': '♝', 'N': '♞', 'P': '♟'
//     };
//     return symbols[piece] || '';
//   };

//   return (
//     <div className="flex flex-col items-center p-4">
//       <div className="mb-4 text-xl">
//         Current Player: {currentPlayer}
//       </div>
//       <div className="inline-block border-2 border-gray-800">
//         {board.map((row, rowIndex) => (
//           <div key={rowIndex} className="flex">
//             {row.map((piece, colIndex) => (
//               <div
//                 key={`${rowIndex}-${colIndex}`}
//                 className={`w-16 h-16 flex items-center justify-center ${getSquareColor(rowIndex, colIndex)}`}
//                 onClick={() => handleSquareClick(rowIndex, colIndex)}
//               >
//                 <span className={`text-4xl ${piece.toUpperCase() === piece ? 'text-white' : 'text-black'}`}>
//                   {getPieceSymbol(piece)}
//                 </span>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChessBoard;



import React, { useState, useEffect } from 'react';

const ChessBoard = () => {
  const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  ];

  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [validMoves, setValidMoves] = useState([]);

  // Move validation functions (kept from previous implementation)
  const isInsideBoard = (row, col) => {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  };

  const isOpponentPiece = (piece1, piece2) => {
    return (piece1 === piece1.toUpperCase()) !== (piece2 === piece2.toUpperCase());
  };

  const isPathClear = (fromRow, fromCol, toRow, toCol) => {
    const rowStep = fromRow === toRow ? 0 : (toRow - fromRow) / Math.abs(toRow - fromRow);
    const colStep = fromCol === toCol ? 0 : (toCol - fromCol) / Math.abs(toCol - fromCol);

    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;

    while (currentRow !== toRow || currentCol !== toCol) {
      if (board[currentRow][currentCol]) return false;
      currentRow += rowStep;
      currentCol += colStep;
    }

    return true;
  };

  const isValidMove = (fromRow, fromCol, toRow, toCol, piece) => {
    if (!isInsideBoard(toRow, toCol)) return false;
    
    const pieceType = piece.toLowerCase();
    const targetPiece = board[toRow][toCol];
    
    // Can't capture own piece
    if (targetPiece && !isOpponentPiece(piece, targetPiece)) return false;

    switch (pieceType) {
      case 'p': // Pawn
        const direction = piece === piece.toUpperCase() ? -1 : 1;
        const startRow = piece === piece.toUpperCase() ? 6 : 1;

        // Regular move
        if (fromCol === toCol && !targetPiece) {
          if (toRow === fromRow + direction) return true;
          // Initial two-square move
          if (fromRow === startRow && 
              toRow === fromRow + 2 * direction && 
              !board[fromRow + direction][fromCol]) {
            return true;
          }
        }

        // Capture move
        if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow + direction) {
          if (targetPiece && isOpponentPiece(piece, targetPiece)) {
            return true;
          }
        }
        return false;

      case 'r': // Rook
        if (fromRow !== toRow && fromCol !== toCol) return false;
        return isPathClear(fromRow, fromCol, toRow, toCol);

      case 'n': // Knight
        const rowDiff = Math.abs(toRow - fromRow);
        const colDiff = Math.abs(toCol - fromCol);
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);

      case 'b': // Bishop
        if (Math.abs(toRow - fromRow) !== Math.abs(toCol - fromCol)) return false;
        return isPathClear(fromRow, fromCol, toRow, toCol);

      case 'q': // Queen
        if ((fromRow !== toRow && fromCol !== toCol) && 
            (Math.abs(toRow - fromRow) !== Math.abs(toCol - fromCol))) return false;
        return isPathClear(fromRow, fromCol, toRow, toCol);

      case 'k': // King
        return Math.abs(toRow - fromRow) <= 1 && Math.abs(toCol - fromCol) <= 1;

      default:
        return false;
    }
  };

  const calculateValidMoves = (row, col) => {
    const piece = board[row][col];
    const moves = [];

    // Check all possible positions
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (isValidMove(row, col, i, j, piece)) {
          moves.push([i, j]);
        }
      }
    }

    return moves;
  };

  const isCurrentPlayerPiece = (piece) => {
    if (!piece) return false;
    return currentPlayer === 'white' ? piece === piece.toUpperCase() : piece === piece.toLowerCase();
  };
  const handleSquareClick = (row, col) => {
    const piece = board[row][col];

    if (currentPlayer === 'white') {
      if (selectedPiece) {
        const [selectedRow, selectedCol] = selectedPiece;
        const isValidMoveTarget = validMoves.some(([r, c]) => r === row && c === col);

        if (isValidMoveTarget) {
          // Make the move
          const newBoard = board.map(row => [...row]);
          newBoard[row][col] = board[selectedRow][selectedCol];
          newBoard[selectedRow][selectedCol] = '';
          
          setBoard(newBoard);
          setCurrentPlayer('black');
          setSelectedPiece(null);
          setValidMoves([]);
        } else if (isCurrentPlayerPiece(piece)) {
          setSelectedPiece([row, col]);
          setValidMoves(calculateValidMoves(row, col));
        } else {
          setSelectedPiece(null);
          setValidMoves([]);
        }
      } else if (isCurrentPlayerPiece(piece)) {
        setSelectedPiece([row, col]);
        setValidMoves(calculateValidMoves(row, col));
      }
    }
  };

  const getSquareColor = (row, col) => {
    const isSelected = selectedPiece && selectedPiece[0] === row && selectedPiece[1] === col;
    const isValidMove = validMoves.some(([r, c]) => r === row && c === col);

    if (isSelected) return 'bg-blue-400';
    if (isValidMove) return 'bg-green-300';
    return (row + col) % 2 === 0 ? 'bg-gray-200' : 'bg-gray-600';
  };

    const getPieceSymbol = (piece) => {
    const symbols = {
      'k': '♔', 'q': '♕', 'r': '♖', 'b': '♗', 'n': '♘', 'p': '♙',
      'K': '♚', 'Q': '♛', 'R': '♜', 'B': '♝', 'N': '♞', 'P': '♟'
    };
    return symbols[piece] || '';
  };

  const getComputerMove = () => {
    // Get all valid moves for the computer
    const validMovesForComputer = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece === piece.toLowerCase()) { // Computer's piece (black)
          const moves = calculateValidMoves(row, col);
          moves.forEach(([r, c]) => validMovesForComputer.push([row, col, r, c]));
        }
      }
    }

    // Choose a random move for the computer
    if (validMovesForComputer.length > 0) {
      const randomMove = validMovesForComputer[Math.floor(Math.random() * validMovesForComputer.length)];
      return randomMove;
    }

    return null; // No valid moves
  };

  const computerMove = () => {
    const move = getComputerMove();
    if (move) {
      const [fromRow, fromCol, toRow, toCol] = move;
      const newBoard = board.map(row => [...row]);
      newBoard[toRow][toCol] = board[fromRow][fromCol];
      newBoard[fromRow][fromCol] = '';
      
      setBoard(newBoard);
      setCurrentPlayer('white');
    }
  };

  useEffect(() => {
    if (currentPlayer === 'black') {
      setTimeout(() => {
        computerMove();
      }, 500); // Add a slight delay for the computer move
    }
  }, [currentPlayer]);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4 text-xl">
        Current Player: {currentPlayer}
      </div>
      <div className="inline-block border-2 border-gray-800">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((piece, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-16 h-16 flex items-center justify-center ${getSquareColor(rowIndex, colIndex)}`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                <span className={`text-4xl ${piece.toUpperCase() === piece ? 'text-white' : 'text-black'}`}>
                  {getPieceSymbol(piece)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChessBoard;
