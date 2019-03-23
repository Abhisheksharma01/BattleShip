const {expect} = require("chai");
const battle = require("../src/battle");
const Player = require("../src/player");
const {getMockedArea} = require("./utilities/dataHelpers");

describe("The battle method -->", () => {
  let player1; let player2;
  let mockedArea;
  it("should return player-1 as the winner when he destroys Player-2", () => {
    mockedArea = getMockedArea();
    player1 = new Player({"area": mockedArea, "targets": ["A1", "A2", "A3", "A2", "A3"], "opponentPlayerName": "Player-2", "name": "Player-1"});
    player2 = new Player({"area": mockedArea, "targets": ["B1", "B2"], "opponentPlayerName": "Player-1", "name": "Player-2"});
    const winner = battle(player1, player2);
    expect(winner).to.equal(player1);
  });


  it("should return player-1 as the winner when he destroys Player-2", () => {
    mockedArea = getMockedArea();
    player1 = new Player({"area": mockedArea, "targets": ["B1", "A1", "A2", "A3", "A2", "A3"], "opponentPlayerName": "Player-2", "name": "Player-1"});
    player2 = new Player({"area": mockedArea, "targets": ["B1", "B2"], "opponentPlayerName": "Player-1", "name": "Player-2"});
    const winner = battle(player1, player2);
    expect(winner).to.equal(player1);
  });

  it("should return player-2 as the winner when he destroys Player-1", () => {
    mockedArea = getMockedArea();
    player2 = new Player({"area": mockedArea, "targets": ["A1", "A2", "A3", "A2", "A3"], "opponentPlayerName": "Player-1", "name": "Player-2"});
    player1 = new Player({"area": mockedArea, "targets": ["B1", "B2"], "opponentPlayerName": "Player-2", "name": "Player-1"});
    const winner = battle(player1, player2);
    expect(winner).to.equal(player2);
  });

  it("should return nothing when it is a draw", () => {
    mockedArea = getMockedArea();
    player2 = new Player({"area": mockedArea, "targets": ["A1", "A2", "A3", "A2"], "opponentPlayerName": "Player-1", "name": "Player-2"});
    player1 = new Player({"area": mockedArea, "targets": ["B1", "B2"], "opponentPlayerName": "Player-2", "name": "Player-1"});
    const winner = battle(player1, player2);
    expect(winner).to.be.undefined;
  });

  it("should return nothing when it is a draw", () => {
    mockedArea = getMockedArea();
    player2 = new Player({"area": mockedArea, "targets": ["B1", "B2", "B3", "A1", "A2", "A3", "A2"], "opponentPlayerName": "Player-1", "name": "Player-2"});
    player1 = new Player({"area": mockedArea, "targets": ["B1", "B2"], "opponentPlayerName": "Player-2", "name": "Player-1"});
    const winner = battle(player1, player2);
    expect(winner).to.be.undefined;
  });


});
