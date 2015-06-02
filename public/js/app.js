var ReviewContainer = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
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
  handleLayoutChange: function(layout) {
    // TODO Change the layout
  },
  handleSort: function(sort) {
    // TODO handle sort ordering
  },
  render: function() {
    return (
      <div className="reviewContainer">
        <h1>Pitchfork Preview</h1>
        <ReviewList data={this.state.data} />
        <ReviewForm />
        PAGE:
        <a href="?page=1"> 1 </a>
        <a href="?page=2"> 2 </a>
        <a href="?page=3"> 3 </a>
        <a href="?page=4"> 4 </a>
        <a href="?page=5"> 5 </a>
      </div>
    );
  }
});

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

var ReviewForm = React.createClass({
  render: function() {
    return (
      <div className="reviewForm">
        // Layout change form
        // Page switch form
        // Sort ordering form
      </div>
    );
  }
});

var Review = React.createClass({
  render: function() {
    return (
      <div className="review">
        <h2 className="reviewAuthor">
          {this.props.name}
        </h2>
        {this.props.artist}
        {this.props.album}
        {this.props.score}
        {this.props.text}
      </div>
    );
  }
});

React.render(
  <ReviewContainer url="reviews" />,
  document.getElementById('main_container')
);