const {expect} = require("chai");
const Area = require("../src/shipArea");
const {getMockedShips, getMockedOverlappingShips} = require("./utilities/dataHelpers");
const {stub} = require("sinon");
const {parseCoordinates} = require("../src/utilities/helpers");

describe("The Area class -->", () => {
  let dimension;
  let mockedShips;
  let area;

  beforeEach(() => {
    mockedShips = getMockedShips();
    dimension = [5, 5];
    area = new Area({"dimension": dimension, "ships": mockedShips});
  });

  describe("construction", () => {

    it("should have all the methods and properties defined", () => {

      expect(area.totalShipCount_).to.equal(3);
      expect(area.shipYard.length).to.equal(dimension[0]);
      expect(area.shipYard[0].length).to.equal(dimension[1]);
      expect(area.shipYard[0][0]).to.deep.equal(mockedShips[0]);
      expect(area.shipYard[1][0]).to.deep.equal(mockedShips[1]);
      expect(area.shipYard[2][0]).to.deep.equal(mockedShips[1]);
      expect(area.isAreaDestroyed).to.be.a("function");
      expect(area.decrementShipCount).to.be.a("function");
    });
  });

  describe("construction", () => {

    beforeEach(() => {
      mockedShips = getMockedOverlappingShips();
      dimension = [5, 5];
    });
    it("should throw when ships are overlapping", () => {
      try {
        area = new Area({"dimension": dimension, "ships": mockedShips});
      } catch (error) {
        expect(error.message).to.equal("Bad Config: Overlapping ships");
      }
    });
  });

  describe("Method: decrementShipCount", () => {

    it("should decrement the total ship count of the area by 1", () => {
      const totalShipCount = area.totalShipCount_;
      area.decrementShipCount();
      expect(area.totalShipCount_).to.equal(totalShipCount - 1);
    });
  });
});
