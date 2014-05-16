node-spot-map
=============

A simple map application that pulls locations from the SPOT api and stores them in mongo.


The SPOT Gen3 is an awesome piece of hardware (http://www.findmespot.com/en/index.php?cid=100), but the software that they provide is awful. For a $150 device and a $200/year subscription, you get a crappy UI and ONLY 7 days of tracking. Your GPS points are deleted after 7 days unless you manually download every one.

This little heroku app tries to fix this problem, and give you a simpler sharing page. Once you have created a shared feed in SPOT, copy your "feed_id" in the account.js file. Then simply load it onto Heroku. The app checks for new GPS points every ~4 hours, and if found saves them to your database. It then displays all of your points on a Google terrain map. 

Todo: Better settings, export points functionality, multiple feeds in one map, make sure it can handle >1000 points.

Grant Fowler

