new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRuning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRuning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            var damag = this.calcilateDamag(3, 10);
            this.monsterHealth -= damag;
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits Monster for" + damag
            })
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        specialAttack: function () {
            var damag = this.calcilateDamag(10, 20);
            this.monsterHealth -= damag;
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits Monster hard for" + damag
            })
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: "Player heals for 10"
            })
            this.monsterAttacks();
        },
        giveUp: function () {
            this.gameIsRuning = false;
        },
        monsterAttacks: function () {
            var damag = this.calcilateDamag(5, 12);
            this.playerHealth -= damag;
            this.checkWin();
            this.monsterHealth -= damag;
            this.turns.unshift({
                isPlayer: false,
                text: "Monster hits Play for" + damag
            })
        },
        calcilateDamag: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm("YOU WON, NEW GAME?")) {
                    this.startGame();
                } else {
                    this.gameIsRuning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm("YOU LOST, NEW GAME?")) {
                    this.startGame();
                } else {
                    this.gameIsRuning = false;
                }
                return true;
            }
            return false;
        }
    }
})