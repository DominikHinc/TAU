import JSA from "javascript-astar";

const { Graph, astar } = JSA;

const ROWS = 10;
const COLS = 10;
const NUMBER_OF_OBSTACLES = 20;
export const START = "A";
export const STOP = "B";
export const OBSTACLE = "X";
export const EMPTY = " ";
export const PlAYER = "P";

const stdin = process.stdin;
if (!(process.env.JEST_WORKER_ID !== undefined)) {
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");
}

// Find path from start to stop using A* algorithm, to ensure board is solvable
export function findPath(board, start, stop) {
  const graph = new Graph(
    board.map((row) => row.map((cell) => (cell === OBSTACLE ? 0 : 1)))
  );
  const startNode = graph.grid[start.row][start.col];
  const endNode = graph.grid[stop.row][stop.col];
  const result = astar.search(graph, startNode, endNode);

  return result.map((node) => ({ row: node.x, col: node.y }));
}

// Generate board with start and stop points, obstacles and path between start and stop
export function generateBoard(rows, cols, numberOfObstacles) {
  let board = Array.from({ length: rows }, () => Array(cols).fill(EMPTY));

  const startRow = Math.floor((Math.random() * rows) % Math.floor(rows / 2)); // Row of the start point - placed in the first half of the board
  const startCol = Math.floor((Math.random() * cols) % Math.floor(cols / 2)); // Column of the start point - placed in the first half of the board
  const stopRow = Math.floor(
    ((Math.random() * rows) % (rows / 2)) + Math.floor(rows / 2)
  ); // Row of the stop point - placed in the second half of the board
  const stopCol = Math.floor(
    ((Math.random() * cols) % (cols / 2)) + Math.floor(cols / 2)
  ); // Column of the stop point - placed in the second half of the board

  board[startRow][startCol] = START;
  board[stopRow][stopCol] = STOP;

  const path = findPath(
    board,
    { row: startRow, col: startCol },
    { row: stopRow, col: stopCol }
  );

  for (let placedObstacles = 0; placedObstacles < numberOfObstacles; ) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (
      board[row][col] === EMPTY &&
      !path.some((point) => point.row === row && point.col === col)
    ) {
      board[row][col] = OBSTACLE;
      placedObstacles++;
    }
  }

  return {
    board,
    start: { row: startRow, col: startCol },
    stop: { row: stopRow, col: stopCol },
  };
}

export function printBoard(board) {
  const topBottomBorder = "-".repeat(board[0].length * 2 + 1);
  console.log(topBottomBorder);
  for (let row of board) {
    console.log(`|${row.join(" ")}|`);
  }
  console.log(topBottomBorder);
}

export function spawnPlayer(board, player) {
  board[player.row][player.col] = PlAYER;
}

export function spawnWalkableIndicators(board, start, stop) {
  board[start.row][start.col] = START;
  board[stop.row][stop.col] = STOP;
}

export function movePlayer(board, player, direction) {
  switch (direction) {
    case "up":
      if (player.row > 0 && board[player.row - 1][player.col] !== OBSTACLE) {
        board[player.row][player.col] = EMPTY;
        player.row--;
      }
      break;
    case "down":
      if (
        player.row < board.length - 1 &&
        board[player.row + 1][player.col] !== OBSTACLE
      ) {
        board[player.row][player.col] = EMPTY;
        player.row++;
      }
      break;
    case "left":
      if (player.col > 0 && board[player.row][player.col - 1] !== OBSTACLE) {
        board[player.row][player.col] = EMPTY;
        player.col--;
      }
      break;
    case "right":
      if (
        player.col < board[0].length - 1 &&
        board[player.row][player.col + 1] !== OBSTACLE
      ) {
        board[player.row][player.col] = EMPTY;
        player.col++;
      }
      break;
  }
}

export function isGameOver(player, stop) {
  return player.row === stop.row && player.col === stop.col;
}

export function clearScreen() {
  console.clear();
}

export function readDirection() {
  return new Promise((resolve) => {
    console.log("Use arrow keys to move the player. To exit press Ctrl + C");
    stdin.on("data", function (key) {
      if (key == "\u001B\u005B\u0041") {
        stdin.removeAllListeners("data");
        resolve("up");
      }
      if (key == "\u001B\u005B\u0043") {
        stdin.removeAllListeners("data");
        resolve("right");
      }
      if (key == "\u001B\u005B\u0042") {
        stdin.removeAllListeners("data");
        resolve("down");
      }
      if (key == "\u001B\u005B\u0044") {
        stdin.removeAllListeners("data");
        resolve("left");
      }

      if (key == "\u0003") {
        // Ctrl + C
        process.exit();
      }
    });
  });
}

async function main() {
  console.log("MAIN");
  const board = generateBoard(ROWS, COLS, NUMBER_OF_OBSTACLES);
  const player = { row: board.start.row, col: board.start.col };
  const stop = { row: board.stop.row, col: board.stop.col };

  spawnPlayer(board.board, player);

  while (!isGameOver(player, stop)) {
    clearScreen();
    printBoard(board.board);
    const direction = await readDirection();
    movePlayer(board.board, player, direction);
    spawnWalkableIndicators(board.board, board.start, board.stop);
    spawnPlayer(board.board, player);
  }

  clearScreen();
  printBoard(board.board);
  console.log("You won!");
  process.exit();
}

!(process.env.JEST_WORKER_ID !== undefined) && main();
