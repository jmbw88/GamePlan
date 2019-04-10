import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import Calendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);

class Events extends Component {
  constructor(props) {
    super();
    const events = JSON.parse(sessionStorage.getItem("events"));
    this.state = { };
    if(events) {
      this.state = {
        events: events
      }
    }
    this.state = {
    events2: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "hour")),
        title: "GAME NIGHT!"
      },
      {
        start: new Date(moment().add(3, 'days')),
        end: new Date(moment().add(1, "hour")),
        title: "GAME NIGHT!"
      }
    ]
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
        <div className="container App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events2}
          style={{ height: "100vh" }}
        />
      </div>
      </React.Fragment>
    )
  }
}

export default Events;