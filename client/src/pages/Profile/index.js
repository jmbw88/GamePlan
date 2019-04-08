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
      this.getProfile();
  }

  getProfile = () => {      
      Axios.get(`/api/user/username/${this.props.username}`).then((res) => {
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
    return (
      <React.Fragment>
        <h1>Profile</h1>
        <img className="float-left" src={this.state.img}></img>
        <p>{this.state.name}</p>
        <p>{this.state.about}</p>
        <p>{this.state.sex}</p>
        <p>{this.state.zipcode}</p>
        <Link to="/profile/edit">Edit</Link>
      </React.Fragment>
    )
  }
}

export default Profile;