var fs = require("fs");
var readStream = fs.createReadStream("../exe5/Logs/logfile.txt");

(function scheduler()
{
	
	setTimeout(function() 
	{
		console.log("listening to log file...");
		scheduler();	
	}, 2000);

})()

readStream.on("error", function(err)
	{
			console.log(err);
	});

readStream.on("data", function(data)
	{
		console.log(data);	
	});

readStream.on("end", function(data)
	{
		console.log("file ended"); 	

	});

