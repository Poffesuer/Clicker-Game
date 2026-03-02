import { Upgrades } from './modules/Upgrades.js';
import { Achievements } from './modules/Achievements.js';

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
            u.buy(game);

        });

        document.getElementById("store").appendChild(rect);
    });
}

function checkAchievements(game, achievements){

    achievements.forEach(a => {

        if (a.check(game)) {

            const img = document.createElement("img");
            img.src = a.img;

            const tooltip = document.getElementById("achievement-tooltip");

            img.addEventListener("mouseenter", (e) => {
                tooltip.innerHTML = `<strong>${a.name}</strong><br>${a.description}`;
                tooltip.classList.remove("hidden");
            });

            img.addEventListener("mousemove", (e) => {
                tooltip.style.left = e.clientX + 15 + "px";
                tooltip.style.top = e.clientY + 15 + "px";
            });

            img.addEventListener("mouseleave", () => {
                tooltip.classList.add("hidden");
            });

            document.getElementById("achievements").appendChild(img);

            const popup = document.getElementById("achievement-popup");
            popup.textContent = `Achievement Unlocked: ${a.name}`;
            popup.classList.remove("hidden");

            setTimeout(()=>{
                popup.classList.add("hidden");
            },3000);
        }
    });

}
function update(game, upgrades) {

    const money = document.getElementById("money");
    const totalMoney = document.getElementById("total-money");

    money.textContent = game.money;
    totalMoney.textContent = game.money;

    upgrades.forEach((u,i) => {

        const rect = document.getElementById(`upgrade${i}`);
        if (!rect) return;
        
        const cost = rect.querySelector(".upgrade-cost");
        cost.textContent = u.cost;

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
        interval         : null,
    }

    let upgrades = [
        new Upgrades("silver", "images/silver.png", "+$2 per click", 50, 2, NaN),
        new Upgrades("gold", "images/gold.png", "+$4 per click", 300, 4, NaN),
        new Upgrades("diamond","images/diamond.png", "+$5 per click", 1000, 15, NaN),

        new Upgrades("josh","images/josh.png", "Start Auto Click 3s. Each buy reduces by 0.5s", 500, 0, 3000),
    ]

    let achievements = [

        new Achievements(
            "First Mine",
            "You clicked once!",
            "images/icons/firstOre.png",
            (game)=> game.money >= 1
        ),

        new Achievements(
            "Getting Rich",
            "Reached $100!",
            "images/icons/silverCollector.png",
            (game)=> game.money >= 100
        ),

        new Achievements(
            "Big Money",
            "Reached $1000!",
            "images/icons/goldHoarder.png",
            (game)=> game.money >= 1000
        ),

        new Achievements(
            "Mining Master",
            "Click power reached 10!",
            "images/icons/diamondMaster.png",
            (game)=> game.moneyPerClick >= 10
        ),

        new Achievements(
            "Automation",
            "Bought your first miner!",
            "images/icons/firstMiner.png",
            (game)=> game.interval !== null
        )
    ];
    const helpButton = document.getElementById("help-button");
    const helpPanel = document.getElementById("help-panel");

    helpButton.addEventListener("click", () => {
        if (!helpPanel.classList.contains("hidden")) {
            helpPanel.classList.add("hidden");
            return;
        }

        let upgradeList = upgrades.map(u =>
            `<li><strong>${u.name}</strong> - ${u.desc} (Cost: $${u.cost})</li>`
        ).join("");

        let achievementList = achievements.map(a =>
            `<li><strong>${a.name}</strong> - ${a.description}</li>`
        ).join("");

        helpPanel.innerHTML = `
            <h1>How To Play</h1>
            <p>Click the rock to earn money.</p>
            <p>Buy upgrades to increase money per click or automate income.</p>
            <p>Unlock achievements by reaching milestones!</p>

            <h2>Upgrades</h2>
            <ul>${upgradeList}</ul>

            <h2>Achievements</h2>
            <ul>${achievementList}</ul>

            <br><button id="close-help">Close</button>
        `;

        helpPanel.classList.remove("hidden");

        document.getElementById("close-help").addEventListener("click", () => {
            helpPanel.classList.add("hidden");
        });
    });

    const clickItem = document.getElementById("click-item");
    const clickValue = document.getElementById("click-value");

    clickValue.textContent = game.moneyPerClick;

    clickItem.addEventListener("click", ()=>{
        game.money += game.moneyPerClick;
    });

    clickItem.addEventListener("mousedown", () => {
        clickItem.style.transform = "scale(0.9)";
    });

    clickItem.addEventListener("mouseup", () => {
        clickItem.style.transform = "scale(1)";
    });

    clickItem.addEventListener("mouseleave", () => {
        clickItem.style.transform = "scale(1)";
    });

    createUpgrade(game, upgrades);

    setInterval(()=>{
        update(game, upgrades);
        checkAchievements(game, achievements);
    }, 100);
}

window.addEventListener("load", main);