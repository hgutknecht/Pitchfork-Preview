var fs = require('fs')
    , path = require('path')
    , express = require('express')
    , _ = require('underscore')
    , p = require('pitchfork')
    , app = express()
    , theReviews = []
    , s = null
    , count = 0;

/*
 * Express settings.
 */
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'public')));

/*
 * Fetch reviews from pitchfork.
 */
function getReviews(pageNum, callback) {
  s = new p.Page(pageNum);
  count = 0;
  s.promise.then(function(results) {
    results.forEach(function(result) {
      result.promise.then(function(review) {
        theReviews.push(review.truncated());
        count++;
        // There are 20 reviews per page.
        if (count == 20) {
          callback(theReviews);
        }
      })
    })
  });
};

/*
 * Reviews route.
 */
app.get('/reviews', function(req, res) {
  console.log('Fetching reviews for page: ' + req.query.page);
  getReviews(req.query.page, sendTheData);
  function sendTheData(reviews) {
    console.log('Pitchfork callback achievement unlocked.');
    res.send(reviews);
  }
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
