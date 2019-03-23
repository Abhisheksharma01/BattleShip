const {expect} = require("chai");
const Ship = require("../src/ship");
let testShip;
describe("The ship class -->", () => {

  beforeEach(() => {
    testShip = new Ship({"type": "P", "dimension": [1, 1], "coordinates": [2, 2]});
  });

  describe("construction", () => {

    it("should have all the methods nad properties defined", () => {

      expect(testShip.type_).to.equal("P");
      expect(testShip.dimension).to.deep.equal([1, 1]);
      expect(testShip.coordinates).to.deep.equal([2, 2]);
      expect(testShip.isDestroyed).to.be.a("function");
      expect(testShip.bombard).to.be.a("function");
      expect(testShip.hitCount_).to.equal(1);
    });

    it("should have hitcount equal to 2 when type is 'Q'", () => {
      testShip = new Ship({"type": "Q", "dimension": [1, 1], "coordinates": [2, 2]});
      expect(testShip.hitCount_).to.equal(2);
    });
  });

  describe("when bombared", () => {

    it("should decrement the hitcount ", () => {
      const oldHitCount = testShip.hitCount_;
      testShip.bombard();
      expect(testShip.hitCount_).to.equal(oldHitCount - 1);
    });

  });

  describe("when inquired of destruction", () => {

    it("should return true if hitcount is zero", () => {
      const oldHitCount = testShip.hitCount_;
      testShip.bombard();
      const isDestroyed = testShip.isDestroyed();
      expect(isDestroyed).to.equal(true);
    });

  });
});
