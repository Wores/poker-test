let Card = require('./Card')
let CardTypeEnum = require('./CardTypeEnum')

class Hand {
  constructor() {
    this._cards = [];
  }

  get cards() {
    return this._cards;
  }

  set cards(cards) {
    if (cards.length > 5) {
      throw("over limit");
    }
    this._cards = cards;
  }

  addCards(cards) {
    const mergeCards = this._cards.concat(cards);
    if (margeCards.length > 5) {
      throw("over limit");
    }
    this._cards = mergeCards;
  }

  getCardNumbers() {
    return this._cards.map(e => e.number);
  }

  getNumberOfPairs() {
    const pairs = Object.values(this.fitNumbers()).filter(e => e.length === 2);
    return pairs.length;
  }

  getMaxNumberOfAKind() {
    const lengthArray = Object.values(this.fitNumbers()).map(e => e.length);
    return Math.max.apply([], lengthArray);
  }

  containsCardNumberOf(num) {
    return this.getCardNumbers().includes(num);
  }

  isFlush() {
    return Object.keys(this.fitTypes()).length === 1;
  }

  isStraight() {
    const sortedNumbers = this.getCardNumbers().sort();
    const minNumber = Math.min.apply([], sortedNumbers);
    const sequentialNumbers = new Array(sortedNumbers.length)
      .fill(minNumber)
      .map((e, i) => e + i);
    return `${sequentialNumbers}` === `${sortedNumbers}`;
  }

  fitTypes() {
    let fitTypesJson = {};
    this._cards.some(card => {
      let element = fitTypesJson[`${card.type}`];
      if (element === undefined) {
        element = [];
      }
      fitTypesJson[`${card.type}`] = element.concat(card);
    });
    return fitTypesJson;
  }

  fitNumbers() {
    let fitNumbersJson = {};
    this._cards.some(card => {
      let element = fitNumbersJson[`${card.number}`];
      if (element === undefined) {
        element = [];
      }
      fitNumbersJson[`${card.number}`] = element.concat(card);
    });
    return fitNumbersJson;
  }
}

module.exports = Hand;
