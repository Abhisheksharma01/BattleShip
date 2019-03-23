const assert = require("assert");


function validateCoordinates_(coordinates, validatedArgs, shipDimensions) {

  let shipCoordinateY = parseInt(coordinates.charCodeAt(0) - 64, 10);
  let shipCoordinateX = parseInt(coordinates.charAt(1), 10);

  if (shipDimensions) {
    shipCoordinateY += (shipDimensions[1] - 1);
    shipCoordinateX += (shipDimensions[0] - 1);
  }

  if (!shipCoordinateX || shipCoordinateX > validatedArgs.AreaDimensions[0] || !shipCoordinateY || shipCoordinateY > validatedArgs.AreaDimensions[1]) {
    return false;
  }
  return true;
}


function validateShip_(ship, validatedArgs) {
  const shipAtts = ship.split(" ");

  if (shipAtts.length !== 5) {
    return false;
  }

  if (!(shipAtts[0] === "P" || shipAtts[0] === "Q")) {
    return false;
  }
  const shipX = parseInt(shipAtts[1], 10);
  const shipY = parseInt(shipAtts[2], 10);
  if ((!shipX || shipX > validatedArgs.AreaDimensions[0] || !shipY || shipY > validatedArgs.AreaDimensions[1])) {
    console.log("Ship dimensions are not valid");
    return false;
  }

  for (let shipAttsCount = 3; shipAttsCount < shipAtts.length; shipAttsCount++) {

    if (!validateCoordinates_(shipAtts[shipAttsCount], validatedArgs, [shipX, shipY])) {
      console.log("Ship coordinates are not valid");
      return false;
    }
  }

  validatedArgs.player1Ships.push({
    "type": shipAtts[0],
    "dimension": [parseInt(shipAtts[1], 10), parseInt(shipAtts[2], 10)],
    "coordinates": [parseInt(shipAtts[3].charAt(1), 10), parseInt(shipAtts[3].charCodeAt(0) - 64, 10)]
  });
  validatedArgs.player2Ships.push({
    "type": shipAtts[0],
    "dimension": [parseInt(shipAtts[1], 10), parseInt(shipAtts[2], 10)],
    "coordinates": [parseInt(shipAtts[4].charAt(1), 10), parseInt(shipAtts[4].charCodeAt(0) - 64, 10)]
  });
  return true;
}


/**
 * This function would validate the filecontents on the basis of pre-defined business rules
 * Rules :
 * 1 <= Width of Battle area (M’) <= 9,
 * A <= Height of Battle area (N’) <= Z
 * 1 <= Number of battleships <= M’ * N’
 * Type of ship = {‘P’, ‘Q’}
 * 1 <= Width of battleship <= M’
 * A <= Height of battleship <= N
 * 1 <= X coordinate of ship <= M’
 * A <= Y coordinate of ship <= N’
 * @param {Object} fileContents
 * @returns {Object} ValidatedArgs : This would the object of validated filecontents
 */

function validateArgs(fileContents) {

  try {
    assert(fileContents, "No File Content");
    const validatedArgs = {
      "player1Ships": [],
      "player2Ships": [],
      "player1Targets": [],
      "player2Targets": []
    };
    const areaDimensionsRegex = /^[1-9]\s*[A-Z]$/i;

    // validate area size

    if (!areaDimensionsRegex.test(fileContents.AreaDimensions)) {
      throw new Error(`Bad Area Dimensions ${fileContents.AreaDimensions}`);
    } else {
      validatedArgs.AreaDimensions = [parseInt(fileContents.AreaDimensions.substr(0, 1), 10),
        fileContents.AreaDimensions.charCodeAt((fileContents.AreaDimensions.length - 1)) - 64];
    }


    if (isNaN(parseInt(fileContents.shipCount, 10)) || fileContents.shipCount < 0 || fileContents.shipCount > (validatedArgs.AreaDimensions[0] * validatedArgs.AreaDimensions[1])) {
      throw new Error(`Bad Ship Count ${fileContents.shipCount}`);
    } else {
      validatedArgs.shipCount = fileContents.shipCount;
    }

    fileContents.ships.forEach((ship, index) => {
      const contextualIndex = index;
      if (!validateShip_(ship, validatedArgs)) {
        throw new Error(`ship at line ${contextualIndex + 3} has bad configurations`);
      }

    });

    fileContents.player1Targets.split(" ").forEach(target => {
      if (!validateCoordinates_(target, validatedArgs)) {
        throw new Error(`player 1 has a bad/outOfBound target ${target}`);
      }
      validatedArgs.player1Targets.push(target);
    });

    fileContents.player2Targets.split(" ").forEach(target => {
      if (!validateCoordinates_(target, validatedArgs)) {
        throw new Error(`player 2 has a bad/outOfBound target ${target}`);
      }
      validatedArgs.player2Targets.push(target);
    });

    return validatedArgs;
  } catch (error) {
    console.log("Validation Error :", error);
    throw error;
  }

}


module.exports = validateArgs;
