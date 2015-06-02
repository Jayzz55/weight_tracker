/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var Label = require('react-bootstrap').Label;
var Modal = require('react-bootstrap').Modal;
var OverlayMixin = require('react-bootstrap').OverlayMixin;

const SettingForm = React.createClass({
  render: function(){
    return(
      <form className='form-horizontal'>
        <Input type='date' label='Target Date' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
        <Input type="number" step="0.01" label='Target Weight(kg)' defaultValue='1.5' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
        <Button className='col-xs-offset-2 col-xs-10' bsStyle='primary'>Set!</Button>
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
    var buttonStyle = {
      width: '100%',
      fontSize: '30px',
      marginTop: '30px',
      marginBottom: '30px'
    };

    return (
      <Button style={buttonStyle} onClick={this.handleToggle} bsStyle='danger' id="set-goal-btn">Set a Goal!</Button>
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
            <SettingForm />
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
        <GoalModal />
      </div>
    );
  }

});

module.exports = SetGoal;