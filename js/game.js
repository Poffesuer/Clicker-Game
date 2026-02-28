import { Upgrades } from './modules/Upgrades.js';

function main() {
    let game = {
        money            : 0,
        moneyPerClick    : 1,
        moneyPerInterval : 0,
        interval         : 5000,
    }

    let upgrades = [
        new Upgrades("iron", "images/bag.png", 10, 2, NaN),
        new Upgrades("gold", "images/bag.png", 100, 4, NaN),
        new Upgrades("diamond","images/bag.png", 1000, 10, NaN),

        new Upgrades("dave","images/bag.png", 100, 0, 5000),
        new Upgrades("josh","images/bag.png", 500, 0, 4000),
        new Upgrades("leon","images/bag.png", 2000, 0, 1000),
    ]

    const store = document.getElementById("store");

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
        cost.textContent = `${u.cost} cookies`;
        info.appendChild(cost);

        rect.appendChild(info);

        rect.addEventListener("click", () => {
            if (game.cookies >= u.cost) {
                game.cookies -= u.cost;
                rect.style.display = "none";
            }
        });

    document.body.appendChild(rect);

    })
}


window.addEventListener("load", main());