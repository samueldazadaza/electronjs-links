const { app, BrowserWindow } = require ('electron');

app.on('ready', () => {
    mainWindow = new BrowserWindow() //crea una ventana de windows con con cierto tamaño default
    mainWindow.loadFile(__dirname + '/index.html' ) //archivo inicial de codigo html
});