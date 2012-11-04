var counter = 0;
(function scheduler()
{
	
	setTimeout(function() 
	{
		var myobj = { field1 : "a", field2: false };
		console.log("numberOfElapsed: %d on %s with the object %j", counter, "composedLogs",myobj );
		counter ++;
		scheduler();

	}, 2000);

})()