const SIZE = 9;
const UNASSIGNED = 0;
let board = [];
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

// Función principal para resolver el Sudoku 
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
  }
}
function isValidSudoku(board) {
  // Verificar filas y columnas
  for (let i = 0; i < SIZE; i++) {
    let rowSet = new Set();
    let colSet = new Set();
    for (let j = 0; j < SIZE; j++) {
      if (board[i][j] !== UNASSIGNED) {
        if (rowSet.has(board[i][j])) return false;
        rowSet.add(board[i][j]);
      }
      if (board[j][i] !== UNASSIGNED) {
        if (colSet.has(board[j][i])) return false;
        colSet.add(board[j][i]);
      }
    }
  }

  // Verificar subcuadrículas 3x3
  for (let row = 0; row < SIZE; row += 3) {
    for (let col = 0; col < SIZE; col += 3) {
      let boxSet = new Set();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let current = board[row + i][col + j];
          if (current !== UNASSIGNED) {
            if (boxSet.has(current)) return false;
            boxSet.add(current);
          }
        }
      }
    }
  }

  return true;
}

function solucion(tablero) {
  console.log('Entra en solucion');
  // Validar Sudoku antes de intentar resolverlo
  if (!isValidSudoku(tablero)) {
    return null;
  }
  // Resuelve el Sudoku y imprime los cambios
  if (solveSudoku(tablero)) {
    printBoard(tablero);
    return tablero;
  } else {
    return null;
  }
}

