// guidlines
// 1. Input Validation: 
//  Before solving the Sudoku puzzle, you can add a validation step 
//  to ensure that the user-entered values are valid. Check if the 
//  input follows the rules of Sudoku, such as having unique numbers
//  in each row, column, and 3x3 subgrid.

// 2. Grid Update: 
//  Modify the updateGrid function to handle input validation and 
//  update the grid accordingly. You can display error messages or 
//  highlight incorrect input to provide feedback to the user.

// 3. Algorithm Integration: 
//  Integrate the Sudoku solving algorithm into the solve Sudoku 
//  function. You can implement a backtracking algorithm in 
//  JavaScript to solve the puzzle. Consider using recursion and 
//  backtracking to explore different possibilities until a valid 
//  solution is found.

// 4. Solver Visualization: 
//  To provide a visual representation of the solving process, 
//  you can add delay between each step of the solver algorithm. 
//  Use setTimeout or setInterval functions to introduce a pause 
//  between each recursive call. This will allow the user to see 
//  the solving progress on the grid.

// 5. Solution Display: 
//  After solving the puzzle, update the grid cells with the solved 
//  values in the solveSudoku function. You can change the text 
//  color and background color to distinguish the solved cells from 
//  the user input cells.

// 6. Multiple Solutions: 
//  If you want to handle cases where there are multiple valid 
//  solutions, you can modify the solver algorithm to find and 
//  display all possible solutions. This could involve tracking 
//  and backtracking through different branches of the solution 
//  space.

// 7. Error Handling: 
//  Implement proper error handling and messages for edge cases or 
//  invalid input, such as when the solver algorithm fails to find 
//  a valid solution or the input puzzle is unsolvable.

// 8. User Interactions: 
//  Consider adding additional functionalities like a "Clear" 
//  button to reset the grid or the ability for users to edit 
//  their input after solving.





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
            const userInput = parseInt(cell.innerText) || 0;
            const isConflict = checkConflict(i, j, userInput);
            
            if (isConflict) {
                cell.style.backgroundColor = "red";
                document.getElementById("error").innerHTML = "red";
            } else {
                cell.style.backgroundColor = "white";
                document.getElementById("error").innerHTML = "white";
            }

            grid[i][j] = userInput;
        }
    }
}

function checkConflict(row, col, value) {
    // Check for conflicts in the same row
    for (let j = 0; j < 9; j++) {
        if (j !== col && grid[row][j] === userInput) {
            return true;
        }
    }

    // Check for conflicts in the same column
    for (let i = 0; i < 9; i++) {
        if (i !== row && grid[i][col] === userInput) {
            return true;
        }
    }

    // Check for conflicts in the same 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if ((i !== row || j !== col) && grid[i][j] === userInput) {
                return true;
            }
        }
    }

    return false;

    // Checks Value in Row
    // function isValueInRow(row, value) {
    //     const rowValues = grid[row];
    //     return rowValues.includes(value);
    // }
    // // Checks Value in Col
    // function isValueInCol(col, value) {
    //     return grid.some(row => row[col] === value);
    // }
    // // Checks Value in Subgrid
    // function isValueInSubgrid(row, col, value) {
    //     const subgridRowStart = Math.floor(row/3) * 3;
    //     const subgridColStart = Math.floow(col/3) * 3;
    //     for (let i=0; i<3; i++) {
    //         for (let j=0; j<3; j++) {
    //             if (grid[subgridRowStart+i][subgridColStart+j]===value) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false
    // }

    
}

// -----
// Solve
// -----
// Function to solve the Sudoku puzzle using backtracking
function solveSudoku() {
    // Implementation of Sudoku solver algorithm in Python/Pygame


    // Display the Solved Grid
    for (let i=0; i<9; i++) {
        for (let j=0; j<9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            cell.innerText = solvedGrid[i][j];
            cell.style.color = "black";
            cell.style.backgroundColor = "lightgreen"
        }
    }
}

// Display Solution
// function displaySolution {}