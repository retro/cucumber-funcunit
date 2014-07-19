define(['can/util/string', 'can/component', 'mustache!./multiselect'], function(can, Component, initView){

	return can.Component({
		tag : 'rt-multiselect',
		template : initView,
		scope : {
			selected : [],
			notSelected : function(){
				var items = this.attr('items'),
					selectedItems = this.attr('selected');

				// trigger live binding
				items.attr('length');
				selectedItems.attr('length');

				return can.grep(items, function(item){
					return selectedItems.indexOf(item) === -1;
				})
			},
			selectItem : function(item){
				this.attr('selected').push(item);
			},
			deselectItem : function(item){
				var selected = this.attr('selected'),
					index = selected.indexOf(selected);

				selected.splice(index, 1);
			},
			selectAll : function(){
				this.attr('selected').replace(this.attr('items'));
			},
			deselectAll : function(){
				this.attr('selected').splice(0);
			}
		}
	})

});