import { getAdjacentCoordinates } from "./grid";

describe("getAdjacentCoordinates", () => {
  it("should return adjacent coordinates", () => {
    // Arrange
    const plane = { row: 5, col: 5 };
    const coordinate = { x: 2, y: 2 };

    // Act
    const result = getAdjacentCoordinates({
      plane,
      coordinate,
    });
    const expected = [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 3],
      [3, 1],
      [3, 2],
      [3, 3],
    ];

    // Assert
    expect(result).toEqual(expected);
  });

  it("should return adjacent coordinates", () => {
    // Arrange
    const plane = { row: 2, col: 2 };
    const coordinate = { x: 1, y: 1 };

    // Act
    const result = getAdjacentCoordinates({
      plane,
      coordinate,
    });

    // Assert
    expect(result).toEqual([
      [0, 0],
      [0, 1],
      [1, 0],
    ]);
  });
});
