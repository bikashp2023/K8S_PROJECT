import React, { Component } from "react";
import './ExpenseList.css';

export default class ExpenseList extends Component {
  state = {
    data: [],
    loading: true,
  };

  componentDidMount() {
    fetch("http://app:5000/expenses")
      .then((res) => res.json())
      .then((data) => this.setState({ data, loading: false }))
      .catch((error) => console.error(error));
  }

  render() {
    const { data, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="header">
          <span>Date</span>
          <span>Comment</span>
          <span>Amount</span>
        </div>
        {data.map((item, index) => (
          <div key={item.comment} className="row">
            <span>{item.insertdate}</span>
            <span>{item.comment}</span>
            <span>{item.amount}</span>
          </div>
        ))}
      </div>
    );
  }
}
