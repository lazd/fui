var fui = fui || {};

(function() {
	// Store a reference to jQuery
	fui.$ = jQuery;

	var docClasses = document.documentElement.className;
	docClasses = docClasses ? docClasses.split(' ') : [];

	// Detect Firefox
	var ffMatch = navigator.userAgent.match(/Firefox\/([\da-z.]+)/);
	fui.ff = (ffMatch && ffMatch[1] - 0) || null;

	if (ffMatch) {
		// Add FF CSS class
		docClasses.push('fui-ff');
	}

	// Detect IE
	var ieMatch = navigator.appVersion.match(/MSIE (\d+\.\d+)/);
	var ie11Match = navigator.userAgent.match(/Trident\/\d+\.\d+;.*? rv[:\s](\d+\.\d)+/);
	fui.ie = (ieMatch && ieMatch[1] - 0) || (ie11Match && ie11Match[1] - 0) || null;

	if (fui.ie) {
		// Add IE CSS classes
		docClasses.push('fui-ie');
		docClasses.push('fui-ie'+fui.ie);

		if (fui.ie < 9)
			docClasses.push('fui-lt-ie9');
		if (fui.ie < 10)
			docClasses.push('fui-lt-ie10');
		if (fui.ie < 11)
			docClasses.push('fui-lt-ie11');
		if (fui.ie < 12)
			docClasses.push('fui-lt-ie12');

		// Fix focus on elements in IE 8
		// Observed: IE 8
		if (fui.ie < 9) {
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
	}

	// Set new class name
	document.documentElement.className = docClasses.join(' ');
}());
