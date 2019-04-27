import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import logo from "../../assets/images/logo.png";
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

  setActive = (event) => {
    // console.log(event.currentTarget.id);
    // console.log(document.querySelectorAll(".page-nav"));
    // if(event.currentTarget.id === "nav-msg") {
    //   this.props.updateUser({
    //     unread: 0
    //   });
    // }
    document.querySelectorAll(".page-nav").forEach((nav) => {
      nav.classList.remove("active");
    });
    event.currentTarget.classList.add("active");
  }

  /*
    When the user logs in, we want to get the number of unread messages and set the state of the navbar
  */

  // getUnread = () => {
    // Axios.get(`/api/messages/unread/${this.props.userid}`).then((res) => {
    //   console.log(res.data);
    //   this.setState({
    //     unread: res.data
    //   });
    // });
  // }
  
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
    console.log(this.props);
    return (
      <nav className="navbar navbar-expand-lg menu justify-content-end">
        <div className="navLogo justify-content-start">
          <Link className="navbar-brand" to="/"><img src={logo}/></Link>
        </div>
        <div className="floatRight">
        <button className="navbar-toggler" id="navButton" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
          
          {loggedIn ? (
            <React.Fragment>
                {/* {(this.state.unread || window.location.pathname === "/messages") || this.getUnread()}   */}
                <li className="nav-item">
                  <p className="navbar-text m-0 px-1 username">Hi {this.props.username}!</p>
                </li>
                <li className="nav-item">
                  <Link className="nav-link page-nav" onClick={this.setActive} to={`/${this.props.userid}`}>Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link page-nav" id="nav-msg" onClick={this.setActive} to="/messages">Messages {this.props.unread ? <span className="badge badge-danger unread">{this.props.unread}</span> : ""}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link page-nav" onClick={this.setActive} to="/events">Events</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link page-nav" onClick={this.setActive} to="/groups">Groups</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link page-nav" onClick={this.setActive} to="/search">Search</Link>
                </li>
                <li className="nav-item">
                  <p className="nav-link m-0 logout" id="logout-link" onClick={this.logout}>Sign Out</p>
                </li>
                
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link menu" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link menu" to="/login">Sign In</Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
        </div>
      </nav>
    )
  }
}

export default Nav;