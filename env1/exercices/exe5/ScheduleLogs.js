

var fs = require("fs");
var util = require("util");
var log = fs.createWriteStream("logs/logfile.txt", {'flags': 'a'});

function logObject(message,obj) 
{		
		var messageToLog = (new Date()).toString() + message + util.inspect(obj) + "\n\t";
		log.write(messageToLog);
		
}

var counter = 0;
(function scheduler()
{
	
	setTimeout(function() 
	{
		message = "scheduler access to object "; 
		var myobj = { field1 : "a", field2: false };
		logObject(message,myobj);
		counter ++;
		scheduler();

	}, 2000);

})()