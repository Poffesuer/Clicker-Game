export class Upgrades {

    constructor(name, img, desc, cost, moneyPerClick, interval) {
        this.name = name;
        this.img = img;
        this.cost = cost;
        this.moneyPerClick = moneyPerClick;
        this.interval = interval;
        this.desc = desc;
    }

    buy(game) {
        if (game.money >= this.cost) {

            game.money -= this.cost;

            if (this.moneyPerClick) {
                game.moneyPerClick += this.moneyPerClick;
            }

            if (!isNaN(this.interval)) {
                game.interval = this.interval;
            }

            return true;
        }
        return false;
    }
}