const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let llRegisterWindow;
let obaRegisterWindow;
let coachRegisterWindow;

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

// Little League App Window Creation
function createLLWindow(){
    
    llRegisterWindow = new BrowserWindow({
        title: 'New Little League Player Application'
    });

    llRegisterWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'llRegisterWindow.html'),
        protocol: 'file:',
        slashes: true
    }))

    llRegisterWindow.on('close', function(){
        llRegisterWindow = null;
    })
}

// OBA App Window Creation
function createOBAWindow(){
    
    obaRegisterWindow = new BrowserWindow({
        title: 'New OBA Player Application'
    });

    obaRegisterWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'obaRegisterWindow.html'),
        protocol: 'file:',
        slashes: true
    }))

    obaRegisterWindow.on('close', function(){
        obaRegisterWindow = null;
    })
}

// Coach App Window Creation
function createCoachWindow(){
    
    coachRegisterWindow = new BrowserWindow({
        title: 'New Coaches Application'
    });

    coachRegisterWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'coachRegisterWindow.html'),
        protocol: 'file:',
        slashes: true
    }))

    coachRegisterWindow.on('close', function(){
        coachRegisterWindow = null;
    })
}

// Create Menu Template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Little League Application',
                click(){
                    createLLWindow();
                }
            },
            {
                label: 'New OBA Application',
                click(){
                    createOBAWindow();
                }
            },
            {
                label: 'New Coaching Application',
                click(){
                    createCoachWindow();
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