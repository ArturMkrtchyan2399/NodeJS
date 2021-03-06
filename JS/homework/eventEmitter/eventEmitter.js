class MyEventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(fn);
    }

    removeListener(eventName, removeListener) {
        if (!this.events[eventName]) {
            return;
        }
        this.events[eventName] = this.events[eventName].filter(fn => fn !== removeListener);
    }

    emit(eventName, ...args) {
        if (!this.events[eventName]) {
            return;
        }
        this.events[eventName].forEach(fn => fn.apply(this, args));
    }

    eventNames(){
        return Object.keys(this.events);
    }

    listenerCounts(eventName){
        if(!this.events[eventName]){
            return;
        }
        return this.events[eventName].length;
    }

    listeners(eventName){
        if(!this.events[eventName]){
            return;
        }
        return this.events[eventName];
    }

}
module.exports = MyEventEmitter;