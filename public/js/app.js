/*
 * ReviewContainer parent component.
 */
var ReviewContainer = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  fetchReviews: function(pageNumber) {
    var pageURL = this.props.url + pageNumber;
    console.log('Fetching reviews page ' + pageURL);
    $.ajax({
      url: pageURL,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    // Fetch page 1 on app instantiation.
    this.fetchReviews(1);
  },
  handleLayoutChange: function(layout) {
    // Change layout based on child event.
  },
  handleSort: function(sort) {
    // Change sort order based on child event.
  },
  handlePageRequest: function(pageNumber) {
    // Change page number based on child event.
    console.log('Sucessfully handling page change to page no: ' + pageNumber);
    this.fetchReviews(pageNumber);
  },
  render: function() {
    return (
      <div className="reviewContainer">
        <h1>Pitchfork Preview</h1>
        <ReviewList data={this.state.data} />
        <ReviewForm handlePageRequest={this.handlePageRequest} />
      </div>
    );
  }
});

/*
 * ReviewList component.
 */
var ReviewList = React.createClass({
  render: function() {
    var reviewNodes = this.props.data.map(function (review) {
      return (
        <Review name={review.name} artist={review.artist} album={review.album} score={review.score} text={review.text}>
        </Review>
      );
    });
    return (
      <div className="reviewList">
        {reviewNodes}
      </div>
    );
  }
});

/*
 * ReviewForm component.
 * Page change, layout change, sort.
 */
var ReviewForm = React.createClass({
  handlePageChange: function(e) {
    this.props.handlePageRequest(e.target.value);
  },
  render: function() {
    return (
      <div className="reviewForm">
        // Sort options.

        // Layout change form.

        // Page change form.
        Select Page:
        <select value={this.props.pageNumber} onChange={this.handlePageChange} className="page-change-select">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
    );
  }
});

/*
 * Review component.
 */
var Review = React.createClass({
  render: function() {
    return (
      <div className="review">
        <h2 className="reviewAuthor">
          {this.props.name}
        </h2>
        <div className="reviewCover"><img src="{this.props.image}" /></div>
        <div className="reviewScore">{this.props.score}</div>
        <div className="reviewText">{this.props.text}</div>
      </div>
    );
  }
});

/*
 * React Render
 */
React.render(
  <ReviewContainer url="reviews?page=" />,
  document.getElementById('main_container')
);