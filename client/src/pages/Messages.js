import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

class Messages extends Component {
  constructor(props) {
    super();
    // this.state = {
    //     profile: null
    // }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
    this.getContacts();
  }
  
  getContacts = () => {

  }

//   getProfile = () => {
//       console.log(this.props.loggedIn);
//       if(this.props.loggedIn) {
//         Axios.get(`/api/user/username/${this.props.username}`).then((res) => {
//             console.log(res);
//             this.setState({
//                 profile: res.data.profile
//             });
//         }).catch((err) => {
//             console.log(err);
//         });
//       }
//   }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    return (
      <React.Fragment>
        <h1>Messages</h1>
      </React.Fragment>
    )
  }
}

export default Messages;