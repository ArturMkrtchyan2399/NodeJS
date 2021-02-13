class Adventure extends Film {
    constructor(scenario, director, actors, operator, year, isHappyEnd, ingenuityOfPersonages) {
        super(scenario, director, actors, operator, year);
        this.isHappyEnd = isHappyEnd;
        this.ingenuityOfPersonages = ingenuityOfPersonages;
    }

    print() {
        super.print();
        console.log(`      Is Happy End - ${this.isHappyEnd}
      Ingenuity of Personages - ${this.ingenuityOfPersonages}`)
    }

    static printWithHappyEnd(adventures) {
        for (let i = 0; i < adventures.length; i++) {
            if (adventures[i].isHappyEnd) {
                adventures[i].print();
            }
        }
    }
}
