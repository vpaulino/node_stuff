
var eventEmitter = require("events").EventEmitter;

var util = require("util");

var LogNotifier = function(_obj,_numberOfMessages)
{
	this.logParent = _obj;
	this.numberOfMessages = _numberOfMessages;
	
}

util.inherits(LogNotifier, eventEmitter);

LogNotifier.prototype.Notify = function (params)
{		
	this.emit("logOccurred", params);
}



var logNotifier = new LogNotifier(null, 3);

function logObject(message,obj) 
{		
		var messageToLog = (new Date()).toString() + message + util.inspect(obj) + "\n\t";
		logNotifier.Notify(messageToLog);
}


logNotifier.on("logOccurred", function ()
	{
			util.log("log ocurred event");
	});

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
