define(['can/component', 'stache!lib/scenario_player/scenario_player', 'cucumber', 'lodash'], function(Component, initView, Cucumber, _){

	var Scenario = can.Map.extend({
		gherkin : function(){
			var parts = ["Feature: " + this.attr('feature'), "\n\n", "Scenario: " + this.attr('name'), "\n\n"];
			
			_.each(this.attr('steps'), function(step){
					parts.push("   " + step.attr('keyword') + step.attr('name') + "\n");
			});

			return parts.join('');
		}
	})

	var getScenarios = function(feature){
		var scenarios = [],
			c = Cucumber(feature, function(){});

		c.getFeatures().getFeatures().syncForEach(function(feature){
			var currentScenario;
			feature.getFeatureElements().syncForEach(function(scenario){
				currentScenario = {
					feature : feature.getName(),
					name : scenario.getName(),
					steps : []
				}
				scenario.getSteps().syncForEach(function(step){
					currentScenario.steps.push({
						name : step.getName(),
						keyword : step.getKeyword()
					})
				})
				scenarios.push(new Scenario(currentScenario));
			})
			
		})
		return scenarios;
	}

	Component.extend({
		tag : 'rt-scenario-player',
		template : initView,
		scope : {
			currentScenario : null,
			playedSteps : [],
			init : function(){
				var features = this.attr('features'),
					scenarios = _.flatten(_.map(features, function(feature){
						return getScenarios(feature);
					}))

				this.attr('scenarios', scenarios);
			},
			testMode : function(){
				return this.attr('mode') === 'test'
			},
			demoMode : function(){
				return this.attr('mode') === 'demo';
			},
			playScenario : function(ctx){
				can.batch.start();
				this.attr('playedSteps').splice(0);
				this.attr('currentScenario', ctx);
				can.batch.stop();
			}
		},
		helpers : {
			isActiveScenario : function(scenario, opts){
				scenario = can.isFunction(scenario) ? scenario() : scenario;
				return scenario === this.attr('currentScenario') ? opts.fn() : "";
			},
			loadScenario : function(opts){
				var scenario = opts.context,
					self = this;
				return function(el){
					$(el).on('load', function(){
						el.contentWindow.runFeature(scenario.gherkin());
						el.contentWindow.__currentStep = function(step){
							self.attr('playedSteps').push(step);
						}
					})
				}
			},
			statusClass : function(step, opts){
				var played, index;

				step = can.isFunction(step) ? step() : step;
				played = this.attr('playedSteps');
				index = played.indexOf(step);
				
				if(index === -1){
					return ""
				}
				if(index === played.length - 1){
					return "progress-bar progress-bar-striped active"
				}
				return "played";
			}
		},
		events : {
			"{scope} mode" : function(){
				this.scope.playScenario(null);
			}
		}
	})
})