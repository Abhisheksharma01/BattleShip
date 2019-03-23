/**
 * This function is the battle field for the two players, it devises the logic for the players to target
 * each other turn by turn.
 * @param {Object} player1 : Player class
 * @param {Object} player2 : Player Class
 * @returns {Object} winner: Player
 */

function battle(player1, player2) {

  let player2TargetCounter = 0;
  let isPlayer1OutOfAmmo = false;
  let isPlayer2OutOfAmmo = false;
  let gameOver = false;
  let isPlayer2Hit = false;
  let winner;

  for (let p1TargetCounter = 0; p1TargetCounter < player1.targets.length; p1TargetCounter++) {

    if (gameOver) {
      break;
    }

    const player1tag = player1.getNextTarget(p1TargetCounter);
    isPlayer2Hit = player2.takeHit(player1tag);

    if (isPlayer2Hit && player2.isDefeated()) {
      console.log(`${player1.name} won the battle`);
      gameOver = true;
      winner = player1;
      break;
    }

    if (p1TargetCounter === (player1.targets.length - 1)) {
      if (isPlayer2Hit || isPlayer2OutOfAmmo) {
        console.log(`${player1.name} has no more missiles left to launch`);
      }
      isPlayer1OutOfAmmo = true;
    }


    if ((isPlayer1OutOfAmmo || !isPlayer2Hit)) {

      if (isPlayer2OutOfAmmo) {
        console.log(`${player2.name} has no more missiles left to launch`);
      } else {

        for (let p2TargetCounter = player2TargetCounter; p2TargetCounter < player2.targets.length; p2TargetCounter++) {
          const player2tag = player2.getNextTarget(p2TargetCounter);
          const isPlayer1Hit = player1.takeHit(player2tag);

          if (isPlayer1Hit && player1.isDefeated()) {
            console.log(`${player2.name} won the battle`);
            winner = player2;
            gameOver = true;
            break;
          }

          if (p2TargetCounter === (player2.targets.length - 1)) {
            if (isPlayer1Hit || isPlayer1OutOfAmmo) {
              console.log(`${player2.name} has no more missiles left to launch`);
            }
            isPlayer2OutOfAmmo = true;
          }

          if (!isPlayer1Hit) {

            if (!isPlayer1OutOfAmmo) {
              player2TargetCounter = p2TargetCounter + 1;
              break;
            } else {
              console.log(`${player1.name} has no more missiles left to launch`);
            }
          }
        }
      }
    }
  }

  if (!gameOver) {
    console.log("game is a draw");
  }
  return winner;
}

module.exports = battle;
