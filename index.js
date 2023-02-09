const log = console.log;
const ERROR = console.error;
const fs = require('fs');
const path = require('path');
let dirPath = path.join(__dirname, 'dir');
let filePath = path.join(__dirname, 'dir', 'file.txt');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('Type here(Edit file content): ', edit => {
    readline.question('Would you like to save changes(y/n)?', response => {
        if (`${response}` === "y") {
            if (!fs.existsSync(dirPath)) {
                fs.mkdir(dirPath, (err) => {
                    if (err) throw err;
                    log("Directory created successfully...\nWriting changes to file...");
                    // WRITE FILE
                    fs.writeFile(filePath, `${edit}`, (err) => {
                        if (err) throw err;
                        log("Changes have been saved...\nDone!");
                    });
                });
            } else {
                if (fs.existsSync(dirPath)) {
                    log("Working directory found!\nWriting changes to file...");
                    fs.writeFile(filePath, `${edit}`, (err) => {
                        if (err) throw err;
                        log("Changes have been saved...\nDone!");
                    });
                }
            }
        } else if (`${response}` === "n") {
            log("Changes have been rejected...\n");
        } else if (`${response}` === "") {
            log("Please choose an option...\n");
        } else {
            log("Nothing to do...\n");
        }
        readline.close();
    });
});
process.on('uncaughtException', err => {
    ERROR(`There was an uncaught error: ${err}`);
    process.exit(1);
});