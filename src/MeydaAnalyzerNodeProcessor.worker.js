import { PROCESSOR_NAME } from './shared-config';
registerProcessor(PROCESSOR_NAME, class extends AudioWorkletProcessor {
    constructor(options) {
        super(options);

        this.port.onmessage = function(message) {
            console.log(message);
        }

        this.port.postmessage({
            type: "now yell outside the thread"
        })
    }

    process(inputs, outputs, parameters) {
        return true;
    }
})