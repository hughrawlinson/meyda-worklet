// import { PROCESSOR_NAME } from './shared-config';
const PROCESSOR_NAME = 'meydaanalyzer';

console.log(registerProcessor);

registerProcessor(PROCESSOR_NAME, class extends AudioWorkletProcessor {
    constructor(options) {
        super(options);

        this.port.onmessage = message => {
            console.log(message);
            this.port.postMessage({
                type: "now yell outside the thread"
            })
        }

    }

    process(inputs, outputs, parameters) {
        return true;
    }
})

export const a = 1;