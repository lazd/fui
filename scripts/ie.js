var fui = fui || {};

(function() {
	var ie = fui.ie = navigator.appVersion.match(/MSIE (\d\.\d)/)[1] - 0;

	// Add IE CSS classes
	var docClasses = document.documentElement.className;
	docClasses = docClasses ? docClasses.split(' ') : [];

	docClasses.push('fui-ie');
	docClasses.push('fui-ie'+ie);

	if (ie < 6)
		docClasses.push('fui-lt-ie6');
	if (ie < 7)
		docClasses.push('fui-lt-ie7');
	if (ie < 8)
		docClasses.push('fui-lt-ie8');
	if (ie < 9)
		docClasses.push('fui-lt-ie9');
	if (ie < 10)
		docClasses.push('fui-lt-ie10');

	document.documentElement.className = docClasses.join(' ');

	// Fix focus on elements in IE 8
	if (ie < 9) {
		var focusedEl = null;
		var handleFocus = function(evt) {
			var target = evt.srcElement;

			if (target.tagName === 'INPUT' && target !== focusedEl) {
				if (focusedEl) {
					// Blur the previously focused element
					setTimeout(function() {
						focusedEl.blur();
					}, 0);
				}
				// Focus on the new element
				setTimeout(function() {
					target.focus();
				}, 0);
				focusedEl = target;
			}
		};
		document.attachEvent('onfocusin', handleFocus);
	}
}());
