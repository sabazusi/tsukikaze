import Dispatcher from '../dispatcher/action-dispatcher'

export default class TwitterHomeTimelineStore {
    constructor() {
        Dispatcher.register(
            function(action) {
                console.log("receive at store.");
                console.log(action);
            }
        );
    }
}
