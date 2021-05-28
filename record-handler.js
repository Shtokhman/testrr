'use strict';

const recorder = new ScriptRecorder();
let result = null;
recorder.start();

function generateHtml(replayEvents, replaySpeed=1) {
    return `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                <title>Recording</title>
            </head>
            <body>
            <div id="root"></div>
            <script src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js"></script>
            <script>var recording = ${JSON.stringify(replayEvents)}; var replayer = new rrweb.Replayer(recording, {speed: ${replaySpeed}, root: document.getElementById('root'), mouseTail: false}); replayer.play()</script>
            </body>
            </html>`;
}

let round = 0;
document.querySelector('input[type=submit][value="Submit"]').addEventListener('click', () => {
    round++;
    if (round === 10) {
        recorder.stop();
        result = recorder.getEvents();
        window.result = generateHtml(result.map(e => e.event));

    }
    console.log(`Round - ${round}`)
})
