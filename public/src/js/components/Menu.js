/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var Modal = require('react-bootstrap').Modal;
var OverlayMixin = require('react-bootstrap').OverlayMixin;

var Menu = React.createClass({

  render: function() {

    return (
      <div className="col-xs-5 col-xs-offset-7">
        <form action="/session" method="post">
          <input type="hidden" name="_method" value="delete" />
          <button id="log-out-btn" className="btn btn-danger pull-right">Log out</button>
        </form>
      </div>
    );
  }

});

module.exports = Menu;