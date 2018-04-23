const AbstractPokerHand = require("./AbstractPokerHand");

class ThreeOfAKind extends AbstractPokerHand {
  constructor() {
    super("ThreeOfAKind");
  }

  matches(player) {
    const hand = player.getHand();
    return hand.getMaxNumberOfAKind() === 3;
  }
}

module.exports = ThreeOfAKind;