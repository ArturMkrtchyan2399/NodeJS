class Drama extends Film {
    constructor(scenario, director, actors, operator, year, relationship, statesOfHumanLife) {
        super(scenario, director, actors, operator, year);
        this.relationship = relationship;
        this.statesOfHumanLife = statesOfHumanLife;
    }

    print() {
        super.print();
        console.log(`      Realtionship - ${this.relationship}
      States of Human life - ${this.statesOfHumanLife}`)
    }

    static printOlderThan100Years(dramas) {
        for (let i = 0; i < dramas.length; i++) {
            if (dramas[i].age() > 100) {
                dramas[i].print();
            }
        }
    }

}
