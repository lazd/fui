fui.mixins = fui.mixins || {};

fui.mixins.getTypes = function(classPrefix) {
	this.fui.types = this.fui.types || {};

	var className = this.className;

	var re = fui.getRe(classPrefix+'-([a-z]+)');

	var types = {};
	var matched = false;
	var matches;
	do {
		matches = re.exec(this.className);
		if (matches)
			types[matches[1]] = matched = true;
	}
	while (matches);

	if (!matched)
		return null;

	this.fui.types[classPrefix] = types;
	return types;
};
