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
        var subpy = require( "child_process" ).spawn( "python", [ "./website/app.py" ] );
        const fetch = require("node-fetch");
        const mainAddr = "http://127.0.0.1:3213";
        const maxLogCount = 100;
        var countLog = maxLogCount;
        
        var OpenWindow = function()
        {
            mainWindow = new BrowserWindow( { width: 800, height: 600 } );
            // mainWindow.loadURL( "file://" + __dirname + "/index.html" );
            mainWindow.loadURL( "http://localhost:3213" );
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
        
        function StartUp()
        {
            fetch(mainAddr)
            .then(res => {
                console.log( "server started!" );
                OpenWindow();
            })
            .catch(e => {
                StartUp();
                if (countLog >= maxLogCount) {
                        console.log( "Waiting for the server start..." );
                        countLog = 0;
                    }
                countLog = countLog + 1;
            });
        };

        // fire!
        StartUp();
    });