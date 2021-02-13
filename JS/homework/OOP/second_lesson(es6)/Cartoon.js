class Cartoon extends Film {
    constructor(scenario, director, actors, operator, year, typeOfCartoon, duration) {
        super(scenario, director, actors, operator, year);
        this.typeOfCartoon = typeOfCartoon;
        this.duration = duration;
    }

    print() {
        super.print();
        console.log(`      Type of Cartoon - ${this.typeOfCartoon}
      Duration - ${this.duration}`)
    }

    static printLongerThan120minute(cartoons) {
        for (let i = 0; i < cartoons.length; i++) {
            if (cartoons[i].duration > 120) {
                cartoons[i].print();
            }
        }
    }
}
