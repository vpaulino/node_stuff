var util = require("util");
(function scheduler()
{
	setTimeout(function() 
	{
		util.log("hello world");
		scheduler();
		var myobj = { field1 : "a", field2: false };
		util.log(util.inspect(myobj));
	}, 2000);

})()