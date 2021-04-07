function getPairValuesOther(sortedFlopValues, threeOfaKind){
  pairs = new Array();
  test = hasPairOther(sortedFlopValues, threeOfaKind);
  if(test != 0){
    pairs[0] = test;
    if(threeOfaKind == 0){
      test = hasPairOther(sortedFlopValues, pairs[0]);
      if(test != 0){
        pairs[1] = test;
      }
    }
  }
  return pairs;
}

function getPairValues(sortedValues){
  pairs = new Array();
  test = hasPair(sortedValues);
  if(test != 0){
    pairs[0] = test;
    test = hasPairOther(sortedValues, pairs[0]);
    if(test != 0){
      pairs[1] = test;
    }
  }
  return pairs;
}

function getTwoPairValues(pairs, handPairs, flopPairs, comboPairs){
  twoPairValues = new Array();

  // if (pair from hand and pair from flop) or (combo and flop pair) or (2 combos) return
  for(var i=0; i< pairs.length - 1; i++){
    if((contains(handPairs,pairs[i]) || contains(handPairs,pairs[i+1]))
      && (contains(flopPairs,pairs[i]) || contains(flopPairs,pairs[i+1])) ) {
      twoPairValues[0] = pairs[i];
      twoPairValues[1] = pairs[i+1];
      return twoPairValues;
    } else if (contains(comboPairs,pairs[i]) && contains(comboPairs,pairs[i+1])) {
      twoPairValues[0] = pairs[i];
      twoPairValues[1] = pairs[i+1];
      return twoPairValues;
    } else if((contains(comboPairs,pairs[i]) || contains(comboPairs,pairs[i+1]))
      && (contains(flopPairs,pairs[i]) || contains(flopPairs,pairs[i+1]))) {
      twoPairValues[0] = pairs[i];
      twoPairValues[1] = pairs[i+1];
      return twoPairValues;
    }
  }

  if(pairs.length == 3){
    for(i=1; i< pairs.length - 1; i++){
      if((contains(handPairs,pairs[i]) || contains(handPairs,pairs[i+1]))
        && (contains(flopPairs,pairs[i]) || contains(flopPairs,pairs[i+1])) ) {
        twoPairValues[0] = pairs[i];
        twoPairValues[1] = pairs[i+1];
        return twoPairValues;
      } else if (contains(comboPairs,pairs[i]) && contains(comboPairs,pairs[i+1])){
        twoPairValues[0] = pairs[i];
        twoPairValues[1] = pairs[i+1];
        return twoPairValues;
      } else if((contains(comboPairs,pairs[i]) || contains(comboPairs,pairs[i+1]))
        && (contains(flopPairs,pairs[i]) || contains(flopPairs,pairs[i+1]))) {
        twoPairValues[0] = pairs[i];
        twoPairValues[1] = pairs[i+1];
        return twoPairValues;
      }
    }
  }

  if(pairs.length == 4){
    for(i=1; i< pairs.length - 1; i++){
      if((contains(handPairs,pairs[i]) || contains(handPairs,pairs[i+1]))
        && (contains(flopPairs,pairs[i]) || contains(flopPairs,pairs[i+1])) ) {
        twoPairValues[0] = pairs[i];
        twoPairValues[1] = pairs[i+1];
        return twoPairValues;
      } else if (contains(comboPairs,pairs[i]) && contains(comboPairs,pairs[i+1])) {
        twoPairValues[0] = pairs[i];
        twoPairValues[1] = pairs[i+1];
        return twoPairValues;
      } else if((contains(comboPairs,pairs[i]) || contains(comboPairs,pairs[i+1]))
        && (contains(flopPairs,pairs[i]) || contains(flopPairs,pairs[i+1]))) {
        twoPairValues[0] = pairs[i];
        twoPairValues[1] = pairs[i+1];
        return twoPairValues;
      }
    }
  }

  return twoPairValues;
}

function hasPairOther(sortedValues, notCard){
  for(var j=0; j < (sortedValues.length - 1); j++){
    test = sortedValues[j];
    for(var i = j+1; i < sortedValues.length; i++){
      if(sortedValues[i] == test && test != notCard) return test;
    }
  }
  return 0;
}

function getUniqueValues(list){
  ret = new Array();
  index = 0;
  ret[index] = list[0];
  for(var i=1; i<list.length; i++){
    if(list[i] != list[i-1]){
      index++;
      ret[index] = list[i];
    }
  }
  return ret;
}

function getUniqueSorted(list1, list2){
  ret = new Array();
  index = 0;
  for(var i=0; i<list1.length; i++){
    ret[index++] = list1[i];
  }
  for(i=0; i<list2.length; i++){
    ret[index++] = list2[i];
  }
  ret.sort(function(a, b){return b-a});
  return getUniqueValues(ret);
}

function straightContains(list, high){
  for(var i=0; i<list.length; i++){
    if(Math.abs(list[i]-high) > 4) return false;
  }
  return true;
}

function getHighestStraight(possStraights, sortedFlopValues){
  ret = 0;
  for(var i=0; i<possStraights.length; i++ ){
    uniqueValues = getUniqueSorted(possStraights[i],sortedFlopValues);
    if(uniqueValues.length > 4){
      ret = hasStraightFromUnpaired(uniqueValues);
      if(ret != 0){
        if(straightContains(possStraights[i], ret)) return ret;
      }
    }
  }
  return ret;
}

function getPossStraights(uniqueValues){
  index = 0;
  ret = new Array();
  for(var i=0; i < (uniqueValues.length - 1); i++){
    for(var j=1+i; j < uniqueValues.length; j++){
      if(uniqueValues[i] - uniqueValues[j] < 5){
        //add them to list
//        index = this.possStraights.length;
//        this.possStraights[index] = new Array();
        ret[index] = new Array();
        ret[index][0] = uniqueValues[i];
        ret[index][1] = uniqueValues[j];
        index++;
      }
    }
  }
  //need to account for an ace
  return ret;
}

function contains(list, item){
  for(var ci=0; ci<list.length; ci++){
    if(list[ci] == item) return true;
  }
  return false;
}

function numContains(list, item){
  num = 0;
  for(var ni=0; ni<list.length; ni++){
    if(list[ni] == item) num++;
  }
  return num;
}

function hasMatchingSuits(possibleSuits, suit) {
  for(var i=0; i<possibleSuits.length; i++){
    if(possibleSuits[i] == suit){
      return suit;
    }
  }
  return "";
}

function getStraightFlush(hand, flop, suit){
  suitCards = new Array();
  handValues = new Array();
  var index = 0;
  for(var i=0; i< hand.length; i++){
    if(hand[i].suit == suit){
      handValues[index] = hand[i].value;
      suitCards[index++] = hand[i].value;
    }
  }
  for(var i=0; i< flop.length; i++){
    if(flop[i].suit == suit){
      suitCards[index++] = flop[i].value;
    }
  }
  suitCards.sort(function(a, b){return b-a});
  highStraight = hasStraightFromUnpaired(suitCards);
  if(highStraight == 0) return 0;

  if(suitCards.length == 5) return highStraight;

  if(handValues.length == 2){
    if((highStraight - handValues[0]) < 5 && (highStraight - handValues[1]) < 5 ){
      return highStraight;
    }
  }

  if(handValues.length == 3){
    if(highStraight < handValues[0]){
      if((highStraight - handValues[1]) < 5 && (highStraight - handValues[2]) < 5 ){
        return highStraight;
      }
    } else {
      if((highStraight - handValues[0]) < 5 && (highStraight - handValues[1]) < 5
        && (highStraight - handValues[1]) > 4 ){
        return highStraight;
      }
    }
  }

  if(handValues.length == 3){
    //add logic
  }

  //loop for other straight values before returning 0

  return 0;
}

function createTempHand(cardsPlayer, cardsFlop){
  cards = new Array();

  numCards = cardsPlayer.length;
  for(var i=0; i< numCards; i++){
    cards[i] = cardsPlayer[i];
  }
  for(i=numCards; i< numCards+cardsFlop.length ; i++){
    cards[i] = cardsFlop[i-numCards];
  }
  return cards;
}

function getFlushSuit(cards) {
  diamonds = 0;
  clubs = 0;
  spades = 0;
  hearts = 0;

  for(var i=0; i<cards.length; i++){
    if(cards[i].suit == "Diamonds"){
      diamonds++;
    }
    else if(cards[i].suit == "Clubs"){
      clubs++;
    }
    else if(cards[i].suit == "Spades"){
      spades++;
    }
    else if(cards[i].suit == "Hearts"){
      hearts++;
    }
  }

  if(diamonds > 2){
    return "Diamonds";
  }
  if(clubs > 2){
    return "Clubs";
  }
  if(hearts > 2){
    return "Hearts";
  }
  if(spades > 2){
    return "Spades";
  }

  return "";
}

function getPossibleFlushSuits(cards) {
  suits = new Array();

  diamonds = 0;
  clubs = 0;
  spades = 0;
  hearts = 0;

  for(var i=0; i<cards.length; i++){
    if(cards[i].suit == "Diamonds"){
      diamonds++;
    }
    else if(cards[i].suit == "Clubs"){
      clubs++;
    }
    else if(cards[i].suit == "Spades"){
      spades++;
    }
    else if(cards[i].suit == "Hearts"){
      hearts++;
    }
  }

  if(diamonds > 1){
    suits[suits.length] = "Diamonds";
  }
  if(clubs > 1){
    suits[suits.length] = "Clubs";
  }
  if(hearts > 1){
    suits[suits.length] = "Hearts";
  }
  if(spades > 1){
    suits[suits.length] = "Spades";
  }

  return suits;
}

function hasMatch(values,match){
  for(var i=0; i<values.length; i++){
    if(values[i] == match) return match;
  }
  return 0;
}

function commonValues(pairValues1, pairValues2){
  ret = new Array();
  var k=0;
  for(var i=0; i<pairValues1.length; i++){
    for(var j=0; j<pairValues2.length; j++){
      if(pairValues1[i] == pairValues2[j]){
        ret[k] = pairValues1[i];
        k++;
        break;
      }
    }
  }
  return ret;
}
