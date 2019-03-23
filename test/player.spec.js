const {expect} = require("chai");
const Player = require("../src/player");
const {getMockedArea} = require("./utilities/dataHelpers");
const {stub} = require("sinon");
const {parseCoordinates} = require("../src/utilities/helpers");

describe("The Player class -->", () => {
  let playerTargets;
  let mockedArea;
  let player;

  beforeEach(() => {
    mockedArea = getMockedArea();
    playerTargets = ["A1", "B1"];
    player = new Player({"area": mockedArea, "targets": playerTargets, "opponentPlayerName": "Player-2", "name": "Player-1"});
  });

  describe("construction", () => {

    it("should have all the methods nad properties defined", () => {

      expect(player.area_).to.equal(mockedArea);
      expect(player.targets).to.deep.equal(playerTargets);
      expect(player.opponentPlayerName_).to.equal("Player-2");
      expect(player.name).to.equal("Player-1");
      expect(player.getNextTarget).to.be.a("function");
      expect(player.takeHit).to.be.a("function");
      expect(player.isDefeated).to.be.a("function");
    });
  });

  describe("Method : getNextTarget ", () => {

    it("should return target at a specific index", () => {

      const target = player.getNextTarget(0);
      expect(target).to.equal(playerTargets[0]);
    });
  });

  describe("Method : takeHit ", () => {

    it("should return true when ship is present at the target", () => {

      expect(player.takeHit("A1")).to.be.true;
      expect(player.takeHit("A2")).to.be.true;
      expect(player.takeHit("A3")).to.be.true;
    });


    it("should return false when ship is not present at the target", () => {

      expect(player.takeHit("A4")).to.be.false;
      expect(player.takeHit("A5")).to.be.false;
      expect(player.takeHit("B1")).to.be.false;
      expect(player.takeHit("c4")).to.be.false;
    });

    it("should return false when ship is present but destroyed", () => {
      const ship = player.area_.shipYard[0][0];
      ship.isDestroyed = stub().returns(true);
      expect(player.takeHit("A1")).to.be.false;
    });

    it("should return true and decrement area's shipCount when ship is present and destroyed", () => {
      const currentCount = player.area_.totalShipCount_;
      expect(player.takeHit("A1")).to.be.true;
      expect(player.area_.totalShipCount_).to.equal(currentCount - 1);
    });
  });
});
