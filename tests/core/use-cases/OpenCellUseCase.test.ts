import type { IBoard } from "../../../src/core/entities/IBoard";
import { type ICell, CellState } from "../../../src/core/entities/ICell";
import type { IOpenCellUseCase } from "../../../src/core/use-cases/interfaces";
import { OpenCellUseCase } from "../../../src/core/use-cases/OpenCellUseCase";

describe("OpenCellUseCase", () => {
  let board: IBoard;
  let cells: ICell[][];
  let openCellUseCase: IOpenCellUseCase;

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

    cells.forEach((row) =>
      row.forEach((cell) => {
        cell.open = jest.fn(() => {
          cell.getState = jest.fn(() => CellState.Opened);
        });
      }),
    );

    // Set up the board
    board = {
      getCell: jest.fn((x, y) => cells[x][y]),
      openCell: jest.fn((x, y) => {
        cells[x][y].open();
      }),
      getGrid: jest.fn(() => cells),
      getGameState: jest.fn(),
      toggleCellFlag: jest.fn(),
    };

    openCellUseCase = new OpenCellUseCase(board);
  });

  test("should open only the clicked cell if it has adjacent mines", () => {
    // Simulate a cell with adjacent mines
    cells[1][1].isMine = jest.fn(() => false);
    cells[0][1].isMine = jest.fn(() => true);
    openCellUseCase.execute(1, 1);
    expect(cells[1][1].open).toHaveBeenCalled();
    expect(cells[0][1].open).not.toHaveBeenCalled();
  });

  test("should recursively open all adjacent cells until cells with adjacent mines are found", () => {
    cells[2][2].isMine = jest.fn(() => false);
    cells[0][0].isMine = jest.fn(() => true);
    openCellUseCase.execute(2, 2);

    cells.forEach((row, x) =>
      row.forEach((cell, y) => {
        if (x !== 0 || y !== 0) {
          expect(cell.open).toHaveBeenCalled();
        }
      }),
    );
  });
});
