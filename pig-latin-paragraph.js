const fs = require('fs');
  
process.on('message', message => {
    let paragraph = message.paragraph;
    let outputFilePath = message.outputFilePath || 'output.txt';
    
    fs.appendFile('output.txt', getPigLatinParagraph(paragraph) + "\n", (err) => {
        process.send("");
    });
});

function getPigLatinParagraph (paragraph) {
    let words = getWordsFromString(paragraph);
    return words.map((word) => {
        return getPigLatinString(word);
    }).join(", ");
};

function isVowel (ch) {   
    return (ch === "A" || ch == 'a' ||
            ch === "E" || ch == 'e' ||
            ch === "I" || ch == 'i' ||
            ch === "O" || ch == 'o' ||
            ch === "U" || ch == 'u');
}

function getIndexOfFirstVowel (str) {
    for (let i = 0; i < str.length; i++) {
        if (isVowel(str[i])) {
           return i; 
        }
    }
}

function getPigLatinString (str) {
    let indexOfFirstVowel = getIndexOfFirstVowel(str);
    return str.slice(indexOfFirstVowel) + str.slice(0, indexOfFirstVowel) + "ay";
}


function getWordsFromString (str) {
    return str.split(/[.!,;? ]/).filter((word) => word);
}