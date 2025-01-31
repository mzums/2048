const gameContainer = document.querySelector('.game-container');
const message = document.getElementById('game-message');
let grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function generateTile() {
  const emptyTiles = [];
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0) emptyTiles.push([x, y]);
    });
  });

  if (emptyTiles.length === 0) return;

  const [x, y] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  grid[y][x] = Math.random() < 0.9 ? 2 : 4;

  updateUI();
}

function updateUI() {
  gameContainer.innerHTML = '';
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      if (cell) {
        tile.classList.add(`tile-${cell}`);
        tile.textContent = cell;
      }
      tile.dataset.x = x;
      tile.dataset.y = y;
      gameContainer.appendChild(tile);
    });
  });
}

function moveTiles(direction) {
  let moved = false;
  if (direction === 'up') {
    for (let x = 0; x < 4; x++) {
      let newRow = [];
      for (let y = 0; y < 4; y++) {
        if (grid[y][x] !== 0) newRow.push(grid[y][x]);
      }
      newRow = combine(newRow);
      for (let y = 0; y < 4; y++) {
        grid[y][x] = newRow[y] || 0;
      }
    }
  } else if (direction === 'down') {
    for (let x = 0; x < 4; x++) {
      let newRow = [];
      for (let y = 3; y >= 0; y--) {
        if (grid[y][x] !== 0) newRow.push(grid[y][x]);
      }
      newRow = combine(newRow);
      for (let y = 3; y >= 0; y--) {
        grid[y][x] = newRow[3 - y] || 0;
      }
    }
  } else if (direction === 'left') {
    for (let y = 0; y < 4; y++) {
      let newRow = [];
      for (let x = 0; x < 4; x++) {
        if (grid[y][x] !== 0) newRow.push(grid[y][x]);
      }
      newRow = combine(newRow);
      for (let x = 0; x < 4; x++) {
        grid[y][x] = newRow[x] || 0;
      }
    }
  } else if (direction === 'right') {
    for (let y = 0; y < 4; y++) {
      let newRow = [];
      for (let x = 3; x >= 0; x--) {
        if (grid[y][x] !== 0) newRow.push(grid[y][x]);
      }
      newRow = combine(newRow);
      for (let x = 3; x >= 0; x--) {
        grid[y][x] = newRow[3 - x] || 0;
      }
    }
  }
  updateUI();
  generateTile();
}

function combine(row) {
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      i++;
    }
  }
  return row.filter(num => num !== 0);
}

function checkGameOver() {
  const isGameOver = grid.every((row, y) => {
    return row.every((cell, x) => {
      if (cell === 0) return false;
      if (y < 3 && grid[y + 1][x] === cell) return false;
      if (x < 3 && grid[y][x + 1] === cell) return false;
      return true;
    });
  });
  if (isGameOver) {
    message.textContent = 'Game Over!';
    message.style.display = 'block';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') moveTiles('up');
  if (e.key === 'ArrowDown') moveTiles('down');
  if (e.key === 'ArrowLeft') moveTiles('left');
  if (e.key === 'ArrowRight') moveTiles('right');
  checkGameOver();
});

generateTile();
