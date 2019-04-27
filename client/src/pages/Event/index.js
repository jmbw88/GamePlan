import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

class Event extends Component {
  constructor(props) {
    super();
    this.state = {
      title: null,
      description: null,
      date: null,
      zipcode: null,
      createdBy: null
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.getEvent(params.id);
  }

  getEvent = (id) => {
    Axios.get(`/api/user/${this.props.userid}/events`).then((res) => {
      if (res.status === 403) {
        this.setState({
          redirectTo: "/login"
        });
      } else {
        const userEvents = res.data;
        const userJoinedEvent = userEvents.some((event) => {
          return event._id === id
        });
        if(userJoinedEvent) {
          this.setState({
            userJoined: true
          });
        } else {
          this.setState({
            userJoined: false
          });
        }
      }
    }).catch((err) => {
      console.log(err);
    });
    Axios.get(`/api/events/${id}`).then((res) => {
      this.setState({
        title: res.data.title,
        description: res.data.description,
        date: res.data.date,
        zipcode: res.data.zipcode,
        createdBy: res.data.createdBy
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  joinEvent = () => {
    const { match: { params } } = this.props;
    const id = params.id;
    Axios.put(`/api/user/${this.props.userid}/events/${id}`).then((res) => {
      if(res.status === 403) {
        this.setState({
          redirectTo: "/login"
        });
      } else {
        this.setState({
          redirectTo: `/events/`
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    if(!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname : this.state.redirectTo }}/>
    }
    return (
      <React.Fragment>

        <body className="background">
            <div id="signup-row" className="row justify-content-center align-items-center">
              <div id="signup-column" className="col-md-8">
              <h3 className="newEvent">Event</h3>
                <div id="signup-box" className="col-md-12">
                  <h3 className="eventForm col-md-12">{this.state.title}</h3>
                  <p className="description col-md-12">{this.state.description}</p>
                  <div className="date col-md-4">
                    <h4>Date:</h4>
                    <p>{this.state.date}</p>
                  </div>

                  <div className="zip col-md-4">
                    <h4>Zipcode:</h4>
                    <p>{this.state.zipcode}</p>
                  </div>

                  <div className="creator col-md-4">
                    <h4>Creator: </h4>
                    {this.state.createdBy ? <p> <Link to={`/${this.state.createdBy._id}`}>{this.state.createdBy.account.username}</Link></p> : ""}
                  </div>


                  <div id="button-row" className="row justify-content-center align-items-center">
                    {!this.state.userJoined ? (
                      <button className="eventBtn btn btn-primary" onClick={this.joinEvent}>Join Event</button>
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

export default Event;