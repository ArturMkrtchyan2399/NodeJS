class Film {
    constructor(scenario, director, actors, operator, year) {
        this.scenario = scenario;
        this.director = director;
        this.actors = actors;
        this.operator = operator;
        this.year = year;
    }


    age() {
        return (new Date()).getFullYear() - this.year;
    }

    setVolume(volume) {
        if (volume >= 0 && volume <= 100) {
            console.log("Volume is set to " + volume);
        }
    }

    play() {
        console.log("Film is playing");
    }

    stop() {
        console.log("Film stopped");
    }

    print() {
        console.log(`      Scenario - ${this.scenario}
      Director - ${this.director}
      Actors - ${this.actors}
      Operator - ${this.operator}
      Year - ${this.year}`)
    }
}
