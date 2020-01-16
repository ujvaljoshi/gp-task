import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.todoList = [];
    this.time = 0;
    var that = this;
    (function timeFunction() {
      setTimeout(function() {
        that.time++;
        that.forceUpdate();
        timeFunction();
      }, 1000)
    })();
  }

  componentDidMount() {
    this.counter = 0;
    var that = this;
    this.refs.counterButton.addEventListener('click', function() {
      that.counter = that.counter + 1;
      that.forceUpdate();
    });
    this.refs.todoItemButton.addEventListener('click', function() {
      var value = that.refs.toDoInput.value;
      that.todoList.push(value);
      that.forceUpdate();
    });

    this.refs.githubName.addEventListener('change', function () {
       that.forceUpdate();
    });
  }

  componentWillUpdate() {
    var value = this.refs.githubName.value;
    var that = this;
    if(this.previousValue !== value && value.length > 2) {
      this.previousValue = value;
      fetch('https://api.github.com/users/' + value)
        .then(res => {
          return res.json()
        })
        .then(res => {
          that.user = res;
          that.forceUpdate();
        });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          {this.time}s
        </div>
        <div className="App-main">
        <div className="App-counter-section">
        {this.counter}
        <button ref="counterButton">Add to counter</button>
        </div>
        <div className="App-todo-section">
          <div className="App-todo-section-input">
          <button ref="todoItemButton">Add todo</button>
          <input ref="toDoInput"/>
          </div>
            <div className="App-todo-section-list">
          {this.todoList.map((value, index) => {
            return(
              <div className="App-todo-section-list-item">
                <div>{index}</div>
                <div>{value}</div>
              </div>
            );
          })}
        </div>
        </div>
        <div className="App-github-section">
          <input ref="githubName"/>
          {this.user ?  JSON.stringify(this.user) : 'No user'}
        </div>
        </div>
      </div>
    );
  }
}

export default App;
