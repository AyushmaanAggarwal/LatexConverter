const electron = require( "electron" );
const app = electron.app;
const path = require('path');
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
        const backend = path.join(app.getAppPath(),"../app");
        // console.log("Starting "+backend)

        var subpy = require('child_process').spawn(backend);
        subpy.stdout.on('data', function (data) {
            console.log("data: ", data.toString('utf8'));
        });
        subpy.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`); // when error
        });

        const fetch = require("node-fetch");
        const mainAddr = "http://127.0.0.1:3214";
        const maxLogCount = 100;
        var countLog = maxLogCount;
        
        var OpenWindow = function()
        {
            mainWindow = new BrowserWindow( { width: 800, height: 600 } );
            mainWindow.loadURL( mainAddr );
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