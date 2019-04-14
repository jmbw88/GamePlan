import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import Calendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";

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
    const formComplete = Object.values(newEvent).every(val => val);
    if(formComplete) {
      Axios.post("/api/events", newEvent).then((res) => {
        const eventID = res.data._id;
        Axios.put(`/api/user/${this.props.userid}/events/${eventID}`).then((res) => {
          this.setState({
            redirectTo: `/events/${eventID}`
          });
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    }
    else {
      this.setState({
        errorMsg: "Please complete form"
      });
    }
  }

  getEvents = () => {      
    Axios.get(`/api/user/${this.props.userid}/events`).then((res) => {
      const calendarEvents = res.data.map((event) => {
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
    return (
      <React.Fragment>
        <body className="background" id ="eventsPage">
          <h2 className="newEvent">Create New Event</h2>
          <div id="signup-row" className="row justify-content-center align-items-center">
              <div id="signup-column" className="col-md-8">
                <div id="signup-box" className="col-md-12">
                  <form>
                  {this.state.errorMsg ? (
                    <div className="alert alert-danger" role="alert">
                      {this.state.errorMsg}
                    </div>) : ""}
                    <div className="form-group">
                      <h3 className="eventForm"> <label for="eventTitle">Event Name:</label><br/></h3>
                      <input id="eventTitle" 
                              placeholder="Title"
                              name="eventTitle"
                              value={this.state.eventTitle}
                              onChange={this.handleChange}
                              className="form-control"/>
                    </div>
                    <div className="form-group">
                    <h3 className="eventForm"><label for="eventDesc">Event Description:</label><br/></h3>
                      <input id="eventDesc" 
                              placeholder="Description"
                              name="eventDesc"
                              value={this.state.eventDesc}
                              onChange={this.handleChange}
                              className="form-control"/>
                    </div>
                    <div className="form-group">
                    <h3 className="eventForm"><label for="eventZip">Zipcode:</label><br/></h3>
                      <input id="eventZip" 
                              placeholder="Zipcode"
                              name="eventZip"
                              value={this.state.eventZip}
                              onChange={this.handleChange}
                              className="form-control"/>
                    </div>
                    <div className="form-group">
                    <h3 className="eventForm"> <label for="eventDateTime">Schedule Event:</label><br/> </h3>
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
                </div>
              </div>
            </div>

          <div className="container App">
            <h2 className="myEvents">My Events</h2>
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
        </body>
      </React.Fragment>
    )
  }
}

export default Events;