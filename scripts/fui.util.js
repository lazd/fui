fui.extend = function() {
	var objs = arguments;
	var result = objs[0];
	for (var i = 1; i < objs.length; i++) {
		var obj = objs[i];
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop))
				result[prop] = obj[prop];
		}
	}
	return result;
};

fui.addListener = function(el, eventName, handler) {
	if (el.attachEvent)
		return el.attachEvent('on'+eventName, handler);
	else
		return el.addEventListener(eventName, handler, false);
};

(function() {
	// This will cause problems if the RE is used to loop asynchronously
	var reCache = {};
	fui.getRe = function(reStr) {
		var cached = reCache[reStr];
		if (cached) {
			cached.lastIndex = 0;
			return cached
		}
		return (reCache[reStr] = new RegExp(reStr, 'g'));
	}
}());