
import { use, useEffect, useState } from 'react';
import JackCell from './jackcell';
import styled from '@emotion/styled';


const Main = styled.div`
  margin-top: 120px;
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const JackBoardContainer = styled.div`
  width: 100%;
  max-width: 25rem;
  padding: 1rem;
  border: 0.1rem solid #a5ada6;

  
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Board = styled.div`
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  display: grid;
  grid-template-columns: repeat(9, clamp(1rem, 3vw, 2rem));
  gap: 0.25rem;
  width: 100%;
  margin: 0 auto;
  place-content: center;
  // @media (max-width: 768px) {
  //   maxWidth: 100%;
  //   width: 100%;
  //   gap: 0.125rem;
  //   grid-template-columns: repeat(9, 1fr);
  // };
`;




const shapes = ['spade', 'heart', 'diamond', 'club'];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const rows = 6;
const cols = 9;

const JackBoard = () => {

  const [board, setBoard] = useState<Array<{ shape: string; num: number }>>([]);
  const [selectedCells, setSelectedCells] = useState<Array<{ row: number; col: number }>>([]);

  useEffect(() => {
    const newBoard = shapes.flatMap(shape =>
      nums.map(num => ({
        shape,
        num
    })))

    newBoard.push({ shape: 'Joker', num: 1 });
    newBoard.push({ shape: 'Joker', num: 2 });

    newBoard.sort(() => Math.random() - 0.5);

    setBoard(newBoard);

    console.log(board);
  }, []);


  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState({ row: -1, col: -1 });

  const handleStart = (row:number, col:number) => {
    setIsDragging(true);
    setStartCell({ row, col });
  };

  const handleMove = (row:number, col:number) => {
    if (isDragging) {
      const { minY, maxY } =
        startCell.row < row
          ? { minY: startCell.row, maxY: row }
          : { minY: row, maxY: startCell.row };
      const { minX, maxX } =
        startCell.col < col
          ? { minX: startCell.col, maxX: col }
          : { minX: col, maxX: startCell.col };

      const newSelectedCells = [];
      for (let r = minY; r <= maxY; r++) {
        for (let c = minX; c <= maxX; c++) {
          newSelectedCells.push({ row: r, col: c });
        }
      }
      setSelectedCells(newSelectedCells);

      console.log(`Select from (${minX}, ${minY}) to (${maxX}, ${maxY})`);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    setStartCell({ row: -1, col: -1 });
    setSelectedCells([]);
  };

  

  return (
    <Main> 
      <JackBoardContainer>
        <Board
          onMouseUp={() => handleEnd()}
        >
          {Array.from({ length: rows }).map((_, rowIdx) => 
            Array.from({ length: cols }).map((_, colIdx) => 

              <JackCell
                key={`${rowIdx}-${colIdx}`}
                isSelected={selectedCells.some(cell => cell.row === rowIdx && cell.col === colIdx)}
                flag={false}
                end={false}
                rowIdx={rowIdx}
                colIdx={colIdx}
                type={"number"}
                shape={board[rowIdx * cols + colIdx]?.shape || 'spade'}
                num={board[rowIdx * cols + colIdx]?.num || 1}
                onMouseDown={() => handleStart(rowIdx, colIdx)}
                onMouseOver={() => handleMove(rowIdx, colIdx)}
              />

            )
          )}
        </Board>
      </JackBoardContainer>
    </Main>

    
  )
}

export default JackBoard;