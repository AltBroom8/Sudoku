const SIZE = 9;
const UNASSIGNED = 0;

// Función para encontrar una celda vacía en el tablero
function findUnassignedLocation(board) {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (board[row][col] === UNASSIGNED) {
        return { row, col };
      }
    }
  }
  return null;
}

// Función para verificar si un número puede ser colocado en una celda
function isSafe(board, row, col, num) {
  // Verificar la fila
  for (let x = 0; x < SIZE; x++) {
    if (board[row][x] === num) {
      return false;
    }
  }

  // Verificar la columna
  for (let x = 0; x < SIZE; x++) {
    if (board[x][col] === num) {
      return false;
    }
  }

  // Verificar la subcuadrícula 3x3
  const startRow = row - row % 3;
  const startCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;
}

// Función principal para resolver el Sudoku utilizando backtracking
function solveSudoku(board) {
  const unassignedLocation = findUnassignedLocation(board);
  if (!unassignedLocation) {
    return true; // No hay celdas vacías, el Sudoku está resuelto
  }

  const { row, col } = unassignedLocation;

  for (let num = 1; num <= SIZE; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;

      if (solveSudoku(board)) {
        return true;
      }

      board[row][col] = UNASSIGNED;
    }
  }

  return false; // Disparador de backtracking
}

// Función para imprimir el tablero de Sudoku
function printBoard(board) {
  for (let row = 0; row < SIZE; row++) {
    let line = "";
    for (let col = 0; col < SIZE; col++) {
      line += board[row][col] + " ";
    }
    console.log(line);
  }
}

// Tablero de Sudoku de ejemplo (0 representa una celda vacía)
const board = [
  [0, 0, 1, 0, 0, 5, 0, 0, 0],
  [0, 0, 0, 6, 0, 0, 0, 0, 0],
  [0, 6, 4, 0, 0, 0, 3, 0, 2],
  [0, 3, 6, 1, 0, 0, 9, 7, 0],
  [0, 1, 5, 4, 0, 0, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0, 8],
  [0, 0, 2, 0, 0, 6, 0, 0, 0],
  [4, 9, 0, 0, 0, 0, 0, 0, 6],
  [0, 0, 0, 0, 0, 7, 5, 0, 0]
  
];

// Resuelve el Sudoku y imprime el tablero resuelto
if (solveSudoku(board)) {
  console.log("Sudoku resuelto:");
  printBoard(board);
} else {
  console.log("No se puede resolver el Sudoku");
}
