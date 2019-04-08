import React, { Component } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super();
    const profile = JSON.parse(sessionStorage.getItem("profile"));
    if(profile) {
      this.state = {
          name: profile.name,
          about: profile.about,
          sex: profile.sex,
          zipcode: profile.zipcode,
          img: profile.img
      }
    }
    else {
      this.state = {
          name: null,
          about: null,
          sex: null,
          zipcode: null,
          img: null
      }
      
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
    const { match: { params } } = this.props;
    console.log(params.username);
    this.getProfile(params.username);
  }

  componentWillReceiveProps(nextProps) {
    // get new user if route param changes
    const newLocation = nextProps.location.pathname;
    const oldLocation = this.props.location.pathname;
    if(newLocation !== oldLocation) {
      this.getProfile(newLocation.substr(newLocation.lastIndexOf("/") + 1));
    }
  }

  getProfile = (username) => {      
      Axios.get(`/api/user/username/${username}`).then((res) => {
          this.setState({
              name: res.data.profile.name,
              about: res.data.profile.about,
              sex: res.data.profile.sex,
              zipcode: res.data.profile.zipcode,
              img: res.data.profile.img
          });
          sessionStorage.setItem("profile", JSON.stringify(res.data.profile));
      }).catch((err) => {
          console.log(err);
      });
  }

  render() {
    if(!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    console.log(this.state, this.props);
    return (
      <React.Fragment>
        <h1>Profile</h1>
        <img className="float-left" src={this.state.img}></img>
        <p>{this.state.name}</p>
        <p>{this.state.about}</p>
        <p>{this.state.sex}</p>
        <p>{this.state.zipcode}</p>
        {this.props.username === this.props.match.params.username ? <Link to="/profile/edit">Edit</Link> : ""}
      </React.Fragment>
    )
  }
}

export default Profile;