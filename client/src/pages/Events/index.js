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
    // const events = JSON.parse(sessionStorage.getItem("events"));
    // this.state = { };
    // if(events) {
    //   this.state = {
    //     events: events
    //   }
    // }
    this.state = {
    calendarEvents: [
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
      const calendarEvents = res.data.map((event) => {
        console.log(event._id);
        return {
          start: new Date(event.date),
          end: new Date(event.date),
          title: event.title,
          id: event._id
        }
      });
      this.setState({
        events: res.data,
        calendarEvents: calendarEvents
      });
      sessionStorage.setItem("events", JSON.stringify(res.data));
    }).catch((err) => {
      console.log(err);
    });
  }

  viewEvent = (id) => {
    this.setState({
      redirectTo: `/events/${id}`
    })
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
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

        <div className="container App">
        <h2>My Events</h2>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          views={['month', 'week', 'day']}
          events={this.state.calendarEvents}
          style={{ height: "100vh" }}
          onSelectEvent={(event) => this.viewEvent(event.id)}
        />
      </div>
      </React.Fragment>
    )
  }
}

export default Events;