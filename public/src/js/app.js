var React = require('react');
var Menu = require('./components/Menu');
var Welcome = require('./components/Welcome');
var TodayData = require('./components/TodayData');
var SetGoal = require('./components/SetGoal');
var CurrentGoal = require('./components/CurrentGoal');
var Notification = require('react-notification');

var App = React.createClass({

  getInitialState: function() {
    return {
      notificationMessage: '',
      todayDataWeight: ''
    };
  },

  isTodayDataRecorded: function(){
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    var latestRecordedWeight = this.state.dateLog[this.state.dateLog.length - 1];
    if(latestRecordedWeight === (year+'-'+month+'-'+date)){
      return true;
    } else {
      return false;
    };
  },

  componentDidMount: function() {
    $.get('/api/users', function(result) {
      if (this.isMounted()) {
        this.setState({
          userName: result['name'],
          currentWeight: result['current_weight'],
          height: result['height'],
          goalStartDate: result['goal_start_date'],
          goalEndDate: result['goal_end_date'],
          goalWeight: result['goal_weight'],
          userId: result['id']
        });
      }
    }.bind(this));

    $.get('/api/weights', function(result) {
      if (this.isMounted()) {
        var dateLog = result.map(function(item){
          var itemArray = item['date_log'].split('-');
          return itemArray.map(function(item){
            return parseInt(item,10)
          }).join('-');
        });

        var weightLog = result.map(function(item){
          return item['weight'];
        });

        this.setState({
          dateLog: dateLog,
          weightLog: weightLog
        });
        if(this.isTodayDataRecorded()){
          this.setState({
            todayDataWeight: this.state.weightLog[this.state.weightLog.length - 1]
          });
        };
      }
    }.bind(this));
  },

  doSomething: function(){
    console.log("yo");
    console.log(this.state);
  },

  getNotificationStyles: function() {
    var bar = {
      background: '#263238',
      width: '350px',
      height: '50px',
      fontSize: '20px'
    };
    var action = {
      color: '#FFCCBC',
      fontSize: '16px',
      float: 'right'
    };
    return { bar, action };
  },

  updateHeight: function(newHeight){
    $.ajax({
      type: "PUT",
      url: "/api/users/" + this.state.userId,
      data: JSON.stringify({'user':{ id:this.state.userId, height:newHeight }}),
      success: function(){
        this.setState({
          height: newHeight,
          notificationMessage: 'Height information updated.'
        });
        this.refs.notification.show();
        console.log("success");
      }.bind(this),
      dataType: "json"
    });
  },

  saveTodayWeight: function(newWeight){
    var today = Date.now();

    if(this.state.todayDataWeight !== ''){
      console.log(this.state.todayDataWeightId);
      $.ajax({
        type: "PUT",
        url: "/api/weights/" + this.state.todayDataWeightId,
        data: JSON.stringify({'weight':{ weight:newWeight}}),
        success: function(){
          console.log("successfully update new weight data");
          this.setState({
            todayDataWeight: newWeight
          })
        }.bind(this),
        dataType: "json"
      });

      $.ajax({
        type: "PUT",
        url: "/api/users/" + this.state.userId,
        data: JSON.stringify({'user':{ id:this.state.userId, current_weight:newWeight }}),
        success: function(){
          this.setState({
            currentWeight: newWeight,
            notificationMessage: "Today's weight updated."
          });
          this.refs.notification.show();
          console.log("success");
        }.bind(this),
        dataType: "json"
      });

    } else {
      $.ajax({
        type: "POST",
        url: "/api/weights",
        data: JSON.stringify({'weight':{ user_id:this.state.userId, weight:newWeight, date_log:today }}),
        success: function(response){
          console.log(response);
          console.log("successfully create new weight data");
          this.setState({
            todayDataWeight: newWeight,
            todayDataWeightId: response.id
          })
        }.bind(this),
        dataType: "json"
      });

      $.ajax({
        type: "PUT",
        url: "/api/users/" + this.state.userId,
        data: JSON.stringify({'user':{ id:this.state.userId, current_weight:newWeight }}),
        success: function(){
          this.setState({
            currentWeight: newWeight,
            notificationMessage: "Today's weight recorded."
          });
          this.refs.notification.show();
          console.log("success");
        }.bind(this),
        dataType: "json"
      });

    };
  },

  render: function(){

    return (
      <div>
        <button onClick={this.doSomething}>Get State</button>
        <Menu />
        <Welcome 
          name={this.state.userName}
          height={this.state.height} 
          updateHeight={this.updateHeight}
          dateLog={this.state.dateLog}
          weightLog={this.state.weightLog}
        />
        <TodayData saveTodayWeight={this.saveTodayWeight} todayDataWeight={this.state.todayDataWeight}/>
        <SetGoal />
        <CurrentGoal />
        <Notification
          ref="notification"
          message={this.state.notificationMessage}
          action='Close'
          styles={this.getNotificationStyles()}
        />
      </div>
    )
  }
});

React.render(
  <App />, 
  document.getElementById('main-container')
);