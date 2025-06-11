
import { use, useEffect, useState } from 'react';
import JackCell from './jackcell';
import styled from '@emotion/styled';


const Board = styled.div`
  padding-top: 120px;
  display: grid;
  grid-template-columns: repeat(9, minmax(3rem, 5rem));
  gap: 0.25rem;
  width: 100%;
  margin: 0 auto;
  place-content: center;
  @media (max-width: 768px) {
    maxWidth: 100%;
    width: 100%;
    gap: 0.125rem;
    grid-template-columns: repeat(9, 1fr);
  };
`;


const shapes = ['spade', 'heart', 'diamond', 'club'];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const rows = 6;
const cols = 9;

const JackBoard = () => {

  const [board, setBoard] = useState<Array<{ shape: string; num: number }>>([]);

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

  

  return (

    <Board>

      {Array.from({ length: rows }).map((_, rowIdx) => 
        Array.from({ length: cols }).map((_, colIdx) => 

          <JackCell
            key={`${rowIdx}-${colIdx}`}
            isSelected={false}
            flag={false}
            end={false}
            rowIdx={rowIdx}
            colIdx={colIdx}
            type={"number"}
            shape={board[rowIdx * cols + colIdx]?.shape || 'spade'}
            num={board[rowIdx * cols + colIdx]?.num || 1}
            onClick={() => {}}
          />

        )
      )}
      
    </Board>
  )
}

export default JackBoard;