import React from 'react';
import styled from '@emotion/styled';

const IMAGEPATH = '/cards/card_';


interface CellProps {
  isSelected: boolean;
  flag: any;
  end: any;
}

const Cell = styled.div<CellProps>`
  display: flex;
  width: clamp(1rem, 3vw, 2rem);
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  font-size: clamp(0.4rem, 1vw, 0.7rem);
  touch-action: none;
  aspect-ratio: 1;


  border: 0.01rem solid #a5ada6;
  background-color: ${({ isSelected }) => {
    if (isSelected) {
      return '#e9fee9';
    }
    return 'white';
  }};

  // @media (max-width: 768px) {
  //   font-size: clamp(0.5rem, 2vw, 1rem);
  //   border-width: 0.5px;
  // }
`;

const CellImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
`;

const jackCell = ({
    isSelected,
    flag,
    end,
    rowIdx,
    colIdx,
    valid,
    shape,
    num,
    onMouseDown,
    onMouseOver,
}: {
    isSelected: boolean, // 셀 선택 상태
    flag: any, // 플래그 상태
    end: any, // 끝 상태
    rowIdx: number, // 행 위치
    colIdx: number, // 열 위치
    valid: boolean, // 카드 타입
    shape: String, // 카드 모양
    num: number, // 카드 숫자
    onMouseDown: () => void, // 마우스 다운 이벤트 핸들러
    onMouseOver: () => void, // 마우스 오버 이벤트 핸들러
}) => {


    const CARD_VALUES: { [key: number]: string } = {
      1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6',
      7: '7', 8: '8', 9: '9', 10: '10',
      11: 'J', 12: 'Q', 13: 'K'
    };

    return (
        <Cell
            id={`${rowIdx}_${colIdx}`}
            isSelected={isSelected}
            flag={flag}
            end={end} 
            onMouseDown={onMouseDown}
            onMouseOver={onMouseOver}
        >
          {valid 
            ? (shape === 'spade' ? <div>♠️{CARD_VALUES[num]}</div> :
                shape === 'club' ? <div>♣️{CARD_VALUES[num]}</div> :
                shape === 'heart' ? <div>♥️{CARD_VALUES[num]}</div> :
                shape === 'diamond' ? <div>♦️{CARD_VALUES[num]}</div> : <div>🃏</div> )
            : (<div></div>)
          }
            
        </Cell>
    );
};

export default jackCell;