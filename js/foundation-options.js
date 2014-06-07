$(document).foundation({

	"magellan-expedition": {
		active_class: 'active',
      threshold: -47, // pixels from the top of the expedition for it to become fixes
      destination_threshold: 50, // pixels from the top of destination for it to be considered active
      throttle_delay: 30, // calculation throttling to increase framerate
      fixed_top: 35 // top distance in pixels assigend to the fixed element on scroll
  },

  'topbar':{

  	scrolltop : false
  }


});
