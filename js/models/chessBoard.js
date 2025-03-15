import Pawn from "./pieces/pawn.js";
import King from "./pieces/king.js";
import Queen from "./pieces/queen.js";
import Rook from "./pieces/Rook.js";
import Bishop from "./pieces/bishop.js";
import Knight from "./pieces/knight.js";

class ChessBoard
{
    constructor()
    {
        this.grid = this.startGame();
    }

    drawBoardA()
    {

    }

    startGame()
    {
        //Creating instances of the all black pieces for game
        const bPawns = [];
        for(let col = 0; col < 8; col++)
        {
            bPawns(new Pawn(false, {row:1, col:col}));
        }
        const bKing = new King(false, {row:0, col:4});
        const bQueen = new Queen(false, {row:0, col:3});
        const bRook1 = new Rook(false, {row:0, col:0});
        const bRook2 = new Rook(false, {row:0, col:7});
        const bKnight1 = new Knight(false, {row:0, col:1});
        const bKnight2 = new Knight(false, {row:0, col:6});
        const bBishop1 = new Bishop(false, {row:0, col:2});
        const bBishop2 = new Bishop(false, {row:0, col:5});

        //Creating instances of the all white pieces for game
        const wPawns = [];
        for(let col = 0; col < 8; col++)
        {
            wPawns(new Pawn(true, {row:1, col:col}));
        }
        const wKing = new King(true, {row:7, col:4});
        const wQueen = new Queen(true, {row:7, col:3});
        const wRook1 = new Rook(true, {row:7, col:0});
        const wRook2 = new Rook(true, {row:7, col:7});
        const wKnight1 = new Knight(true, {row:7, col:1});
        const wKnight2 = new Knight(true, {row:7, col:6});
        const wBishop1 = new Bishop(true, {row:7, col:2});
        const wBishop2 = new Bishop(true, {row:7, col:5});

        //Initializes the chess board at the piece position
        const chessBoard =
        [
            [bRook1, bKnight1, bBishop1, bQueen,bKing, bBishop2, bKnight2, bRook2],
            [bPawns],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [wPawns],
            [wRook1, wKnight1, wBishop1, wQueen,wKing, wBishop2, wKnight2, wRook2],
        ];
    }
}

export default ChessBoard;