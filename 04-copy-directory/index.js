const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const pathFrom = path.join(__dirname, 'files');
const pathOut = path.join(__dirname, 'files-copy');
let message = '';
let message2 =``;
fsPromises.mkdir(pathOut).then(function () {
    console.log('\x1b[37mdirectory \x1b[33mcreate \x1b[37mby this script');
}).catch(
    function () {
        console.log('\x1b[37mdirectory \x1b[33mwas \x1b[37min your file system');
    }
);
message2 +='\n=================================================================================\n';
fs.readdir(pathFrom, (error, file) => {
    let proverka=0;
    message +=`|`
    console.log(`copy files ... \n\x1b[37mfrom\t\x1b[34m${pathFrom} \n\x1b[37mto\x1b[32m\t${pathOut}\x1b[37m`)
    file.forEach(function(current, i) {
        fs.copyFile(`${pathFrom}/${current}`, `${pathOut}/${current}`, (error) => {
        if (!error) {  
            proverka++  
            message2 +=`|  dolgno bit \x1b[33m${proverka}\x1b[37m \t forEach vzal zapis \x1b[34m${i+1}\x1b[37m\t\t "${current}"   \t|\n`;
            message += ` ${i+1}) ${current} |`
        } else{
            console.log('Error\x1b[35m', error);
        }
        });
    });
});

const process = require('process');
process.on('beforeExit', () => {
    message +='\n=================================================================================';
    message += `\n\x1b[37m|\x1b[35m Ochen interesniy fakt, massiv chitaetsa randomno stranno kakto\t\t`;
    message += `\x1b[37m|\n\x1b[37m|\x1b[35m poprobuite neskolko raz po zapuskati etu ge commandu node 04-copy-directory\x1b[37m\t|`;
    message += message2
    message +='=================================================================================';
    message += `\n\x1b[32mzaranee blagodaren!\n\n`
    console.log(message);
})