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

import { Board } from "../../../src/core/entities/Board";
import { GameState } from "../../../src/core/entities/IBoard";
import { CellState } from "../../../src/core/entities/ICell";
import { OpenCellUseCase } from "../../../src/core/use-cases/OpenCellUseCase";

// import { Board } from "../entities/Board";
// import { IBoard, MineSweeperConfiguration } from "../entities/IBoard";
// import { IStartGameUseCase } from "./interfaces";

// export class StartGameUseCase implements IStartGameUseCase {
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

describe("셀을 열 때", () => {
  describe("승리", () => {
    test("모든 지뢰가 없는 셀을 열었을 때, 게임 상태를 Won으로 변경한다", () => {
      // Arrange
      const config = { rows: 2, columns: 2, totalMines: 1 };
      const board = new Board(config);
      const openCellUseCase = new OpenCellUseCase(board);

      // Act
      for (let x = 0; x < config.rows; x++) {
        for (let y = 0; y < config.columns; y++) {
          const cell = board.getCell(x, y);

          if (cell.isMine()) {
            continue;
          }

          openCellUseCase.execute(x, y);
        }
      }

      // Assert
      expect(board.getGameState()).toBe(GameState.Won);
    });
  });

  describe("게임 계속 진행", () => {
    describe("해당 셀이 지뢰가 아니면서, 인접한 지뢰가", () => {
      test("있다면, 해당 셀만 연다.", () => {
        // Arrange
        const config = { rows: 3, columns: 3, totalMines: 1 };
        const board = new Board(config);
        const openCellUseCase = new OpenCellUseCase(board);
        const cellIndexes = [];
        for (let x = 0; x < config.rows; x++) {
          for (let y = 0; y < config.columns; y++) {
            cellIndexes.push({ x, y });
          }
        }
        cellIndexes.filter(({ x, y }) => {
          return board.getAdjacentMinesCount(x, y) > 0 && !board.getCell(x, y).isMine();
        });
        const [{ x, y }, ...restCells] = cellIndexes;

        // Act
        openCellUseCase.execute(x, y);

        // Assert
        expect(board.getGameState()).toBe(GameState.Ongoing);
        expect(board.getCell(x, y).getState()).toBe(CellState.Opened);

        for (const { x, y } of restCells) {
          expect(board.getCell(x, y).getState()).toBe(CellState.Closed);
        }
      });
      test("없다면, 인접한 지뢰가 있는 셀이 나올 때 까지 주변 셀들을 자동으로 연다", () => {
        //
      });
    });
  });

  describe.skip("패배", () => {
    test("지뢰인 경우 게임 상태를 Lost로 변경한다", () => {
      //
    });
  });
});
