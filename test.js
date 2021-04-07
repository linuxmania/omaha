function testHand(){
  var test = new TestHand();
}

function testFourOfaKind(){

  sortedHandValues = new Array();

  sortedHandValues[0] = 13;
  sortedHandValues[1] = 13;
  sortedHandValues[2] = 13;

  sortedHandValues[3] = 9;
  sortedHandValues[4] = 9;
  sortedHandValues[5] = 9;
  sortedHandValues[6] = 8;

  alert("FourOfaKind card: " + hasFourOfAKind(sortedHandValues));
}

function testStraightFlush(){
  cards = new Array();

  cards[0] = new Card("Clubs",13);
  cards[1] = new Card("Clubs",11);
  cards[2] = new Card("Clubs",12);
  cards[3] = new Card("Spades",6);
  cards[4] = new Card("Hearts",2);
  cards[5] = new Card("Clubs",9);
  cards[6] = new Card("Clubs",10);

  alert("StraightFlush card: " + hasStraightFlush(cards, "Clubs"));
}
