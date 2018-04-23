const AbstractPokerHand = require("./AbstractPokerHand");

class ThreeOfAKind extends AbstractPokerHand {
  constructor() {
    super("ThreeOfAKind");
  }

  matches(player) {
    const maxNumberOfAKind = player.getHand().getMaxNumberOfAKind();
    return maxNumberOfAKind === 3;
  }
}

module.exports = ThreeOfAKind;