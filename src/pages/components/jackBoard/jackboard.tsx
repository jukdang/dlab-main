
import { use, useEffect, useState } from 'react';
import JackCell from './jackcell';
import styled from '@emotion/styled';
import { isFlush, isFourofaKind, isFullHouse, isOnePair, isRoyalStraightFlush, isStraight, isStraightFlush, isThreeofAKind, isTwoPair } from './pokerHands';

const CARD_VALUES: { [key: number]: string } = {
  1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6',
  7: '7', 8: '8', 9: '9', 10: '10',
  11: 'J', 12: 'Q', 13: 'K'
};

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
  margin: 0 auto;
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
  font-size: clamp(0.2rem, 2vw, 0.5rem);
`;

const HistoryType = styled.span`
  width: 50px;
`;

const HistoryScore = styled.span`
  width: 50px;
`;

const HistoryHands = styled.span`
  width: 70px;
`;

const HistoryHand = styled.span`
  width: 15px;
  padding: 0.05rem;
`;


const shapes = ['spade', 'heart', 'diamond', 'club'];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const rows = 6;
const cols = 9;

const JackBoard = () => {

  const [score, setScore] = useState<number>(0.0);
  const [scoreHistory, setScoreHistory] = useState<Array<{type: string, score: number, hands: Array<{num: number, shape: string}>}>>([]);


  const [board, setBoard] = useState<Array<Array<{ shape: string; num: number, valid: boolean }>>>([]);
  const [selectedCells, setSelectedCells] = useState<Array<{ row: number; col: number }>>([]);

  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState({ row: -1, col: -1 });

  useEffect(() => {
    const newBoard = shapes.flatMap(shape =>
      nums.map(num => ({
        shape,
        num,
        valid: true
    })))

    newBoard.push({ shape: 'Joker', num: 0, valid: true });
    newBoard.push({ shape: 'Joker', num: 0, valid: true });

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
    const fullHands = selectedCells.map(cell => board[cell.row][cell.col])
                                .filter(cell => cell.valid === true)
                                .sort((a, b) => b.num - a.num);

    const handsWithoutJoker = fullHands.filter(hand => hand.shape !== 'Joker');
    const jokerCount = fullHands.length - handsWithoutJoker.length;

    var handScore:number = 0;
    var handType:string = '';

    // if (isRoyalStraightFlush(hands)) {
    //   setScore(prev => prev + hands[0].num * 5.0);
    // } else 
    if (isStraightFlush(handsWithoutJoker, jokerCount)) {
      handScore =  handsWithoutJoker[0].num * 3.0;
      handType = 'Straight Flush';
    } else if (isFourofaKind(handsWithoutJoker, jokerCount)) {
      handScore =  handsWithoutJoker[0].num * 2.5;
      handType = 'Four of a Kind';
    } else if (isFullHouse(handsWithoutJoker, jokerCount)) {
      handScore =  handsWithoutJoker[0].num * 2.2;
      handType = 'Full House';
    } else if (isFlush(handsWithoutJoker, jokerCount)) {  
      handScore =  handsWithoutJoker[0].num * 2.0;
      handType = 'Flush';
    } else if (isStraight(handsWithoutJoker, jokerCount)) {
      handScore =  handsWithoutJoker[0].num * 2.0;
      handType = 'Straight';
    } else if (isThreeofAKind(handsWithoutJoker, jokerCount)) {
      handScore =  handsWithoutJoker[0].num * 1.3;
      handType = 'Three of a Kind';
    } else if (isTwoPair(handsWithoutJoker, jokerCount)) {
      handScore =  handsWithoutJoker[0].num * 1.2;
      handType = 'Two Pair';
    } else if  (isOnePair(handsWithoutJoker, jokerCount)) {
      handScore =  handsWithoutJoker[0].num * 1.1;
      handType = 'One Pair';
    } 

    if (handScore === 0) return;

    setScore(prev => prev + handScore); // Round to 2 decimal places
    setScoreHistory(prev => [...prev, { type: handType, score: handScore, hands: fullHands }]);

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
  }



  const handleStart = (row:number, col:number) => {
    setIsDragging(true);
    setStartCell({ row, col });
  };

  const handleMove = (row:number, col:number) => {
    // if (isDragging) {
    //   const { minY, maxY } =
    //     startCell.row < row
    //       ? { minY: startCell.row, maxY: row }
    //       : { minY: row, maxY: startCell.row };
    //   const { minX, maxX } =
    //     startCell.col < col
    //       ? { minX: startCell.col, maxX: col }
    //       : { minX: col, maxX: startCell.col };

    //   const newSelectedCells = [];
    //   for (let r = minY; r <= maxY; r++) {
    //     for (let c = minX; c <= maxX; c++) {
    //       newSelectedCells.push({ row: r, col: c });
    //     }
    //   }
    //   setSelectedCells(newSelectedCells);
     
    // }

    // console.log(`Select from (${minX}, ${minY}) to (${maxX}, ${maxY})`);

    if (!isDragging) return;
    if (selectedCells.some(cell => cell.row === row && cell.col === col)) return; // Prevent re-selecting the same cell
    setSelectedCells([  ...selectedCells, { row, col }])

     
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // setStartCell({ row: -1, col: -1 });

    
    checkHands(selectedCells);
    
    setSelectedCells([]); 

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
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0}}>
          {scoreHistory.map((entry, index) => (
            <li key={index}>
              <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', justifyContent: 'center' }}>
                <HistoryType>{entry.type}</HistoryType>
                <HistoryHands>  
                  {entry.hands.map((hand, idx) => (
                    hand.shape === 'spade' ? <HistoryHand key={idx}>♠️{CARD_VALUES[hand.num]}</HistoryHand> :
                    hand.shape === 'club' ? <HistoryHand key={idx}>♣️{CARD_VALUES[hand.num]}</HistoryHand> :
                    hand.shape === 'heart' ? <HistoryHand key={idx}>♥️{CARD_VALUES[hand.num]}</HistoryHand> :
                    hand.shape === 'diamond' ? <HistoryHand key={idx}>♦️{CARD_VALUES[hand.num]}</HistoryHand> :
                    <HistoryHand key={idx}> 🃏 </HistoryHand>
                  ))}
                </HistoryHands>
                
                <HistoryScore style={{ marginLeft: '1rem' }}>
                  Score: {entry.score.toFixed(2)}
                </HistoryScore>
              </div>
            </li>
          ))}
        </ul>
      </HistoryBoard>
    </Main>

    
  )
}

export default JackBoard;