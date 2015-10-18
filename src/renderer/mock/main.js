import { EventEmitter } from 'events'
import Fs from 'fs'
import MockDataLoader from './loader'


let emitter = new EventEmitter;
emitter.on('dummy_data_loaded', function(data){
    console.log("data_received");
});

new MockDataLoader().load(emitter);
