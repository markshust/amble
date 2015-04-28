
Meteor.startup(function() {
  document.addEventListener("deviceready", function() {
    AmbleWatch.init();
  });
});

AmbleWatch = {
  ready: false,

  init: function() {
    applewatch.init(function successHandler(appGroupId) {
      AmbleWatch.ready = true;
      console.log("watch bridge initialized with appGroupId:", appGroupId);
    }, function errorHandler(e) {
      console.log("watch init failed: ", e);
    });
  },

  updateLocation: function(latLng) {
    if (!AmbleWatch.ready) {
      return;
    }
    var locData = latLng.lat + ',' + latLng.lng;
    applewatch.sendMessage(locData, 'location', 
      function() { 
        console.log("updated watch location to ", locData);
      }, function(e) {
        console.log("error updating watch location");
        console.log(e);
      });
  }
}