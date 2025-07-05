import styled from '@emotion/styled';

export const Main = styled.div`
  margin-top: 5rem;
  width: 100%;
  
  align-items: center;
  justify-content: center;
`;

export const JackBoardContainer = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  padding: 1rem;
  border: 0.1rem solid #a5ada6;

  
  align-items: center;
  display: block;
  justify-content: center;
`;

export const TimerBoard = styled.div`
  width: 100%;
  font-size: clamp(0.2rem, 2vw, 0.5rem);
  text-align: center;
  margin-bottom: 1rem;
`;

export const ScoreBoard = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const Board = styled.div`
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

export const HistoryBoard = styled.div`
  width: 100%;
  font-size: clamp(0.2rem, 2vw, 0.5rem);
`;

export const HistoryType = styled.span`
  width: 50px;
`;

export const HistoryScore = styled.span`
  width: 50px;
`;

export const HistoryHands = styled.span`
  width: 70px;
`;

export const HistoryHand = styled.span`
  width: 15px;
  padding: 0.05rem;
`;