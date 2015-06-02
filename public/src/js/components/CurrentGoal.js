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

    var targetDate = new Date(this.props.targetDate);
    var startDate = new Date(this.props.startDate);
    var timeDiffStartEnd = Math.abs(targetDate.getTime() - startDate.getTime());
    var totalDiffDays = Math.floor(timeDiffStartEnd / (1000 * 3600 * 24)); 
    var todayDate = new Date();
    var timeDiffStartToday = Math.abs(todayDate.getTime() - startDate.getTime());
    var diffDaysTilToday = Math.floor(timeDiffStartToday / (1000 * 3600 * 24));
    var percentageDays = parseInt(diffDaysTilToday / totalDiffDays * 100,10);

    var weightToGo = Math.abs(this.props.currentWeight - this.props.targetWeight);
    var message = (this.props.currentWeight - this.props.targetWeight) > 0 ? "lose" : "gain";

    console.log(percentageDays );

    return (
      <Well className="col-md-6 col-md-offset-3 text-center" id="current-goal">
        <h3>Current Goal:</h3>
        <hr style={hrStyle} />
        <h3>Goal: <span>{this.props.targetWeight}</span>kg</h3>
        <ProgressBar now={percentageDays} />
        <div className="clearfix">
          <span style={floatLeftStyle}>{this.props.startDate}</span>
          <span style={floatRightStyle}>{this.props.targetDate}</span>
        </div>
        <p>{weightToGo} kg to go to {message}!</p>
        <Button bsStyle='danger'>Cancel this Goal</Button>
      </Well>
    );
  }

});

module.exports = CurrentGoal;