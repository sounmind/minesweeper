# MineSweeper

## Directory Structure

<!-- treestart -->
```
├── .prettierrc
├── README.md
├── jest.config.js
├── package-lock.json
├── package.json
├── scripts/
│   ├── update-readme.ts
├── src/
│   ├── core/
│   │   ├── entities/
│   │   │   ├── Board.ts
│   │   │   ├── Cell.ts
│   │   │   ├── IBoard.ts
│   │   │   ├── ICell.ts
│   │   ├── use-cases/
│   │   │   ├── OpenCellUseCase.ts
│   │   │   ├── StartGameUseCase.ts
│   │   │   ├── ToggleFlagUseCase.ts
│   │   │   ├── interfaces.ts
│   ├── utils/
│   │   ├── grid.spec.ts
│   │   ├── grid.ts
├── tests/
│   ├── core/
│   │   ├── entities/
│   │   │   ├── Board.test.ts
│   │   │   ├── Cell.test.ts
│   │   ├── use-cases/
│   │   │   ├── OpenCellUseCase.test.ts
│   │   │   ├── StartGameUseCase.test.ts
│   │   │   ├── ToggleFlagUseCase.test.ts
├── tsconfig.json
```
<!-- treeend -->
