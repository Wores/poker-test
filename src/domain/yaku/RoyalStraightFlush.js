const AbstractPokerHand = require("./AbstractPokerHand");

class RoyalStraightFlush extends AbstractPokerHand {

    constructor() {
        super('Royal Straight Flush')
    }

    // override
    matches(player) {
        const royalStraightFlushNumbers = [1, 10, 11, 12, 13];
        const hand  = player.getHand();
        return hand.isFlush() && 
        royalStraightFlushNumbers.filter(e => hand.containsCardNumberOf(e))
            .length === royalStraightFlushNumbers.length;
    }

}

module.exports = RoyalStraightFlush;