const fs = require('fs');
const path = require('path');
const filesDirectory = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist/bundle.css');
let filesForMessage='';
fs.readdir(filesDirectory, {withFileTypes: true}, function (error, items) {    
    if (!error){        
        items.forEach(i => {            
            findStyles(i.name);
        });        
    } else {
        console.log('Error\x1b[35m', error);
    }
});
fs.writeFile(bundlePath, '', (error) => {
    if (!error){        
        filesForMessage+=`\x1b[33mCopy styles to bundle.css from file: \x1b[37m\t| `;
    } else{
        console.log('Error\x1b[35m', error);
    }
});
function findStyles(file){
  const pathFile = path.join(filesDirectory, file);
  const type = path.extname(file);
  if (type === '.css'){      
      fs.readFile(`${pathFile}`, 'utf-8', (error, data) => {
        if (!error){        
            fs.appendFile(bundlePath, data, (error) => {
                if (!error){        
                    filesForMessage+=`\x1b[32m${file}\x1b[37m |\t`;                    
                } else{
                    console.log('Error\x1b[35m', error);
                }
            });
        } else{
            console.log('Error\x1b[35m', error);
        }      
    });
  } else {
    console.log(`\x1b[31mSorry file:${file}, is not for CSS\x1b[37m`)
  }
}
const process = require('process');process.on('beforeExit', () => {console.log(filesForMessage);});