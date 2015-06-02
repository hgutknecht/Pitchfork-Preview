var fs = require('fs')
    , path = require('path')
    , express = require('express')
    , async = require('async')
    , app = express()
    , p = require('pitchfork')
    , theReviews = []
    , s = 1
    , count = 0;

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'public')));

// Fetch reviews
function getReviews(pageNum, callback) {
  s = new p.Page(pageNum);
  count = 0;
  s.promise.then(function(results) {
    results.forEach(function(result) {
      result.promise.then(function(review) {
        theReviews.push(review.truncated());
        count++;
        // 20 reviews per page.
        if (count == 20) {
          callback(theReviews);
        }
      })
    })
  });
}

app.get('/reviews', function(req, res) {

  console.log('fetching reviews for page: ');

  getReviews(1, sendTheData);

  function sendTheData(reviews) {
    console.log("pitchfork callback achievement unlocked.");
    res.send(reviews);
  }

});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
