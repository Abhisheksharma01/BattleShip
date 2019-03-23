const {expect} = require("chai");
const StringToStream = require("../readableStreamHelper");

const fileReader = require("../../src/utilities/fileReader");

describe("The fileReader method -->", () => {

  describe("when no filepath is specified", () => {

    it("should throw an error", () => {

      return fileReader()
        .then(() => {
          throw new Error("not expected");
        })
        .catch(error => {
          expect(error.name).to.equal("AssertionError [ERR_ASSERTION]");
          expect(error.message).to.equal("input file path is empty");
        });

    });

  });

  describe("when fileContent is passed", () => {

    const testData = [
      "5 E",
      "2",
      "Q 1 1 A1 B2",
      "P 2 1 D4 C3",
      "A1 B2 B2 B3",
      "A1 B2 B3 A1 D1 E1 D4 D4 D5 D5"
    ];
    const testStream = new StringToStream(testData.slice(0));
    it("should parse it", () => {

      return fileReader(undefined, testStream)
        .then(fileContents => {
          expect(fileContents.AreaDimensions).to.equal(testData[0]);
          expect(fileContents.shipCount).to.equal(parseInt(testData[1], 10));
          expect(fileContents.ships[0]).to.equal(testData[2]);
          expect(fileContents.ships[1]).to.equal(testData[3]);
          expect(fileContents.player1Targets).to.equal(testData[4]);
          expect(fileContents.player2Targets).to.equal(testData[5]);
        })
        .catch(error => {
          throw new Error("not expected");
        });

    });

  });
});
