function FlopOmaha(){
	this.hand = new Array();
	this.flushSuit = "";
	this.sortedFlopValues = new Array();
	this.threeOfaKind = 0;
	this.pairValues = new Array();
}

FlopOmaha.prototype.addCard = function(card) {
	this.hand.push(card);
}

FlopOmaha.prototype.getCard = function(index) {
	return this.hand[index];
}

FlopOmaha.prototype.analyze = function() {
	this.sortedFlopValues = getSortedHandValues(this.hand);
	this.flushSuit = getFlushSuit(this.hand);

	this.threeOfaKind = hasThreeOfAKind(this.sortedFlopValues);
	this.pairValues = getPairValuesOther(this.sortedFlopValues, this.threeOfaKind);
}

FlopOmaha.prototype.reportHand = function(){
	s = "";
	for (var i = 0; i < this.hand.length; i++) {
		s += this.hand[i].name + unicodeSuit(this.hand[i].suit) + "  ";
	}
	return s;
}
