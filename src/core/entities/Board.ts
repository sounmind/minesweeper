import { Cell } from "./Cell";
import { GameState, IBoard, MineSweeperConfiguration } from "./IBoard";
import { ICell } from "./ICell";

export class Board implements IBoard {
  private _grid: ICell[][];
  private _gameState: GameState;

  constructor(config: MineSweeperConfiguration) {
    this._gameState = GameState.Ongoing;
    this._grid = this.createGrid(config);
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

  public getAdjacentMinesCount(x: number, y: number): number {
    if (this.isOutOfBounds(x, y)) {
      throw new CellNotFoundError();
    }

    const adjacentCells = [];

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= this._grid.length || ny < 0 || ny >= this._grid[0].length) {
          continue;
        }
        adjacentCells.push(this._grid[nx][ny]);
      }
    }

    return adjacentCells.filter((cell) => cell.isMine()).length;
  }

  public getCell(x: number, y: number): ICell {
    if (this.isOutOfBounds(x, y)) {
      throw new CellNotFoundError();
    }

    return this._grid[x][y];
  }

  public getGameState(): GameState {
    return this._gameState;
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
