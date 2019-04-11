import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

class Event extends Component {
  constructor(props) {
    super();
    const event = JSON.parse(sessionStorage.getItem("event"));
    if(event) {
      this.state = {
        title: event.title,
        description: event.description,
        date: event.date,
        zipcode: event.zipcode,
        createdBy: event.createdBy
      }
    }
    else {
      this.state = {
        title: null,
        description: null,
        date: null,
        zipcode: null,
        createdBy: null
      }
      
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.getEvent(params.id);
  }

  getEvent = (id) => {
    Axios.get(`/api/events/${id}`).then((res) => {
      console.log(res);
      this.setState({
        title: res.data.title,
        description: res.data.description,
        date: res.data.date,
        zipcode: res.data.zipcode,
        createdBy: res.data.createdBy
      });

      sessionStorage.setItem("event", JSON.stringify(res.data));
    }).catch((err) => {
      console.log(err);
    });
  }

  joinEvent = () => {
    const { match: { params } } = this.props;
    const id = params.id;
    Axios.put(`/api/user/${this.props.userid}/events/${id}`).then((res) => {
      console.log(res);
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
        <h1>Event</h1>
        <h2>{this.state.title}</h2>
        <p>{this.state.description}</p>
        <p>Date: {this.state.date}</p>
        <p>Zipcode: {this.state.zipcode}</p>
        {this.state.createdBy ? <p>Created by: <Link to={`/${this.state.createdBy._id}`}>{this.state.createdBy.account.username}</Link></p> : ""}
        <button className="btn btn-primary" onClick={this.joinEvent}>Join Event</button>
      </React.Fragment>
    )
  }
}

export default Event;