function hasTwoPair(sortedHandValues, pairValue){
	remainingCards = new Array();
	j=0;
	for(i = 0; i < sortedHandValues.length; i++){
		if(sortedHandValues[i] != pairValue){
			remainingCards[j] = sortedHandValues[i];
			j++;
		}
	}
  return hasPair(remainingCards);
}

function getFlushHigh(tempHand, flushSuit){
  flushHigh = 0;
  for(i=0; i<tempHand.length; i++){
    if(tempHand[i].suit == flushSuit){
      if(tempHand[i].value > flushHigh)
      flushHigh = tempHand[i].value;
    }
  }
  return flushHigh;
}

function hasFullHouse(sortedHandValues, threesValue){
	remainingCards = new Array();
	j = 0;
	for(i=0; i<sortedHandValues.length; i++){
		if(sortedHandValues[i] != threesValue){
			remainingCards[j] = sortedHandValues[i];
			j++;
		}
	}
  return hasPair(remainingCards);
}

function hasFourOfAKind(sortedHandValues){
	remaining = new Array();

	for(j=0; j<sortedHandValues.length-3; j++){
  	test = sortedHandValues[j];
		matches = 0;
		k = 0;
  	for(i = j+1; i < sortedHandValues.length; i++){
  		if(sortedHandValues[i] == test){
  			matches++;
  			if(matches == 3) {
  				return test;
  			}
  		} else {
				remaining[k] = sortedHandValues[i];
				k++;
			}
  	}
  }

	test = remaining[0];
	for(i=1;i<remaining.length;i++){
		if(remaining[i] != test);
			return 0;
	}
	if(i == 4) return test;
	return 0;
}

function hasStraightFlush(tempHand, suit){
	hand = new Array();

	j = 0;
	for(i = 0; i < tempHand.length; i++){
		if(tempHand[i].suit == suit){
			hand[j] = tempHand[i].value;
			j++;
		}
	}
	//sort array descending
	hand.sort(function(a, b){return b-a});

  for(i=0; i< hand.length -4; i++){
  	if(hand[i] - hand[i+4] == 4) {
  		return hand[i];
  	}
  }

	if(hand[0] == 14 && hand[hand.length - 1] == 2 && hand[hand.length - 4] == 5) {
		return 5;
	}
	return 0;
}

function getUnpairedValues(sortedHandValues){
  unpairedValues = new Array();

  unpairedValues[0] = sortedHandValues[0];
  prev =0;
  j=1;
  for(i = 1; i < sortedHandValues.length; i++){
    if(sortedHandValues[i] != sortedHandValues[prev]){
      unpairedValues[j] = sortedHandValues[i];
      j++;
    }
    prev++;
  }
  return unpairedValues;
}

function hasStraight(sortedHandValues){
  unpairedValues = getUnpairedValues(sortedHandValues);
  return hasStraightFromUnpaired(unpairedValues);
}

function hasStraightFromUnpaired(sortedUnpairedValues){
  numCards = sortedUnpairedValues.length;
  if(numCards < 5) return 0;

  for(j=0; j< (numCards -4); j++){
  	if((sortedUnpairedValues[j] - sortedUnpairedValues[j+4]) == 4)
      return sortedUnpairedValues[j];
  }

	if(sortedUnpairedValues[0] == 14 && sortedUnpairedValues[numCards-1] == 2 && sortedUnpairedValues[numCards-4] == 5)
    return 5;

	return 0;
}

function getSortedHandValues(hand){
	sortedHand = new Array();

	for(i = 0; i < hand.length; i++){
		sortedHand[i] = hand[i].value;
	}
	//sort array descending
	sortedHand.sort(function(a, b){return b-a});
	return sortedHand;
}

function hasThreeOfAKind(sortedHandValues){
	for(j=0; j<(sortedHandValues.length-2); j++){
		test = sortedHandValues[j];
		matches = 0;
		for(i = j+1; i < sortedHandValues.length; i++){
			if(sortedHandValues[i] == test){
				matches++;
				if(matches == 2) {
					return test;
				}
			}
		}
	}
	return 0;
}

function hasPair(sortedValues){
	for(j=0; j < (sortedValues.length - 1); j++){
		test = sortedValues[j];
		for(i = j+1; i < sortedValues.length; i++){
			if(sortedValues[i] == test) return test;
		}
	}
  return 0;
}

function hasFlush(tempHand){
	diamonds = 0;
	clubs = 0;
	hearts = 0;
	spades = 0;

	for(i = 0; i < tempHand.length; i++){
		if(tempHand[i].suit == "Diamonds") diamonds++;
		else if(tempHand[i].suit == "Clubs") clubs++;
		else if(tempHand[i].suit == "Spades") spades++;
		else if(tempHand[i].suit == "Hearts")hearts++;
	}

	if(diamonds >= 5) return "Diamonds";
	else if(clubs >= 5) return "Clubs";
	else if(spades >= 5) return "Spades";
	else if(hearts >= 5) return "Hearts";

	return "";
}
