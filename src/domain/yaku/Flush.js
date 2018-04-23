const AbstractPokerHand = require("./AbstractPokerHand");

class Flush extends AbstractPokerHand {
    constructor() {
        super("Flush");
    }

    matches(player) {
        const hand = player.getHand();
        return hand.isFlush();
    }

}

module.exports = Flush;