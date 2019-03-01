const start = new Date();
let end;

const hrstart = process.hrtime()
let hrend; 
const fs = require('fs');
const { fork } = require('child_process');

let inputFilePath = process.argv[2] || 'input.txt';
let outputFilePath = process.argv[3] || 'output.txt';

fs.readFile(inputFilePath, 'utf8', function (err, data) {
    if (err) throw err;
    handleData(data);
});

function handleData(data) {
    let paragraphs = data.split("\n");
    let counter = 0;
    paragraphs.forEach(paragraph => {
        const pigLatinParagraphWorker = fork('pig-latin-paragraph.js');
        pigLatinParagraphWorker.send({paragraph, outputFilePath});
        pigLatinParagraphWorker.on('message', result => {
            counter += 1;
            if (counter === paragraphs.length) {
                end = new Date() - start;
                hrend = process.hrtime(hrstart);
                
                console.info('Execution time: %dms', end)
                console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
                
                process.exit();            
            }
        });
    });
}

process.stdin.resume();

process.on('exit', (code) => {
    console.log("\n\t\t ======= Done (output written to file -- output.txt) ===== \t\t\n");
});