const AbstractPokerHand = require("./AbstractPokerHand");

class OnePairs extends AbstractPokerHand {
  constructor() {
    super("Two Pairs");
  }

  matches(player) {
    const hand = player.getHand();
    return hand.getNumberOfPairs() === 1;
  }
}

module.exports = OnePairs;