/*
 * ReviewContainer parent component.
 */
'use strict';

var ReviewContainer = React.createClass({
  displayName: 'ReviewContainer',

  getInitialState: function getInitialState() {
    return { data: [] };
  },
  fetchReviews: function fetchReviews(pageNumber) {
    var pageURL = this.props.url + pageNumber;
    console.log('Fetching reviews page ' + pageURL);
    $.ajax({
      url: pageURL,
      dataType: 'json',
      cache: false,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this),
      error: (function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }).bind(this)
    });
  },
  componentDidMount: function componentDidMount() {
    // Fetch page 1 on app instantiation.
    this.setState({ layout: 'teaser' });
    this.fetchReviews(1);
  },
  handleLayoutChangeRequest: function handleLayoutChangeRequest(layout) {
    // Change layout based on child event.
    console.log('Layout change request received for: ' + layout);
    this.setState({ layout: layout });
  },
  handlePageRequest: function handlePageRequest(pageNumber) {
    // Change page number based on child event.
    console.log('Clearing state');
    this.replaceState({ data: '' });
    console.log('Sucessfully handling page change to page no: ' + pageNumber);
    this.fetchReviews(pageNumber);
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'reviewContainer' },
      React.createElement(
        'h1',
        null,
        'Pitchfork Preview'
      ),
      React.createElement(ReviewForm, { handlePageRequest: this.handlePageRequest, handleLayoutChangeRequest: this.handleLayoutChangeRequest, handleSortRequest: this.handleSortRequest }),
      React.createElement(ReviewList, { data: this.state.data })
    );
  }
});

/*
 * ReviewList component.
 */
var ReviewList = React.createClass({
  displayName: 'ReviewList',

  render: function render() {
    if (this.props.data) {
      var reviewNodes = this.props.data.map(function (review) {
        return React.createElement(Review, { name: review.name, artist: review.artist, album: review.album, score: review.score, text: review.text, cover: review.cover });
      });
    } else {
      var reviewNodes = '';
    }

    return React.createElement(
      'div',
      { className: 'reviewList' },
      reviewNodes
    );
  }
});

/*
 * ReviewForm component.
 * Page change, layout change, sort.
 */
var ReviewForm = React.createClass({
  displayName: 'ReviewForm',

  handlePageChange: function handlePageChange(e) {
    this.props.handlePageRequest(e.target.value);
  },
  handleLayoutChange: function handleLayoutChange(e) {
    this.props.handleLayoutChangeRequest(e.target.value);
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'reviewForm' },
      'Layout:',
      React.createElement(
        'select',
        { value: this.props.pageNumber, onChange: this.handleLayoutChange, className: 'layout-change-select' },
        React.createElement(
          'option',
          { value: 'teaser' },
          'teaser'
        ),
        React.createElement(
          'option',
          { value: 'tile' },
          'tile'
        )
      ),
      'Select Page:',
      React.createElement(
        'select',
        { value: this.props.pageNumber, onChange: this.handlePageChange, className: 'page-change-select' },
        React.createElement(
          'option',
          { value: '1' },
          '1'
        ),
        React.createElement(
          'option',
          { value: '2' },
          '2'
        ),
        React.createElement(
          'option',
          { value: '3' },
          '3'
        ),
        React.createElement(
          'option',
          { value: '4' },
          '4'
        ),
        React.createElement(
          'option',
          { value: '5' },
          '5'
        ),
        React.createElement(
          'option',
          { value: '6' },
          '6'
        ),
        React.createElement(
          'option',
          { value: '7' },
          '7'
        ),
        React.createElement(
          'option',
          { value: '8' },
          '8'
        ),
        React.createElement(
          'option',
          { value: '9' },
          '9'
        ),
        React.createElement(
          'option',
          { value: '10' },
          '10'
        )
      )
    );
  }
});

/*
 * Review component.
 */
var Review = React.createClass({
  displayName: 'Review',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'review' },
      React.createElement(
        'div',
        { className: 'reviewCover' },
        React.createElement('img', { src: this.props.cover, width: '75px', height: '75px' })
      ),
      React.createElement(
        'div',
        { className: 'reviewScore' },
        React.createElement(
          'span',
          null,
          this.props.score
        )
      ),
      React.createElement(
        'div',
        { className: 'reviewText' },
        React.createElement(
          'h3',
          { className: 'reviewAuthor' },
          this.props.name
        ),
        this.props.text
      )
    );
  }
});

/*
 * React Render
 */
React.render(React.createElement(ReviewContainer, { url: 'reviews?page=' }), document.getElementById('main_container'));