type Coordinate = {
  x: number;
  y: number;
};

type Plane = {
  row: number;
  col: number;
};

export const getAdjacentCoordinates = ({
  plane,
  coordinate,
}: {
  plane: Plane;
  coordinate: Coordinate;
}): number[][] => {
  const adjacentCoords: number[][] = [];

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) {
        continue;
      }

      const nx = coordinate.x + dx;
      const ny = coordinate.y + dy;

      if (nx < 0 || nx >= plane.row || ny < 0 || ny >= plane.col) {
        continue;
      }

      adjacentCoords.push([nx, ny]);
    }
  }

  return adjacentCoords;
};
