'use strict';
const recorder = new ScriptRecorder();
let result = null;
recorder.start();

document.querySelector('button#replay-btn').addEventListener('click', () => {
    result = recorder.getEvents();
    console.log('recorded events = ', result.length);
    recorder.stop();
    const replayer = new rrweb.Replayer(recorder.getEvents().map(e => e.event));
    replayer.play();
})
