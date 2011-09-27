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

			tooltip_id: 'tour_tooltip',

			tooltip_class: 'tooltip',
      
      // this function will be called to add
      // additional markup to the tooltip
      tooltip_builder: function(){
      
      },
			// this function will get called before each scene change
			// returning false will prevent the point change
			beforeSceneChange: function(currentScene, nextScene) {
				return true;
			},
			// this function will get called every time
			// navigation between points requires a new scene
			onSceneChange: function(previousScene, currentScene) {
				return true;
			},
			// this function will get called before each point change
			// returning false will prevent the point change
			beforePointChange: function(currentPoint, nextPoint) {
				return true;
			},
			// this function will get called every time
			// the point changes within a scene
			onPointChange: function(previousPoint, currentPoint) {
				return true;
			}

		};

		options = $.extend(defaultOptions, options)

		var script = [],
		controller = $(options.controls, context),
		sceneContainer = $(options.sceneContainer);

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

		function showPoint(point) {
			removePoint();

      // makes class_tag optional.
      typeof point.class_tag == "undefined" ?  point.class_tag = "" : point.class_tag = point.class_tag
      // makes css optional (overrides class_tag css)
      typeof point.css == "undefined" ?  point.css = {"display":"none"} : point.css.display = "none"
      // collects offset modifications of tooltip from parent point
      typeof point.offset == "undefined" ? point.offset = ["0","0"] : point.offset = point.offset


	    var $elem = $('#' + point.name),
          point_el = $('#' + point.name ),
          tooltip_class = point.klass,
          tooltip_css = point.css,
          tooltip_offset_x = parseFloat(point.offset[0]),
          tooltip_offset_y = parseFloat(point.offset[1]),
          html_text = point.html_text || false,
          point_text = point.text || point_el.data('text'),
          out_html = '<p>' + point_text + '</p><span class="tooltip_arrow"></span>';

      if (html_text != false)
        out_html = html_text + '<span class="tooltip_arrow"></span>'

			var $tooltip = $('<div>', {
				id: options.tooltip_id,
				class: options.tooltip_class+" "+point.class_tag,
				html: out_html
			}).css(tooltip_css);

			//position the tooltip correctly:
			//the css properties the tooltip should have
			var properties = {};

			var tip_position = point.position;

			//append the tooltip but hide it
			$('BODY').prepend($tooltip);


			//get some info of the element
			var e_w = $elem.outerWidth(),
			    e_h = $elem.outerHeight(),
		      e_l = parseFloat($elem.offset().left) + tooltip_offset_x,
			    e_t = parseFloat($elem.offset().top) + tooltip_offset_y;


			switch (tip_position) {
			case 'TL':
				properties = {
					'left': e_l + 'px',
					'top': e_t + e_h + 'px'
				};
				$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_TL');
				break;
			case 'TR':
				properties = {
					'left': e_l + e_w - $tooltip.width() + 'px',
					'top': e_t + e_h + 'px'
				};
				$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_TR');
				break;
			case 'BL':
				properties = {
					'left': e_l + 'px',
					'top': e_t - $tooltip.height() + 'px'
				};
				$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_BL');
				break;
			case 'BR':
				properties = {
					'left': e_l + e_w - $tooltip.width() + 'px',
					'top': e_t - $tooltip.height() + 'px'
				};
				$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_BR');
				break;
			case 'LT':
				properties = {
					'left': e_l + e_w + 'px',
					'top': e_t + 'px'
				};
				$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_LT');
				break;
			case 'LB':
				properties = {
					'left': e_l + e_w + 'px',
					'top': e_t + e_h - $tooltip.height() + 'px'
				};
				$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_LB');
				break;
			case 'RT':
				properties = {
					'left': e_l - $tooltip.width() + 'px',
					'top': e_t + 'px'
				};
				$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_RT');
				break;
			case 'RB':
				properties = {
					'left': e_l - $tooltip.width() + 'px',
					'top': e_t + e_h - $tooltip.height() + 'px'
				};
				$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_RB');
				break;
			case 'T':
				properties = {
					'left': e_l + e_w / 2 - $tooltip.width() / 2 + 'px',
					'top': e_t + e_h + 'px'
				};
				$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_T');
				break;
			case 'R':
				properties = {
					'left': e_l - $tooltip.width() + 'px',
					'top': e_t + e_h / 2 - $tooltip.height() / 2 + 'px'
				};
				$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_R');
				break;
			case 'B':
				properties = {
					'left': e_l + e_w / 2 - $tooltip.width() / 2 + 'px',
					'top': e_t - $tooltip.height() + 'px'
				};
				$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_B');
				break;
			case 'L':
				properties = {
					'left': e_l + e_w + 'px',
					'top': e_t + e_h / 2 - $tooltip.height() / 2 + 'px'
				};
				$tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_L');
				break;
			}

			var w_t = $(window).scrollTop();
			var w_b = $(window).scrollTop() + $(window).height();
			//get the boundaries of the element + tooltip
			var b_t = parseFloat(properties.top, 10);

			if (e_t < b_t) b_t = e_t;

			var b_b = parseFloat(properties.top, 10) + $tooltip.height();
			if ((e_t + e_h) > b_b) b_b = e_t + e_h;


			$tooltip.css(properties).show();
		}

		var removePoint = function() {
			var tooltip = $('#' + options.tooltip_id);

      tooltip.remove();
		}

		var getCurrentPoint = function() {
			return script[current.scriptIndex];
		};

		var changeScene = function(currentPoint, newPoint) {
			var currentScene = scenes[currentPoint.sceneIndex],
			newScene = scenes[newPoint.sceneIndex];

			if (!options.beforeSceneChange(currentScene, newScene)) {
				return false;
			}

			sceneContainer.scrollTo($('#' + newScene.container), options.sceneSwitchDelay, options.sceneSwitchOptions);

			current.scene = newScene;
			current.sceneIndex = newScene.sceneIndex;

			options.onSceneChange.apply(context, [currentScene, newScene]);

		}

		var changePoint = function(by) {
			return function() {
				var currentIndex = current.scriptIndex,
        maxIndex = script.length,
				currentPoint = getCurrentPoint(),
				newPoint;

        // currentIndex can't be more than the total length of
        // script, hence the maxIndex is placed to retain this.
        // Also, it can't be less than 0 otherwise it will be undefined.
        // ----------------------------
        // If options.loop is set to false
        if (by == -1 && currentIndex == 0)
          currentIndex = options.loop ? maxIndex : 1;
        else if (by == 1 && currentIndex == (maxIndex - 1))
          currentIndex = options.loop ? -1 : maxIndex - 2;
        newPoint = script[currentIndex + by]

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
					current.scriptIndex = currentIndex + by;
					options.onPointChange.apply(context, [currentPoint, newPoint]);
				}
        
        //console.log("Changing Scene? ", sceneChanges)
        if (sceneChanges == true)
          setTimeout(function(){ showPoint( newPoint ); }, 500);
        else
          showPoint( newPoint );

				return newPoint;

			}
		};

		var nextPoint = changePoint(1),
		previousPoint = changePoint(-1),
    init = changePoint(0);

		$(options.nextSelector, controller).click(nextPoint)
		$(options.previousSelector, controller).click(previousPoint)

    // start with the first point of interest
    init();
	};

})(jQuery);

