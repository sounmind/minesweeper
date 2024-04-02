import { CellConfiguration, CellState, ICell } from "./ICell";

export class Cell implements ICell {
  private _state: CellState;
  private _isMine: boolean;

  constructor({ isMine }: CellConfiguration) {
    this._state = CellState.Closed;
    this._isMine = isMine;
  }

  public getState(): CellState {
    return this._state;
  }

  public isMine(): boolean {
    return this._isMine;
  }

  public open(): void {
    if (this._state === CellState.Opened) {
      throw new CannotOpenOpenedCellError();
    }

    this._state = CellState.Opened;
  }

  public toggleFlag(): void {
    if (this._state === CellState.Opened) {
      throw new CannotFlagOpenedCellError();
    }

    if (this._state === CellState.Closed) {
      this._state = CellState.Flagged;
    } else if (this._state === CellState.Flagged) {
      this._state = CellState.Closed;
    }
  }
}

export const CANNOT_OPEN_OPENED_CELL_ERROR_MESSAGE = "Cannot open an opened cell.";
export class CannotOpenOpenedCellError extends Error {
  constructor(message: string = CANNOT_OPEN_OPENED_CELL_ERROR_MESSAGE) {
    super(message);
    this.name = "CannotOpenOpenedCellError";
    Object.setPrototypeOf(this, CannotOpenOpenedCellError.prototype);
  }
}

export const CANNOT_FLAG_OPENED_CELL_ERROR_MESSAGE = "Cannot flag an opened cell.";
export class CannotFlagOpenedCellError extends Error {
  constructor(message: string = CANNOT_FLAG_OPENED_CELL_ERROR_MESSAGE) {
    super(message);
    this.name = "CannotFlagOpenedCellError";
    Object.setPrototypeOf(this, CannotFlagOpenedCellError.prototype);
  }
}
