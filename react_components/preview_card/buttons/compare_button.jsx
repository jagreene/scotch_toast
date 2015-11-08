var React = require('react');

var ContactButton = React.createClass({
  handleClick: function() {
    this.props.setContactInfoShown();
  },

  render: function() {
    return (
      <div id="compareButton"
          className="nohighlight previewButton"
          onClick={this.handleClick}>
      </div>
    );
  }
});

module.exports = ContactButton