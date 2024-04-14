import { ICell, type CellFactory } from "./ICell";

export enum GameState {
  Lost,
  Won,
  Ongoing,
}

export interface GridConfiguration {
  rows: number;
  columns: number;
  totalMines: number;
}

export interface MineSweeperConfiguration {
  grid: GridConfiguration;
  createCell: CellFactory;
}

export interface IBoard {
  getGameState(): GameState;

  getCell(x: number, y: number): ICell;
  getGrid(): ICell[][];

  openCell(x: number, y: number): void;
  toggleCellFlag(x: number, y: number): void;
}
