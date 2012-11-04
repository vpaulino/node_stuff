
var fileDriver = require("fs");
var util = require("util");
var express = require('express');
var httpDriver = require("http");

var app = express();




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

var httpServer = httpDriver.createServer();
var io = require('socket.io').listen(httpServer);

 httpServer.on("request", function (req, res)
	{
		console.log("request Made!");

		logManager.Log("Request received ", req);
		
		fileDriver.readFile('files'+req.url, 'utf8', function (err,data) {
			
		  if (err) {

		    res.writeHead(404, {"content-type": "text/html"});
		    fileDriver.readFile('files/notFound.html', 'utf8', function (err,data) {
				res.write(data);
		    	res.end();		 
		    	return;
			});
			return;
		  }

		  res.writeHead(200, {"content-type": "text/html"});
     	  res.write(data);
		  
		  res.end();		  
		});
		
	});


io.sockets.on('connection', function(socket) {


    console.log("client connected ! ");
    
    socket.on('message', function(data) {
        // logger.info("chat message arrived");
        //io.sockets.emit('chat', {text:data.text});
        console.log(data);
       // messagesPerSecond++;
    });

    socket.on('disconnect', function(data) {
         console.log(data);
    });
});


 httpServer.listen(8080);

