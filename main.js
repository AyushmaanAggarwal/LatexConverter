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
        // var subpy = require( "child_process" ).spawn( "python", [ "./website/app.py" ] );

        //        subpy.stdout.on('data', function (data) {
        //            console.log("data: ", data.toString('utf8'));
        //        });
        //        subpy.stderr.on('data', (data) => {
        //            console.log(`stderr: ${data}`); // when error
        //        });
        var subpy = require('child_process').spawn(process.cwd()+"/app");
        subpy.stdout.on('data', function (data) {
            console.log("data: ", data.toString('utf8'));
        });
        subpy.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`); // when error
        });
        //        let backend;
        //        backend = process.cwd() + '/app'
        //        var execfile = require('child_process').execFile;
        //        execfile(
        //            backend,
        //            { windowsHide: true,},
        //            (err, stdout, stderr) => {  if (err)
        //            {
        //                console.log(err);
        //            }  if (stdout) {
        //                console.log(stdout);
        //            }  if (stderr) {
        //                console.log(stderr);
        //            }})
        const fetch = require("node-fetch");
        const mainAddr = "http://127.0.0.1:3214";
        const maxLogCount = 100;
        var countLog = maxLogCount;
        
        var OpenWindow = function()
        {
            mainWindow = new BrowserWindow( { width: 800, height: 600 } );
            // mainWindow.loadURL( "file://" + __dirname + "/index.html" );
            mainWindow.loadURL( mainAddr );
            // mainWindow.webContents.openDevTools();
            mainWindow.menuBarVisible = false;
            mainWindow.on(
                "closed",
                function()
                {
                    mainWindow = null;
                    subpy.kill( "SIGINT" );
                    //                    const { exec } = require('child_process');
                    //                    execfile.kill('SIGINT')
                    //                    exec('taskkill /f /t /im app', (err, stdout, stderr) => { if (err) {
                    //                        console.log(err);
                    //                        return; }
                    //                        console.log(`stdout: ${stdout}`);
                    //                        console.log(`stderr: ${stderr}`);
                    //                    });
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