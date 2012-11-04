(function scheduler()
{
	setTimeout(function() 
	{
		console.log("hello world");
		scheduler();
	}, 2000);

})()