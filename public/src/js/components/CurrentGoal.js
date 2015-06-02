/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var Label = require('react-bootstrap').Label;
var Well = require('react-bootstrap').Well;
var ProgressBar = require('react-bootstrap').ProgressBar;

var CurrentGoal = React.createClass({
  render: function() {

    const innerButton = <Button>Save</Button>;
    var floatLeftStyle = {
      float: 'left'
    };
    var floatRightStyle = {
      float: 'right'
    };
    var hrStyle= {
      border: '3px solid #555'
    }

    return (
      <Well className="col-md-6 col-md-offset-3 text-center" id="current-goal">
        <h3>Current Goal:</h3>
        <hr style={hrStyle} />
        <h3>Goal: <span>30</span>kg</h3>
        <ProgressBar now={60} />
        <div className="clearfix">
          <span style={floatLeftStyle}>Start!</span>
          <span style={floatRightStyle}>Goal!</span>
        </div>
        <p>5 kg to go!</p>
        <p>Gotta burn <span>0.5</span>kg everyday!</p>
      </Well>
    );
  }

});

module.exports = CurrentGoal;