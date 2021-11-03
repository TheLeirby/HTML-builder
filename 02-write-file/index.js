const readline = require('readline'),
  fs = require('fs'),
  path = require('path'),
  {stdin: input, stdout: output} = require('process'),
  rl = readline.createInterface({ input, output }),
  process = require('process');    
let file = path.join(__dirname, 'text.txt');
let writableStream = fs.createWriteStream(file,'utf8');
let mess='\x1b[37m", Ok! text save.';
let message=``;

writableStream.on('open', () => {});  

rl.on('line', (input) => {
    if (input !== 'exit') {
        writableStream.write(input + '\n');
    } else {
        message=`\x1b[37mYou type "\x1b[33mexit${mess}`;
        rl.pause();
    }    
});
rl.on('SIGINT', () => {
    message=`\x1b[37mWas push \x1b[33mCtrl+C${mess}`; 
    rl.pause();
});
rl.on('SIGTSTP', () => {
    message=`\x1b[37mWas push \x1b[33mCtrl+Z${mess}`;
    rl.pause();
});
console.log(`Hi! Please, type text. For \x1b[32mexit\x1b[37m, please type "\x1b[33mexit\x1b[37m" or press hotkeys "\x1b[33mCrtl\x1b[37m"+"\x1b[33mC\x1b[37m"`);
process.on('beforeExit', () => {console.log(message);});
    
    

