// tests/entities/board.test.ts
import { Board } from "../../src/entities/board";

describe("Board class tests", () => {
  const width = 10;
  const height = 8;
  const numberOfMines = 15;

  test("Board should be initialized with the correct size", () => {
    const board = new Board(width, height, numberOfMines);

    // Check if the grid has the correct height
    expect(board.grid.length).toBe(height);
    // Check if the first row of the grid has the correct width
    expect(board.grid[0].length).toBe(width);
  });

  test("Correct number of mines should be placed on the board", () => {
    const board = new Board(width, height, numberOfMines);
    let mineCount = 0;

    // Count the number of mines placed on the board
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (board.grid[row][col] === -1) {
          mineCount++;
        }
      }
    }

    // Check if the total number of mines matches the expected number
    expect(mineCount).toBe(numberOfMines);
  });

  // Additional test cases for the Board class...
});
