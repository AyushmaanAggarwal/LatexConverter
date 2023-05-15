const electron = require( "electron" );
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;

app.on(
    "window-all-closed",
    function()
    {
        app.quit();
    }
    );

app.on(
    "ready",
    function()
    {
        var subpy = require( "child_process" ).spawn( "python", [ "./app.py" ] );
        // var subpy = require( "child_process" ).spawn( "./dist/hello.exe" );
        var rp = require( "request-promise" );
        const mainAddr = "http://127.0.0.1:5000";
        var countLog = 50;
        
        var OpenWindow = function()
        {
            mainWindow = new BrowserWindow( { width: 800, height: 600 } );
            // mainWindow.loadURL( "file://" + __dirname + "/index.html" );
            mainWindow.loadURL( "http://localhost:5000" );
            // mainWindow.webContents.openDevTools();
            mainWindow.menuBarVisible = false;
            mainWindow.on(
                "closed",
                function()
                {
                    mainWindow = null;
                    subpy.kill( "SIGINT" );
                }
                );
        };
        
        var StartUp = function()
        {
            rp( mainAddr )
            .then(
                function( htmlString )
                {
                    console.log( "server started!" );
                    OpenWindow();
                }
                )
            .catch(
                function( err )
                {

                    if (countLog > 50) {
                        console.log( "Waiting for the server start..." );
                        countLog = 0;
                    }
                    countLog = countLog + 1;
                    // without tail call optimization this is a potential stack overflow
                    StartUp();
                }
                );
        };

        // fire!
        StartUp();
    });