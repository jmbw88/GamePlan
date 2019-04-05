import React, { Component } from "react";
import Axios from "axios";

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
        profile: null
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
            console.log(res);
            this.setState({
                profile: res.data.profile
            });
        }).catch((err) => {
            console.log(err);
        });
      }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Profile</h1>
      </React.Fragment>
    )
  }
}

export default Profile;