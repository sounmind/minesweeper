import {
  CANNOT_FLAG_OPENED_CELL_ERROR_MESSAGE,
  CANNOT_OPEN_OPENED_CELL_ERROR_MESSAGE,
  CannotFlagOpenedCellError,
  CannotOpenOpenedCellError,
  Cell,
} from "../../src/entities/Cell";
import { CellState } from "../../src/entities/interfaces/ICell";

describe("should initialize with the correct state", () => {
  test("should initialize with the correct state when it is a mine", () => {
    // Arrange
    const isMine = true;
    const cell = new Cell({ isMine });

    // Act
    const isCellMine = cell.isMine();

    // Assert
    expect(isCellMine).toBe(isMine);
  });

  test("should initialize with the correct state when it is not a mine", () => {
    // Arrange
    const isMine = false;
    const cell = new Cell({ isMine });

    // Act
    const isCellMine = cell.isMine();

    // Assert
    expect(isCellMine).toBe(isMine);
  });

  test("should initialize with the correct state when it is closed", () => {
    // Arrange
    const isMine = false;
    const cell = new Cell({ isMine });

    // Act
    const state = cell.getState();

    // Assert
    expect(state).toBe(CellState.Closed);
  });

  test("should initialize with the correct state when it is flagged", () => {
    // Arrange
    const isMine = false;
    const cell = new Cell({ isMine });

    // Act
    cell.toggleFlag();
    const state = cell.getState();

    // Assert
    expect(state).toBe(CellState.Flagged);
  });
});

describe("when change the state of a cell", () => {
  test("should open correctly", () => {
    // Arrange
    const isMine = false;
    const cell = new Cell({ isMine });

    // Act
    cell.open();
    const state = cell.getState();

    // Assert
    expect(state).toBe(CellState.Opened);
  });

  test("should flag correctly", () => {
    // Arrange
    const isMine = false;
    const cell = new Cell({ isMine });

    // Act
    cell.toggleFlag();
    const state = cell.getState();

    // Assert
    expect(state).toBe(CellState.Flagged);
  });

  test("should unflag correctly", () => {
    // Arrange
    const isMine = false;
    const cell = new Cell({ isMine });

    // Act
    cell.toggleFlag();
    cell.toggleFlag();
    const state = cell.getState();

    // Assert
    expect(state).toBe(CellState.Closed);
  });
});

describe("when a cell is opened", () => {
  const isMine = false;

  test("should not be able to open a cell that is already opened", () => {
    // Arrange
    const cell = new Cell({ isMine });

    // Act
    cell.open();

    // Assert
    expect(() => cell.open()).toThrow(CannotOpenOpenedCellError);
    expect(() => cell.open()).toThrow(CANNOT_OPEN_OPENED_CELL_ERROR_MESSAGE);
  });

  test("should not be able to toggle a flag on an opened cell", () => {
    // Arrange
    const cell = new Cell({ isMine });

    // Act
    cell.open();

    // Assert
    expect(() => cell.toggleFlag()).toThrow(CannotFlagOpenedCellError);
    expect(() => cell.toggleFlag()).toThrow(CANNOT_FLAG_OPENED_CELL_ERROR_MESSAGE);
  });
});
