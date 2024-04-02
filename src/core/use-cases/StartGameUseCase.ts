import { Board } from "../entities/Board";
import { IBoard, MineSweeperConfiguration } from "../entities/IBoard";
import { IStartGameUseCase } from "./interfaces";

export class StartGameUseCase implements IStartGameUseCase {
  execute(config: MineSweeperConfiguration): IBoard {
    return new Board(config);
  }
}
