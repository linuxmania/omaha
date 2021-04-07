function TestHand(){
  this.player = new PlayerOmaha();
  this.flop = new FlopOmaha();

//works
/*
  this.flop.addCard(new Card("Clubs",8));
  this.flop.addCard(new Card("Clubs",7));
  this.flop.addCard(new Card("Hearts",6));
  this.flop.addCard(new Card("Hearts",5));
  this.flop.addCard(new Card("Clubs",9));

  this.player.addCard(new Card("Hearts",13));
  this.player.addCard(new Card("Hearts",12));
  this.player.addCard(new Card("Clubs",11));
  this.player.addCard(new Card("Clubs",10));
*/

// should be straight flush J
/*
  this.flop.addCard(new Card("Clubs",8));
  this.flop.addCard(new Card("Clubs",7));
  this.flop.addCard(new Card("Clubs",6));
  this.flop.addCard(new Card("Clubs",5));
  this.flop.addCard(new Card("Clubs",9));

  this.player.addCard(new Card("Clubs",13));
  this.player.addCard(new Card("Clubs",12));
  this.player.addCard(new Card("Clubs",11));
  this.player.addCard(new Card("Clubs",10));
*/

//should be Full 7 - 5

  this.flop.addCard(new Card("Spades",7));
  this.flop.addCard(new Card("Clubs",7));
  this.flop.addCard(new Card("Diamonds",7));
  this.flop.addCard(new Card("Hearts",8));
  this.flop.addCard(new Card("Spades",10));

  this.player.addCard(new Card("Hearts",5));
  this.player.addCard(new Card("Clubs",5));
  this.player.addCard(new Card("Hearts",10));
  this.player.addCard(new Card("Diamonds",11));


  this.flop.analyze();
  this.player.evaluateHand(this.flop);

  alert(this.player.convertValue());
  alert(this.player.getResults(this.flop, 1));
}
