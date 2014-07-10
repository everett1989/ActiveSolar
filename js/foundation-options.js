$(document).foundation({

	"magellan-expedition": { 
		active_class: 'active',
      threshold: -47, // pixels from the top of the expedition for it to become fixes
      destination_threshold: 70, // pixels from the top of destination for it to be considered active
      //destination_threshold: 10, // pixels from the top of destination for it to be considered active
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
    live_validate : false,

    patterns:{
      phone: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/,
      name: /^[A-Za-z .'-]+$/,
      zip: /\d{5}/,
      time: /./,
      //time: /([01]?[0-9]|2[0-3]):[0-5][0-9]/
     // time : /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
      //'phone': '^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$'


      // time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/
      // time: '[a-zA-Z0-9]'
      //time: /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/

    }

  },
   slider: {
      start: 1,
      end: 1000,
      step: 1,
      initial: 200,
      display_selector: '.bill-result'

    }
  

});




$(document).on('opened', '#quote', function () {
  $(this).foundation('slider', 'reflow');

});

//$(document).foundation( 'reflow');


$(document).ready(function(){

  $('form[name="contactform"]').on('valid', function() {
    var form = $(this);
    var form_info =  form.serialize();
    var print_response = $('#message');

    $.post("source/asp/send_form_email.asp",form_info)
    .done(function(response){

      print_response.text(response);      
      form[0].reset();

    }).fail(function(){
        print_response .text(" Sorry but there was an error! Please contact us at 800-865-3625 or sales@activesolarusa.com.  We are happy to assist you!");
    }).always(function(){
      $('#contact-success').foundation('reveal', 'open');

    });

  });
});
