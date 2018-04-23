class Card {

    constructor(type, number) {
        this._number = number
        this._type = type
    }

    get number() {
        return this._number;
    }

    get type() {
        return this._type;
    }

    equalType(type) {
        return this._type === type;
    }

    equalNumber(number) {
        return this._number = number;
    }

    equal(card) {
        return this.equalType(card.type) && this.equalNumber(card.number);
    }

}

module.exports = Card;