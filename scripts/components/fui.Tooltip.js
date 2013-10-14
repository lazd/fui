(function() {
	var tooltipEls;
	function findTooltips() {
		// All tooltips that use target
		tooltipEls = document.querySelectorAll('.fui-tooltip-target > .fui-tooltip, .fui-tooltip-target > .fui-tooltip-top, .fui-tooltip-target > .fui-tooltip-bottom, .fui-tooltip-target > .fui-tooltip-left, .fui-tooltip-target > .fui-tooltip-right');
	}

	fui.Tooltip = function(options) {
		var el = options.el;
		fui.extend(el, fui.Tooltip.prototype, fui.mixins, { fui: {} });

		return el;
	};

	fui.Tooltip.prototype = {
		classNamePrefix: 'fui-tooltip'
	};

	fui.Tooltip.positionTooltips = function() {
		if (!tooltipEls) return;
		for (var i = 0, n = tooltipEls.length; i < n; i++) {
			var el = tooltipEls[i]
			if (!el.fui)
				el = new fui.Tooltip({ el: el });
			el.handleCollisions();
		}
	};

	fui.Tooltip.prototype.handleCollisions = function() {
		var $el = fui.$(this);

		var types = this.getTypes('tooltip');

		// Don't bother with non-tooltips, elements not in the DOM, or invisible elements
		if (!types || !this.parentNode || !$el.is(':visible')) return;

		var winWidth = fui.$(window).width();
		var winHeight = fui.$(window).height();

		var ttPos = this.getBoundingClientRect();

		// Use previous position
		if (this.fui.tooltipDirection) {
			$el.removeClass('fui-tooltip-top fui-tooltip-bottom fui-tooltip-left fui-tooltip-right');
			$el.addClass('fui-tooltip-'+this.fui.tooltipDirection);
			types.top = false;
			types.bottom = false;
			types.left = false;
			types.right = false;
			types[this.fui.tooltipDirection] = true;
		}
		else {
			if (types.top)
				this.fui.tooltipDirection = 'top';
			if (types.bottom)
				this.fui.tooltipDirection = 'bottom';
			if (types.left)
				this.fui.tooltipDirection = 'left';
			if (types.right)
				this.fui.tooltipDirection = 'right';
		}

		$el.css({
			width: '',
			whiteSpace: 'nowrap'
		});
		ttPos = this.getBoundingClientRect();
		var parentPos = this.parentNode.getBoundingClientRect();

		// First check right and left
		if (types.left && ttPos.right > winWidth && ttPos.width < parentPos.left - 10) {
			$el.removeClass('fui-tooltip-left');
			$el.addClass('fui-tooltip-right');
		}
		else if (types.right && ttPos.left < 0 && ttPos.width < winWidth - parentPos.left - 10) {
			$el.removeClass('fui-tooltip-right');
			$el.addClass('fui-tooltip-left');
		}

		ttPos = this.getBoundingClientRect();

		if (ttPos.right > winWidth || ttPos.left < 0) {
			$el.removeClass('fui-tooltip-top fui-tooltip-left fui-tooltip-right fui-tooltip-start fui-tooltip-end');
			$el.addClass('fui-tooltip-bottom');

			var totalWidth = $el.outerWidth();
			var maxWidth;
			if (parentPos.left < winWidth / 2) {
				$el.addClass('fui-tooltip-start');
				maxWidth = winWidth - parentPos.left - 10;
			}
			else {
				$el.addClass('fui-tooltip-end');
				maxWidth = parentPos.left - 10;
			}

			if (totalWidth < maxWidth)
				$el.css({ width: totalWidth });
			else
				$el.css({ width: maxWidth });

			$el.css({ whiteSpace: 'normal' });
		}
		else
			$el.css({ width: 'normal' });


		// Recalculate position
		ttPos = this.getBoundingClientRect();

		// Now top and bottom
		if (ttPos.top < 0) {
			$el.removeClass('fui-tooltip-bottom');
			$el.addClass('fui-tooltip-top');
		}
		// Now top and bottom
		if (ttPos.bottom > winHeight.height) {
			$el.removeClass('fui-tooltip-top');
			$el.addClass('fui-tooltip-bottom');
		}

		this.parentNode.visbility = '';
	};

	fui.$(window).on('resize', fui.Tooltip.positionTooltips);
	fui.$(window).on('load', function() {
		findTooltips();
		fui.Tooltip.positionTooltips();
	});
}());

