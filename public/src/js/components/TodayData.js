/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var Label = require('react-bootstrap').Label;

var TodayData = React.createClass({

  getInitialState: function() {
    return {
      inputValue: ''
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      inputValue: nextProps.todayDataWeight
    });
  },

  handleSave: function(e){
    e.preventDefault();
    var newWeight= this.refs.weight.getDOMNode().value;
    this.props.saveTodayWeight(newWeight);
  },

  handleChange: function(e){
    this.setState({
      inputValue: e.target.value
    });
  },

  render: function() {

    var inputStyle = {
      height: '35px'
    };

    var labelStyle = {
      fontSize: '20px'
    };


    var display = (this.props.todayDataWeight === '') ? 'none' : 'block';

    var infoStyle = {
      display: display
    }

    var buttonText = (this.props.todayDataWeight === '') ? "Save" : "Update";
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();

    var userHeight = parseFloat(this.props.height,10);
    var userWeight = parseFloat(this.props.currentWeight,10);
    var userBMI = parseInt(userWeight/userHeight/userHeight,10);

    var userBMIText = '';
    var userBMILabel = '';

    if (userBMI < 20){
      userBMIText = "Underweight";
      userBMILabel = 'warning';
    } else if (userBMI > 25) {
      userBMIText = "Overweight";
      userBMILabel = 'danger';
    } else {
      userBMIText = "Ideal";
      userBMILabel = 'success';
    }

    return (
      <div className="col-md-6 col-md-offset-3 text-center">
        <h3>Today ({date + '/' + month + '/' + year}) data:</h3>
        <hr/>
        <p style={infoStyle}>Today recorded data: {this.props.todayDataWeight} kg</p>
        <label style={labelStyle} className='col-xs-2'>Weight:</label>
        <input onChange={this.handleChange} style={inputStyle} className='col-xs-8' ref="weight" type='text' value={this.state.inputValue}/>
        <Button onClick={this.handleSave} className='col-xs-2'>{buttonText}</Button>
        <p>Today BMI: <span>{userBMI}</span></p>
        <h1><Label bsStyle={userBMILabel}>{userBMIText}</Label></h1>
      </div>
    );
  }

});

module.exports = TodayData;