const fs = require('fs'),
  path = require('path'),
  steam = fs.createReadStream (path.join(__dirname,'text.txt'), 'utf8'),
  process = require('process');
let message=``;
steam.on('error', (error) => message=`\x1b[31mError: ${error}`);
steam.on('data', (data) => message=`\x1b[37mRead from file:"text.txt"\n\x1b[33m${data}`);
process.on('beforeExit', () => {console.log(message);});