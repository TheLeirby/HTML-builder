const fs = require('fs'),
  path = require('path'),
  {readdir} = require ('fs/promises'),
  process = require('process'); 
let message=``;
async function tableOfFiles() {
    try {        
        for (const file of await readdir(path.join(__dirname, '/secret-folder'))) {
            const fileJoin = path.join(__dirname, '/secret-folder', file);
            fs.stat(fileJoin, (error, date) => {
                if (error) {
                    message+=`\x1b[31mEror!\n${error}`;
                } else if (!date.isDirectory()) {
                    const extName = path.extname(fileJoin);
                    message+=`\n\x1b[34m|\x1b[32m${path.basename(fileJoin, extName)}\t\t\x1b[34m|\x1b[32m${extName.substring(1)}\t\t\x1b[34m|\x1b[32m${date.size} bytes\t\t\x1b[34m|`;
                    message+='\n\x1b[34m|---------------+---------------+-----------------------|';
                }                
            })             
        }
    } catch (error) {
        message+=`\x1b[31mEror!\n${error}`;
    }
}
message+=`\n\x1b[34m|---------------+---------------+-----------------------|`;
message+=`\n\x1b[34m|\x1b[36mFile name\t\x1b[34m|\x1b[36mfile extension\t\x1b[34m|\x1b[36mFile size\t\t\x1b[34m|`;
message+=`\n|---------------+---------------+-----------------------|`;
tableOfFiles()
process.on('beforeExit', () => {console.log(message);});