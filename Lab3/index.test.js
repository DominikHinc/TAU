import {
  findPath,
  generateBoard,
  isGameOver,
  movePlayer,
  spawnPlayer,
  spawnWalkableIndicators,
  EMPTY,
  OBSTACLE,
  PlAYER,
  START,
  STOP,
} from "./index";

describe("Lab3", () => {
  describe("generateBoard", () => {
    it.each([
      [5, 5],
      [5, 10],
      [10, 5],
      [10, 10],
    ])(
      "should generate a board with the correct dimensions- %s x %s",
      (rows, cols) => {
        const { board } = generateBoard(rows, cols, 0);
        expect(board.length).toBe(rows);
        expect(board[0].length).toBe(cols);
      },
    );

    it.each([
      [5, 5],
      [5, 10],
      [10, 5],
      [10, 10],
    ])(
      "should generate start point in the first half of the board and end in the second part - %s x %s",
      (rows, cols) => {
        const { start, stop } = generateBoard(rows, cols, 0);
        expect(start.row).toBeLessThan(rows / 2);
        expect(start.col).toBeLessThan(cols / 2);
        expect(stop.row).toBeGreaterThanOrEqual(Math.floor(rows / 2));
        expect(stop.col).toBeGreaterThanOrEqual(Math.floor(cols / 2));
      },
    );
  });
  describe("findPath", () => {
    it("should return a path between start and stop points", () => {
      const board = [
        [EMPTY, OBSTACLE, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, OBSTACLE, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, OBSTACLE, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, OBSTACLE],
      ];
      const start = { row: 0, col: 0 };
      const stop = { row: 3, col: 4 };
      board[start.row][start.col] = START;
      board[stop.row][stop.col] = STOP;
      const path = findPath(board, start, stop);
      expect(path).toEqual([
        { row: 1, col: 0 },
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
        { row: 3, col: 2 },
        { row: 3, col: 3 },
        { row: 3, col: 4 },
      ]);
    });
  });
  describe("isGameOver", () => {
    it("should return true when the player reaches the stop point", () => {
      const stop = { row: 3, col: 4 };
      const player = { row: 1, col: 0 };
      expect(isGameOver(player, stop)).toBe(false);
      player.row = 3;
      player.col = 4;
      expect(isGameOver(player, stop)).toBe(true);
    });
  });
  describe("movePlayer", () => {
    it("should move the player to the new position", () => {
      const board = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, PlAYER, EMPTY],
        [EMPTY, EMPTY, EMPTY],
      ];
      const player = { row: 1, col: 1 };
      movePlayer(board, player, "right");
      expect(player).toEqual({ row: 1, col: 2 });
    });

    it("should not move the player to the new position if it is an obstacle", () => {
      const board = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, PlAYER, OBSTACLE],
        [EMPTY, EMPTY, EMPTY],
      ];
      const player = { row: 1, col: 1 };
      movePlayer(board, player, "right");
      expect(player).toEqual({ row: 1, col: 1 });
    });

    it("should not move the player to the new position if it is out of bounds", () => {
      const board = [
        [EMPTY, EMPTY],
        [EMPTY, PlAYER],
      ];
      const player = { row: 1, col: 1 };
      movePlayer(board, player, "right");
      expect(player).toEqual({ row: 1, col: 1 });
    });
  });
  describe("spawnPlayer", () => {
    it("should spawn the player on the board", () => {
      const board = [
        [EMPTY, EMPTY],
        [EMPTY, EMPTY],
      ];
      const player = { row: 1, col: 1 };
      spawnPlayer(board, player);
      expect(board).toEqual([
        [EMPTY, EMPTY],
        [EMPTY, PlAYER],
      ]);
    });
  });
  describe("spawnWalkableIndicators", () => {
    it("should spawn the start and stop points on the board", () => {
      const board = [
        [EMPTY, EMPTY],
        [EMPTY, EMPTY],
      ];
      const start = { row: 0, col: 0 };
      const stop = { row: 1, col: 1 };
      spawnWalkableIndicators(board, start, stop);
      expect(board).toEqual([
        [START, EMPTY],
        [EMPTY, STOP],
      ]);
    });
  });
});
