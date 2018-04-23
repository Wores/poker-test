const AbstractPokerHand = require("./AbstractPokerHand");

class FourOfAKind extends AbstractPokerHand {
  constructor() {
    super("FourOfAKind");
  }

  matches(player) {
    const maxNumberOfAKind = player.getHand().getMaxNumberOfAKind();
    return maxNumberOfAKind === 4;
  }
}

module.exports = FourOfAKind;
