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

  handleChange = (event) => {
    this.setState( {
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newEvent = {
      title: this.state.eventTitle,
      description: this.state.eventDesc,
      zipcode: this.state.eventZip,
      public: true,
      date: this.state.eventDateTime,
      createdBy: this.props.userid
    }

    Axios.post("/api/events", newEvent).then((res) => {
      console.log(res);
      Axios.put(`/api/user/${this.props.userid}/events/${res.data._id}`).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
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
    console.log(this.state);
    return (
      <React.Fragment>
        <h2>Create New Event</h2>
        <form>
          <div className="form-group">
            <label for="eventTitle" className="text-info">Group Name:</label><br/>
            <input id="eventTitle" 
                    placeholder="Title"
                    name="eventTitle"
                    value={this.state.eventTitle}
                    onChange={this.handleChange}
                    className="form-control"/>
          </div>
          <div className="form-group">
            <label for="eventDesc" className="text-info">Event Description:</label><br/>
            <input id="eventDesc" 
                    placeholder="Description"
                    name="eventDesc"
                    value={this.state.eventDesc}
                    onChange={this.handleChange}
                    className="form-control"/>
          </div>
          <div className="form-group">
            <label for="eventZip" className="text-info">Zipcode:</label><br/>
            <input id="eventZip" 
                    placeholder="Zipcode"
                    name="eventZip"
                    value={this.state.eventZip}
                    onChange={this.handleChange}
                    className="form-control"/>
          </div>
          <div className="form-group">
            <label for="eventDateTime" className="text-info">Schedule Event:</label><br/>
            <input id="eventDateTime" 
                    type="datetime-local"
                    name="eventDateTime"
                    value={this.state.eventDateTime}
                    onChange={this.handleChange}
                    className="form-control"/>
          </div>
          <div className="submitBtn">
            <button className="btn btn-info float-right mb-2" onClick={this.handleSubmit}>Submit</button>
          </div>
        </form>
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
        <h2>My Events</h2>
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