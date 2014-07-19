define(['components/multiselect/multiselect'], function(){
	return function(){
		var self = this;

		var items = [{
			id : 1,
			name : "BMW"
		},{
			id : 2,
			name : "Mercedes"
		},{
			id : 3,
			name : "Toyota"
		},{
			id : 4,
			name : "Honda"
		},{
			id : 5,
			name : "Renault"
		},{
			id : 6,
			name : "Peugeot"
		},{
			id : 7,
			name : "Hyundai"
		},{
			id : 8,
			name : "Lexus"
		},{
			id : 9,
			name : "Porsche"
		},{
			id : 10,
			name : "Yugo"
		}];

		var selectedItem;

		this.Feature('Deselecting items', {
			setup : function(){
				var template = can.view.mustache('<rt-multiselect items="items"></rt-multiselect>');

				$('#qunit-test-area').html(template({
					items : new can.List(items)
				}));

				F('.items-wrap input[type=checkbox]:first').click();
			}
		})

		this.Feature('Selecting items', {
			setup : function(){
				var template = can.view.mustache('<rt-multiselect items="items"></rt-multiselect>');

				$('#qunit-test-area').html(template({
					items : new can.List(items)
				}));
			}
		})

		this.Given('A multiselect widget with selected items', function(next){
			F('.selected-items-wrap li').size(1, function(){
				ok(true, self.getCurrentStepName());
				next();
			});
		})

		this.Given('A multiselect widget without selected items', function(next){
			F('.selected-items-wrap li').size(0, function(){
				ok(true, self.getCurrentStepName());
				next();
			});
		})

		this.When('User clicks on the deselect all items button', function(next){
			F('[can-click=deselectAll]').click(function(){
				ok(true, self.getCurrentStepName());
				next();
			});
		})

		this.When('User clicks on the selected item checkbox', function(next){
			selectedItem = can.trim($('.selected-items-wrap li:first').text());
			F('.selected-items-wrap input[type=checkbox]:first').click(function(){
				ok(true, self.getCurrentStepName());
				next();
			})
		})

		this.When('User clicks on the select all items button', function(next){
			F('[can-click=selectAll]').click(function(){
				ok(true, self.getCurrentStepName());
				next();
			});
		})

		this.When('User clicks on the item chekbox', function(next){
			selectedItem = can.trim($('.items-wrap input[type=checkbox]:first').text());
			F('.items-wrap input[type=checkbox]:first').click(function(){
				ok(true, self.getCurrentStepName());
				next();
			})
		})

		this.Then('All items are removed from the selected items list', function(next){
			F('.selected-items-wrap li').size(0, function(){
				ok(true, self.getCurrentStepName());
				next();
			});
		})

		this.Then('All items are returned to the not selected items list', function(next){
			F('.items-wrap li').size(items.length, function(){
				ok(true, self.getCurrentStepName());
				next();
			});
		})

		this.Then('The item is removed from the selected items list', function(next){
			F('.selected-items-wrap li:contains("' + selectedItem + '")').size(0, function(){
				ok(true, self.getCurrentStepName());
				next();
			})
		})

		this.Then('The item is returned to the not selected items list', function(next){
			F('.items-wrap li:contains("' + selectedItem + '")').size(1, function(){
				ok(true, self.getCurrentStepName());
				next();
			});
		})

		this.Then('All items are added to the selected items list', function(next){
			F('.selected-items-wrap li').size(items.length, function(){
				ok(true, self.getCurrentStepName());
				next();
			});
		})

		this.Then('All items are removed from the not selected items list', function(next){
			F('.items-wrap li').size(0, function(){
				ok(true, self.getCurrentStepName());
				next();
			});
		})

		this.Then('The item is added to the selected items list', function(next){
			F('.selected-items-wrap li:contains("' + selectedItem + '")').size(1, function(){
				ok(true, self.getCurrentStepName());
				next();
			})
		})

		this.Then('The item is removed from the not selected items list', function(next){
			F('.items-wrap li').size(9, function(){
				ok(true, self.getCurrentStepName());
				next();
			})
		})
	}
});