const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const BLACK = "black";
const WHITE = "white";
const PATH_MARKER = "path-marker";

const pieceMoveSet =
{
	north: {row:-1, col:0},
	south: {row:1, col:0},
	east: {row:0, col:1},
	west: {row:0, col:-1},
	northEast: {row:-1, col:1},
	northWest: {row:-1, col:-1},
	southWest: {row:1, col:-1},
	southEast: {row:1 , col:1}
}

let userPosition = {row: 4, col: 2};

class Piece
{
	constructor(board ,name, isWhite, position, visualize = true)
	{
		this.board = board;
		this.name = name;
		this.isWhite = isWhite;
		this.colour = isWhite ? WHITE : BLACK;
		this.type = "piece";
		this.sprite = visualize ? this.renderSprite() : null;
		this.position = position;

		this.coords = this.convertToCoords(position);
		this.prePosition = null;
		this.preCoords = null;

		this.pieceStamina = 1;
		this.moveSet = pieceMoveSet;
		this.possibleMoves = this.getPossibleMoves();
		this.moveMarkers = this.getMoveMarkers();
		this.markerElements = null;
		this.pathCoords = this.getPathCoords();
	}

	convertToCoords(rowCol)
	{
		let coords = `${LETTERS[rowCol.col]}${NUMBERS[rowCol.row]}`;
		return coords;
	}

	renderSprite()
	{
		const sprite = document.createElement("div");
		sprite.classList.add(this.colour, this.type);
		sprite.innerText = this.name;
		console.log(`${this.name} has been rendered.`)
		return sprite;
	}

	getPossibleMoves()
	{
		let possibleMoves =[];
		let possiblePosition = null;
		for(let step = 0; step < this.pieceStamina; step++)
		{
			for(let direction in this.moveSet)
			{
				possiblePosition = 
				{
					row: this.position.row + (this.moveSet[direction].row * (step + 1)),
					col: this.position.col + (this.moveSet[direction].col * (step + 1))
				};
				
				if(this.isMoveValid(possiblePosition))
				{
					possibleMoves.push(possiblePosition);
				}
			}
		}
		return possibleMoves;
	}

	getMoveMarkers()
	{
		let moveMarkers = [];
		for(let marker = 0; marker < this.possibleMoves.length; marker++)
		{
			const markerSprite = document.createElement("div");
			markerSprite.classList.add(PATH_MARKER);
			moveMarkers.push(markerSprite);
		}
		return moveMarkers;
	}

	getPathCoords()
	{
		let pathCoords = [];
		for(let marker of this.possibleMoves)
		{
			let coords = `${LETTERS[marker.col]}${NUMBERS[marker.row]}`;
			pathCoords.push(coords);
		}
		console.log(pathCoords);
		return pathCoords;
	}

	isMoveValid(move)
	{
		let moveIsValid = false;
		if(move.row >= 0 && move.row < this.board.size)
		{
			if(move.col >= 0 && move.col < this.board.size)
			{
				moveIsValid = true;
			}
		}
		moveIsValid ? console.log(`The move: {row: ${move.row}, col: ${move.col} is a valid move.`) : console.log(`The move: {row: ${move.row}, col: ${move.col} is NOT a valid move.`)
		return moveIsValid;
	}

	movePiece(move)
	{
		if(moveValidation(move))
		{
			this.prePosition = this.position;
			this.preCoords = this.coords
			this.position = move;
		}
		else
		{
			console.log(`You cannot move ${this.name} to cell ${LETTERS[this.move.col]}${NUMBERS[this.move.row]}`)
		}
	}
}
  
class ChessBoard
{
	constructor(containerID, size, visualize = true)
	{
		this.size = size;
		this.board = this.buildBoard();
		this.boardUI = visualize ? this.renderBoard(containerID) : null;
		this.cellUI = this.makeClickable();
		this.selected = null;
		this.prevSelected = null;
		this.selectedPieceOptions = null;
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
		console.log(`Created a ${this.size} x ${this.size} board.`);
		return board;
	}

	select(target)
	{
		const targetFile = target[0];
		const targetRank = target[1];
		let row = null;
		let col = null;
		for(let letter in LETTERS)
		{
			if(targetFile === LETTERS[letter])
			{
				col = letter;
			}
			for(let number in NUMBERS)
			{
				if(targetFile === LETTERS[letter] && targetRank === NUMBERS[number])
				{
					col = letter;
					row = number;
				}
			}
		}
		let selection = this.board[row][col];
		if(selection != this.selected)
		{
			this.prevSelected = this.selected;
			this.removeMarkers();
		}
		this.selected = selection;
		this.selectPiece(target);
	}

	makeClickable()
	{
		for(let letter of LETTERS)
		{
			for(let number of NUMBERS)
			{
				let cell = this.boardUI.querySelector(`#${letter}${number}`);
				cell.addEventListener("click", (event) =>
				{
					console.log(`Clicked on: ${cell.id}`);
					this.select(cell.id);
				});
			}
		}
	}

	renderBoard(containerID)
	{
		const boardUI = document.createElement("div");
		boardUI.id = containerID;
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
				cell.id = `${LETTERS[col]}${NUMBERS[(NUMBERS.length - 1) - row]}`;
				rowDiv.appendChild(cell);
			}
			boardUI.appendChild(rowDiv);
		}
		document.getElementById("gameview").appendChild(boardUI);
		console.log(`${containerID} board has been rendered.`);
		return boardUI;
	}

	updateBoard(target)
	{
		document.getElementById(target.coords).appendChild(target.sprite);
		
		if(target.prePosition)
		{
			document.getElementById(target.preCoords).getElementsByClassName(target.colour).remove();
			console.log(`${target.name} has moved from cell ${target.preCoords} to ${target.coords}.`);
		}
		else
		{
			console.log(`${target.name} has been set.`)
		}
	}

	displayBoardASCII()
	{
		for(let row of this.board)
		{
			console.log(row);
		}
	}

	setPieces(pieces)
	{
		for(let piece of pieces)
		{
			this.board[piece.position.row][piece.position.col] = piece;
			console.log(`${piece.name} has been set at ${piece.coords}`);
			this.updateBoard(piece);
		}
	}

	setPiece(target)
	{
		this.board[target.position.row][target.position.col] = target;
		console.log(`${target.name} has been set at row: ${target.position.row + 1}, column: ${target.position.col + 1}`);
		this.updateBoard(target);
	}

	removeMarkers()
	{
		const markers = this.boardUI.querySelectorAll(`.${PATH_MARKER}`);
		for(let marker of markers)
		{
			marker.remove();
		}
		console.log("Cleared markers")
	}

	selectPiece(target)
	{
		if(this.selected)
		{
			let selectedPieceOptions = [];
			for(let marker = 0; marker < this.selected.possibleMoves.length; marker++)
			{
				selectedPieceOptions.push(this.selected.pathCoords[marker]);
				document.getElementById(this.selected.pathCoords[marker]).appendChild(this.selected.moveMarkers[marker]);
				this.selectedPieceOptions = selectedPieceOptions;
				console.log(selectedPieceOptions);
			}
		}
		else
		{
			console.log(`At ${target}, there is no piece to select.`);
		}

		
		// if(target.prePosition)
		// {
		// 	document.getElementById(target.preCoords).getElementsByClassName(target.colour).remove();
		// 	console.log(`${target.name} has moved from cell ${target.preCoords} to ${target.coords}.`);
		// }
		// else
		// {
		// 	console.log(`${target.name} has been set.`)
		// }
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


document.addEventListener("DOMContentLoaded", () =>
{
	const game1 = new ChessBoard("Game", 8);
	const pieces =
	[
		aryn = new Piece(game1, "Aryn", true, {row:0, col:4}),

		jeff = new Piece(game1, "Jeff", false, {row:7, col:4}),		
	];
	game1.setPieces(pieces);
	game1.displayBoardASCII();

	const c1 = {row: 1, col:2};
	const c2 = {row:-1, col:-2};

	console.log(`${c1.row} + ${c2.row} = ${c1.row + c2.row}`);
});


//   let target = myArray2D[0][2]; // Get the object instance
  
//   // Move the object to [3][4]
//   moveObject(myArray2D, target, 3, 4);
  
//   // Print the updated array
//   for (let row of myArray2D) {
// 	console.log(row);
//   }