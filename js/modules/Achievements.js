export class Achievements {

    constructor(name, description, img, condition){
        this.description = description;
        this.condition = condition;
        this.img = img;
        this.name = name;
        this.unlocked = false;
    }

    check(game) {
        if (!this.unlocked && this.condition(game)) {
            this.unlocked = true;
            return true;
        }
        return false;
    }
}