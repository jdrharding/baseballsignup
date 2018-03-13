const electron = require('electron');
const url = require('url');
const path = require('path');
const keys = require(__dirname + '/keys.json');
const AWS = require('aws-sdk');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let llRegisterWindow;
let obaRegisterWindow;
let coachRegisterWindow;

AWS.config.update({"accessKeyId": keys.awsAccessKey, "secretAccessKey": keys.awsSecretKey, "region": keys.region});
const s3 = new AWS.S3();
const params = {
    "Bucket": keys.bucketName,
    "Key": "llPlayerList.json"
};

s3.getObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else {
        console.log(data);
        console.log(data.Body.toString());
    }
})

app.on('ready', function() {
    mainWindow = new BrowserWindow({});

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }))

    mainWindow.on('closed', function(){
        app.quit();
    })

    // Build menu using template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert Menu
    Menu.setApplicationMenu(mainMenu);
})

// Create Menu Template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Little League Signup',
                click(){
                    mainWindow.webContents.executeJavaScript(`
                        $('#content').html('<object type="text/html" data="llRegisterWindow.html" ></object>');
                    `)
                }
            },
            {
                label: 'OBA Signup',
                click(){
                    mainWindow.webContents.executeJavaScript(`
                        $('#content').html('<object type="text/html" data="obaRegisterWindow.html" ></object>');
                    `)
                }
            },
            {
                label: 'Coaching Signup',
                click(){
                    mainWindow.webContents.executeJavaScript(`
                        $('#content').html('<object type="text/html" data="coachRegisterWindow.html" ></object>');
                    `)
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}
if(process.env.NODE_ENV != 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',                
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}