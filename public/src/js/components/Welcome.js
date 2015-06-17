/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var Modal = require('react-bootstrap').Modal;
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var LineChart = require("react-chartjs").Line;

const HeightForm = React.createClass({

  getInitialState: function() {
    return {
      height: this.props.height
    };
  },

  handleChange: function(e){
    this.setState({
      height: e.target.value
    });
  },

  handleUpdateHeight: function(e){
    e.preventDefault();
    var newHeight= this.state.height;
    this.props.updateHeight(newHeight);
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

        <label className='col-xs-2'>height (m)</label>
        <input onChange={this.handleChange} className='col-xs-10' style={inputStyle} type="number" step="0.01" value={this.state.height} />
        <Button onClick={this.handleUpdateHeight} className='col-xs-offset-2 col-xs-10' bsStyle='primary'>Update</Button>
      </form>
    )
  }
});

const UpdateHeight = React.createClass({
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
    return (
      <Button id="update-btn" onClick={this.handleToggle} >Update</Button>
    );
  },

  // This is called by the `OverlayMixin` when this component
  // is mounted or updated and the return value is appended to the body.
  renderOverlay() {
    if (!this.state.isModalOpen) {
      return <span/>;
    };

    var modalBodyStyle = {
      height: '150px'
    };

    return (
      <Modal title="Height update" onRequestHide={this.handleToggle}>
        <div className='modal-body' style={modalBodyStyle}>
          <HeightForm handleToggle={this.handleToggle} height={this.props.height} updateHeight={this.props.updateHeight} />
        </div>
        <div className='modal-footer'>
          <Button onClick={this.handleToggle}>Close</Button>
        </div>
      </Modal>
    );
  }
});

const WeightChart = React.createClass({
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
    return (
      <Button id="view-btn" onClick={this.handleToggle} bsStyle='info'>View</Button>
    );
  },

  // This is called by the `OverlayMixin` when this component
  // is mounted or updated and the return value is appended to the body.
  renderOverlay() {
    if (!this.state.isModalOpen) {
      return <span/>;
    };

    var chartData = {
      labels: this.props.dateLog,
      datasets: [
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: this.props.weightLog
        }
      ]
    };

    var chartOptions = {
      responsive: true
    };

    var modalBodyStyle = {
      padding: '5px',
      height: '250px'
    };

    return (
      <Modal title='Weight Record' onRequestHide={this.handleToggle}>
        <div className='modal-body'>
          <div style={modalBodyStyle} >
            <LineChart data={chartData} options={chartOptions} width="600" height="250" redraw/>
          </div>
        </div>
        <div className='modal-footer'>
          <Button onClick={this.handleToggle}>Close</Button>
        </div>
      </Modal>
    );
  }
});

var Welcome = React.createClass({
  render: function() {

    return (
      <div className="col-md-6 col-md-offset-3 text-center">
        <h2>Welcome</h2>
        <h3 id="name">{this.props.name}</h3>
        <p id="user-data">Height: <span>{this.props.height}</span> <UpdateHeight height={this.props.height} updateHeight={this.props.updateHeight} /></p>
        <p id="user-data">Your weight journal <WeightChart dateLog={this.props.dateLog} weightLog={this.props.weightLog} /> </p>
      </div>
    );
  }

});

module.exports = Welcome;