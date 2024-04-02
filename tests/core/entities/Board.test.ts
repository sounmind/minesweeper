import {
  Board,
  CELL_NOT_FOUND_ERROR_MESSAGE,
  CellNotFoundError,
} from "../../../src/core/entities/Board";
import { GameState } from "../../../src/core/entities/IBoard";

test("initialize with the correct state", () => {
  // Arrange
  const config = { rows: 10, columns: 10, totalMines: 10 };

  // Act
  const board = new Board(config);

  // Assert
  expect(board.getGameState()).toBe(GameState.Ongoing);
});

test("initialize with the correct grid", () => {
  // Arrange
  const config = { rows: 10, columns: 10, totalMines: 10 };

  // Act
  const board = new Board(config);

  // Assert
  expect(board.getCell(0, 0)).toBeDefined();
  expect(board.getCell(0, 9)).toBeDefined();
  expect(board.getCell(9, 0)).toBeDefined();
  expect(board.getCell(9, 9)).toBeDefined();
});

test.each([
  [-1, 0],
  [0, -1],
  [10, 0],
  [0, 10],
])("throw error when getting cell out of bounds", (x, y) => {
  // Arrange
  const config = { rows: 10, columns: 10, totalMines: 10 };
  const board = new Board(config);

  // Act
  // Assert
  expect(() => board.getCell(x, y)).toThrow(CellNotFoundError);
  expect(() => board.getAdjacentMinesCount(x, y)).toThrow(CELL_NOT_FOUND_ERROR_MESSAGE);
});

describe("getAdjacentMinesCount", () => {
  test("should return the correct number of adjacent mines for a cell", () => {
    // Arrange
    const config = { rows: 3, columns: 3, totalMines: 1 };
    const board = new Board(config);
    const [x, y] = [1, 1];

    // Act
    const adjacentCells = [];

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= config.rows || ny < 0 || ny >= config.columns) {
          continue;
        }
        adjacentCells.push(board.getCell(nx, ny));
      }
    }
    const expected = adjacentCells.filter((cell) => cell.isMine()).length;
    const actual = board.getAdjacentMinesCount(x, y);

    // Assert
    expect(actual).toBe(expected);
  });

  test.each([
    [-1, 0],
    [0, -1],
    [10, 0],
    [0, 10],
  ])("should not count mines outside the grid", (x, y) => {
    // Arrange
    const config = { rows: 3, columns: 3, totalMines: 1 };
    const board = new Board(config);

    // Act
    // Assert
    expect(() => board.getAdjacentMinesCount(x, y)).toThrow(CellNotFoundError);
    expect(() => board.getAdjacentMinesCount(x, y)).toThrow(CELL_NOT_FOUND_ERROR_MESSAGE);
  });
});
