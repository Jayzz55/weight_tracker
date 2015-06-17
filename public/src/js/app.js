var React = require('react');
var Menu = require('./components/Menu');
var Welcome = require('./components/Welcome');
var TodayData = require('./components/TodayData');
var SetGoal = require('./components/SetGoal');
var CurrentGoal = require('./components/CurrentGoal');
var Notification = require('react-notification');

var App = React.createClass({

  todayYear: function(){
    return new Date().getFullYear();
  },

  todayMonth: function(){
    return new Date().getMonth() + 1;
  },

  todayDay: function(){
    return new Date().getDate();
  },

  getInitialState: function() {
    return {
      notificationMessage: '',
      todayDataWeight: ''
    };
  },

  isTodayDataRecorded: function(){
    var latestRecordedWeight = this.state.dateLog[this.state.dateLog.length - 1];
    if(latestRecordedWeight === (this.todayYear()+'-'+this.todayMonth()+'-'+this.todayDay())){
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
            todayDataWeight: this.state.weightLog[this.state.weightLog.length - 1],
            todayDataWeightId: result[result.length-1].id
          });
        };
      }
    }.bind(this));
  },

  doSomething: function(){
    console.log(this.state);
    console.log(this.isTodayDataRecorded());
    console.log(this.state.dateLog[this.state.dateLog.length - 1]);
    console.log(this.todayYear()+'-'+this.todayMonth()+'-'+this.todayDay() );
  },

  getNotificationStyles: function() {
    var bar = {
      background: '#263238',
      width: '370px',
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
      data: JSON.stringify({'user':{ id:this.state.userId, height:newHeight, current_weight: this.state.currentWeight, goal_start_date: this.state.goalStartDate, goal_end_date: this.state.goalEndDate, goal_weight: this.state.goalWeight }}),
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
      $.ajax({
        type: "PUT",
        url: "/api/weights/" + this.state.todayDataWeightId,
        data: JSON.stringify({'weight':{ weight:newWeight}}),
        success: function(){
          var newWeightLog = this.state.weightLog.slice(0,this.state.weightLog.length-1).concat([newWeight]);
          this.setState({
            todayDataWeight: newWeight,
            weightLog: newWeightLog
          })
        }.bind(this),
        dataType: "json"
      });

      $.ajax({
        type: "PUT",
        url: "/api/users/" + this.state.userId,
        data: JSON.stringify({'user':{ id:this.state.userId, current_weight:newWeight, height: this.state.height, goal_start_date: this.state.goalStartDate, goal_end_date: this.state.goalEndDate, goal_weight: this.state.goalWeight }}),
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
          var todayDate = this.todayYear() + "-" + this.todayMonth() + "-" + this.todayDay();
          var newDateLog = this.state.dateLog.concat([todayDate]);
          var newWeightLog = this.state.weightLog.concat([newWeight]);

          this.setState({
            todayDataWeight: newWeight,
            todayDataWeightId: response.id,
            dateLog: newDateLog,
            weightLog: newWeightLog
          })
        }.bind(this),
        dataType: "json"
      });

      $.ajax({
        type: "PUT",
        url: "/api/users/" + this.state.userId,
        data: JSON.stringify({'user':{ id:this.state.userId, current_weight:newWeight, height: this.state.height, goal_start_date: this.state.goalStartDate, goal_end_date: this.state.goalEndDate, goal_weight: this.state.goalWeight }}),
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

  saveGoal: function(targetDate, targetWeight){
    var today = this.todayYear() + "-" + this.todayMonth() + "-" + this.todayDay();

    $.ajax({
      type: "PUT",
      url: "/api/users/" + this.state.userId,
      data: JSON.stringify({'user':{ id:this.state.userId, current_weight: this.state.currentWeight, height: this.state.height, goal_end_date: targetDate, goal_weight: targetWeight, goal_start_date: today }}),
      success: function(){
        this.setState({
          goalStartDate: today,
          goalEndDate: targetDate,
          goalWeight: targetWeight
        });

        if (targetDate){
          this.setState({
            notificationMessage: "Your goal has been set."
          });
        } else {
          this.setState({
            notificationMessage: "Your goal has been cancelled."
          });
        }

        this.refs.notification.show();
        console.log("success");
      }.bind(this),
      dataType: "json"
    });
  },

  render: function(){

    return (
      <div className="container" id="app">
        <button id="debug-btn" onClick={this.doSomething}>Get State</button>
        <Menu />
        <Welcome 
          name={this.state.userName}
          height={this.state.height} 
          updateHeight={this.updateHeight}
          dateLog={this.state.dateLog}
          weightLog={this.state.weightLog}
        />
        <TodayData height={this.state.height} currentWeight={this.state.currentWeight} saveTodayWeight={this.saveTodayWeight} todayDataWeight={this.state.todayDataWeight}/>
        <SetGoal targetDate={this.state.goalEndDate} targetWeight={this.state.goalWeight} saveGoal={this.saveGoal}/>
        <CurrentGoal startDate={this.state.goalStartDate} targetDate={this.state.goalEndDate} targetWeight={this.state.goalWeight} currentWeight={this.state.currentWeight} saveGoal={this.saveGoal} />
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