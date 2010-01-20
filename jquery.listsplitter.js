/* ---------------------------------------- *
 * ListSplitter 1.0
 * ---------------------------------------- *
 * AUTHOR:   Aaron Kuzemchak
 * URL:      http://aaronkuzemchak.com/
 * CREATED:  01/19/2010
 * MODIFIED: 01/19/2010
** ---------------------------------------- */
 
(function() {
	// plugin definition
	$.fn.listSplitter = function(theOptions) {
		// plugin options
		var opts = $.extend({}, $.fn.listSplitter.defaults, theOptions);
 
		// loop through matched objects
		return this.each(function() {
			// get original list
			var $original = $(this);
			var listType = $original.get(0).nodeName.toLowerCase();
			
			// create object to store all columns
			var theColumns = [];
			theColumns.push($original);
			
			// only execute if more than minimum number of items
			if($original.find('li').length >= opts.minimum) {
				// figure out number of items per column
				// round up because this is index-based
				var colSize = Math.ceil($original.find('li').length / opts.cols);
				
				// add column class to original list
				if(opts.colClass) {
					$original.addClass(opts.colClass);
				}
				
				// start splitting the columns
				var start;
				for(start = 1; start < opts.cols; start++) {
					// if last column, slice all the way to the end
					if(start + 1 == opts.cols) {
						var $items = $original.find('li').slice(colSize);
					}
					// if not last column, only take max number of items for the column
					else {
						var $items = $original.find('li').slice(colSize, colSize * 2);
					}
					
					// create the new column
					var $col = $('<' + listType + ' />');
					
					// add starting number for ordered lists
					if(listType == 'ol') {
						$col.attr('start', (start * colSize) + 1);
					}
					
					// add the column class
					if(opts.colClass) {
						$col.addClass(opts.colClass);
					}
					
					// remove items from original list, move to new column
					var $newItems = $items.remove();
					$col.append($newItems).insertAfter(theColumns[theColumns.length - 1]);
					
					// add new column to list
					theColumns.push($col);
				}
			}
		});
	};
	
	// default options
	$.fn.listSplitter.defaults = {
		cols: 2,
		minimum: 10,
		colClass: null
	};
})(jQuery);