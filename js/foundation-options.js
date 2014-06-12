$(document).foundation({

	"magellan-expedition": {
		active_class: 'active',
      threshold: -47, // pixels from the top of the expedition for it to become fixes
      destination_threshold: 70, // pixels from the top of destination for it to be considered active
      throttle_delay: 30, // calculation throttling to increase framerate
      fixed_top: 35 // top distance in pixels assigend to the fixed element on scroll
    },

    'topbar':{

     scrolltop : false
   },

   'orbit':{ 
    slide_number: false,
    timer_speed: 4000,
    pause_on_hover:false
  },

  'abide':{

    patterns:{
      // time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/
      time: '[a-zA-Z0-9]'
      //time: /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/

    }

  }

});


$(document).ready(function(){

  $('form[name="contactform"]').on('valid', function() {
    form_info =  $('form[name="contactform"]').serialize();

    $.post("source/send_form_email.asp",form_info, function(data) {

    }).done(function(){
      // alert("success");

      $('#contact-success').foundation('reveal', 'open');


    }).fail(function(){
      $('#contact-failure').foundation('reveal', 'open');
    });

  });
});