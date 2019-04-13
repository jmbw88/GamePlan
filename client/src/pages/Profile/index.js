import React, { Component } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "./style.css";

class Profile extends Component {
  constructor(props) {
    super();
    const profile = JSON.parse(sessionStorage.getItem("profile"));
        this.state = {
            name: null,
            about: null,
            sex: null,
            zipcode: null,
            img: null,
            
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
              username: res.data.account.username,
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

  messageUser = (event) => {
    event.preventDefault();
    event.preventDefault();
    const message = {
      to: this.props.match.params.id,
      from: this.props.userid,
      body: `${this.props.username} wants to start a conversation!`,
    }
    Axios.post("/api/messages", message).then((res) => {
      this.setState({
        redirectTo: "/messages"
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    
    if(!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    }
    console.log(this.props.userid, this.props.match.params.id);
    return (
      <React.Fragment>
        <div id="profile">
          <div className="block container">
                  <div className="block profile-card">
                  {/* <div className="message-button">
                    <button type="button" className="btn btn-secondary" id="messageBtn">
                    <i className="far fa-envelope fa-sm"></i> Message Me</button>
                  </div> */}
                      {/* <div className="message-button">
                          <button type="button" className="btn btn-secondary" id="messageBtn">
                              <i className="far fa-envelope fa-2x"></i>
                              <div className="button-text">Message Me</div>
                          </button></div> */}

                      <div className="profile-pic" 
                           id="profile_pic"
                           style={ { backgroundImage: `url(${this.state.img || "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png"})` }}
                      />
                      <div className="block profile-name-container">
                          <div className="block user-name" id="user_name">{this.state.username}</div>
                          <div className="block first-name" id="first_name">{this.state.name}</div>
                          <div className="block user-desc" id="user_description">{this.state.about}</div>
                          <div className="block user-location" id="user_location">{this.state.zipcode}</div>
                    {this.props.userid === this.props.match.params.id ? (
                      <React.Fragment>
                        <button type="button" className="btn m-2 profile-btn">
                          <Link className="btn-link" to="/profile/addGame">
                            <i className="fas fa-dice-five fa-sm"></i> Add Game
                          </Link>
                        </button>
                        <button type="button" className="btn m-2 profile-btn">
                        <Link className="btn-link" to="/profile/edit">
                            <i className="fas fa-user fa-sm"></i> Edit Profile
                        </Link>
                        </button>
                      </React.Fragment>
                    ) : (
                      <button type="button" className="btn m-2 profile-btn" onClick={this.messageUser}>
                        <i className="far fa-envelope fa-sm"></i> Message Me</button>
                    )}
                      </div>
                  </div>

                  <div className="block content" id="fave-games">
                      <br/>
                      <h4 align="center">My Favorite Games:</h4>
                      <br/>
                      {this.state.games ? this.state.games.map((game) => (
                        // <p><Link to={`/games/${game._id}`}>{game.title}</Link></p>
                        <Link to={`/games/${game._id}`}>
                          <div className="inline image" 
                               title={game.title} 
                               style={ { backgroundImage: `url(${game.img || "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png"})` }}/>
                        </Link>
                      )) : ""}
                      {/* <div className="inline image" id="game-1"></div>
                      <div className="inline image" id="game-2"></div>
                      <div className="inline image" id="game-3"></div> */}
                  </div>
            
              {/* <div className="block container text-left">
                  <div className="block events-card">
                      <div className="row">
                          <div className="column col-md-6">
                              <h4 align="center">My Upcoming Events:</h4>
                              <br/>
                              <ul>
                                  <li>
                                      <div className="block event"><a href="#">Event Title</a></div>
                                  </li>
                                  <li>
                                      <div className="block event"><a href="#">Event Title</a></div>
                                  </li>
                                  <li>
                                      <div className="block event"><a href="#">Event Title</a></div>
                                  </li>
                              </ul>
                          </div>
                          <div className="column col-md-6">
                              <h4 align="center">My Groups:</h4>
                              <br/>
                              <ul>
                                  <li>
                                      <div className="block event"><a href="#">Group Name</a></div>
                                  </li>
                                  <li>
                                      <div className="block event"><a href="#">Group Name</a></div>
                                  </li>
                                  <li>
                                      <div className="block event"><a href="#">Group Name</a></div>
                                  </li>

                              </ul>
                          </div>
                      </div>
                  </div>
              </div> */}
            </div>
        
        </div>
        </React.Fragment>
        /* <h1>Profile</h1>
        {this.state.img ? <img className="float-left" src={this.state.img}></img> : ""}
        {this.state.name ? <p>{this.state.name}</p> : ""}
        {this.state.about ? <p>{this.state.about}</p> : ""}
        {this.state.sex ? <p>{this.state.sex}</p> : ""}
        {this.state.zipcode ? <p>{this.state.zipcode}</p> : ""}
        {this.state.games ? this.state.games.map((game) => (
          <p><Link to={`/games/${game._id}`}>{game.title}</Link></p>
        )) : ""}
        
        {this.props.userid === this.props.match.params.id ? (
          <React.Fragment>
            <Link to="/profile/edit">Edit</Link><br></br> 
            <Link to="/profile/addGame">Add Game</Link>
          </React.Fragment>
        ): ""} */
    )
  }
}

export default Profile;