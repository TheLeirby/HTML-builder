const fs = require('fs');
const path = require('path');
const filesDirectory = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist/bundle.css');
const process = require('process');
let message='';
fs.readdir(filesDirectory, {withFileTypes: true}, function (error, items) {    
    if (!error){        
        items.forEach(i => {            
            findStyles(i.name);
        });        
    } else {
        message=`Error\x1b[31m ${error}`;
    }
});
fs.writeFile(bundlePath, '', (error) => {
    if (!error){        
        message+=`\x1b[33mCopy styles to bundle.css from file: \x1b[37m\t| `;
    } else{
        message=`Error\x1b[31m ${error}`;
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
                    message+=`\x1b[32m${file}\x1b[37m |\t`;                    
                } else{
                    message=`Error\x1b[31m ${error}`;
                }
            });
        } else{
            message=`Error\x1b[31m ${error}`;
        }      
    });
  } else {
    message+=`\x1b[31mSorry file:${file}, is not for CSS\x1b[37m\n`;
  }
}
process.on('beforeExit', () => {console.log(message);});