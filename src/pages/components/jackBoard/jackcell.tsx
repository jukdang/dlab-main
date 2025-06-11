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
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: 1px solid #a5ada6;
  cursor: pointer;
  font-size: clamp(0.75rem, 3vw, 1.5rem);
  touch-action: none;

  background-color: ${({ isSelected, flag, end }) => {
    if (isSelected) return "#E9FEE9";
    else {
      return flag ? "#eff0ee" : end ? "#E9FEE9" : "white";
    }
  }};

  @media (max-width: 768px) {
    font-size: clamp(0.5rem, 2vw, 1rem);
    border-width: 0.5px;
  }
`;

const CellImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const jackCell = ({
    isSelected,
    flag,
    end,
    rowIdx,
    colIdx,
    type,
    shape,
    num,
    onClick,
}: {
    isSelected: boolean, // 셀 선택 상태
    flag: any, // 플래그 상태
    end: any, // 끝 상태
    rowIdx: number, // 행 위치
    colIdx: number, // 열 위치
    type: String, // 카드 타입
    shape: String, // 카드 모양
    num: number, // 카드 숫자
    onClick: () => void, // 클릭 이벤트 핸들러
}) => {


    return (
        <Cell
            id={`${rowIdx}_${colIdx}`}
            isSelected={isSelected}
            flag={flag}
            end={end} 
            onClick={onClick}
        >
            {type === 'number' 
                ? <CellImage src={`${IMAGEPATH}${shape}_${num}.png`} alt="card" />
                : <CellImage src='' alt={`cardName`} />
            }
            
        </Cell>
    );
};

export default jackCell;