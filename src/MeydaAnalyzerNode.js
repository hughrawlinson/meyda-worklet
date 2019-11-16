import { PROCESSOR_NAME } from './shared-config';
import AnalyzerProcessor from './MeydaAnalyzerNodeProcessor.worklet.js';

// const AnalyzerNodeData = `
// "use strict";
// eval(\`
// const PROCESSOR_NAME = 'meydaanalyzer';

// console.log(registerProcessor);

// registerProcessor(PROCESSOR_NAME, class extends AudioWorkletProcessor {
//     constructor(options) {
//         super(options);

//         this.port.onmessage = message => {
//             console.log(message);
//             this.port.postMessage({
//                 type: "now yell outside the thread"
//             })
//         }

//     }

//     process(inputs, outputs, parameters) {
//         return true;
//     }
// })
// \`)`;

// const blob = new Blob([AnalyzerNodeData], { type: 'application/javascript; charset=utf-8' })
// const AnalyzerProcessor = URL.createObjectURL(blob)

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

export async function createMeydaAnalyzerNode(audioContext, options) {
    const r = await fetch(AnalyzerProcessor);
    const text = await r.text();
    console.log(text);
    
    return audioContext.audioWorklet.addModule(AnalyzerProcessor).then(() => {
        const node = new MeydaAnalyzerNode(audioContext);

        node.yellSuccess();
    }).catch(e => {
        console.error(e);
    });
}