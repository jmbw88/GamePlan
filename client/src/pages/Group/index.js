import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
import "./style.css";

class Group extends Component {
  constructor(props) {
    super();
    const group = JSON.parse(sessionStorage.getItem("group"));
    if(group) {
      this.state = {
          name: group.name,
          description: group.description,
          admins: group.admins,
          events: group.events,
          zipcode: group.zipcode,
          id: group._id
      }
    }
    else {
      this.state = {
        name: null,
        description: null,
        admins: null,
        events: null,
        zipcode: null,
        id: null
      }
      
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    this.getGroup(params.id);
  }

  getGroup = (id) => {
    Axios.get(`/api/groups/${id}`).then((res) => {
      console.log(res);
      this.setState({
        name: res.data.name,
        description: res.data.description,
        admins: res.data.admins,
        events: res.data.events,
        zipcode: res.data.zipcode,
        id: res.data._id
      });

      sessionStorage.setItem("group", JSON.stringify(res.data));
    }).catch((err) => {
      console.log(err);
    });
  }

  joinGroup = () => {
    const { match: { params } } = this.props;
    const id = params.id;
    Axios.put(`/api/user/${this.props.userid}/groups/${id}`).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
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
      const eventID = res.data._id;
      Axios.put(`/api/user/${this.props.userid}/events/${res.data._id}`).then((res) => {
        console.log(res);
        Axios.put(`/api/groups/${this.state.id}/events/${eventID}`).then((res) => {
          console.log(res);
          this.setState({
            redirectTo: `/events/${res.data._id}`
          });
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  handleChange = (event) => {
    this.setState( {
      [event.target.name]: event.target.value
    });
  }

  render() {
    if(!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    }
    console.log(this.state);
    return (
      <React.Fragment>
        <body className="background">
          <h2 className="newEvent">Create Group Event</h2>

          <div id="signup-row" className="row justify-content-center align-items-center">
              <div id="signup-column" className="col-md-8">
                <div id="signup-box" className="col-md-12">
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
                </div>
              </div>
            </div> 

            <div id="signup-row" className="row justify-content-center align-items-center">
              <div id="signup-column" className="col-md-8">
                <div id="signup-box" className="group-box col-md-12">
                  <h3 className="groupName">{this.state.name}</h3>
                  <p className="text-center groupDescription">{this.state.description}</p>
                  <p className="text-center groupDescription">{this.state.zipcode}</p>

                  <div class="groupEvents col-md-6">
                    <h4>Events</h4>
                    {this.state.events ? this.state.events.map((event) => (
                      <React.Fragment>
                        <p><Link to={`/events/${event._id}`}>{event.title}</Link></p>
                        <p>{event.date}</p>
                      </React.Fragment>
                    )) : <p>No events</p>}
                  </div>

                  <div class="groupAdmins col-md-6">
                    <h4>Admins</h4>
                    {this.state.admins ? this.state.admins.map((admin) => (
                      <p><Link to={`/${admin._id}`}>{admin.account.username}</Link></p>
                    )) : <p>No admins</p>}
                  </div>

                  <div className="submitBtn">
                    <button className="btn btn-primary" onClick={this.joinGroup}>Join Group</button>
                  </div>
                </div>
              </div>
            </div>

        </body>
      </React.Fragment>
    
    )
  }
}

export default Group;