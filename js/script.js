jQuery(function($) {
  var $bodyEl = $('body'),
      $sidedrawerEl = $('#sidedrawer'),
      $baselinePane = $('#baseline-pane'),
      $tabs = $('#tabs');

  // Initializing the ace editor

  var baseline = ace.edit('baseline-pane');

  // ==========================================================================
  // Toggle Sidedrawer
  // ==========================================================================
  function showSidedrawer() {
    // show overlay
    var options = {
      onclose: function() {
        $sidedrawerEl
          .removeClass('active')
          .appendTo(document.body);
      }
    };

    var $overlayEl = $(mui.overlay('on', options));

    // show element
    $sidedrawerEl.appendTo($overlayEl);
    setTimeout(function() {
      $sidedrawerEl.addClass('active');
    }, 20);
  }


  function hideSidedrawer() {
    $bodyEl.toggleClass('hide-sidedrawer');
    // Match speed of drawer close
    setTimeout(function(){
      // fix the ace editor width
      $baselinePane.toggleClass('full-width');
    }, 20);

  }


  $('.js-show-sidedrawer').on('click', showSidedrawer);
  $('.js-hide-sidedrawer').on('click', hideSidedrawer);


  // ==========================================================================
  // Animate menu
  // ==========================================================================
  var $titleEls = $('strong', $sidedrawerEl);

  $titleEls
    .next()
    .hide();

  $titleEls.on('click', function() {
    $(this).next().slideToggle(200);
  });

  // resize ace editor

  // window.resize(function(){
  //   var offsetLeft = $('#content-section').offset().left;
  //   $baselinePane.css('left', offsetLeft);
  // });

});
