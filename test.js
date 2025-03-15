class Piece
{
	constructor(name, position)
	{
		this.name = name;
		this.position = position;
	}
}
  
class ChessBoard
{
	constructor(size)
	{
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

	displayBoard()
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
		this.displayBoard();
	}
}

  function moveObject(array2D, targetObject, newRow, newCol) {
	// Find the current position of the target object
	let currentRow = -1;
	let currentCol = -1;
  
	for (let row = 0; row < array2D.length; row++) {
	  for (let col = 0; col < array2D[row].length; col++) {
		if (array2D[row][col] === targetObject) {
		  currentRow = row;
		  currentCol = col;
		  break;
		}
	  }
	  if (currentRow !== -1) {
		break;
	  }
	}
  
	// If the object was found, move it
	if (currentRow !== -1) {
	  // Set the current position to null
	  array2D[currentRow][currentCol] = null;
  
	  // Set the new position to the target object
	  array2D[newRow][newCol] = targetObject;
	} else {
	  console.log("Object not found in the array.");
	}
  }

// Example usage
let myArray2D = [
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
	[null, null, null, null, null, null],
];
  
const game1 = new ChessBoard(5);
const jeff = new Piece("Jeff", {row:2, col:2});

game1.displayBoard();
game1.setPiece(jeff);

//   let target = myArray2D[0][2]; // Get the object instance
  
//   // Move the object to [3][4]
//   moveObject(myArray2D, target, 3, 4);
  
//   // Print the updated array
//   for (let row of myArray2D) {
// 	console.log(row);
//   }