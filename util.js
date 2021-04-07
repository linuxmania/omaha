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
