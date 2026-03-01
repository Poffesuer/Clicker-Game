import { Upgrades } from './modules/Upgrades.js';

function createUpgrade(game, upgrades) {

    upgrades.forEach((u,i) => {
        const rect = document.createElement("div");
        rect.className = "upgrade-rectangle";
        rect.id = `upgrade${i}`;

        const img = document.createElement("img");
        img.src = u.img;
        rect.appendChild(img);

        const info = document.createElement("div");
        info.className = "upgrade-info";

        const name = document.createElement("div");
        name.className = "upgrade-name";
        name.textContent = u.name;
        info.appendChild(name);

        const desc = document.createElement("div");
        desc.className = "upgrade-desc";
        desc.textContent = u.desc;
        info.appendChild(desc);

        const cost = document.createElement("div");
        cost.className = "upgrade-cost";
        cost.textContent = `$${u.cost}`;

        rect.appendChild(info);

        rect.appendChild(cost);

        rect.addEventListener("click", () => {
            if (u.buy(game)) {
                rect.style.display = "none";
            }
        });

        document.getElementById("store").appendChild(rect);
    });
}

function update(game, upgrades) {

    const money = document.getElementById("money-display");
    money.textContent = game.money;

    upgrades.forEach((u,i) => {

        const rect = document.getElementById(`upgrade${i}`);
        if (!rect) return;
        
        const cost = rect.querySelector(".upgrade-cost");
    
        if (game.money >= u.cost) {
            cost.style.color = "green";
        } else {
            cost.style.color = "red";
        }
    });
}

function main() {
    let game = {
        money            : 0,
        moneyPerClick    : 1,
        moneyPerInterval : 0,
        interval         : 5000,
    }

    let upgrades = [
        new Upgrades("iron", "images/bag.png", "+2", 10, 2, NaN),
        new Upgrades("gold", "images/bag.png", "+4", 100, 4, NaN),
        new Upgrades("diamond","images/bag.png", "+5", 1000, 10, NaN),

        new Upgrades("dave","images/bag.png", "5 sec", 100, 0, 5000),
        new Upgrades("josh","images/bag.png", "4 sec", 500, 0, 4000),
        new Upgrades("leon","images/bag.png", "1 sec", 2000, 0, 1000),
    ]
    
    createUpgrade(game, upgrades);

    setInterval(()=>{
        update(game, upgrades);
    }, 100);
}

window.addEventListener("load", main);