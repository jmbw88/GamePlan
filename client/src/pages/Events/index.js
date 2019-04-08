import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

class Events extends Component {
  constructor(props) {
    super();
    const events = JSON.parse(sessionStorage.getItem("events"));
    this.state = {};
    if(events) {
      this.state = {
        events: events
      }
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
      this.getEvents();
  }

  getEvents = () => {      
    Axios.get(`/api/user/${this.props.userid}/events`).then((res) => {
      console.log(res);
      this.setState({
        events: res.data
      });
      sessionStorage.setItem("events", JSON.stringify(res.data));
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    return (
      <React.Fragment>
        <h1>Events</h1>
        {this.state.events ? this.state.events.map((event) => (
          <div>
            <h4>{event.title}</h4>
            <p className="text-center">{event.date}</p>
            <p className="text-center">{event.description}</p>
            <p className="text-center">{event.zipcode}</p>
            {/* <Link to="/events/eventid" */}
          </div>
        )) : ""}
      </React.Fragment>
    )
  }
}

export default Events;