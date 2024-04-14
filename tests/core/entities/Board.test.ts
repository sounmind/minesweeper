import { Board, CellNotFoundError } from "../../../src/core/entities/Board";
import { GameState } from "../../../src/core/entities/IBoard";
import { CellState } from "../../../src/core/entities/ICell";

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
});

describe("openCell", () => {
  test("openCell", () => {
    // Arrange
    const config = { rows: 10, columns: 10, totalMines: 10 };
    const board = new Board(config);

    // Act
    board.openCell(0, 0);

    // Assert
    expect(board.getCell(0, 0).getState()).toBe(CellState.Opened);
  });

  test.each([
    [-1, 0],
    [0, -1],
    [10, 0],
    [0, 10],
  ])("throw error when opening cell out of bounds", (x, y) => {
    // Arrange
    const config = { rows: 10, columns: 10, totalMines: 10 };
    const board = new Board(config);

    // Act
    // Assert
    expect(() => board.openCell(x, y)).toThrow(CellNotFoundError);
  });

  describe("toggleCellFlag", () => {
    test("toggleCellFlag", () => {
      // Arrange
      const config = { rows: 10, columns: 10, totalMines: 10 };
      const board = new Board(config);

      // Act
      board.toggleCellFlag(0, 0);

      // Assert
      expect(board.getCell(0, 0).getState()).toBe(CellState.Flagged);
    });

    test("toggleCellFlag", () => {
      // Arrange
      const config = { rows: 10, columns: 10, totalMines: 10 };
      const board = new Board(config);

      // Act
      board.toggleCellFlag(0, 0);
      board.toggleCellFlag(0, 0);

      // Assert
      expect(board.getCell(0, 0).getState()).toBe(CellState.Closed);
    });

    test.each([
      [-1, 0],
      [0, -1],
      [10, 0],
      [0, 10],
    ])("throw error when toggling cell flag out of bounds", (x, y) => {
      // Arrange
      const config = { rows: 10, columns: 10, totalMines: 10 };
      const board = new Board(config);

      // Act
      // Assert
      expect(() => board.toggleCellFlag(x, y)).toThrow(CellNotFoundError);
    });
  });
});
