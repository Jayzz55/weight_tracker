/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var Label = require('react-bootstrap').Label;
var Modal = require('react-bootstrap').Modal;
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Well = require('react-bootstrap').Well;
var ProgressBar = require('react-bootstrap').ProgressBar;

const CancelGoalModal = React.createClass({
  mixins: [OverlayMixin],

  handleCancelGoal(e) {
    e.preventDefault();
    var targetDate= null;
    var targetWeight= null;
    this.props.saveGoal(targetDate, targetWeight);
    this.handleToggle();
  },

  getInitialState() {
    return {
      isModalOpen: false
    };
  },

  handleToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  render() {

    return (
      <Button onClick={this.handleToggle} bsStyle='danger' >Cancel Goal</Button>
    );
  },

  // This is called by the `OverlayMixin` when this component
  // is mounted or updated and the return value is appended to the body.
  renderOverlay() {
    if (!this.state.isModalOpen) {
      return <span/>;
    };

    var modalBodyStyle = {
      padding: '5px'
    };

    var h3Style = {
      display: 'inline',
      marginLeft: '10px',
      marginRight: '30px'
    }

    var buttonStyle = {
      marginLeft: '10px',
      marginRight: '10px',
      fontSize: '20px'
    }

    return (
      <Modal title='Cancel Goal' onRequestHide={this.handleToggle}>
        <div className='modal-body'>
          <div style={modalBodyStyle} >
            <h3 style={h3Style}>Are you sure?</h3>
            <Button style={buttonStyle} onClick={this.handleToggle}>No</Button>
            <Button style={buttonStyle} onClick={this.handleCancelGoal} bsStyle='danger'>Yes</Button>
          </div>
        </div>
        <div className='modal-footer'>
          
        </div>
      </Modal>
    );
  }
});

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
    };

    var targetDate = new Date(this.props.targetDate);
    var startDate = new Date(this.props.startDate);
    var timeDiffStartEnd = Math.abs(targetDate.getTime() - startDate.getTime());
    var totalDiffDays = Math.floor(timeDiffStartEnd / (1000 * 3600 * 24)); 
    var todayDate = new Date();
    todayDate.setHours(10);
    var timeDiffStartToday = Math.abs(todayDate.getTime() - startDate.getTime());
    var diffDaysTilToday = Math.floor(timeDiffStartToday / (1000 * 3600 * 24));
    var percentageDays = parseInt(diffDaysTilToday / totalDiffDays * 100,10);

    var weightToGo = Math.abs(this.props.currentWeight - this.props.targetWeight);
    var message = (this.props.currentWeight - this.props.targetWeight) > 0 ? "lose" : "gain";
    var currentGoalDisplay = (this.props.targetDate) ? "block" : "none";

    var wellStyle = {
      display: currentGoalDisplay
    };

    console.log("targetDate = " + targetDate);
    console.log("startDate = " + startDate);
    console.log("todayDate = " + todayDate);
    console.log("totalDiffDays = " + totalDiffDays);
    console.log("diffDaysTilToday = " + diffDaysTilToday);

    console.log(percentageDays );

    return (
      <Well style={wellStyle} className="col-md-6 col-md-offset-3 text-center" id="current-goal">
        <h3>Current Goal:</h3>
        <hr style={hrStyle} />
        <h3>Goal: <span>{this.props.targetWeight}</span>kg</h3>
        <ProgressBar now={percentageDays} />
        <div className="clearfix">
          <span style={floatLeftStyle}>{this.props.startDate}</span>
          <span style={floatRightStyle}>{this.props.targetDate}</span>
        </div>
        <p>{weightToGo} kg to go to {message}!</p>
        <CancelGoalModal saveGoal={this.props.saveGoal}/>
      </Well>
    );
  }

});

module.exports = CurrentGoal;