const AbstractPokerHand = require("./AbstractPokerHand");

class FullHouse extends AbstractPokerHand {
  constructor() {
    super("FullHouse");
  }

  matches(player) {
    const hand = player.getHand();
    const maxNumberOfAKind = hand.getMaxNumberOfAKind();
    const numberOfPairs = hand.getNumberOfPairs();
    return maxNumberOfAKind === 3 && numberOfPairs == 1;
  }
}

module.exports = FullHouse;