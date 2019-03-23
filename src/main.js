const path = require("path");
const validateArgs = require("./utilities/validator");
const fileReader = require("./utilities/fileReader");
const Player = require("./player");
const Ship = require("./ship");
const Area = require("./shipArea");
const battle = require("./battle");
const fs = require("fs");

if (process.argv.length !== 3) {
  console.log("Invalid number of arguments, This program would only accept path to the input file along with the start command : npm start <filePath>");
} else {
  try {

    if (!fs.existsSync(process.argv[2])) {
      throw new Error(`Non Existent file path ${process.argv[2]}`);
    }
    const filePath = path.normalize(process.argv[2]);
    fileReader(filePath)
      .then(fileContents => {
        const validatedContents = validateArgs(fileContents);
        const player1Ships = [];
        const player2Ships = [];

        validatedContents.player1Ships.forEach(ship => {
          player1Ships.push(new Ship({"type": ship.type, "dimension": ship.dimension, "coordinates": ship.coordinates}));
        });
        validatedContents.player2Ships.forEach(ship => {
          player2Ships.push(new Ship({"type": ship.type, "dimension": ship.dimension, "coordinates": ship.coordinates}));
        });

        const player1Area = new Area({"dimension": validatedContents.AreaDimensions, "ships": player1Ships});
        const player2Area = new Area({"dimension": validatedContents.AreaDimensions, "ships": player2Ships});

        const player1 = new Player({"area": player1Area, "targets": validatedContents.player1Targets, "name": "Player-1", "opponentPlayerName": "Player-2"});
        const player2 = new Player({"area": player2Area, "targets": validatedContents.player2Targets, "name": "Player-2", "opponentPlayerName": "Player-1"});

        battle(player1, player2);
      })
      .catch(err => {
        console.log(err);
      });


  } catch (error) {
    console.log(error);
  }
}

