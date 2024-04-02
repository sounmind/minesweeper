export enum CellState {
  Closed,
  Opened,
  Flagged,
}

export interface CellConfiguration {
  isMine: boolean;
}

export interface ICell {
  getState(): CellState;
  isMine(): boolean;

  open(): void;
  toggleFlag(): void;
}
