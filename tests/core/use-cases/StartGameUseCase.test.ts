import { create } from "domain";
import { StartGameUseCase } from "../../../src/core/use-cases/StartGameUseCase";
import { GameState } from "../../../src/core/entities/IBoard";

test("StartGameUseCase should return a new Board with the given configuration", () => {
  // Arrange
  const config = {
    grid: {
      rows: 10,
      columns: 10,
      totalMines: 10,
    },
    createCell: jest.fn(),
  };
  const startGameUseCase = new StartGameUseCase();

  // Act
  const board = startGameUseCase.execute(config);

  // Assert
  expect(board.getGameState()).toBe(GameState.Ongoing);
});
