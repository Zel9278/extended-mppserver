//call new Server
global.WebSocket = require('ws');
global.EventEmitter = require('events').EventEmitter;
global.fs = require('fs');
global.createKeccakHash = require('keccak');
global.express = require('express');
global.http = require('http');

global.isString = function(a){
	return typeof a === 'string';
}
global.isBool = function(a){
	return typeof a === 'boolean';
}
global.isObj = function(a){
	return typeof a === "object" && !Array.isArray(a) && a !== null;
}

let Server = require("./src/Server.js");
let config = require('./config');
global.SERVER = new Server(config);
console.log("kazukazu123123's Custom MPP Server");
console.log("Set default room color to: " + config.defaultRoomColor);
console.log("Set default room color2 to: " + config.defaultRoomColor2);
console.log("Listening on 0.0.0.0:" + config.port);
console.log("Password is: " + config.adminpass);