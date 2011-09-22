(function($) {
	/*
  * the purpose of this plugin is to provide functionality where there are
  * several points of interest within a given 'scene'.  next and previous
  * navigation move a tooltip lay over from point to point.  
  *
  * when the next point comes up, and it is part of a different 'scene' or
  * area on the page, we will use the jquery-scrollTo plugin to advance
  * to a given scene
  *
  * call scrolling tour by passing an array of scenes, and options
  *
  * a scene contains the following parameters:
  *
  * containerId - a css id representing the containing element
  * for a given scene.  This will be scrollTo when the next / previous
  * point is navigated to.
  *
  */
	$.fn.scrollingTour = function(scenes, options) {
		var context = $(this);

		options = options || {};
		/* these are the default options that will get passed
    * to the presentation */
		var defaultOptions = {
			// autoplay will move through the scenes and points automatically
			autoPlay: false,
			// how fast should we stay on each point
			autoPlayDelay: 1000,
			// should we loop over the presentation
			loop: false,
			// css selector representing the element(s) 
			// that will contain a next / previous navigation element
			controls: '#scrolling-tour-controller',

      sceneContainer: '#scenes-container',
      
      // a delay in milliseconds
      sceneSwitchDelay: 500,
      
      // these options get passed directly to jquery.scrollTo
      sceneSwitchOptions: {},

			// which elements within the controls handle next movement 
			nextSelector: '.next',
			// which elements within the controls handle previous movement
			previousSelector: '.previous',
			// a css class representing the scene container
			sceneClass: 'scene',
			// a css class representing a point of interest within a scene
			pointClass: 'point',

			// this function will get called before each scene change
			// returning false will prevent the point change
			beforeSceneChange: function(currentScene, nextScene) {
				console.log("Before Scene Change", arguments);
				return true;
			},
			// this function will get called every time
			// navigation between points requires a new scene
			onSceneChange: function(previousScene, currentScene) {
				console.log("After Scene Change", arguments);
				return true;
			},
			// this function will get called before each point change
			// returning false will prevent the point change
			beforePointChange: function(currentPoint, nextPoint) {
				console.log("Before Point Change", arguments);
				return true;
			},
			// this function will get called every time
			// the point changes within a scene
			onPointChange: function(previousPoint, currentPoint) {
				console.log("On Point Change", arguments);
				return true;
			}

		};

		options = $.extend(defaultOptions, options)

		var script = [], 
        controller = $( options.controls, context ),
        sceneContainer = $( options.sceneContainer );

		var prepareScript = function() {
			var point, scene, scenes_length = scenes.length,
			points_length;

			for (var i = 0; i < scenes_length; i++) {
				scene = scenes[i];
				scene.sceneIndex = i;
				points_length = scene.points.length;

				for (var j = 0; j < points_length; j++) {
					point = scene.points[j];
					point.sceneContainer = scene.container;
					point.sceneIndex = i;
					point.pointIndex = j;
					script.push(point);
				}
			}
		};

		prepareScript();

		var initialScene = scenes[0],
		initialPoint = initialScene.points[0];

		var current = {
			scriptIndex: 0,
			// the css id of the current scene
			scene: initialScene,
			sceneIndex: 0,
			// the css id of the current point in the tour
			// within a given scene
			point: initialPoint,
			// the current point within the context of the scene
			pointIndex: 0
		};

		var getCurrentPoint = function() {
			return script[current.scriptIndex];
		};

		var changeScene = function(currentPoint, newPoint) {
			var currentScene = scenes[ currentPoint.sceneIndex ],
          newScene = scenes[ newPoint.sceneIndex ];

			if (!options.beforeSceneChange(currentScene, newScene)) {
				return false;
			}

      sceneContainer.scrollTo( $('#'+newScene.container), options.sceneSwitchDelay, options.sceneSwitchOptions );

			current.scene = newScene;
			current.sceneIndex = newScene.sceneIndex;

      options.onSceneChange.apply( context, [currentScene, newScene] );

		}

		var changePoint = function(by) {
			return function() {
				var currentIndex = current.scriptIndex,
				currentPoint = getCurrentPoint(),
				newPoint = script[currentIndex + by];
       
        if( typeof(newPoint)==="undefined" ){
          if( currentIndex === 0 ){
            newPoint = script[0]; 
          } else {
            if( options.loop ){
              newPoint = script[0];
            } else {
              return false; 
            }
          }
        }

				var sceneChanges = newPoint.sceneContainer !== currentPoint.sceneContainer;

				// cancel execution if there is a scene change and the
				// before scene change callback returns false
				if (sceneChanges && changeScene(currentPoint, newPoint) == false) {
					return false;
				}

				// cancel execution if the before point change callback returns false
				if (options.beforePointChange.apply(context, [currentPoint, newPoint]) == false) {
					return false;
				}

				if (typeof(newPoint) !== "undefined") {
					current.scriptIndex = current.scriptIndex + by;
					options.onPointChange.apply(context, [currentPoint, newPoint]);
				}

				return newPoint;

			}
		};

		var nextPoint = changePoint(1),
		    previousPoint = changePoint( - 1);

		$(options.nextSelector, controller).click(nextPoint)
		$(options.previousSelector, controller).click(previousPoint)

	};

})(jQuery);

