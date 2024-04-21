import { IBoard, MineSweeperConfiguration } from "../entities/IBoard";

export interface IStartGameUseCase {
  execute(config: MineSweeperConfiguration): IBoard;
}

export interface IOpenCellUseCase {
  execute(x: number, y: number): void;
}

export interface IToggleFlagUseCase {
  execute(x: number, y: number): void;
}
