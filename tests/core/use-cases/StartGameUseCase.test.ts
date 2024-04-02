import { StartGameUseCase } from "../../../src/core/use-cases/StartGameUseCase";

test("StartGameUseCase should return a new Board with the given configuration", () => {
  // Arrange
  const config = {
    rows: 10,
    columns: 10,
    totalMines: 10,
  };
  const startGameUseCase = new StartGameUseCase();

  // Act
  const board = startGameUseCase.execute(config);

  // Assert
  expect(board.getGameState()).toBe("Ongoing");
});
