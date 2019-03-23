/**
 * This entity is representing the player's battle area
 *
 * @class Area
 * @constructor
 * @param {string} type - This defines the type of the ship "P" & "Q"
 * @param {Array} dimension - Represnts the dimension of the area
 * @param {Array} ships - Represnts the ships for a player
 */

class Area {

  constructor({dimension, ships}) {

    this.parsedDimensions_ = dimension;
    this.shipYard = new Array(this.parsedDimensions_[0]);

    for (let shipX = 0; shipX < this.parsedDimensions_[0]; shipX++) {
      this.shipYard[shipX] = new Array(this.parsedDimensions_[1]);
    }

    this.totalShipCount_ = 0;

    for (let shipCount = 0; shipCount < ships.length; shipCount++) {

      for (let shipDimX = 0; shipDimX < ships[shipCount].dimension[0]; shipDimX++) {

        for (let shipDimY = 0; shipDimY < ships[shipCount].dimension[1]; shipDimY++) {
          const shipLocation = this.shipYard[(ships[shipCount].coordinates[0] - 1) + shipDimX][(ships[shipCount].coordinates[1] - 1) + shipDimY];

          if (shipLocation) {
            throw new Error("Bad Config: Overlapping ships");
          }
          this.shipYard[(ships[shipCount].coordinates[0] - 1) + shipDimX][(ships[shipCount].coordinates[1] - 1) + shipDimY] = Object.assign(Object.create(Object.getPrototypeOf(ships[shipCount])), ships[shipCount]);
          this.totalShipCount_ = this.totalShipCount_ + 1;
        }
      }
    }

  }

  /**
   * Function to check if the area is destroyed
   *  @returns {Boolean} returns true if area is destroyed else false
   */
  isAreaDestroyed() {
    return !this.totalShipCount_;
  }

  /**
   * Function to decremen the ship count
   *  @returns {null} returns nothing
   */
  decrementShipCount() {
    this.totalShipCount_--;
  }
}

module.exports = Area;
