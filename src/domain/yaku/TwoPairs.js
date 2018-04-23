const AbstractPokerHand = require("./AbstractPokerHand");

class TwoPairs extends AbstractPokerHand {
    constructor() {
        super("Two Pairs");
    }

    matches(player) {
        const hand = player.getHand();
        return hand.getNumberOfPairs() === 2;
    }

}

module.exports = TwoPairs;