const AbstractPokerHand = require("./AbstractPokerHand");

class Straight extends AbstractPokerHand {
  constructor() {
    super("Straight");
  }

  matches(player) {
    return player.getHand().isStraight();
  }
}

module.exports = Straight;