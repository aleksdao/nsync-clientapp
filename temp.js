myModule.animation('fade', function() {
  return {
    setup : function(element) {
      element.css({'opacity': 0});
    },
    start : function(element, done, memo) {
      element.animate({'opacity': 1}, function() {
        done();
      });
    }
  };
});
