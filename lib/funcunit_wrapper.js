define(['lodash'], function(_){

	var calculateDistance, subtract, $cursor, $pulsar, moveCursorAndPulsar;

	subtract = function(a, b){
		return a - b;
	}

	calculateDistance = function(offset, cursorPosition){
		var y = subtract.apply(null, [offset.top, cursorPosition.top].sort(subtract).reverse()),
			x = subtract.apply(null, [offset.left, cursorPosition.left].sort(subtract).reverse()),
			distance = Math.sqrt(Math.pow(y, 2) + Math.pow(x, 2)) * 0.7;

		// return calculated distance or 200ms as minimum
		return [parseInt(distance, 10), 200].sort(subtract)[1];
	}

	moveCursorAndPulsar = function(offset, length){
		$cursor.animate({
			top : offset.top + 5,
			left : offset.left + 5
		}, length, function(){
			$pulsar.css({
				top : offset.top - 18,
				left: offset.left - 15
			}).addClass('visible')

			setTimeout(function(){
				$pulsar.removeClass('visible')
			}, 500);2

		});
	}

	return function(F){

		F.timeout = 4000;
		F.speed = 75;

		$cursor = $('.cursor');
		$pulsar = $('.pulsate');

		var actions = ['click', 'dblclick', 'drag', 'move', 'rightClick', 'type'];

		_.each(actions, function(action){
			var actionFn = F.prototype[action];

			F.prototype[action] = function(){
				var offset = this.offset(),
				cursorPosition = $cursor.position(),
				length = calculateDistance(offset, cursorPosition);

				moveCursorAndPulsar(offset, length);
				F.wait(length + 200, function(){});

				return actionFn.apply(this, arguments);
			}
		});

	}
})