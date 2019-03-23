const assert = require("assert");
const readline = require("readline");
const fs = require("fs");


/**
 * This function would read file from a path line by line and populate the filecontent
 * object for further processing
 * @param {string} filePath
 * @param {Readable} testStream : sole purpose of this stream is for testing
 * @returns {Promise} this would resolve when all of the content is read from the file
 */

function fileReader(filePath, testStream) {

  return new Promise((resolve, reject) => {
    try {
      if (!testStream) {
        assert(filePath, "input file path is empty");
      }
      const fileContent = {
        "ships": []
      };
      let lineCount = 0;

      const lineReader = readline.createInterface({
        "input": testStream || fs.createReadStream(filePath)
      });

      lineReader.on("line", function (line) {
        lineCount++;

        switch (true) {
          case (lineCount === 1):
            fileContent.AreaDimensions = line.trim();
            break;
          case (lineCount === 2):
            fileContent.shipCount = parseInt(line.trim(), 10);
            break;
          case (lineCount > 2 && lineCount <= (fileContent.shipCount + 2)):
            fileContent.ships.push(line.trim());
            break;
          case (lineCount === (fileContent.shipCount + 3)):
            fileContent.player1Targets = line.trim();
            break;
          case (lineCount === (fileContent.shipCount + 4)):
            fileContent.player2Targets = line.trim();
            break;
          default:
            break;
        }

      });

      lineReader.on("close", function () {
        return resolve(fileContent);
      });
    } catch (error) {
      console.log("Error reading file, Please check the file path", error);
      reject(error);
    }
  });
}

module.exports = fileReader;
