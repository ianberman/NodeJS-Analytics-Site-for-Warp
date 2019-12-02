
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var Twitter = require('twitter');
var googleTrends = require('google-trends-api');

// REDIRECT TO LATEST SERVER FILE
app.get('/', function(req, res) {
  var LandingPage = 'home5-6-5.html';
  res.sendFile(LandingPage, {root: '/root/final/public'});
  console.log('running home5-6-5.html');
})

// INITIALIZE TWITTER APPLICATION-ONLY AUTHENTICATION
var twitterClient = new Twitter({
  consumer_key: '9N9jXfCGuprhOnYjSzJ72uGBG',
  consumer_secret: 'lScjXZOZxBjFbFwpqHIReyDtGDZPIch5zulxE7VpfnK9W2w2tk',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAAA0k%2BQAAAAAAv0sWAc9rw0hWoNoPUtn3OEc1gBE%3DubzLZ0lQCOzCzYmOUI7Yvuq1uL1aBP9p1WJ1l0tClOHk2bAqBG'
});

// ROUTE FOR TWITTER FULL ARCHIVE SEARCH
app.get('/twitFASub', function(req, res) {
  var twitFAKeywordRequest = req.query.twitFAToServer[0];
  var twitFAFromRequest = req.query.twitFAToServer[1];
  var twitFAToRequest = req.query.twitFAToServer[2];
  console.log(twitFAKeywordRequest);
  console.log(twitFAFromRequest);
  console.log(twitFAToRequest);

  // path, params, callback
  twitterClient.get('tweets/search/fullarchive/myenvironment/', {query: twitFAKeywordRequest, fromDate: twitFAFromRequest, toDate: twitFAToRequest}, function(error, tweets, response) {
    if (error) {
      console.log("error: " + error);
    } else {
      res.send(tweets);
    }
  });
})

// ROUTE FOR TWITTER 30 DAY SEARCH
app.get('/twit30DaySub', function(req, res) {
  var twit30DayRequest = req.query.twit30DayToServer;
  console.log(twit30DayRequest);
  // path, params, callback
  twitterClient.get('tweets/search/30day/30dayenv/', {query: twit30DayRequest}, function(error, tweets, response) {
    if (error) {
      console.log("error: " + error);
    } else {
      res.send(tweets);
    }
  });


})

// ROUTE FOR GOOGLE TRENDS
app.get('/trendsSub', function(req, res) {
  var trendsKeywordRequest = req.query.trendsToServer[0];
  var trendsFromRequest = req.query.trendsToServer[1];
  var trendsToRequest = req.query.trendsToServer[2];

  googleTrends.interestOverTime({keyword: trendsKeywordRequest, startTime: new Date(trendsFromRequest), endTime: new Date(trendsToRequest)})
  .then(function(results){
    res.send(results);
    console.log("success");
  })
  .catch(function(err){
    console.error("error: " + err);
  });
})

app.listen(80, function () {
  console.log('App listening on port 80!');
})
