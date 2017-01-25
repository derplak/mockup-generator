var app = require('electron').app;
var ipc = require('electron').ipcMain;
var dialog = require('electron').dialog;
var Menu = require('electron').Menu;
var menubar = require('menubar');
var mb = menubar({width: 370, height: 305, preloadWindow:true, icon: __dirname+'/img/icon/iconTemplate.png'});

mb.on('ready', function ready () {
  var template = [{
      label: "Application",
      submenu: [
          { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
          { type: "separator" },
          { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
      ]}, {
      label: "Edit",
      submenu: [
          { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
          { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
          { type: "separator" },
          { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]}
  ];

  ipc.on('open-file-dialog', function (event) {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, function (files) {
      if (files) event.sender.send('selected-directory', files);
    });
  });

  // mb.window.openDevTools(); //uncomment to view dev tools

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
})
