// tests/entities/board.test.ts
import { Board } from "../../src/entities/board";

describe("Board class tests", () => {
  // Test to ensure the Board is correctly initialized with the specified dimensions
  test("Board should be initialized with the correct size", () => {
    const width = 10;
    const height = 8;
    const board = new Board(width, height);

    // Check if the grid has the correct height
    expect(board.grid.length).toBe(height);
    // Check if the first row of the grid has the correct width
    expect(board.grid[0].length).toBe(width);
  });

  // Additional test cases for the Board class...
});
