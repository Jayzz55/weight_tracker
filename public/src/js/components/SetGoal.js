/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var Label = require('react-bootstrap').Label;
var Modal = require('react-bootstrap').Modal;
var OverlayMixin = require('react-bootstrap').OverlayMixin;

const SettingForm = React.createClass({

  getInitialState: function() {
    return {
      targetDate: this.props.targetDate,
      targetWeight: this.props.targetWeight
    };
  },

  handleDateChange: function(e){
    this.setState({
      targetDate: e.target.value
    });
  },

  handleWeightChange: function(e){
    this.setState({
      targetWeight: e.target.value
    });
  },

  handleSaveGoal: function(e){
    e.preventDefault();
    var targetDate= this.state.targetDate;
    var targetWeight= this.state.targetWeight;
    this.props.saveGoal(targetDate, targetWeight);
    this.props.handleToggle();
  },

  render: function(){

    var inputStyle = {
      width: '83%',
      display: 'inline',
      marginBottom: '20px'
    };

    return(
      <form className='form-horizontal'>
        <label className='col-xs-2'>Target Date</label>
        <input onChange={this.handleDateChange} className='col-xs-10' style={inputStyle} type="date" value={this.state.targetDate}/>
        <label className='col-xs-2'>Target Weight (kg)</label>
        <input onChange={this.handleWeightChange} className='col-xs-10' style={inputStyle} ref="targetWeight" type="number" step="0.1" value={this.state.targetWeight}/>
        <Button onClick={this.handleSaveGoal} className='col-xs-offset-2 col-xs-10' bsStyle='primary'>Set!</Button>
      </form>
    )
  }
});

const GoalModal = React.createClass({
  mixins: [OverlayMixin],

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

    var buttonText = (this.props.targetDate) ? "Edit Goal" : "Set a Goal!";
    var buttonColor = (this.props.targetDate) ? "default" : "danger";

    var buttonStyle = {
      width: '100%',
      fontSize: '30px',
      marginTop: '30px',
      marginBottom: '30px'
    };

    return (
      <Button style={buttonStyle} onClick={this.handleToggle} bsStyle={buttonColor} id="set-goal-btn">{buttonText}</Button>
    );
  },

  // This is called by the `OverlayMixin` when this component
  // is mounted or updated and the return value is appended to the body.
  renderOverlay() {
    if (!this.state.isModalOpen) {
      return <span/>;
    };

    var modalBodyStyle = {
      padding: '5px',
      height: '200px'
    };

    return (
      <Modal title='Set your Goal' onRequestHide={this.handleToggle}>
        <div className='modal-body'>
          <div style={modalBodyStyle} >
            <SettingForm handleToggle={this.handleToggle} saveGoal={this.props.saveGoal} targetDate={this.props.targetDate} targetWeight={this.props.targetWeight} />
          </div>
        </div>
        <div className='modal-footer'>
          <Button onClick={this.handleToggle}>Close</Button>
        </div>
      </Modal>
    );
  }
});

var SetGoal = React.createClass({

  render: function() {

    return (
      <div className="col-md-6 col-md-offset-3 text-center">
        <GoalModal saveGoal={this.props.saveGoal} targetDate={this.props.targetDate} targetWeight={this.props.targetWeight} />
      </div>
    );
  }

});

module.exports = SetGoal;