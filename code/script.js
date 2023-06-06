// Create initial empyty grid
let grid = Array.from({length: 9}, () => Array({length: 9}, () => 0));

// --------------
// Grid Generator
// --------------
const gridContainer = document.getElementById("grid");
for (let i=0; i<9; i++) {
    const row = document.createElement("tr");
    for (let j=0; j<9; j++) {
        const cell = document.createElement("td");
        cell.id = `cell-${i}-${j}`
        cell.contentEditable = true;
        cell.addEventListener("input", updateGrid);
        
        //  add class to every 3rd row/col cell
        if ((i%3 === 0) && (i !== 0)) {
            cell.classList.add("thick-row")
        }
        if ((j%3 === 0) && (j !== 0)) {
            cell.classList.add("thick-col");
        }
        
        row.appendChild(cell);
    }
    gridContainer.appendChild(row);
}

// -----------
// Grid Update
// -----------
function updateGrid() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            // puts 0 if no number is entered in that cell
            const userInput = parseInt(cell.innerText) || 0;
            const isConflict = checkConflict(i, j, userInput);
            
            if (isConflict) {
                cell.style.backgroundColor = "red";
            } else {
                cell.style.backgroundColor = "white";
            }

            grid[i][j] = userInput;
        }
    }
}

function checkConflict(row, col, value) {
    // Check for conflicts in the same row or column
    for (let i = 0; i < 9; i++) {
        if (value !== 0 && ((i !== col && grid[row][i] === value) || (i !== row && grid[i][col] === value))) {
            return true; // Conflict found
        }
    }

    // Check for conflicts in the same 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (value !== 0 && ((i !== row || j !== col) && grid[i][j] === value)) {
                return true; // Conflict found
            }
        }
    }

    return false; // No conflict found
}

// -----
// Solve
// -----
// Function to solve the Sudoku puzzle using backtracking//
function solveSudoku() {
    // Start solving from the top-left cell
    const startingRow = 0;
    const startingCol = 0;

    // Call the recursive solve function
    if (solveRecursive(startingRow, startingCol)) {
        // Puzzle solved successfully
        console.log("Sudoku puzzle solved!");
        displaySolution();
    } else {
        // Puzzle cannot be solved
        console.log("No solution found for the Sudoku puzzle.");
    }
}

// Recursive function to solve the Sudoku puzzle
function solveRecursive(row, col) {
    // Base case: If all cells have been filled, the puzzle is solved
    if (row === 9) {
        return true;
    }

    // Calculate the next row and column indices
    let nextRow = row;
    let nextCol = col + 1;
    if (nextCol === 9) {
        // Move to the next row if the end of the current row is reached
        nextRow = row + 1;
        nextCol = 0;
    }

    // If the current cell is not empty, move to the next cell
    if (grid[row][col] !== 0) {
        return solveRecursive(nextRow, nextCol);
    }

    // Try different numbers in the current cell
    for (let num = 1; num <= 9; num++) {
        // Check if the number is valid in the current cell
        if (isValidMove(row, col, num)) {
            // Assign the number to the current cell
            grid[row][col] = num;

            // Recursively solve the puzzle starting from the next cell
            if (solveRecursive(nextRow, nextCol)) {
                return true; // Puzzle solved
            }

            // If the puzzle cannot be solved with the current number, backtrack
            grid[row][col] = 0; // Reset the current cell
        }
    }

    // No valid number found for the current cell, backtrack
    return false;
}

// Function to check if a number can be placed in a cell without conflicts
function isValidMove(row, col, num) {
    // Check for conflicts in the same row or column
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num) {
            return false; // Conflict found
        }
    }

    // Check for conflicts in the same 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (grid[i][j] === num) {
                return false; // Conflict found
            }
        }
    }

    return true; // No conflict found
}

// Display the solved Sudoku grid
function displaySolution() {
    const gridContainer = document.getElementById("grid");
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            const userInput = parseInt(cell.innerText) || 0;
            if (userInput !== grid[i][j]) {
                cell.innerText = grid[i][j].toString();
                cell.style.color = "blue";
                cell.style.backgroundColor = "lightgreen";
            }
        }
    }
}

// -----
// Clear
// -----
// Get the clear button element
const clearButton = document.getElementById("clearButton");
// Add a click event listener to the clear button
clearButton.addEventListener("click", clearGrid);

// Function to clear the Sudoku grid
function clearGrid() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            cell.innerText = ""; // Clear the cell content
            cell.style.color = "black"; // Reset the cell color
            cell.style.backgroundColor = "white"; // Reset the cell background color
            grid[i][j] = 0; // Reset the grid value
        }
    }
}
