jQuery(function($) {

  $('#sidenav-button').sideNav();

  $('#navbar-options').dropdown({
    constrainwidth: false,
    belowOrigin: true
  });

  $('.collapsible').collapsible({
    accordion : true
  });

  // Set up ace editor
  var editor = ace.edit('baseline');
  editor.getSession().setMode("ace/mode/markdown");

});
