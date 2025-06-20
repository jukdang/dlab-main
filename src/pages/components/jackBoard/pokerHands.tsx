



export const isRoyalStraightFlush = (cards: Array<{shape: string; num: number; valid: boolean}>, jokerCount: number) => {
  const royalFlushNums = [10, 11, 12, 13, 1]; // 10, J, Q, K, A

  if (
    isStraightFlush(cards, jokerCount) &&
    cards.every(card => royalFlushNums.includes(card.num))
  ) return true;
    
  return false; // Placeholder return value
}

export const isStraightFlush = (cards: Array<{shape: string; num: number; valid: boolean}>, jokerCount: number) => {
  if (
    isFlush(cards, jokerCount) && 
    isStraight(cards, jokerCount)
  ) return true;
  
  return false; // Placeholder return value
}

export const isFourofaKind = (cards: Array<{shape: string; num: number; valid: boolean}>, jokerCount: number) => {
  if (cards.length + jokerCount !== 4) return false;

  if (cards.filter(card => card.num === cards[0].num).length + jokerCount === 4) return true;

  return false; // Placeholder return value
}

export const isFullHouse = (cards: Array<{shape: string; num: number; valid: boolean}>, jokerCount: number) => {
  if (cards.length + jokerCount !== 5) return false;

  const cardCounts = cards.reduce((acc, card) => {
    acc[card.num] = (acc[card.num] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  if (Object.keys(cardCounts).length === 2
      || Object.keys(cardCounts).length === 1 && jokerCount === 2) {
    return true;
  }
  
  return false; // Placeholder return value
}

export const isFlush = (cards: Array<{shape: string; num: number; valid: boolean}>, jokerCount: number) => {
  if (cards.length + jokerCount != 5) return false;

  if (cards.filter(card => card.shape === cards[0].shape).length + jokerCount === 5) return true;

  return false; // Placeholder return value
}

export const isStraight = (cards: Array<{shape: string; num: number; valid: boolean}>, jokerCount: number) => {
  if (cards.length + jokerCount != 5) return false;

  let curNum = cards[0].num;
  let jokerCnt = jokerCount;
  let i = 1;
  while (i < cards.length){
    if (cards[i].num !== curNum - 1) {
      if (jokerCnt > 0) {
        jokerCnt--;
        curNum--;
      }
      else {
        return false;
      }
    }
    curNum = cards[i].num;
    i++;
    
  }
    
  return true; // Placeholder return value
}

export const isThreeofAKind = (cards: Array<{shape: string; num: number; valid: boolean}>, jokerCount: number) => {
  if (cards.length + jokerCount != 3) return false;

  if (jokerCount == 2) return true;

  if (
    jokerCount == 1&& 
    cards[0].num === cards[1].num
  ) return true;

  if (
    cards[0].num === cards[1].num && 
    cards[0].num === cards[2].num
  ) return true;

  return false;
}

export const isTwoPair = (cards: Array<{shape: string; num: number; valid: boolean}>, jokerCount: number) => {
  if (cards.length + jokerCount != 4) return false;

  if (jokerCount == 2) return true;

  if (
    jokerCount == 1 && 
    (cards[0].num === cards[1].num|| cards[1].num === cards[2].num)
  ) return true;

  if (cards[0].num === cards[1].num && cards[2].num === cards[3].num) return true;

  return false;
}

export const isOnePair = (cards: Array<{shape: string; num: number; valid: boolean}>, jokerCount: number) => {
  if (cards.length + jokerCount != 2) return false;

  if (jokerCount == 2) return false;

  if (jokerCount == 1) return true;

  if (cards[0].num === cards[1].num) return true;

  return false;
}

// export const isHighCard = (cards: Array<{shape: string; num: number; valid: boolean}>) => {
//   if (cards.length != 5) return false;
//   return true; // Placeholder return value
// }
