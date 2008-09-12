Function.implement({
	time: function(message, that, args){
		var s = $time()
		var r = this.apply(that, $splat(args))
		var m = (message || "") + " took " + ($time() - s) + 'ms'
		$defined(window.console) ? console.log(m) : alert(m)
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
			var m = message 
				+ " took "
				+ storage.times.average() + "ms on average and executed " 
				+ storage.times.length + " times"
			$defined(window.console) ? console.log(m) : alert(m)
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