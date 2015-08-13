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
    this.setState({layout:'teaser'});
    this.fetchReviews(1);
  },
  handleLayoutChangeRequest: function(layout) {
    // Change layout based on child event.
    console.log('Layout change request received for: ' + layout);
    this.setState({layout: layout});
  },
  handlePageRequest: function(pageNumber) {
    // Change page number based on child event.
    console.log('Clearing state');
    this.replaceState({data: ''});
    console.log('Sucessfully handling page change to page no: ' + pageNumber);
    this.fetchReviews(pageNumber);
  },
  render: function() {
    return (
      <div className="reviewContainer">
        <h1>Pitchfork Preview</h1>
        <ReviewForm handlePageRequest={this.handlePageRequest} handleLayoutChangeRequest={this.handleLayoutChangeRequest} handleSortRequest={this.handleSortRequest} />
        <ReviewList data={this.state.data} />
      </div>
    );
  }
});

/*
 * ReviewList component.
 */
var ReviewList = React.createClass({
  render: function() {
    if (this.props.data) {
      var reviewNodes = this.props.data.map(function (review) {
        return (
          <Review name={review.name} artist={review.artist} album={review.album} score={review.score} text={review.text} cover={review.cover}>
          </Review>
        );
      });
    }
    else {
      var reviewNodes = '';
    }

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
  handleLayoutChange: function(e) {
    this.props.handleLayoutChangeRequest(e.target.value);
  },
  render: function() {
    return (
      <div className="reviewForm">
        Layout:
        <select value={this.props.pageNumber} onChange={this.handleLayoutChange} className="layout-change-select">
          <option value="teaser">teaser</option>
          <option value="tile">tile</option>
        </select>
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
        <div className="reviewCover"><img src={this.props.cover} width="75px" height="75px" /></div>
        <div className="reviewScore"><span>{this.props.score}</span></div>
        <div className="reviewText"><h3 className="reviewAuthor">{this.props.name}</h3>
          {this.props.text}
        </div>
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