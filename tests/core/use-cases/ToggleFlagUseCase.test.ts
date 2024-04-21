import { CannotFlagOpenedCellError } from "../../../src/core/entities/Cell";
import type { IBoard } from "../../../src/core/entities/IBoard";
import { CellState, type ICell } from "../../../src/core/entities/ICell";
import type { IToggleFlagUseCase } from "../../../src/core/use-cases/interfaces";
import { ToggleFlagUseCase } from "../../../src/core/use-cases/ToggleFlagUseCase";

let board: IBoard;
let cells: ICell[][];
let toggleFlagUseCase: IToggleFlagUseCase;

beforeEach(() => {
  // Create a grid of cells
  cells = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => ({
      open: jest.fn(),
      getState: jest.fn(() => CellState.Closed),
      isMine: jest.fn(() => false),
      toggleFlag: jest.fn(),
    })),
  );

  // Set up the board
  board = {
    getCell: jest.fn((x, y) => cells[x][y]),
    openCell: jest.fn(),
    getGrid: jest.fn(() => cells),
    getGameState: jest.fn(),
    toggleCellFlag: jest.fn((x, y) => {
      cells[x][y].toggleFlag();
    }),
  };

  toggleFlagUseCase = new ToggleFlagUseCase(board);
});

describe("Case 1: Cannot Toggle", () => {
  test("Cannot toggle flag on a cell that is already opened", () => {
    // Arrange
    cells[1][1].getState = jest.fn(() => CellState.Opened);

    // Act
    // Assert
    expect(() => toggleFlagUseCase.execute(1, 1)).toThrow(CannotFlagOpenedCellError);
    expect(() => toggleFlagUseCase.execute(1, 1)).toThrow("Cannot flag an opened cell.");
  });
});
