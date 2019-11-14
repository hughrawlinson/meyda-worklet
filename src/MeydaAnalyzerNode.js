// import AnalyzerProcessor from './MeydaAnalyzerNodeProcessor.worker.js';
import { PROCESSOR_NAME } from './shared-config';

const AnalyzerProcessor = `
registerProcessor('meydaanalyzer', class extends AudioWorkletProcessor {
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
`

export class MeydaAnalyzerNode extends AudioWorkletNode {
    constructor(audioContext, options) {
        super(audioContext, PROCESSOR_NAME, options);

        this.port.onmessage = message => {
            console.log(message);
            console.log("ok, will do!");
        };
    }

    yellSuccess() {
        console.log('success');
        this.port.postMessage({
            type: 'yell success from inside the thread'
        });
    }
}

export function createMeydaAnalyzerNode(audioContext, options) {
    const blob = new Blob([ AnalyzerProcessor ], { type: 'application/javascript; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    console.log(url);
    return audioContext.audioWorklet.addModule(url).then(() => {
        const node = new MeydaAnalyzerNode(audioContext);

        node.yellSuccess();
    }).catch(e => {
        debugger;
    });
}