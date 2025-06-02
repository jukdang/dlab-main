
import { useEffect, useState } from 'react';
import './jackboard.css'

const shapes = ['spade', 'heart', 'diamond', 'club'];
const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const rows = 6;
const cols = 9;

const JackBoard = () => {

  const [shuffledCards, setShuffledCards] = useState<string[]>([]);

  const [selected, setSelected] = useState(Array(rows * cols).fill(false));

  const clickCard = (index: number) => {
    setSelected(prev => {
      const copy = [...prev];
      copy[index] = !copy[index]; // 토글
      return copy;
    });
  };

  useEffect(() => {
    const cardNames = shapes.flatMap(shape => nums.map(num => `${shape}_${num}`));
    cardNames.push('black_joker', 'red_joker');
    const shuffled = [...cardNames].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
  }, []); // 최초 한 번만 실행

  

  return (
  <div className="table-container">
    <div className="card-table">
      {Array.from({ length: cols }, (_, colIndex) => (
        <div className="card-row" key={colIndex}>
          {shuffledCards.slice(colIndex * rows, (colIndex + 1) * rows).map((cardName, i) => (
            <div className={`card-cell ${selected[colIndex * rows + i] ? 'selected' : ''}`} key={colIndex * rows + i} onClick={() => clickCard(colIndex * rows + i)}>
              {cardName.includes('joker') 
                ? (<img src='' alt={`cardName`}></img>)
                : (<img src={`/cards/card_${cardName}.png`} alt="card" />)
              }   
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
  )
}

export default JackBoard;