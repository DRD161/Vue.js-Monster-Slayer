new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameOn: false,
    turnArray: []
  },
  methods: {
    /* Creates the conditions for a new game*/
    newGame: function() {
      this.gameOn = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turnArray = [];
    },
    /* If the monster's health goes to zero or lower and if the player chooses ok
           on the confirm message restart the game otherwise do not start a new game
           OR if the player's health goes to zero or lower ask if the player would like 
           to play again. If yes, restart the gsame otherwise do not*/
    winGame: function() {
      if (this.monsterHealth <= 0) {
        if (confirm("YOU WIN! Do you want to play again?")) {
          this.newGame();
        } else {
          this.newGame = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("YOU LOSE!Wanna try again ? ")) {
          this.newGame();
        } else {
          this.newGame = false;
        }
        return true;
      }
      return false;
    },
    // Get a random number between the min and max to calculate damage done
    damageOutput: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    /* playerDamage chooses a random number between 5-15
           the monster's health then has this amount deducted
           unshift then adds the new turnMessage to the array and displays it*/
    playerAttack: function() {
      var playerDamage = this.damageOutput(5, 15);
      this.monsterHealth -= playerDamage;
      this.turnArray.unshift({
        player: true,
        turnMessage: "Player hit the monster for " + playerDamage + " damage"
      });
      if (this.winGame()) {
        return;
      }
      this.monsterAttack();
    },
    /* Special attack damage is a random number between 15 - 18
           the monster's health then has this amount deducted
           unshift then adds the new turnMessage to the array and displays it*/
    special: function() {
      var specialAttack = this.damageOutput(15, 18);
      this.monsterHealth -= specialAttack;
      this.turnArray.unshift({
        player: true,
        turnMessage:
          "Player nailed the monster with " + specialAttack + " damage"
      });
      if (this.winGame()) {
        return;
      }
      this.monsterAttack();
    },
    /* A random number between 5 - 25 is chosen as the attack damage amount
           the player's health then has that number deducted from it 
           then unshift adds the new turnMessage to the array and displays it*/
    monsterAttack: function() {
      var monsterDamage = this.damageOutput(5, 15);
      this.playerHealth -= monsterDamage;
      this.turnArray.unshift({
        player: false,
        turnMessage: "Monster hit the player for " + monsterDamage + " damage"
      });
    },
    // If the player's health goes below 90% add 10 HP
    healPlayer: function() {
      if (this.playerHealth < 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turnArray.unshift({
        player: true,
        turnMessage: "Player gains 10 HP"
      });
      this.monsterAttack();
    },
    /* Decided to make it so by forfeiting, the game is automatically reset
           instead of resetting after you give up and press Start New Game */
    forfeit: function() {
      var giveUp = confirm("Do you wish to forfeit and start over?");
      if (giveUp == true) {
        this.newGame();
        this.gameOn = false;
      } else {
        return false;
      }
    }
  }
});
