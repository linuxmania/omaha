/***************************
Copyleft [2014] [Daniel Spicer]
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
****************************/

// original player file, works but rewritten
function Player(){
	this.hand = new Array();

	this.value = 0;
	this.topCard = 0;
//	this.kickers = 	new Array();

	this.handValues = new Array();

	this.hasFlush = false;
	this.flushSuit = "";

	this.threesValue = 0;
	this.pairCard = 0;
	this.secondPairCard = 0;
}

Player.prototype.addCard = function(card) {
	this.hand.push(card);
}

Player.prototype.getCard = function(index) {
	return this.hand[index];
}

Player.prototype.convertValue = function(){
	var s = "undefined";
	switch(this.value) {
	  case 1:
	    s = "Straight Flush - " + decodeValue(this.topCard)
	    break;
	  case 2:
			s = "Four of a Kind - " + decodeValue(this.topCard)
	    break;
		case 3:
			s = "Full House - " + decodeValue(this.threesValue) + "  " +  decodeValue(this.pairCard)
	    break;
		case 4:
			s = "Flush - " + decodeValue(this.topCard)
	    break;
		case 5:
			s = "Straight - " + decodeValue(this.topCard)
	    break;
		case 6:
			s = "Three of a Kind - " + decodeValue(this.threesValue)
	    break;
		case 7:
			s = "Two Pair - " + decodeValue(this.pairCard) + "  " + decodeValue(this.secondPairCard)
	    break;
		case 8:
			s = "One Pair - " + decodeValue(this.pairCard)
	    break;
		case 9:
			s = "High Card - " + decodeValue(this.topCard)
	    break;
	  default:
			s = "Other"
	}
	return s;
}


Player.prototype.reportHand = function(){
	s="";
	for (var i = 0; i < this.hand.length; i++) {
		s += this.hand[i].name + unicodeSuit(this.hand[i].suit) + "  ";
	}
	return s;
}

Player.prototype.process = function(deck, num){
	s = "Player " + num + ":\n" +
		this.reportHand();
	alert(s);
	alert("Click to see next Player or flop");
}

Player.prototype.sortHand = function(tempHand){
	hand = new Array();

	for(i = 0; i < tempHand.length; i++){
		hand[i] = tempHand[i].value;
	}
	//sort array descending
	hand.sort(function(a, b){return b-a});
	this.handValues = hand;
}

//Player.prototype.isStraightFlush = function(tempHand){
Player.prototype.isStraightFlush = function(tempHand){
//	sortedHand = this.handValues;
	hand = new Array();

	j = 0;
	for(i = 0; i < tempHand.length; i++){
		if(tempHand[i].suit == this.flushSuit){
			hand[j] = tempHand[i].value;
			j++;
		}
	}

	//sort array descending
	hand.sort(function(a, b){return b-a});

  this.topCard = hand[0];
	if(hand[0] - hand[4] == 4) {
		this.value = 1;
		return true;
	}

	if(hand[0] == 14 && (hand[1] - hand[4]) == 3 && hand[4] == 2){
		this.value = 1;
		return true;
	}
	return false;
}

Player.prototype.isThreeOfAKind = function(){
	hand = this.handValues;

	for(j=0; j<(hand.length-2); j++){
		test = hand[j];
		matches = 0;
		for(i = j+1; i < hand.length; i++){
			if(hand[i] == test){
				matches++;
				if(matches == 2) {
					this.value = 6;
					this.threesValue = test;
					return true;
				}
			}
		}
	}
	return false;
}

Player.prototype.isFullHouse = function(){
	hand = this.handValues;
	remainingCards = new Array();
	j = 0;
	for(i=0; i<hand.length; i++){
		if(hand[i] != this.threesValue){
			remainingCards[j] = hand[i];
			j++;
		}
	}
	this.pairCard = this.hasPair(remainingCards);
	if(this.pairCard > 0){
		this.value=3;
		return true;
	}
	return false;
}

Player.prototype.isTwoPair = function(){
	remainingCards = new Array();
	j=0;
	for(i = 0; i < this.handValues.length; i++){
		if(this.handValues[i] != this.pairCard){
			remainingCards[j] = this.handValues[i];
			j++;
		}
	}
	this.secondPairCard = this.hasPair(remainingCards);
	if(this.secondPairCard > 0){
		this.value=7;
		return true;
	}
	return false;
}

Player.prototype.isOnePair = function(){
	this.pairCard = this.hasPair(this.handValues);
	if(this.pairCard > 0){
		this.value = 8;
		return true;
	}
	return false;
}

Player.prototype.isStraight = function(){
	testCards = new Array();
	if((this.handValues[0] - this.handValues[4]) == 4){
		for(i = 0; i < 5; i++){
			testCards[i] = this.handValues[i];
		}
		if(!this.hasPair(testCards)){
			this.topCard = this.handValues[0];
			this.value=5;
			return true;
		}
	}

	testCards = new Array();
	if((this.handValues[1] - this.handValues[5]) == 4){
		for(i = 0; i < 5; i++){
			testCards[i] = this.handValues[i+1];
		}
		if(!this.hasPair(testCards)){
			this.topCard = this.handValues[1];
			this.value=5;
			return true;
		}
	}

	testCards = new Array();
	if((this.handValues[2] - this.handValues[6]) == 4){
		for(i = 0; i < 5; i++){
			testCards[i] = this.handValues[i+2];
		}
		if(!this.hasPair(testCards)){
			this.topCard = this.handValues[2];
			this.value=5;
			return true;
		}
	}

	testCards = new Array();
	if((this.handValues[3] - this.handValues[6]) == 3 && this.handValues[6] == 2){
		for(i = 0; i < 4; i++){
			testCards[i] = this.handValues[i+3];
		}
		if(!this.hasPair(testCards) && this.handValues[0] == 14){
			this.topCard = this.handValues[3];
			this.value=5;
			return true;
		}
	}
	return false;
}

//move to util
Player.prototype.hasPair = function(cards){
	for(j=0; j < (cards.length - 1); j++){
		test = cards[j];
		for(i = j+1; i < cards.length; i++){
			if(cards[i] == test) return test;
		}
	}
  return 0;
}

//Player.prototype.isFourOfAKind = function(tempHand){
Player.prototype.isFourOfAKind = function(){
//	this.sortHand(tempHand);
	hand = this.handValues;

	test = hand[0];
	matches = 0;
	for(i = 1; i < hand.length; i++){
		if(hand[i] == test){
			matches++;
			if(matches == 3) {
				this.topCard = test;
				this.value = 2;
			}
		}
	}

	test = hand[1];
	matches = 0;
	for(i = 2; i < hand.length; i++){
		if(hand[i] == test){
			matches++;
			if(matches == 3) {
				this.topCard = test;
				this.value = 2;
			}
		}
	}
	test = hand[2];
	matches = 0;
	for(i = 3; i < hand.length; i++){
		if(hand[i] == test){
			matches++;
			if(matches == 3) {
				this.topCard = test;
				this.value = 2;
			}
		}
	}
	test = hand[3];
	matches = 0;
	for(i = 4; i < hand.length; i++){
		if(hand[i] == test){
			matches++;
			if(matches == 3) {
				this.topCard = test;
				this.value = 2;

			}
		}
	}
	return false;
}

Player.prototype.evaluateHand = function(flop){
	tempHand = new Array();
	tempHand[0] = this.getCard(0);
	tempHand[1] = this.getCard(1);
	tempHand[2] = flop.getCard(0);
	tempHand[3] = flop.getCard(1);
	tempHand[4] = flop.getCard(2);
	tempHand[5] = flop.getCard(3);
	tempHand[6] = flop.getCard(4);

	if(this.isFlush(tempHand)){
		this.isStraightFlush(tempHand);
	} else if(!this.isFourOfAKind()){
			if(this.isThreeOfAKind()){
				if(!this.isFullHouse()){
					this.isStraight();
				}
			} else if(!this.isStraight()){
				if(this.isOnePair()){
					this.isTwoPair();
				} else {
					this.topCard = this.handValues[0];
					this.value = 9;
				}
		 }
	 }
}

Player.prototype.isFlush = function(tempHand){
	this.sortHand(tempHand);
	hand = this.handValues;

	diamonds = 0;
	clubs = 0;
	hearts = 0;
	spades = 0;

	for(i = 0; i < tempHand.length; i++){
		if(tempHand[i].suit == "Diamonds"){
			diamonds++;
		}
		else if(tempHand[i].suit == "Clubs"){
			clubs++;
		}
		else if(tempHand[i].suit == "Spades"){
			spades++;
		}
		else if(tempHand[i].suit == "Hearts"){
			hearts++;
		}
	}

	if(diamonds >= 5){
		this.hasFlush = true;
		this.flushSuit = "Diamonds"
		this.value = 4;
	}
	else if(clubs >= 5){
		this.hasFlush = true;
		this.flushSuit = "Clubs"
		this.value = 4;
	}
	else if(spades >= 5){
		this.hasFlush = true;
		this.flushSuit = "Spades"
		this.value = 4;
	}
	else if(hearts >= 5){
		this.hasFlush = true;
		this.flushSuit = "Hearts"
		this.value = 4;
	}
	return this.hasFlush;
}

Player.prototype.getResults = function(flop, num){
	s = "Player " + num + ":\n" +
		this.reportHand() +
		"\n\n" +
		flop.reportHand();

	return s;
}
