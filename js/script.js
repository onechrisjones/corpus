jQuery(function($) {

  $('#sidenav-button').sideNav();

  $('#navbar-options').dropdown({
    belowOrigin: true
  });

  // Set up ace editor
  var editor = ace.edit('baseline');


});
