import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

class Group extends Component {
  constructor(props) {
    super();
    this.state = {
      name: null,
      description: null,
      admins: null,
      events: null,
      zipcode: null,
      id: null
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    this.getGroup(params.id);
  }

  getGroup = (id) => {
    Axios.get(`/api/user/${this.props.userid}`).then((res) => {
      console.log("user groups: ", res.data.groups);
      const userGroups = res.data.groups;
      const userJoinedGroup = userGroups.some((group) => {
        return group._id === id
      });
      if(userJoinedGroup) {
        console.log("USER JOINED GROUP");
        this.setState({
          userJoined: true
        });
      } else {
        console.log("USER HAS NOT JOINED GROUP");
        this.setState({
          userJoined: false
        });
      }
    }).catch((err) => {
      console.log(err);
    });
    Axios.get(`/api/groups/${id}`).then((res) => {
      this.setState({
        name: res.data.name,
        description: res.data.description,
        admins: res.data.admins,
        events: res.data.events,
        zipcode: res.data.zipcode,
        id: res.data._id
      });

      // sessionStorage.setItem("group", JSON.stringify(res.data));
    }).catch((err) => {
      console.log(err);
    });
  }

  joinGroup = () => {
    const { match: { params } } = this.props;
    const id = params.id;
    Axios.put(`/api/user/${this.props.userid}/groups/${id}`).then((res) => {
      this.setState({
        redirectTo: "/groups"
      });
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
    const formComplete = Object.values(newEvent).every(val => val);
    if(formComplete) {
      Axios.post("/api/events", newEvent).then((res) => {
        const eventID = res.data._id;
        Axios.put(`/api/user/${this.props.userid}/events/${res.data._id}`).then((res) => {
          Axios.put(`/api/groups/${this.state.id}/events/${eventID}`).then((res) => {
            this.setState({
              redirectTo: `/events/${eventID}`
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
    } else {
      this.setState({
        errorMsg: "Please complete form"
      });
    }
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
    return (
      <React.Fragment>
        <body className="background">

          <div id="signup-row" className="row justify-content-center align-items-center">
              <div id="signup-column" className="col-md-8">
              <h3 className="newEvent">Create Group Event</h3>
                <div id="signup-box" className="col-md-12">
                  <form>
                  {this.state.errorMsg ? (
                    <div className="alert alert-danger" role="alert">
                      {this.state.errorMsg}
                    </div>) : ""}
                    <div className="form-group">
                    <h3 className="eventForm"> <label for="eventTitle">Group Name:</label><br/></h3>
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
                    <h3 className="eventForm"> <label for="eventZip">Zipcode:</label><br/></h3>
                      <input id="eventZip" 
                              placeholder="Zipcode"
                              name="eventZip"
                              value={this.state.eventZip}
                              onChange={this.handleChange}
                              className="form-control"/>
                    </div>
                    <div className="form-group">
                    <h3 className="eventForm"><label for="eventDateTime">Schedule Event:</label><br/></h3>
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
                  <h3 className="newEvent">{this.state.name}</h3>
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
                    {!this.state.userJoined ? (
                        <button className="btn btn-primary" onClick={this.joinGroup}>Join Group</button>
                      ) : ""}
                    
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