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

function Card(suit,order){
	this.suit=suit;
	this.order=order;

	switch(order){
		case 1:
			this.name = "A";
			this.value = 14;
			break;
		case 2:
			this.name = "2";
			this.value = 2;
			break;
		case 3:
			this.name = "3";
			this.value = 3;
			break;
		case 4:
			this.name = "4";
			this.value = 4;
			break;
		case 5:
			this.name = "5";
			this.value = 5;
			break;
		case 6:
			this.name = "6";
			this.value = 6;
			break;
		case 7:
			this.name = "7";
			this.value = 7;
			break;
		case 8:
			this.name = "8";
			this.value = 8;
			break;
		case 9:
			this.name = "9";
			this.value = 9;
			break;
		case 10:
			this.name = "10";
			this.value = 10;
			break;
		case 11:
			this.name = "J";
			this.value = 11;
			break;
		case 12:
			this.name = "Q";
			this.value = 12;
			break;
		case 13:
			this.name = "K";
			this.value = 13;
			break;
	}
}
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

function Deck(){
	this.cards = new Array();
	this.shuffled = new Array();

	for(var i=0; i<52; i++) {
		if(i<13)
			var s = "Diamonds";
		else if(i<26)
			s="Clubs";
		else if(i<39)
			s="Hearts";
		else
			s="Spades";

		var val = (i%13) + 1;
		this.cards.push(new Card(s,val));
	}

	while(this.cards.length > 0){
		var num = parseInt(Math.random() * this.cards.length);
		this.shuffled.push(this.cards[num]);
		this.cards.splice(num,1);
	}
}

Deck.prototype.nextCard = function() {
	return this.shuffled.pop();
}
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

function Game(num){
	var playIt = true;
	while(true){
		this.num = prompt("How many Players (2 - 9)?", num);
		if (this.num == parseInt(this.num,10) && this.num > 1 && this.num < 10){
			numPlayers = this.num
			break;
		} else if (this.num == null){
			playIt = false;
			break;
		}
	}
	if(playIt){
		this.deck = new Deck();
		this.players = new Array();
		while(this.num > 0){
			this.players.push(new Player());
			this.num--;
		}
		this.deal();
		alert("Click to see Player 1");
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].process(this.deck, (i+1));
		}

		this.flop = new Flop();

		this.populateFlop();
		this.showFlop();

		this.flop.addCard(this.deck.nextCard());
		this.showFlop();

		this.flop.addCard(this.deck.nextCard());
		this.showFlop();

		this.reportStandings();

		this.reportResults();
	}
}

Game.prototype.populateFlop = function() {
	this.flop.addCard(this.deck.nextCard());
	this.flop.addCard(this.deck.nextCard());
	this.flop.addCard(this.deck.nextCard());
}

Game.prototype.showFlop = function() {
	alert(this.flop.reportHand());
}

Game.prototype.deal = function() {
	for (var j = 0; j < 2; j++) {
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].addCard(this.deck.nextCard());
		}
	}
}

Game.prototype.reportStandings = function() {
	var s = "";
	for (var i = 0; i < this.players.length; i++) {
		this.players[i].evaluateHand(this.flop);
	}

	for (var j = 1; j < 10; j++) {
		for (var i = 0; i < this.players.length; i++) {
			if(this.players[i].value == j){
				s += "Player " + (i+1) + ": " + this.players[i].convertValue() + "\n";
			}
		}
	}
	alert(s);
}

Game.prototype.reportResults = function() {
	var s = "";
	for (var i = 0; i < this.players.length; i++) {
		s = this.players[i].getResults(this.flop, i+1);
		alert(s);
	}
}
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

var numPlayers = 2;

function playGame(num) {
		var game = new Game(num);
}
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

function Player(){
	this.hand = new Array();
	this.sortedHandValues = new Array();
	this.flushSuit = "";
	this.value = 0;
	this.topCard = 0;
	this.straightHighCard = 0;
	this.threesCard = 0;
	this.pairCard = 0;
	this.secondPairCard = 0;
	this.fullOfCard = 0;
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
			s = "Full House - " + decodeValue(this.threesCard) + "  " +  decodeValue(this.fullOfCard)
	    break;
		case 4:
			s = "Flush - " + decodeValue(this.topCard)
	    break;
		case 5:
			s = "Straight - " + decodeValue(this.straightHighCard)
	    break;
		case 6:
			s = "Three of a Kind - " + decodeValue(this.threesCard)
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

Player.prototype.evaluateHand = function(flop){
	tempHand = new Array();
	tempHand[0] = this.getCard(0);
	tempHand[1] = this.getCard(1);
	tempHand[2] = flop.getCard(0);
	tempHand[3] = flop.getCard(1);
	tempHand[4] = flop.getCard(2);
	tempHand[5] = flop.getCard(3);
	tempHand[6] = flop.getCard(4);

	// create sorted values
	this.sortedHandValues = getSortedHandValues(tempHand);

  // flush?
  this.flushSuit = hasFlush(tempHand);

	// straight?
  this.straightHighCard = hasStraight(this.sortedHandValues);

	if(this.flushSuit != "" && this.straightHighCard > 0){ //flush and straight
		this.topCard = hasStrightFlush(tempHand, this.flushSuit);
		if(this.topCard > 0){ //straigh flush
			this.value = 1;
			return;
		}
	}

	this.threesCard = hasThreeOfAKind(this.sortedHandValues);
	if(this.threesCard > 0 && this.flushSuit == "" && this.straightHighCard== 0){ 
		// at least three of a kind with no flush or straight
		this.foursCard = hasFourOfAKind(this.sortedHandValues);
		if(this.foursCard > 0){ //four of a kind
			this.value = 2;
			return;
		}
		this.fullOfCard = hasFullHouse(this.sortedHandValues, this.threesCard);
		if(this.fullOfCard > 0){ // full house
			this.value = 3;
			return;
		}
	}

	if(this.flushSuit != ""){ //flush
		this.topCard = getFlushHigh(tempHand, this.flushSuit);
		this.value = 4;
		return;
	} else if(this.straightHighCard > 0){ //straight
		this.value = 5;
		return;
	} else if(this.threesCard > 0) { // three of a kind
		this.value = 6;
		return;
	}

	this.pairCard = hasPair(this.sortedHandValues);
	if(this.pairCard > 0){ //at least one pair
		this.secondPairCard = hasTwoPair(this.sortedHandValues, this.pairCard);
		if(this.secondPairCard > 0){ // two pair
			this.value = 7;
			return;
		} else { //one pair
			this.value = 8;
			return;
		}
	}

	//high card
	this.topCard = this.sortedHandValues[0];
	this.value = 9;
}

Player.prototype.getResults = function(flop, num){
	s = "Player " + num + ":\n" +
		this.reportHand() +
		"\n\n" +
		flop.reportHand();

	return s;
}
function Flop(){
	this.hand = new Array();
}

Flop.prototype.addCard = function(card) {
	this.hand.push(card);
}

Flop.prototype.getCard = function(index) {
	return this.hand[index];
}

Flop.prototype.reportHand = function(){
	s = "";
	for (var i = 0; i < this.hand.length; i++) {
		s += this.hand[i].name + unicodeSuit(this.hand[i].suit) + "  ";
	}
	return s;
}
function unicodeSuit(suit) {

  switch(suit) {
    case "Spades":
      s = "\u2660"
      break;
    case "Clubs":
      s = "\u2663"
      break;
    case "Diamonds":
      s = "\u2666"
      break;
    case "Hearts":
      s = "\u2665"
      break;
    default:
      s = "Other"
  }
  return s;
}

function decodeValue(value) {
  switch(value) {
    case 14:
      s = "A"
      break;
    case 13:
      s = "K"
      break;
    case 12:
      s = "Q"
      break;
    case 11:
      s = "J"
      break;
    default:
      s = value
  }
  return s;
}
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
  for(j=0; j<sortedHandValues.length-3; j++){
  	test = sortedHandValues[j];
  	matches = 0;
  	for(i = j+1; i < sortedHandValues.length; i++){
  		if(sortedHandValues[i] == test){
  			matches++;
  			if(matches == 3) {
  				return test;
  			}
  		}
  	}
  }
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
