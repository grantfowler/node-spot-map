var account = require('../account')
  , rest = require('restler')
  , async = require('async')
  ;

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
    Map.find({}).exec(function(err, points) {
      if(err) {
        res.send("Something went wrong when trying to access the database");
      } else {
        res.json(points);
      }
    });
  }

  , testApi: function(req, res) {
    res.send("TESTING API");
  }

  , checkNewPoints: function() {
    console.log("checking for new points...");
    var spotBaseUrl = "https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/" + account.feed_id + "/";
    //get points from spot api
    rest.get(spotBaseUrl + "message.json").on('complete', function(result) {
      var spotPoints = result.response.feedMessageResponse.messages.message; //wooo

      //check most recent point against database
      Map.find({}).sort({"created": -1}).limit(1).exec(function(err, lastPoint) {
        if(err || lastPoint.length == 0) {
          //no points in db yet
          console.log("no point found, creating first one...");
          var firstPoint = new Map({
            latitude: spotPoints[0].latitude
            , longitude: spotPoints[0].longitude
            , dateTime: spotPoints[0].dateTime
          }).save(function(err) {
            console.log("initial point added! others will be added on next update.");
            return -1;
          });

        } else {
          if(spotPoints[spotPoints.length - 1].dateTime == lastPoint.dateTime) {
            //no new points
            console.log("last points are equal; do nothing.");
            return -1;
          } else {
            //new points exist. get all saved point dateTimes
            Map.find({}).select('dateTime').exec(function(err, points) {
              var currentPointDateTimes = [];
              for(var i = 0; i < points.length; i++) {
                currentPointDateTimes.push(points[i].dateTime);
              }
              console.log(currentPointDateTimes);
              async.each(spotPoints, function(nextPoint, callback) {
                //if dateTime exists, do nothing
                //else, add point to mongo
                if(currentPointDateTimes.indexOf(nextPoint.dateTime) > -1) {
                  console.log("point already exists: " + nextPoint.dateTime);
                  callback();
                } else {
                  console.log("new point: " + nextPoint.dateTime);
                  var newPoint = new Map({
                    latitude: nextPoint.latitude
                    , longitude: nextPoint.longitude
                    , dateTime: nextPoint.dateTime
                  }).save(function(err) {
                    if(err) {
                      console.log(err);
                    }
                    callback();
                  });
                }

              }, function(err) {
                if(!err) {
                  console.log("Finished updating database from SPOT api!");
                } else {
                  console.log("errors: " + err);
                }
              });


            });

            // console.log("here");
          }

        }
      });


    });


  }

}