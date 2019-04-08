import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Events extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    return (
      <React.Fragment>
        <h1>Events</h1>
      </React.Fragment>
    )
  }
}

export default Events;