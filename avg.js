function avg(avg){
	sum= 0;
	for(var i=0; i<avg.length; i++){
		sum+=avg[i];
	}
	avg = sum/avg.length;
	console.log(Math.floor(avg));
}
avg([10,12,45,68,98,74,112]);