/**
 * This entity is representing the ship
 *
 * @class Ship
 * @constructor
 * @param {string} type - This defines the type of the ship "P" & "Q"
 * @param {Array} dimension - Represnts the dimension of the ship
 * @param {Array} coordinates - Represnts the coordinates of the ship
 */

class Ship {

  constructor({type, dimension, coordinates}) {
    this.type_ = type;

    if (this.type_ === "P") {
      this.hitCount_ = 1;
    } else if (this.type_ === "Q") {
      this.hitCount_ = 2;
    }

    this.dimension = dimension;
    this.coordinates = coordinates;
  }

  /**
   * Function to check if the ship is destroyed
   *  @returns {Boolean} returns true if ship is destroyed else false
   */
  isDestroyed() {
    return !this.hitCount_;
  }

  /**
   * Function to bombard the ship
   *  @returns {null} returns nothing
   */
  bombard() {
    this.hitCount_--;
  }

}

module.exports = Ship;
