const assert = require("assert");

let AbstractPokerHand = require("../src/domain/yaku/AbstractPokerHand");
let Flush = require("../src/domain/yaku/Flush");
let FourOfAKind = require("../src/domain/yaku/FourOfAKind");
let FullHouse = require("../src/domain/yaku/FullHouse");
let OnePair = require("../src/domain/yaku/OnePair");
let RoyalStraightFlush = require("../src/domain/yaku/RoyalStraightFlush");
let Straight = require("../src/domain/yaku/Straight");
let StraightFlush = require("../src/domain/yaku/StraightFlush");
let ThreeOfAKind = require("../src/domain/yaku/ThreeOfAKind");
let TwoPairs = require("../src/domain/yaku/TwoPairs");
let Player = require('../src/domain/Player')
let Hand = require('../src/domain/Hand')
let Card = require('../src/domain/Card')
let CardTypeEnum = require("../src/domain/CardTypeEnum");

const cardsGenerator = {
  genRoyalStraightFlush: function() {
    return [
      new Card(CardTypeEnum.heart, 1),
      new Card(CardTypeEnum.heart, 10),
      new Card(CardTypeEnum.heart, 11),
      new Card(CardTypeEnum.heart, 12),
      new Card(CardTypeEnum.heart, 13)
    ];
  },
  genStraightFlush: function() {
    return [
      new Card(CardTypeEnum.heart, 1),
      new Card(CardTypeEnum.heart, 2),
      new Card(CardTypeEnum.heart, 3),
      new Card(CardTypeEnum.heart, 4),
      new Card(CardTypeEnum.heart, 5)
    ];
  },
  genFlush: function() {
    return [
      new Card(CardTypeEnum.heart, 1),
      new Card(CardTypeEnum.heart, 3),
      new Card(CardTypeEnum.heart, 5),
      new Card(CardTypeEnum.heart, 7),
      new Card(CardTypeEnum.heart, 9)
    ];
  },
  genStraight: function() {
    return [
      new Card(CardTypeEnum.heart, 1),
      new Card(CardTypeEnum.clover, 2),
      new Card(CardTypeEnum.spade, 3),
      new Card(CardTypeEnum.diamond, 4),
      new Card(CardTypeEnum.heart, 5)
    ];
  },
  genFourOfAKind: function() {
    return [
      new Card(CardTypeEnum.clover, 3),
      new Card(CardTypeEnum.heart, 3),
      new Card(CardTypeEnum.heart, 3),
      new Card(CardTypeEnum.heart, 3),
      new Card(CardTypeEnum.heart, 5)
    ];
  },
  genThreeOfAKind: function() {
    return [
      new Card(CardTypeEnum.clover, 3),
      new Card(CardTypeEnum.heart, 3),
      new Card(CardTypeEnum.heart, 3),
      new Card(CardTypeEnum.heart, 4),
      new Card(CardTypeEnum.heart, 5)
    ];
  },
  genOnePair: function() {
    return [
      new Card(CardTypeEnum.clover, 1),
      new Card(CardTypeEnum.heart, 3),
      new Card(CardTypeEnum.heart, 3),
      new Card(CardTypeEnum.heart, 5),
      new Card(CardTypeEnum.heart, 6)
    ];
  },
  genTwoPairs: function() {
    return [
      new Card(CardTypeEnum.clover, 1),
      new Card(CardTypeEnum.heart, 3),
      new Card(CardTypeEnum.heart, 3),
      new Card(CardTypeEnum.heart, 5),
      new Card(CardTypeEnum.heart, 5)
    ];
  },
  genFullHouse: function() {
    return [
      new Card(CardTypeEnum.clover, 3),
      new Card(CardTypeEnum.heart, 3),
      new Card(CardTypeEnum.heart, 3),
      new Card(CardTypeEnum.heart, 5),
      new Card(CardTypeEnum.heart, 5)
    ];
  },
  genHighCard: function() {
    return [
      new Card(CardTypeEnum.clover, 1),
      new Card(CardTypeEnum.spade, 10),
      new Card(CardTypeEnum.diamond, 12),
      new Card(CardTypeEnum.heart, 4),
      new Card(CardTypeEnum.heart, 5),
    ];
  },
  gen6overCards: function() {
    return [
      new Card(CardTypeEnum.clover, 1),
      new Card(CardTypeEnum.heart, 2),
      new Card(CardTypeEnum.heart, 3),
      new Card(CardTypeEnum.heart, 4),
      new Card(CardTypeEnum.heart, 5),
      new Card(CardTypeEnum.heart, 6)
    ];
  }
};

const getHandRule = () => {
        const f = new RoyalStraightFlush();
        f
          .setNext(new StraightFlush())
          .setNext(new Straight())
          .setNext(new Flush())
          .setNext(new FullHouse())
          .setNext(new FourOfAKind())
          .setNext(new ThreeOfAKind())
          .setNext(new TwoPairs())
          .setNext(new OnePair())
        return f;
};

describe("Hand", function() {
  describe("正常系#isFlush()", function() {
    it("全てのカードのCardTypeEnumが同値ならtrue", function() {
      let hand = new Hand();
      hand.cards = cardsGenerator.genStraightFlush();
      assert.equal(hand.isFlush(), true);
    });
  });
  describe("正常系#isStraight()", function() {
    it("全て連番ならtrue", function() {
      let hand = new Hand();
      hand.cards = cardsGenerator.genStraightFlush();
      assert.equal(hand.isStraight(), true);
    });
  });
  describe("正常系#getNumberOfPairs()", function() {
    it("2ペアならtrue", function() {
      let hand = new Hand();
      hand.cards = cardsGenerator.genTwoPairs();
      assert.equal(hand.getNumberOfPairs(), 2);
    });
    it("1ペアならtrue", function() {
      let hand = new Hand();
      hand.cards = cardsGenerator.genOnePair();
      assert.equal(hand.getNumberOfPairs(), 1);
    });
  });
  describe("正常系#getMaxNumberOfAKind()", function() {
    it("同値が2つと3つのセットの中で3を出力する", function() {
      let hand = new Hand();
      hand.cards = cardsGenerator.genFullHouse();
      assert.equal(hand.getMaxNumberOfAKind(), 3);
    });
  });
  describe("正常系#isSameArrayWithCardNumbers()", function() {
    it("配列が同じ内容ならtrue", function() {
      let hand = new Hand();
      hand.cards = cardsGenerator.genStraight();
      assert.equal(hand.isSameArrayWithCardNumbers(hand.getCardNumbers()), true);
    });
  });
  describe("異常系#setCards", function() {
    it("6枚以上のカードをセットしたらerrを投げる", function() {
      let hand = new Hand();
      let isCatchError = false;
      try {
        hand.cards = cardsGenerator.gen6overCards();
      } catch (e) {
        isCatchError = true;
      }
      assert.equal(isCatchError, true);
    });
  });
    describe("異常系#addCards", function() {
      it("追加してカードが6枚異常になったらerrを投げる", function() {
        let hand = new Hand();
        let isCatchError = false;
        try {
          hand.cards = cardsGenerator.genFourOfAKind();
          hand.addCards(cardsGenerator.genFullHouse(0));
        } catch (e) {
          isCatchError = true;
        }
        assert.equal(isCatchError, true);
      });
    });
});

describe("RoyalStraightFlush", function() {
  describe("正常系#matches()", function() {
    it("yeh! RoyalStraightFlush!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genRoyalStraightFlush();
      assert.equal(new RoyalStraightFlush().matches(player), true);
    });
    it("not Flush!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genStraightFlush();
      assert.equal(new RoyalStraightFlush().matches(player), false);
    });
    it("not Straight!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genStraight();
      assert.equal(new RoyalStraightFlush().matches(player), false);
    });
  });
});

describe("FullHouse", function() {
  describe("正常系#matches()", function() {
    it("yeh! FullHouse!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genFullHouse();
      assert.equal(new FullHouse().matches(player), true);
    });
    it("not one pairs!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genOnePair();
      assert.equal(new FullHouse().matches(player), false);
    });
    it("not three of a kind", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genThreeOfAKind();
      assert.equal(new FullHouse().matches(player), false);
    });
  });
});

describe("StraightFlush", function() {
  describe("正常系#matches()", function() {
    it("yeh! StraightFlush!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genStraightFlush();
      assert.equal(new StraightFlush().matches(player), true);
    });
    it("not straight!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genStraight();
      assert.equal(new StraightFlush().matches(player), false);
    });
    it("not flush", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genFlush();
      assert.equal(new StraightFlush().matches(player), false);
    });
  });
});


describe("AbstractPokerHand", function() {
  describe("正常系#getMatchedPokerHand()", function() {
    it("yeh! StraightFlush!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genStraightFlush();
      const handRule = getHandRule();
      const result = handRule.getMatchedPokerHand(player);
      assert.equal(result.constructor, StraightFlush);
    });
    it("yeh! Straight!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genStraight();
      const handRule = getHandRule();
      const result = handRule.getMatchedPokerHand(player);
      assert.equal(result.constructor, Straight);
    });
    it("yeh! Flush!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genFlush();
      const handRule = getHandRule();
      const result = handRule.getMatchedPokerHand(player);
      assert.equal(result.constructor, Flush);
    });
    it("yeh! RoyalStraightFlush!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genRoyalStraightFlush();
      const handRule = getHandRule();
      const result = handRule.getMatchedPokerHand(player);
      assert.equal(result.constructor, RoyalStraightFlush);
    });
    it("yeh! FourOfAKind!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genFourOfAKind();
      const handRule = getHandRule();
      const result = handRule.getMatchedPokerHand(player);
      assert.equal(result.constructor, FourOfAKind);
    });
    it("yeh! ThreeOfAKind!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genThreeOfAKind();
      const handRule = getHandRule();
      const result = handRule.getMatchedPokerHand(player);
      assert.equal(result.constructor, ThreeOfAKind);
    });
    it("yeh! TwoPairs!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genTwoPairs();
      const handRule = getHandRule();
      const result = handRule.getMatchedPokerHand(player);
      assert.equal(result.constructor, TwoPairs);
    });
    it("yeh! OnePair!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genOnePair();
      const handRule = getHandRule();
      const result = handRule.getMatchedPokerHand(player);
      assert.equal(result.constructor, OnePair);
    });
    it("yeh! no match!", function() {
      const player = new Player();
      player.getHand().cards = cardsGenerator.genHighCard();
      const handRule = getHandRule();
      const result = handRule.getMatchedPokerHand(player);
      assert.equal(result, null);
    });
  });
});