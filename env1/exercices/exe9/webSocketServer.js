var net = require('net');
var fileDriver = require("fs");
var util = require("util");


var LogManager = function(fileFullname)
{		
		this.log = fileDriver.createWriteStream(fileFullname, {'flags': 'a'});
}

LogManager.prototype.Log = function (message, obj)
{
		var messageToLog = (new Date()).toString() + message + " : " + util.inspect(obj) + "\n\t";
		this.log.write(messageToLog);
}


var logManager = new LogManager("logs/logfile.txt");



var HOST = '127.0.0.1';
var PORT = 6969;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        console.log('DATA: ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        //sock.write('You said "' + data + '"');

    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        //console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
        console.log('CLOSED: ' + data);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);


