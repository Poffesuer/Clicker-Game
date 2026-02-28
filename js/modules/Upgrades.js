class Upgrades {

    constructor(name, img, cost, moneyPerClick, interval) {
        this.name = name;
        this.img = img;
        this.cost = cost;
        this.moneyPerClick = moneyPerClick;
        this.interval = interval;
    }

    buy(game) {
        if (game.resources >= this.cost) {
            game.moneyPerClick += this.moneyPerClick;
            game.money -= this.cost;
            return true;
        }
        return false;
    }

    changeInterval(game) {
        if (!(interval == NaN)) {
            game.interval = this.interval;
        }
    }
}