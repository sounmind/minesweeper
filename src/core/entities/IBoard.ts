import { ICell } from "./ICell";

export enum GameState {
  Lost,
  Won,
  Ongoing,
}

export interface MineSweeperConfiguration {
  rows: number;
  columns: number;
  totalMines: number;
}

export interface IBoard {
  getGameState(): GameState;

  getCell(x: number, y: number): ICell;
  getGrid(): ICell[][];
}
