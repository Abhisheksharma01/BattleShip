const Ship = require("../../src/ship");
const Area = require("../../src/shipArea");

const mockedShips = [{
  "type": "P",
  "dimension": [1, 1],
  "coordinates": [1, 1]
},
{
  "type": "Q",
  "dimension": [2, 1],
  "coordinates": [2, 1]
}];

const mockedOverlappingShips = [{
  "type": "P",
  "dimension": [1, 1],
  "coordinates": [1, 1]
},
{
  "type": "Q",
  "dimension": [2, 1],
  "coordinates": [1, 1]
}];

const mockedAreaDimensions = [5, 5];

function getMockedShips() {

  return mockedShips.map(ship => new Ship({"type": ship.type, "dimension": ship.dimension, "coordinates": ship.coordinates}));
}

function getMockedOverlappingShips() {

  return mockedOverlappingShips.map(ship => new Ship({"type": ship.type, "dimension": ship.dimension, "coordinates": ship.coordinates}));
}

function getMockedArea() {
  const ships = mockedShips.map(ship => new Ship({"type": ship.type, "dimension": ship.dimension, "coordinates": ship.coordinates}));
  return new Area({"dimension": mockedAreaDimensions, "ships": ships});
}

module.exports = {
  getMockedShips,
  getMockedArea,
  getMockedOverlappingShips
};

