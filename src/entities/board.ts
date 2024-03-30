// src/entities/board.ts
export class Board {
  width: number;
  height: number;
  grid: number[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    // Initialize the grid with the given dimensions
    this.grid = this.initializeGrid();
  }

  // Initializes the grid to all zeros based on board dimensions
  initializeGrid(): number[][] {
    return Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () => 0)
    );
  }

  // Additional methods for the Board class...
}
