
import { use, useEffect, useRef, useState } from 'react';
import JackCell from './jackcell';
import { JackBoardContainer, Main, ScoreBoard, Board, HistoryBoard, HistoryType, HistoryHands, HistoryHand, HistoryScore, TimerBoard } from './jackboard.styles';
import { isFlush, isFourofaKind, isFullHouse, isOnePair, isRoyalStraightFlush, isStraight, isStraightFlush, isThreeofAKind, isTwoPair } from './pokerHands';
import { useBackgroundMusic, useSoundEffect } from './sounds';

const CARD_VALUES: { [key: number]: string } = {
  1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6',
  7: '7', 8: '8', 9: '9', 10: '10',
  11: 'J', 12: 'Q', 13: 'K'
};




const shapes = ['spade', 'heart', 'diamond', 'club'];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const rows = 6;
const cols = 9;

const JackBoard = () => {

  const volume = 0.1;
  const backgroundMusic = useBackgroundMusic(volume);
  const soundEffect = useSoundEffect(volume);

  const [timer, setTimer] = useState<number>(10);
  const [score, setScore] = useState<number>(0.0);
  const [scoreHistory, setScoreHistory] = useState<Array<{type: string, score: number, hands: Array<{num: number, shape: string}>}>>([]);

  const [isRunning, setIsRunning] = useState<boolean>(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

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

    const board = Array.from({ length: rows }, (_, rowIdx) =>
      Array.from({ length: cols }, (_, colIdx) => (
        { shape: newBoard[rowIdx * cols + colIdx].shape, 
          num: newBoard[rowIdx * cols + colIdx].num, 
          valid: newBoard[rowIdx * cols + colIdx].valid}
      ))
    );

    setBoard(board);

  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);



  useEffect(() => {
    if (isRunning) {
      if (backgroundMusic) backgroundMusic.play();
    } else {
      if (backgroundMusic) backgroundMusic.stop();
    }
  }, [backgroundMusic, isRunning]);



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

    if (soundEffect) soundEffect.play();
  }



  const handleStart = (row:number, col:number) => {
    if (!isRunning) return;
    
    setIsDragging(true);
    setStartCell({ row, col });
  };

  const handleMove = (row:number, col:number) => {
    if (!isRunning) return;

    if (!isDragging) return;
    if (selectedCells.some(cell => cell.row === row && cell.col === col)) return; // Prevent re-selecting the same cell
    setSelectedCells([  ...selectedCells, { row, col }])

     
  };

  const handleEnd = () => {
    if (!isRunning) return;

    if (!isDragging) return;
    setIsDragging(false);
    // setStartCell({ row: -1, col: -1 });

    
    checkHands(selectedCells);
    
    setSelectedCells([]); 

  };

  

  return (
    <Main> 
      <JackBoardContainer>
        <TimerBoard>
          <h2>Time left: {timer}</h2>
        </TimerBoard>
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
                  enable={isRunning}
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