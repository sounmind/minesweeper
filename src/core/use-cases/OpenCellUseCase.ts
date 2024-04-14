// ## 2. 셀 열기
// - **주요 액터**: 사용자
// - **목적**: 사용자가 선택한 셀을 열어서 그 내용을 확인하고, 게임의 승리 또는 패배 상태를 결정한다.
// - **사전 조건**:
// 	- 게임이 시작되었고, 게임판이 사용자에게 표시된다.
// 	- 이미 선택된 셀은 선택하지 않는다.
// - **기본 흐름**:
//     1. 사용자는 열고자 하는 셀을 클릭한다.
//     2. 시스템은 해당 셀이 지뢰인지 확인한다.
//         - 지뢰가 아니라면, 주변 지뢰의 수를 표시한다. 인접한 셀에 지뢰가 없다면, 시스템은 인접한 셀들도 자동으로 연다.
//         - 지뢰가 있다면, 시스템은 게임 상태를 `Lost`로 업데이트하고, 모든 지뢰 위치를 드러낸다. 그리고 사용자에게 패배 메시지를 표시한다.
//     3. 시스템은 사용자가 모든 지뢰가 없는 셀을 열었는지 확인한다.
//         - 만약 모든 지뢰가 없는 셀이 열렸다면, 시스템은 게임 상태를 `Won`으로 업데이트하고, 승리 메시지를 표시한다.
// - **대안 흐름**: 셀에 깃발이나 물음표가 표시되어 있으면, 셀이 열리지 않는다.
// - **사후 조건**:
// 	- 선택한 셀과 조건에 따라 인접한 셀들이 열린다.
// 	- 게임 종료, 결과가 사용자에게 표시된다.
// 		- 지뢰를 밟았을 때
// 		- 모든 지뢰가 없는 셀을 열었을 때

// import { Board } from "../entities/Board";
// import { IBoard, MineSweeperConfiguration } from "../entities/IBoard";
// import { IStartGameUseCase } from "./interfaces";

// exprt class StartGameUseCase implements IStartGameUseCase {
//   execute(config: MineSweeperConfiguration): IBoard {
//     return new Board(config);
//   }
// }

// import { IBoard } from "../entities/IBoard";
// import { IOpenCellUseCase } from "./interfaces";

// export class OpenCellUseCase implements IOpenCellUseCase {
//   constructor(private board: IBoard) {}

//   execute(x: number, y: number): void {
//     // TODO: 구현
//   }
// }

// import { ICell } from "./ICell";

// export enum GameState {
//   Won,
//   Lost,
//   Ongoing,
// }

// export interface MineSweeperConfiguration {
//   rows: number;
//   columns: number;
//   totalMines: number;
// }

// export interface IBoard {
//   getGameState(): GameState;
//   getAdjacentMinesCount(x: number, y: number): number;
//   getCell(x: number, y: number): ICell;
// }

// export enum CellState {
//   Closed,
//   Opened,
//   Flagged,
// }

// export interface CellConfiguration {
//   isMine: boolean;
// }

// export interface ICell {
//   getState(): CellState;
//   isMine(): boolean;

//   open(): void;
//   toggleFlag(): void;
// }

import { IBoard } from "../entities/IBoard";
import { IOpenCellUseCase } from "./interfaces";

export class OpenCellUseCase implements IOpenCellUseCase {
  constructor(private board: IBoard) {}

  execute(x: number, y: number): void {
    const cell = this.board.getCell(x, y);
    // TODO: Board의 상태를 어떻게 업데이트할 것인가?
    // 1. Board에 직접 setter를 추가한다.
    // 2. Board에 상태를 자체적으로 업데이트 하는 메서드를 추가한다.

    cell.open();
    this.board.updateGameState()

    

    const adjacentMinesCount = this.board.getAdjacentMinesCount(x, y);

    if (adjacentMinesCount === 0) {
      this.board.getAdjacentMinesCount(x, y);
    }
  }
}
