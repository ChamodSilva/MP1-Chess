const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

class Piece
{
	constructor(name, position)
	{
		this.name = name;
		this.position = position;
		this.coords = this.getCoords();
	}

	getCoords()
	{
		let coords = `${letters[this.position.col]}${numbers[this.position.row]}`;
		return coords;
	}
}
  
class ChessBoard
{
	constructor(containerID, size)
	{
		this.boardUI = document.getElementById(containerID);
		this.size = size;
		this.board = this.buildBoard();
		console.log(`Created a ${size} x ${size} board.`);
	}

	buildBoard()
	{
		let board = [];

		for(let i = 0; i < this.size; i++)
		{
			let row = [];
			for(let j = 0; j < this.size; j++)
			{
				row.push(null);
			}
			board.push(row);
		}
		return board;
	}

	renderBoard()
	{
		console.log("started renderBoard()");
		for(let row = 0; row < this.size; row++)
		{
			const rowDiv = document.createElement("div");
			rowDiv.classList.add("row", "no-gutters");

			for(let col = 0; col < this.size; col++)
			{
				const cell = document.createElement("div");
				cell.classList.add("col", "cell");

				if((row + col) % 2 === 0)
				{
					cell.classList.add("light");
				}
				else
				{
					cell.classList.add("dark");
				}
				cell.id = `${letters[col]}${numbers[(numbers.length - 1) - row]}`;
				rowDiv.appendChild(cell)
			}
			this.boardUI.appendChild(rowDiv);
		}
	}

	updateBoard()
	{

	}

	displayBoardASCII()
	{
		for(let row of this.board)
		{
			console.log(row);
		}
	}

	setPiece(target)
	{
		this.board[target.position.row][target.position.col] = target;
		console.log(`${target.name} has been set at row: ${target.position.row + 1}, column: ${target.position.col + 1}`);
		this.updateBoard();
	}
}

function moveObject(array2D, targetObject, newRow, newCol)
{
	// Find the current position of the target object
	let currentRow = -1;
	let currentCol = -1;

	for (let row = 0; row < array2D.length; row++)
	{
		for (let col = 0; col < array2D[row].length; col++)
		{
			if (array2D[row][col] === targetObject)
			{
				currentRow = row;
				currentCol = col;
				break;
			}
		}	
		if (currentRow !== -1)
		{
			break;
		}
	}

	// If the object was found, move it
	if (currentRow !== -1)
	{
		// Set the current position to null
		array2D[currentRow][currentCol] = null;

		// Set the new position to the target object
		array2D[newRow][newCol] = targetObject;
	}
	else
	{
		console.log("Object not found in the array.");
	}
}

// Example usage
let myArray2D =
[
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
];

const boardContainerID = "board-container";
const jeff = new Piece("Jeff", {row:2, col:2});
const aryn = new Piece("Aryn", {row:1, col:2});

document.addEventListener("DOMContentLoaded", () =>
{
	const game1 = new ChessBoard(boardContainerID, 8);
	game1.renderBoard();
	game1.displayBoardASCII();
	game1.setPiece(jeff);
	game1.setPiece(aryn);
	console.log(aryn.getCoords());
});


//   let target = myArray2D[0][2]; // Get the object instance
  
//   // Move the object to [3][4]
//   moveObject(myArray2D, target, 3, 4);
  
//   // Print the updated array
//   for (let row of myArray2D) {
// 	console.log(row);
//   }