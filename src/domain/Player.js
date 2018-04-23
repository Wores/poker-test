const Hand = require('./Hand')

class Player {

    constructor(name) {
        this._name = name;
        this._hand = new Hand();
    }

    getHand() {
        return this._hand;
    }
}

module.exports = Player;