import { Cell } from "./Cell";
import { GameState, IBoard, MineSweeperConfiguration } from "./IBoard";
import { CellState, ICell } from "./ICell";

export class Board implements IBoard {
  private readonly _grid: ICell[][];
  private _gameState: GameState;

  constructor(config: MineSweeperConfiguration) {
    this._gameState = GameState.Ongoing;
    this._grid = this.createGrid(config);
  }

  openCell(x: number, y: number): void {
    if (this.isOutOfBounds(x, y)) {
      throw new CellNotFoundError();
    }

    this._grid[x][y].open();

    if (this._grid[x][y].isMine()) {
      this._gameState = GameState.Lost;
      return;
    }

    if (
      this._grid.every((row) =>
        row.every((cell) => cell.isMine() || cell.getState() === CellState.Opened),
      )
    ) {
      this._gameState = GameState.Won;
    }
  }

  toggleCellFlag(x: number, y: number): void {
    if (this.isOutOfBounds(x, y)) {
      throw new CellNotFoundError();
    }

    this._grid[x][y].toggleFlag();
  }

  public getGameState(): GameState {
    return this._gameState;
  }

  public getCell(x: number, y: number): ICell {
    if (this.isOutOfBounds(x, y)) {
      throw new CellNotFoundError();
    }

    return this._grid[x][y];
  }

  public getGrid(): ICell[][] {
    return this._grid;
  }

  private createGrid({ rows, columns, totalMines }: MineSweeperConfiguration): ICell[][] {
    const grid: ICell[][] = Array.from({ length: rows }, () => Array.from({ length: columns }));
    const mineLocations: boolean[][] = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => false),
    );
    let minesPlaced = 0;
    while (minesPlaced < totalMines) {
      const x = Math.floor(Math.random() * rows);
      const y = Math.floor(Math.random() * columns);
      if (!mineLocations[x][y]) {
        mineLocations[x][y] = true;
        minesPlaced++;
      }
    }

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        grid[x][y] = new Cell({ isMine: mineLocations[x][y] });
      }
    }

    return grid;
  }

  private isOutOfBounds(x: number, y: number): boolean {
    const isOutOfColumnBounds = x < 0 || x >= this._grid.length;
    const isOutOfRowBounds = y < 0 || y >= this._grid[0].length;

    return isOutOfColumnBounds || isOutOfRowBounds;
  }
}

export const CELL_NOT_FOUND_ERROR_MESSAGE = "Cell not found.";
export class CellNotFoundError extends Error {
  constructor(message: string = CELL_NOT_FOUND_ERROR_MESSAGE) {
    super(message);
    this.name = "CellNotFoundError";
    Object.setPrototypeOf(this, CellNotFoundError.prototype);
  }
}
