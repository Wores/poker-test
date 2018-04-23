const AbstractPokerHand = require("./AbstractPokerHand");

class FourOfAKind extends AbstractPokerHand {
  constructor() {
    super("FourOfAKind");
  }

  matches(player) {
    const hand = player.getHand();
    return hand.getMaxNumberOfAKind() === 4;
  }
}

module.exports = FourOfAKind;
