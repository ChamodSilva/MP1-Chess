import Piece from "./piece.js";

class Pawn extends Piece
{
    constructor(isWhite, position)
    {
        super(isWhite, position);
    }

    //Move Validation
    isValidMove(newPosition, board)
    {
        
    }
}

export default Pawn;