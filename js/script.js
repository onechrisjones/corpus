jQuery(function($) {

  $('#sidenav-button').sideNav();

  $('#navbar-options').dropdown({
    constrainwidth: false,
    belowOrigin: true
  });

  $('.collapsible').collapsible({
    accordion : true
  });

  $('.modal-trigger').leanModal({
    dismissible: true,
    opacity: .5
  });

});
