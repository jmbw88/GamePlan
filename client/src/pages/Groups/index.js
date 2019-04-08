import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

class Groups extends Component {
  constructor(props) {
    super();
    const groups = JSON.parse(sessionStorage.getItem("groups"));
    this.state = {};
    if(groups) {
      this.state = {
        groups: groups
      }
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
      this.getGroups();
  }

  getGroups = () => {      
    Axios.get(`/api/user/${this.props.userid}/groups`).then((res) => {
      console.log(res);
      this.setState({
        groups: res.data
      });
      sessionStorage.setItem("groups", JSON.stringify(res.data));
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
        <h1>Groups</h1>
        {this.state.groups ? this.state.groups.map((group) => (
          <div>
            <h4>{group.name}</h4>
            <p className="text-center">{group.description}</p>
            <p className="text-center">{group.zipcode}</p>
          </div>
        )) : ""}
      </React.Fragment>
    )
  }
}

export default Groups;