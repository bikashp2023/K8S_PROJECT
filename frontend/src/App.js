import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import ExpenseList from './ExpenseList';

export default class App extends Component {
  payload;
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      amount: 0,
      date: new Date(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.payload = {
      comment: this.state.comment,
      amount: this.state.amount,
      insertdate: this.state.date,
    };
    fetch("http://app:5000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setStartDate = (event) => {
    this.setState({
      date: event,
    });
  };
  render() {
    return (
      <div className="App">
        <div className="details">
          <h1>Expense Tracker</h1>
          <form onSubmit={this.handleSubmit} className="details">
            <label>
              Purpose:
              <input
                name="comment"
                type="text"
                value={this.state.comment}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Amount:
              <input
                name="amount"
                type="text"
                value={this.state.amount}
                onChange={this.handleChange}
              />
            </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.setStartDate}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <ExpenseList />
      </div>
    );
  }
}
