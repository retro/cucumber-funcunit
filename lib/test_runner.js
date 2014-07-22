define(['lodash'], function(_){
	return function(tests, features, config){

		tests = _.isArray(tests) ? tests : [tests];
		features = _.isArray(features) ? features : [features];

		config = config || {};

		var currentStep = (function(){
			var __current;
			return function(setter){
				if(typeof setter !== 'undefined'){
					__current = setter;
					if(window.__currentStep){
						window.__currentStep(setter)
					}
				}
				return __current;
			}
		})();

		var Feature = (function(){
			var __setupTeardown = {},
			fn = function(name, setupTeardown){
				__setupTeardown[name] = setupTeardown;
			};

			fn.get = function(name){
				return __setupTeardown[name];
			}

			return fn;
		})();

		var runners = _.map(features, function(feature){
			return Cucumber(feature, function(){
				var ctx = {};

				ctx.Given              = this.defineStep;
				ctx.When               = this.defineStep;
				ctx.Then               = this.defineStep;
				ctx.Feature            = Feature;
				ctx.getCurrentStepName = currentStep;

				_.each(tests, function(test){
					test.call(ctx);
				});


				this.BeforeStep(function(ev, next){
					currentStep(ev.getPayloadItem('step').getName());
					next();
				});

				this.StepResult(function(ev, next){
					var stepResult = ev.getPayloadItem('stepResult')
					if(stepResult.isUndefined()){
						throw('Missing test for the step: ' + currentStep());
					}
					if(stepResult.isFailed()){
						throw('Failed test for the step: ' + currentStep());
					}
					next();
				})

				this.BeforeFeature(function(ev, next){
					var f = ev.getPayloadItem('feature').getName(),
						setupTeardown = Feature.get(f);

					module(f, setupTeardown)

					next();
				});

				this.Around(function(scenario, runScenario){

					asyncTest(scenario.getName(), function(){
						expect(scenario.getSteps().length());
						runScenario(function(done){
							start();
							currentStep(null);
							setTimeout(function(){
								done();
							}, config.scenarioPause || 0)
						})
					})

				})
			})
		})

		var nextFeature = function(){
			var runner;
			if(runners.length){
				runner = runners.shift();
				runner.start(function(){
					nextFeature();
				});
			}
		}

		nextFeature();
	}
})