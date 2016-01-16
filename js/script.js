jQuery(function($) {

  $('#sidenav-button').sideNav();

  $('#navbar-options').dropdown({
    constrainwidth: false,
    belowOrigin: true
  });

  $('.collapsible').collapsible({
    accordion : true
  });

  $('.ace_search.right').addClass('z-depth-2');

});
