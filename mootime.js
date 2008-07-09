Function.implement({
	time: function(message, that, args){
		var s = $time()
		var r = this.apply(that, $splat(args))
		console.log((message || "") + " " + ($time() - s))
		return r
	},
	avg_time: function(message, that, args){
		if (!this.avg_time_storage) this.avg_time_storage = {}
		if (!this.avg_time_storage[message]) this.avg_time_storage[message] = {times:[]}
		var storage = this.avg_time_storage[message]
		
		var s = $time()
		var r = this.apply(that, $splat(args))

		storage.times.push($time() - s)
		$clear(storage.timer)
		storage.timer = ( function() {
			console.log(message 
				+ " took "
				+ storage.times.average() + "ms on average and executed " 
				+ storage.times.length + " times")
		} ).delay(1000, this)
		
		return r
	}
});

Array.implement({
	average: function(){
		var total = 0
		this.each(function(x){
			total += x
		})
		return total/this.length
	}
});