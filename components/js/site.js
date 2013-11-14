jQuery(document).ready(function ($) {


  if ($('.screenshot').length > 0) {
      var $galleryContainer = $('.screenshot');

      $galleryContainer.on('click', 'img', function(event) {
          event.preventDefault();
          
          var $currentTarget = $(event.currentTarget);
          
          $('.is-fullsize').removeClass('is-fullsize');
          
          $currentTarget.find('img').addClass('is-fullsize');

      })
      
  }


});