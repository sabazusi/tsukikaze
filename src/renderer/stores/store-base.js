import EventEmitter from 'events'

export default class StoreBase extends EventEmitter {
    constructor() {
        super();
    }

    emitChange() {
        this.emit("change");
    }
}