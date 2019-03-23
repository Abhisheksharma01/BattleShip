const {expect} = require("chai");
const validateArgs = require("../../src/utilities/validator");

let mockFileData;


describe("The validateArgs method -->", () => {

  beforeEach(() => {
    mockFileData = {
      "AreaDimensions": "5 E",
      "shipCount": 2,
      "ships": ["Q 1 1 A1 B2", "P 2 1 D4 C3"],
      "player1Targets": "A1 B2 B2 B3",
      "player2Targets": "A1 B2 B3 A1 D1 E1 D4 D4 D5 D5"
    };
  });

  describe("when no fileContents is passed", () => {

    it("should throw an error", () => {

      const boundValdiadte = validateArgs.bind(null, undefined);
      expect(boundValdiadte).to.throw(/No File Content/);
    });

  });

  describe("Checking area dimensions", () => {
    describe("when bad Area Dimensions is passed", () => {

      it("should throw an error", () => {
        mockFileData.AreaDimensions = "11 A";
        const boundValidatetArgs = validateArgs.bind(null, mockFileData);
        expect(boundValidatetArgs).to.throw(/Bad Area Dimensions/);
      });

    });

    describe("when valid Area Dimensions is passed", () => {

      it("should parse and populate area dimesions", () => {
        const validatedArgs = validateArgs(mockFileData);
        expect(validatedArgs.AreaDimensions).to.deep.equal([5, 5]);
      });

    });
  });

  describe("Checking ship count", () => {
    describe("when non integer ship count is passed", () => {

      it("should throw an error", () => {
        mockFileData.shipCount = "A";
        const boundValidatetArgs = validateArgs.bind(null, mockFileData);
        expect(boundValidatetArgs).to.throw(/Bad Ship Count/);
      });

    });

    describe("when out of bound ship count is passed", () => {

      it("should throw an error", () => {
        mockFileData.shipCount = "30";
        const boundValidatetArgs = validateArgs.bind(null, mockFileData);
        expect(boundValidatetArgs).to.throw(/Bad Ship Count/);
      });

    });

    describe("when valid ship count is passed", () => {

      it("should parse and populate ship count", () => {
        const validatedArgs = validateArgs(mockFileData);
        expect(validatedArgs.shipCount).to.equal(2);
      });

    });
  });

  describe("Checking ship configuration", () => {
    describe("when invalid ship type is passed", () => {

      it("should throw an error", () => {
        mockFileData.ships = ["A 1 1 A1 B2", "P 2 1 D4 C3"];
        const boundValidatetArgs = validateArgs.bind(null, mockFileData);
        expect(boundValidatetArgs).to.throw(/ship at line 3 has bad configurations/);
      });

    });

    describe("when out of bound ship dimensions are passed", () => {

      it("should throw an error", () => {
        mockFileData.ships = ["Q 1 1 A1 B2", "P 8 9 D4 C3"];
        const boundValidatetArgs = validateArgs.bind(null, mockFileData);
        expect(boundValidatetArgs).to.throw(/ship at line 4 has bad configurations/);
      });

    });

    describe("when out of bound ship coordinates are passed", () => {

      it("should throw an error", () => {
        mockFileData.ships = ["Q 1 1 A9 B2", "P 2 1 D4 C3"];
        const boundValidatetArgs = validateArgs.bind(null, mockFileData);
        expect(boundValidatetArgs).to.throw(/ship at line 3 has bad configurations/);
      });

    });

    describe("when valid ship configuration is passed", () => {

      it("should parse and populate ships", () => {
        const expectedPlayer1Ships = [
          {
            "type": "Q",
            "dimension": [1, 1],
            "coordinates": [1, 1]
          },
          {
            "type": "P",
            "dimension": [2, 1],
            "coordinates": [4, 4]
          }
        ];
        const expectedPlayer2Ships = [
          {
            "type": "Q",
            "dimension": [1, 1],
            "coordinates": [2, 2]
          },
          {
            "type": "P",
            "dimension": [2, 1],
            "coordinates": [3, 3]
          }
        ];
        const validatedArgs = validateArgs(mockFileData);
        expect(validatedArgs.player1Ships).to.deep.equal(expectedPlayer1Ships);
        expect(validatedArgs.player2Ships).to.deep.equal(expectedPlayer2Ships);
      });

    });
  });

  describe("Checking player targets", () => {
    describe("when out of bound target is passed for player1", () => {

      it("should throw an error", () => {
        mockFileData.player1Targets = "A8";
        const boundValidatetArgs = validateArgs.bind(null, mockFileData);
        expect(boundValidatetArgs).to.throw("player 1 has a bad/outOfBound target A8");
      });

    });

    describe("when out of bound target is passed for player2", () => {

      it("should throw an error", () => {
        mockFileData.player2Targets = "A8";
        const boundValidatetArgs = validateArgs.bind(null, mockFileData);
        expect(boundValidatetArgs).to.throw("player 2 has a bad/outOfBound target A8");
      });

    });

    describe("when valid targets for players are passed", () => {

      it("should parse and populate targets", () => {
        const expectedPlayer1Targets = ["A1", "B2", "B2", "B3"];
        const expectedPlayer2Targets = ["A1", "B2", "B3", "A1", "D1", "E1", "D4", "D4", "D5", "D5"];
        const validatedArgs = validateArgs(mockFileData);
        expect(validatedArgs.player1Targets).to.deep.equal(expectedPlayer1Targets);
        expect(validatedArgs.player2Targets).to.deep.equal(expectedPlayer2Targets);
      });

    });
  });

});
