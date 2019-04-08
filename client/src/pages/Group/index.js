import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

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
          zipcode: group.zipcode
      }
    }
    else {
      this.state = {
        name: null,
        description: null,
        admins: null,
        events: null,
        zipcode: null
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
        zipcode: res.data.zipcode
      });

      sessionStorage.setItem("group", JSON.stringify(res.data));
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
        <h1>Group</h1>
        <h2>{this.state.name}</h2>
        <p>{this.state.description}</p>
        <p>{this.state.zipcode}</p>
        <h2>Events</h2>
        {this.state.events ? this.state.events.map((event) => (
          // TODO ADD LINK TO EVENT PAGE
          <React.Fragment>
            <p><Link to={`/events/${event._id}`}>{event.title}</Link></p>
            <p>{event.date}</p>
          </React.Fragment>
        )) : <p>No events</p>}
        <h2>Admins</h2>
        {this.state.admins ? this.state.admins.map((admin) => (
          <p><Link to={`/${admin._id}`}>{admin.account.username}</Link></p>
        )) : <p>No admins</p>}
      </React.Fragment>
    )
  }
}

export default Group;