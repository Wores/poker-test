const AbstractPokerHand = require("./AbstractPokerHand");

class StraightFlush extends AbstractPokerHand {
  constructor() {
    super("Straight Flush");
  }

  // override
  matches(player) {
    const hand = player.getHand();
    return hand.isFlush() && hand.isStraight();
  }
}

module.exports = StraightFlush;