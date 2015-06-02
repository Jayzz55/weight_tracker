/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var Label = require('react-bootstrap').Label;

var TodayData = React.createClass({

  getInitialState: function() {
    return {
      inputValue: this.props.todayDataWeight
    };
  },

  handleSave: function(e){
    e.preventDefault();
    var newWeight= this.refs.weight.getDOMNode().value;
    this.props.saveTodayWeight(newWeight);
  },

  doSomething: function(){
    // console.log(e);
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

    return (
      <div className="col-md-6 col-md-offset-3 text-center">
        <h3>Today ({date + '/' + month + '/' + year}) data:</h3>
        <hr/>
        <p style={infoStyle}>Today recorded data: {this.props.todayDataWeight} kg</p>
        <label style={labelStyle} className='col-xs-2'>Weight:</label>
        <input style={inputStyle} className='col-xs-8' ref="weight" type='text' placeholder={this.props.todayDataWeight}/>
        <Button onClick={this.handleSave} className='col-xs-2'>{buttonText}</Button>
        <p>BMI: <span>20</span></p>
        <h1><Label bsStyle='success'>Ideal</Label></h1>
      </div>
    );
  }

});

module.exports = TodayData;