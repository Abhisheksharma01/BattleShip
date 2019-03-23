/**
 * Helper method to parse coordinates, this would parse the character on its ascii value
 * @param {string} coordinates : these are the coordinates inside the player area. i.e. "A1"
 * @returns {Array} It returns the parsed xand y coordinates
 */

function parseCoordinates(coordinates) {
  const yCoordunate = coordinates.charCodeAt(0) - 65;
  const xCoordunate = parseInt(coordinates.charAt(1) - 1);

  return [xCoordunate, yCoordunate];
}


module.exports = {
  parseCoordinates
};
