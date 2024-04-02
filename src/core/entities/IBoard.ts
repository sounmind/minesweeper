import { ICell } from "./ICell";

export enum GameState {
  Won,
  Lost,
  Ongoing,
}

export interface MineSweeperConfiguration {
  rows: number;
  columns: number;
  totalMines: number;
}

export interface IBoard {
  getGameState(): GameState;
  getAdjacentMinesCount(x: number, y: number): number;
  getCell(x: number, y: number): ICell;
}
