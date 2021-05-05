'use strict';
const recorder = new ScriptRecorder();
let result = null;
recorder.start();

let round = 0;
document.querySelector('input[type=submit][value="Submit"]').addEventListener('click', () => {
    round++;
    if (round === 10) {
        result = recorder.getEvents();
        console.log('recorded events = ', result.length);
        recorder.stop();

        const replayer = new rrweb.Replayer(recorder.getEvents().map(e => e.event));
        replayer.play();
        replayer.setSpeed(0.5);
    }
    console.log(`Round - ${round}`)
})
