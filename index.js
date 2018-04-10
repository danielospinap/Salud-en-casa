const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
//Module to receive from render
const ipcMain = electron.ipcMain

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, nodeIntegration: false })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/views/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var request = require('request');





ipcMain.on('login-submission', function (event, user, pass) {

    request.post(
        'https://db-pais.herokuapp.com/empleado/login',
        { json: { usuario: user, password: pass } },
        function (error, response, body) {
            if (error) {
                console.log(error);
                event.sender.send('error-server');
            } else if(response.statusCode === 422) {
                event.sender.send('error-datos');
            } else if(response.statusCode === 200){
                event.sender.send('login-successful', 'menu.html');
            }
        }
    );

});


ipcMain.on('obtener-productos', function (event, divProductos) {
    request.get(
        'https://solicitud-medicamentos-unnamed.herokuapp.com/producto/list?origen=mobile',
        function (err, response, body) {
            if (err) {
                console.log(err);
                event.sender.send('error-server');
            }
            var json = JSON.parse(body);
            event.sender.send('listar-productos', json);
        }
    );
});
