import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

class Search extends Component {
  constructor() {
    super();
    this.state = {};
  }

  getUsers = () => {
    Axios.get("/api/user").then((res) => {
      console.log(res.data);
      this.setState({
        users: res.data,
        groups: null,
        events: null
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  getGroups = () => {
    Axios.get("/api/groups").then((res) => {
      console.log(res.data);
      this.setState({
        groups: res.data,
        users: null,
        events: null
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  getEvents = () => {
    Axios.get("/api/events").then((res) => {
      console.log(res.data);
      this.setState({
        events: res.data,
        users: null,
        groups: null
      });
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
        {this.state.users ? this.state.users.map((user) => (
          <Link to={`/${user._id}`}><p>{user.account.username}</p></Link>
        )) : ""}
        {this.state.groups ? this.state.groups.map((group) => (
          <Link to={`/groups/${group._id}`}><p>{group.name}</p></Link>
        )) : ""}
        {this.state.events ? this.state.events.map((event) => (
          <Link to={`/events/${event._id}`}><p>{event.title}</p></Link>
        )) : ""}

      </React.Fragment>
    )
  }
}

export default Search;