class AbstractPokerHand {

  constructor(pokerHandName) {
    this._pokerHandName = pokerHandName;
    this._nextPoker = null;
  }

  get pokerHandName() {
    return this._pokerHandName;
  }

  setNext(nextPoker) {
    this._nextPoker = nextPoker;
    return nextPoker;
  }

  getMatchedPokerHand(player) {
    if (this.matches(player) === true) {
      return this;
    } else if (this._nextPoker !== null) {
      return this._nextPoker.getMatchedPokerHand(player);
    } else {
      return null;
    }
  }

  // 抽象化して継承先で必ず実装させる
  matches(player) {
    throw("implememtooooooooo !!!!!!!!!!");
  }

  say() {
    console.log(`your hand is ${this._pokerHandName}`)
  }

}

module.exports = AbstractPokerHand;