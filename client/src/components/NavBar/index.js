import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import "./style.css";

class Nav extends Component {
  constructor(props) {
    super();
    this.logout = this.logout.bind(this);
    this.state = {
      redirectTo: null
    }
  }

  logout = (event) => {
    event.preventDefault();
    Axios.post("/account/logout").then((res) => {
      if (res.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        });
        sessionStorage.clear();
        this.setState({
          redirectTo: "/"
        });
      }
    }).catch((err) => {
      console.log("Logout error");
      console.log(err);
    })
  }
  
  render() {
    // Triggers a warning so maybe figure out another way to do this :)
    if(this.state.redirectTo) {
      let redirect = this.state.redirectTo;
      this.setState({
        redirectTo: null
      })
      return <Redirect to={{ pathname: redirect }}/>
    }
    const loggedIn = this.props.loggedIn;
    return (
      <nav className="navbar navbar-expand-lg menu">
        <Link className="navbar-brand" to="/"><img src="assets/images/logo.png"/></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            {loggedIn ? (
              <React.Fragment>
                <li className="nav-item">
                  <p className="navbar-text m-0 px-1">Hi {this.props.username}!</p>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/messages">Messages</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/events">Events</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/groups">Groups</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search">Search</Link>
                </li>
                <li className="nav-item">
                  <p className="nav-link m-0" id="logout-link" onClick={this.logout}>Logout</p>
                </li>
                
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link menu" to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link menu" to="/login">Login</Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;