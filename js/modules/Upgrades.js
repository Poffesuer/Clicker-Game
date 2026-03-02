export class Upgrades {

    constructor(name, img, desc, cost, moneyPerClick, interval) {
        this.name = name;
        this.img = img;
        this.desc = desc;
        this.cost = cost;
        this.moneyPerClick = moneyPerClick;
        this.interval = interval;
        this.level = 0;
    }

    buy(game) {
        if (game.money >= this.cost) {

            const upgradeImg = document.createElement("img");
            upgradeImg.src = this.img;
            upgradeImg.alt = this.name;

            const clickValue = document.getElementById("click-value");

            game.money -= this.cost;

            if (this.moneyPerClick) {
                game.moneyPerClick += this.moneyPerClick;
                clickValue.textContent = game.moneyPerClick;
                document.getElementById("ore-board").appendChild(upgradeImg);
            }

            if (!isNaN(this.interval)) {

                this.level++;

                const speed = Math.max(500, 3000 - (this.level - 1) * 500);

                const intervalDisplay = document.getElementById("interval-display");

                if (speed === 500) {
                    intervalDisplay.textContent = "MAX";
                } else {
                    intervalDisplay.textContent = (speed / 1000).toFixed(1);
                }

                if (game.interval) {
                    clearInterval(game.interval);
                }

                game.interval = setInterval(() => {
                    game.money += game.moneyPerClick;
                }, speed);

                document.getElementById("miner-board").appendChild(upgradeImg);
            }

            this.cost = Math.floor(this.cost * 1.5);

            return true;
        }
        return false;
    }
}