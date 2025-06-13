



export const isRoyalStraightFlush = (cards: Array<{shape: string; num: number; valid: boolean}>) => {
  if (isStraightFlush(cards) && 
      cards[0].num === 10 && cards[1].num === 11 && cards[2].num === 12 && 
      cards[3].num === 13 && cards[4].num === 1) return true;
    
  return false; // Placeholder return value
}

export const isStraightFlush = (cards: Array<{shape: string; num: number; valid: boolean}>) => {
  if (isFlush(cards) && isStraight(cards)) return true;
  return false; // Placeholder return value
}

export const isFourofaKind = (cards: Array<{shape: string; num: number; valid: boolean}>) => {
  if (cards.length !== 4) return false;
  if (cards[0].num === cards[1].num && 
      cards[1].num === cards[2].num && 
      cards[2].num === cards[3].num) return true;

  return false; // Placeholder return value
}

export const isFullHouse = (cards: Array<{shape: string; num: number; valid: boolean}>) => {
  if (cards.length !== 5) return false;

  if (cards[0].num === cards[1].num && cards[1].num === cards[2].num &&
      cards[2].num !== cards[3].num && cards[3].num === cards[4].num) return true;
  if (cards[0].num === cards[1].num && cards[1].num !== cards[2].num &&
      cards[2].num === cards[3].num && cards[3].num === cards[4].num) return true;
  
  return false; // Placeholder return value
}

export const isFlush = (cards: Array<{shape: string; num: number; valid: boolean}>) => {
  if (cards.length != 5) return false;
  if (cards[0].shape === cards[1].shape &&
      cards[1].shape === cards[2].shape &&
      cards[2].shape === cards[3].shape &&
      cards[3].shape === cards[4].shape) return true;
  return false; // Placeholder return value
}

export const isStraight = (cards: Array<{shape: string; num: number; valid: boolean}>) => {
  if (cards.length != 5) return false;
  if (cards[0].num - 1 === cards[1].num &&
      cards[1].num - 1 === cards[2].num &&
      cards[2].num - 1 === cards[3].num &&
      cards[3].num - 1 === cards[4].num) return true;
  return false; // Placeholder return value
}

export const isThreeofAKind = (cards: Array<{shape: string; num: number; valid: boolean}>) => {
  if (cards.length != 3) return false;
  if (cards[0].num === cards[1].num && cards[0].num === cards[2].num) return true;
  return false;
}

export const isTwoPair = (cards: Array<{shape: string; num: number; valid: boolean}>) => {
  if (cards.length != 4) return false;
  if (cards[0].num === cards[1].num && cards[2].num === cards[3].num) return true;

  return false;
}

export const isOnePair = (cards: Array<{shape: string; num: number; valid: boolean}>) => {
  if (cards.length != 2) return false;

  if (cards[0].num === cards[1].num) return true;

  return false;
}

// export const isHighCard = (cards: Array<{shape: string; num: number; valid: boolean}>) => {
//   if (cards.length != 5) return false;
//   return true; // Placeholder return value
// }
