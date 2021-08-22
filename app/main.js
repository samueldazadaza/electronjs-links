const { app, BrowserWindow } = require('electron');

let mainWindow = null; //colocar variable fuera del scope, para mantener app en funcionamiento

app.on('ready', () => {
    mainWindow = new BrowserWindow({ //crea una ventana de windows con con cierto tamaño default
        webPreferences: {
            nodeIntegration: true, //para poder manejar apis de node a traves de electron
            contextIsolation : false 
        }
    }) 
    mainWindow.loadFile(__dirname + '/index.html' ) //archivo inicial de codigo html
});