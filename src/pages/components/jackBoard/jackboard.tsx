
import { useEffect, useState } from 'react';
import JackCell from './jackcell';
import styled from '@emotion/styled';


const Board = styled.div`
  padding-top: 60px;
  display: grid;
  grid-template-columns: repeat(9, minmax(1.5rem, 3rem));
  gap: 0.25rem;
  width: 100%;
  maxWidth: 54rem;
  margin: 0 auto;
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

  return (
    <Board>

      {Array.from({ length: rows }).map((_, rowIdx) => 
        Array.from({ length: cols }).map((_, colIdx) => 

          <JackCell
            isSelected={false}
            flag={false}
            end={false}
            rowIdx={rowIdx}
            colIdx={colIdx}
            type={"number"}
            shape={"spade"}
            num={1}
            onClick={() => {}}
          />

        )
      )}
      
    </Board>
  )
}

export default JackBoard;