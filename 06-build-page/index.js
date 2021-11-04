const fs = require('fs');
const path = require('path');
const projectDist = path.join(__dirname, 'project-dist');
const template = path.join(__dirname, 'template.html');
const styles = path.join(__dirname, 'styles');
const assets = path.join(__dirname, 'assets');
const components = path.join(__dirname, 'components');
let message = '';
let trueMessage = false;
let trueMessage2 = false;
let countOfTable=0;
const projectDistIndex = path.join(projectDist, 'index.html');
const projectDistStyle = path.join(projectDist, 'style.css');
const projectDistAssets = path.join(projectDist, 'assets');


fs.readFile(template, 'utf-8', (error, data) => {
    if (error) {        
        console.log('Error\x1b[35m', error);
    }
    fs.writeFile(projectDistIndex, data, 'utf-8', (error) => {
        if (error) {        
            console.log('Error\x1b[35m', error);
        }
    })
    fs.readFile(projectDistIndex, 'utf-8', (error, dataOfProjectDistIndex) => {
        if (error) {        
            console.log('Error\x1b[35m', error);
        }
        fs.readdir(components, (error, dataOfcomponents) => {
            if (error) {        
                console.log('Error\x1b[35m', error);
            }
            message += '\x1b[37m\nCopy files\t|';
            dataOfcomponents.forEach(fileOfIndex => {              
                let pathForIndex = path.join(components, fileOfIndex)
                let createNameOfHtml = fileOfIndex.split('.')[0]
                fs.readFile(pathForIndex, 'utf-8', (error, dataOfHtml) => {                    
                    if (error) {        
                        console.log('Error\x1b[35m', error);
                    }
                    dataOfProjectDistIndex = dataOfProjectDistIndex.replace(new RegExp(`{{${createNameOfHtml}}}`, 'g'), dataOfHtml)
                    fs.writeFile(projectDistIndex, dataOfProjectDistIndex, 'utf-8', (error) => {
                        if  (trueMessage == false){
                        message += '\x1b[37m\nAdd on HTML\t|';  trueMessage = true}                   
                        message += ` \x1b[34m${createNameOfHtml} \x1b[37m|`;   
                        if (error) {        
                            console.log('Error\x1b[35m', error);
                        }
                    })
                   
                })
            })
        })
    });
})


fs.readdir(styles, (error, files) => {      
    fs.mkdir(projectDistAssets, (error) => {
      fs.mkdir(projectDist, error => {
        message += `\x1b[37mIf no dir, \t|\x1b[36m${projectDist}\x1b[37m| \x1b[33mi am create it!\x1b[37m\n`;
        message += `\x1b[37mIf no dir, \t|\x1b[36m${projectDistAssets}\x1b[37m| \x1b[33mi am create it!\x1b[37m\n`;
        })       
    })    
    if (error) {        
        console.log('Error\x1b[35m', error);
    }
    files.forEach(file => {
        let fileOfCss = path.extname(file).slice(1);
        if(fileOfCss === 'css') {
            let fileOfStyle = path.join(styles, file);
            fs.readFile(fileOfStyle, 'utf-8', (error, data) => {
                if (error) {        
                    console.log('Error\x1b[35m', error);
                }
                fs.appendFile(projectDistStyle, data+'\n', (error) => {
                    if  (trueMessage2 == false){
                        message += '\x1b[37mSplit CSS files |';  
                        trueMessage2 = true
                    }   
                    
                    message += ` \x1b[33m${file} \x1b[37m|`;

                    if (error) {        
                        console.log('Error\x1b[35m', error);
                    }
                })
            })
        }
    })
})


fs.readdir(assets, (error, dateForAssets) => {
    if (error) {        
        console.log('Error\x1b[35m', error);
    }
    dateForAssets.forEach(files => {
        let fileOfAssets = path.join(projectDistAssets, files);
        fs.mkdir(fileOfAssets, {recursive: true} , error => {
            if (error) {        
                console.log('Error\x1b[35m', error);
            }
        })
        let fileForAssets = path.join(assets, files);
        fs.readdir(fileForAssets, (error, dataForAssets) => {
            if (error) {        
                console.log('Error\x1b[35m', error);
            }
            dataForAssets.forEach(fileCopyAssets => {
                let ifFileIsFull = path.join(fileForAssets, fileCopyAssets)
                fs.readFile(ifFileIsFull, 'utf-8', (error, data) => {
                    if (error) {        
                        console.log('Error\x1b[35m', error);
                    }
                    let dataOfAssetsFile = path.join(fileOfAssets, fileCopyAssets)
                    fs.appendFile(dataOfAssetsFile, data, (error) => {                   
                    countOfTable +=1;
                    if (countOfTable==5) {
                        message +=`\n\t\t|`
                        countOfTable=0;
                    }
                        message +=` \x1b[32m${fileCopyAssets} \x1b[37m|`             
                        if (error) {        
                            console.log('Error\x1b[35m', error);
                        }
                    })
                })
            })
        })
    })
})
const process = require('process');
process.on('beforeExit', () => {console.log(message);});

