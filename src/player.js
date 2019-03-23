const {parseCoordinates} = require("./utilities/helpers");


/**
 * This entity is representing the player
 *
 * @class Player
 * @constructor
 * @param {Object} area - This repreents the battle area of the player
 * @param {Array} targets - Array of all the predefined targets
 * @param {string} opponentPlayerName - Name of the opponent
 * @param {string} name - player's name
 */

class Player {

  constructor({area, targets, opponentPlayerName, name}) {
    this.area_ = area;
    this.targets = targets;
    this.opponentPlayerName_ = opponentPlayerName;
    this.name = name;
  }

  /**
   * Function to get next target of the player
   * @param {Number} targetIndex : index of the desired target
   * @returns {string} target at the index
   */
  getNextTarget(targetIndex) {
    return this.targets[targetIndex];
  }

  /**
   * Function to take a hit on this player
   * @param {string} coordinates : hit target
   * @returns {boolean} returns true if hit else false
   */
  takeHit(coordinates) {
    const parsedCoordinates = parseCoordinates(coordinates);
    const ship = this.area_.shipYard[parsedCoordinates[0]][parsedCoordinates[1]];

    if (ship && !ship.isDestroyed()) {
      ship.bombard();
      console.log(`${this.opponentPlayerName_} fires a missile with target ${coordinates} which got hit`);

      if (ship.isDestroyed()) {
        this.area_.decrementShipCount();
      }
      return true;
    }
    console.log(`${this.opponentPlayerName_} fires a missile with target ${coordinates} which got miss`);

    return false;
  }


  /**
   * Function to check if the player is deafted or not
   * @returns {Boolean} returns true if area is destroyed else false
   */
  isDefeated() {
    return this.area_.isAreaDestroyed();
  }

}

module.exports = Player;
