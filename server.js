#!/bin/env node
var express = require('express');
var fs      = require('fs');
var io      = require('socket.io');
var box2d   = require('box2d');

var Server = function() {
    var self = this;
    self.ip = "127.0.0.1";
    self.port = "8080";
    self.app = express.createServer();
 //   self.world = new box2d();

    self.webServer = function() {
      self.app.configure(function() {
          self.app.use(express.static(__dirname + "/app"));
      });

      self.app.get("/", function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.send(fs.readFileSync("./app/index.html"));
      });

      self.app.listen(self.port, self.ip, 
        function() {
           console.log('%s: Node server started on %s:%d ...',
           Date(Date.now() ), self.ip, self.port);
        });
    };

    self.webSocket = function() {
      self.socket = io.listen(self.app);
      var sockets = self.socket.sockets;

      sockets.on('fire', function(socket) {
        console.log('fire' + socket);
//        socket.emit("box2d", socket);
      });

      sockets.on('up', function(socket) {
//        socket.emit("box2d", socket);
      });
    };
}


var ServerApp = new Server();
ServerApp.webServer();
ServerApp.webSocket();

