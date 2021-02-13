class Detective extends Film {
    constructor(scenario, director, actors, operator, year, disclosureOfEvents, disclosureOfPerpetrators, isSuspiciousCases) {
        super(scenario, director, actors, operator, year);
        this.disclosureOfEvents = disclosureOfEvents;
        this.disclosureOfPerpetrators = disclosureOfPerpetrators;
        this.isSuspiciousCases = isSuspiciousCases;
    }

    print() {
        super.print();
        console.log(`      Disclosure of Events - ${this.disclosureOfEvents}
      Disclosure of Perpetrators - ${this.disclosureOfPerpetrators}
      Is Suspicious Cases - ${this.isSuspiciousCases}`)
    }

    static printWithSuspiciousCases(detectives) {
        for (let i = 0; i < detectives.length; i++) {
            if (detectives.isSuspiciousCases) {
                detectives[i].print();
            }
        }
    }
}
