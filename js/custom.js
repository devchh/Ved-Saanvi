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

document.addEventListener('DOMContentLoaded', function() {
  const form = document.forms['submit-to-google-sheet'];
  const scriptURL = 'https://api.sheetmonkey.io/form/qSXdcs9yohfJTq7SL6WxF2';

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var formData = new FormData(form);

    console.log('Form Data:', Array.from(formData.entries())); // Debugging line to check form data

    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
    .then(response => response.text()) // Read the response as text
    .then(responseText => {
      console.log('Response Text:', responseText); // Debugging line to check response text
      let responseData;
      try {
        responseData = JSON.parse(responseText); // Try to parse as JSON
      } catch (e) {
        console.error('Error parsing JSON:', e); // Catch JSON parsing errors
        alert("There was an error processing the server response.");
        return;
      }

      console.log('Response Data:', responseData); // Debugging line to check parsed response data
      if (responseData.success) { // Assuming Sheet Monkey returns a success field in response
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
});
