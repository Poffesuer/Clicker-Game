class Achievements {

    constructor(name, description, img, condition){
        this.description = description;
        this.condition = condition;
        this.img = img;
        this.name = name;
    }

    check(game) {
        if (this.condition()) {
            return true;
        }
        return false;
    }
}