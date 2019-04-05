import React, { Component } from "react";
import Axios from "axios";

class Profile extends Component {
  constructor(props) {
    super();
    const profile = JSON.parse(sessionStorage.getItem("profile"));
    if(profile) {
      this.state = {
          name: profile.name,
          about: profile.about,
          sex: profile.sex,
          zipcode: profile.zipcode
      }
    }
    else {
      this.state = {
          name: null,
          about: null,
          sex: null,
          zipcode: null
      }
      
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
      this.getProfile();
  }

  getProfile = () => {
      console.log(this.props.loggedIn);
      
      if(this.props.loggedIn) {
        Axios.get(`/api/user/username/${this.props.username}`).then((res) => {
            this.setState({
                name: res.data.profile.name,
                about: res.data.profile.about,
                sex: res.data.profile.sex,
                zipcode: res.data.profile.zipcode
            });
            sessionStorage.setItem("profile", JSON.stringify(res.data.profile));
        }).catch((err) => {
            console.log(err);
        });
      }
  }

  render() {
    // console.log(this.props.location.query);
    // console.log(this.state.profile);
    return (
      <React.Fragment>
        <h1>Profile</h1>
        <p>{this.state.name}</p>
        <p>{this.state.about}</p>
        <p>{this.state.sex}</p>
        <p>{this.state.zipcode}</p>
        {/* <p>{this.state.profile.about}</p>
        <p>{this.state.profile.name}</p>
        <p>{this.state.profile.sex}</p>
        <p>{this.state.profile.zipcode}</p> */}
      </React.Fragment>
    )
  }
}

export default Profile;