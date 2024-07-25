(function ($) {

  "use strict";

  // PRE LOADER
  $(window).on('load', function(){
    $('.preloader').fadeOut(1000); // set duration in brackets    
  });

  // NAVBAR
  $('.navbar-nav .nav-link').on('click', function(){
    $(".navbar-collapse").collapse('hide');
  });

  // CUSTOM LINK
  $('.custom-link').on('click', function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height() + 10;

    scrollToDiv(elWrapped, header_height);
    return false;

    function scrollToDiv(element, navheight){
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - navheight;

      $('body, html').animate({
        scrollTop: totalScroll
      }, 300);
    }
  });

})(window.jQuery);

document.getElementById('rsvp-form').addEventListener('submit', function(e) {
  e.preventDefault();

  var form = e.target;
  var formData = new FormData(form);
  var data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  console.log('Form Data:', data); // Debugging line to check form data

  fetch(form.action, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(responseData => {
    console.log('Response Data:', responseData); // Debugging line to check response data
    if (responseData.result === "success") {
      alert("RSVP submitted successfully!");
      form.reset();
    } else {
      alert("There was an error submitting your RSVP.");
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert("There was an error submitting your RSVP.");
  });
});
