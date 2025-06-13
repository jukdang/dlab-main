
import { use, useEffect, useState } from 'react';
import JackCell from './jackcell';
import styled from '@emotion/styled';
import { isFlush, isFourofaKind, isFullHouse, isOnePair, isRoyalStraightFlush, isStraight, isStraightFlush, isThreeofAKind, isTwoPair } from './pokerHands';


const Main = styled.div`
  margin-top: 120px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const JackBoardContainer = styled.div`
  width: 100%;
  max-width: 25rem;
  padding: 1rem;
  border: 0.1rem solid #a5ada6;

  
  align-items: center;
  display: block;
  justify-content: center;
`;

const ScoreBoard = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
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

const HistoryBoard = styled.div`
  width: 100%;
  font-size: clamp(0.5rem, 2vw, 1rem);
`;




const shapes = ['spade', 'heart', 'diamond', 'club'];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const rows = 6;
const cols = 9;

const JackBoard = () => {

  const [score, setScore] = useState<number>(0.0);
  const [scoreHistory, setScoreHistory] = useState<Array<{score:number, hand:string}>>([]);


  const [board, setBoard] = useState<Array<Array<{ shape: string; num: number, valid: boolean }>>>([]);
  const [selectedCells, setSelectedCells] = useState<Array<{ row: number; col: number }>>([]);

  useEffect(() => {
    const newBoard = shapes.flatMap(shape =>
      nums.map(num => ({
        shape,
        num,
        valid: true
    })))

    newBoard.push({ shape: 'Joker', num: 1, valid: true });
    newBoard.push({ shape: 'Joker', num: 2, valid: true });

    newBoard.sort(() => Math.random() - 0.5);

    console.log(newBoard.length);

    const board = Array.from({ length: rows }, (_, rowIdx) =>
      Array.from({ length: cols }, (_, colIdx) => (
        { shape: newBoard[rowIdx * cols + colIdx].shape, 
          num: newBoard[rowIdx * cols + colIdx].num, 
          valid: newBoard[rowIdx * cols + colIdx].valid}
      ))
    );
    
    console.log(board);

    setBoard(board);

  }, []);


  const checkHands = (selectedCells: Array<{ row: number; col: number }>) => {
    const hands = selectedCells.map(cell => board[cell.row][cell.col])
                                .filter(cell => cell.valid === true);
    
    hands.sort((a, b) => b.num - a.num);

    var handScore:number = 0;

    // if (isRoyalStraightFlush(hands)) {
    //   setScore(prev => prev + hands[0].num * 5.0);
    // } else 
    if (isStraightFlush(hands)) {
      handScore =  hands[0].num * 3.0;
    } else if (isFourofaKind(hands)) {
      handScore =  hands[0].num * 2.5;
    } else if (isFullHouse(hands)) {
      handScore =  hands[0].num * 2.2;
    } else if (isFlush(hands)) {  
      handScore =  hands[0].num * 2.0;
    } else if (isStraight(hands)) {
      handScore =  hands[0].num * 2.0;
    } else if (isThreeofAKind(hands)) {
      handScore =  hands[0].num * 1.3;
    } else if (isTwoPair(hands)) {
      handScore =  hands[0].num * 1.2;
    } else if (isOnePair(hands)) {
      handScore =  hands[0].num * 1.1;
    } else {
      handScore =  hands[0].num * 1.0;
    }

    setScore(prev => prev + handScore); // Round to 2 decimal places
    setScoreHistory(prev => [...prev, { score: handScore, hand: hands.map(h => `${h.shape} ${h.num}`).join(', ') }]);
  }

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
    if (!isDragging) return;
    setIsDragging(false);
    setStartCell({ row: -1, col: -1 });


    const newBoard = board.map((row, rodIndex) =>
      row.map((cell, colIdx) => {
        const isSelected = selectedCells.some(cell => cell.row === rodIndex && cell.col === colIdx);
        if (isSelected) {
          return { ...cell, valid: false }; // Mark as invalid
        }
        return cell; // Keep the original cell
      })
    );
    setBoard(newBoard);
    
    setSelectedCells([]); 


    checkHands(selectedCells);
  };

  

  return (
    <Main> 
      <JackBoardContainer>
        <ScoreBoard>
          <h2>Score: {score.toFixed(2)}</h2>
        </ScoreBoard>
        <Board
          onMouseUp={() => handleEnd()}
        >
          {board.length > 0 &&
            Array.from({ length: rows }).map((_, rowIdx) => 
              Array.from({ length: cols }).map((_, colIdx) => 

                <JackCell
                  key={`${rowIdx}-${colIdx}`}
                  isSelected={selectedCells.some(cell => cell.row === rowIdx && cell.col === colIdx)}
                  flag={false}
                  end={false}
                  rowIdx={rowIdx}
                  colIdx={colIdx}
                  valid={board[rowIdx][colIdx].valid}
                  shape={board[rowIdx][colIdx].shape}
                  num={board[rowIdx][colIdx]?.num}
                  onMouseDown={() => handleStart(rowIdx, colIdx)}
                  onMouseOver={() => handleMove(rowIdx, colIdx)}
                />

              )
            )
          }
        </Board>
      </JackBoardContainer>
      <HistoryBoard>
        <h3>Score History</h3>
        <ul>
          {scoreHistory.map((entry, index) => (
            <p key={index}>
              {entry.hand} - Score: {entry.score.toFixed(2)}
            </p>
          ))}
        </ul>
      </HistoryBoard>
    </Main>

    
  )
}

export default JackBoard;