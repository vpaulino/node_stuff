
var httpDriver = require("http");
var fileDriver = require("fs");
var util = require("util");
var zmq = require("./zmq");
var zmqSocket = zmq.socket("req");



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

 httpServer.on("request", function (req, res)
	{
		console.log("request Made!");

		logManager.Log("Request received ", req);
		
		fileDriver.readFile('serverroot'+req.url, 'utf8', function (err,data) {
			
		  if (err) {

		    res.writeHead(404, {"content-type": "text/html"});
		    fileDriver.readFile('serverroot/notFound.html', 'utf8', function (err,data) {
				res.write(data);
		    	res.end();		 
		    	return;
			});
			return;
		  }

		  zmqSocket.connect("tcp://localhost:5555");
		  zmqSocket.send(req.url);
		  zmqSocket.on('message', function(msg){
		  		console.log("message sent to zmq server req/rep mode");
		  		zmqSocket.close();
		  });


		  res.writeHead(200, {"content-type": "text/html"});
     	  res.write(data);



		  res.end();		  
		});


		
	});

 httpServer.listen(8080);

