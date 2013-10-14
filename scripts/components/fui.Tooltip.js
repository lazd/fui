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
		if (!types.tooltip || !this.parentNode || !$el.is(':visible')) return;

		this.parentNode.visbility = 'hidden';

		var winWidth = fui.$(window).width();
		var winHeight = fui.$(window).height();

		var tooltipRect = this.getBoundingClientRect();

		$el.css({
			width: '',
			whiteSpace: 'nowrap'
		});
		tooltipRect = this.getBoundingClientRect();
		var parentRect = this.parentNode.getBoundingClientRect();

		// First check right and left
		if (tooltipRect.right > winWidth || tooltipRect.left < 0) {
			$el.removeClass('fui-tooltip-top fui-tooltip-left fui-tooltip-right fui-tooltip-start fui-tooltip-end');
			$el.addClass('fui-tooltip-bottom');

			var totalWidth = $el.outerWidth();
			var maxWidth;
			if (parentRect.left < winWidth / 2) {
				$el.addClass('fui-tooltip-start');
				maxWidth = winWidth - parentRect.left - 10;
			}
			else {
				$el.addClass('fui-tooltip-end');
				maxWidth = parentRect.left - 10;
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
		tooltipRect = this.getBoundingClientRect();

		// Now top and bottom
		if (tooltipRect.top < 0) {
			$el.removeClass('fui-tooltip-bottom');
			$el.addClass('fui-tooltip-top');
		}
		// Now top and bottom
		if (tooltipRect.bottom > winHeight.height) {
			$el.removeClass('fui-tooltip-top');
			$el.addClass('fui-tooltip-bottom');
		}

		this.parentNode.visbility = '';
	};

	fui.$(window).on('resize', fui.Tooltip.positionTooltips);
	fui.$(function() {
		findTooltips();
		fui.Tooltip.positionTooltips();
	});
}());

