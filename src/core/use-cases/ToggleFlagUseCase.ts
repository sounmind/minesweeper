import { CannotFlagOpenedCellError } from "../entities/Cell";
import type { IBoard } from "../entities/IBoard";
import { CellState } from "../entities/ICell";
import type { IToggleFlagUseCase } from "./interfaces";

export class ToggleFlagUseCase implements IToggleFlagUseCase {
  constructor(private board: IBoard) {}
  execute(x: number, y: number): void {
    const cell = this.board.getCell(x, y);

    if (cell.getState() === CellState.Opened) {
      throw new CannotFlagOpenedCellError();
    }

    cell.toggleFlag();
  }
}
