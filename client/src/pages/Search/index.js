import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

class Search extends Component {
  // constructor() {
  //   super();
  // }

  getUsers = () => {
    Axios.get("/api/user").then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  getGroups = () => {
    Axios.get("/api/groups").then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  getEvents = () => {
    Axios.get("/api/events").then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    if(!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    return (
      <React.Fragment>
        <h1>Search</h1>
        <button className="btn btn-primary" onClick={this.getUsers}>Users</button>
        <button className="btn btn-primary" onClick={this.getGroups}>Groups</button>
        <button className="btn btn-primary" onClick={this.getEvents}>Events</button>

      </React.Fragment>
    )
  }
}

export default Search;