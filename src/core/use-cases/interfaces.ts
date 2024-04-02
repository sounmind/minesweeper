import { IBoard, MineSweeperConfiguration } from "../entities/IBoard";

export interface IStartGameUseCase {
  execute(config: MineSweeperConfiguration): IBoard;
}
