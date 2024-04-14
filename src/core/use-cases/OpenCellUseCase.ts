import { getAdjacentCoordinates } from "../../utils/grid";
import { GameState, type IBoard } from "../entities/IBoard";
import { CellState } from "../entities/ICell";
import { IOpenCellUseCase } from "./interfaces";

export class OpenCellUseCase implements IOpenCellUseCase {
  constructor(private board: IBoard) {}

  execute(x: number, y: number): GameState {
    if (this.board.getCell(x, y).getState() === CellState.Opened) {
      return this.board.getGameState();
    }

    this.board.openCell(x, y);

    if (this.board.getCell(x, y).isMine()) {
      return this.board.getGameState();
    }

    if (this.getAdjacentMinesCount(x, y) === 0) {
      const adjacentCells = getAdjacentCoordinates({
        plane: { row: this.board.getGrid().length, col: this.board.getGrid()[0].length },
        coordinate: { x, y },
      });

      adjacentCells.forEach(([nx, ny]) => {
        if (this.board.getCell(nx, ny).getState() === CellState.Closed) {
          this.execute(nx, ny);
        }
      });
    }

    return this.board.getGameState();
  }

  private getAdjacentMinesCount(x: number, y: number): number {
    const grid = this.board.getGrid();

    const adjacentCells = getAdjacentCoordinates({
      plane: { row: grid.length, col: grid[0].length },
      coordinate: { x, y },
    }).map(([nx, ny]) => grid[nx][ny]);

    return adjacentCells.filter((cell) => cell.isMine()).length;
  }
}
