
module.exports = {

  viewMap: function(req, res) {

    // Map.find({}).exec(function(err, points) {
    //   console.log(points);
    //   res.send("VIEW MAP PAGE");
    // });

    //try executing spot api search

    res.render("map", {

    });

  }

  , getPoints: function(req, res) {
    //TODO
    var markers = [
      { "lat": 35.98640 , "lng": -78.91434, "date": "05/11/2014 16:53:35" }
      , { "lat": 35.96680 , "lng": -78.95938, "date": "05/11/2014 16:23:21" }
    ];
    res.json(markers);
  }

  , testApi: function(req, res) {
    res.send("TESTING API");
  }

  , checkNewPoints: function() {
    console.log("checking for new points...");
    return;
  }

}