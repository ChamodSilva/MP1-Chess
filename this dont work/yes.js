document.addEventListener('DOMContentLoaded', () => {
    const gridSize = 8;
    const container = document.getElementById('chessboard-container');
  
    for (let row = 0; row < gridSize; row++) {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row', 'no-gutters');
  
      for (let col = 0; col < gridSize; col++) {
        const cell = document.createElement('div');
        cell.classList.add('col', 'chessboard-cell');
  
        if ((row + col) % 2 === 0) {
          cell.classList.add('white');
        } else {
          cell.classList.add('black');
        }
  
        rowDiv.appendChild(cell);
      }
      container.appendChild(rowDiv);
    }
  });