import React, { Component } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super();
    // TODO FIX ISSUE WHERE IF USER DOESNT HAVE PROFILE IT SHOWS OLD PROFILE
    const profile = JSON.parse(sessionStorage.getItem("profile"));
    // if(profile) {
    //   this.state = {
    //       name: profile.name,
    //       about: profile.about,
    //       sex: profile.sex,
    //       zipcode: profile.zipcode,
    //       img: profile.img
    //   }
    // }
    // else {
      
    // }
        this.state = {
            name: null,
            about: null,
            sex: null,
            zipcode: null,
            img: null
        }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
    const { match: { params } } = this.props;
    console.log(params.id);
    this.getProfile(params.id);
  }

  componentWillReceiveProps(nextProps) {
    // get new user if route param changes
    const newLocation = nextProps.location.pathname;
    const oldLocation = this.props.location.pathname;
    if(newLocation !== oldLocation) {
      this.getProfile(newLocation.substr(newLocation.lastIndexOf("/") + 1));
    }
  }

  getProfile = (id) => {      
      Axios.get(`/api/user/${id}`).then((res) => {
        console.log(res);
        if(res.data.profile) {
          this.setState({
              name: res.data.profile.name,
              about: res.data.profile.about,
              sex: res.data.profile.sex,
              zipcode: res.data.profile.zipcode,
              img: res.data.profile.img,
              games: res.data.games
          });
          sessionStorage.setItem("profile", JSON.stringify(res.data.profile));
        }
      }).catch((err) => {
          console.log(err);
      });
  }

  render() {
    if(!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    console.log(this.props.userid, this.props.match.params.id);
    return (
      <React.Fragment>
        <h1>Profile</h1>
        {this.state.img ? <img className="float-left" src={this.state.img}></img> : ""}
        {this.state.name ? <p>{this.state.name}</p> : ""}
        {this.state.about ? <p>{this.state.about}</p> : ""}
        {this.state.sex ? <p>{this.state.sex}</p> : ""}
        {this.state.zipcode ? <p>{this.state.zipcode}</p> : ""}
        {this.state.games ? this.state.games.map((game) => (
          <p>{game.title}</p>
        )) : ""}
        
        {this.props.userid === this.props.match.params.id ? (
          <React.Fragment>
            <Link to="/profile/edit">Edit</Link><br></br> 
            <Link to="/profile/addGame">Add Game</Link>
          </React.Fragment>
        ): ""}
      </React.Fragment>
    )
  }
}

export default Profile;