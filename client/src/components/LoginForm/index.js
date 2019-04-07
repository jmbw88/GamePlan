import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
import "./style.css";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirectTo: null
    }
  }

  handleChange = (event) => {
    this.setState( {
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      errorMsg: ""
    });
    Axios.post("/account/login", {
      username: this.state.username,
      password: this.state.password
    })
    .then((res) => {
      if(res.status === 200) {
        this.props.updateUser({
          loggedIn: true,
          username: res.data.username
        });
        sessionStorage.setItem("user", JSON.stringify(res.data.username));
        sessionStorage.setItem("userid", JSON.stringify(res.data.id));
        this.setState({
          redirectTo: "/profile"
        });
      }
    }).catch((err) => {
      console.log(err);
      this.setState({
        errorMsg: "Login failed."
      });
    });
  }
  render() {
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    }
    return (

      
      <div id="login">
      <div id="logo">
          <img src="assets/images/logo2.png"/>
      </div>
      <div className="container">
          <div id="login-row" className="row justify-content-center align-items-center">
              <div id="login-column" className="col-md-6">
                  <div id="login-box">
                      <form id="login-form" className="form" action="" method="post">
                          <h3 className="text-center text-info">Sign In</h3>
                          {this.state.errorMsg ? (
                            <div classNameName="alert alert-danger" role="alert">
                              {this.state.errorMsg}
                            </div>) : ""}
                          <div className="form-group">
                              <label for="loginUsername" className="text-info">Username:</label><br/>
                              <input id="loginUsername" 
                                    placeholder="Enter username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    classNameName="form-control"/>
                          </div>
                          <div className="form-group">
                              <label for="password" className="text-info">Password:</label><br/>
                              <input type="password" 
                                      id="loginPassword" 
                                      name="password"
                                      value={this.state.password}
                                      onChange={this.handleChange}
                                      classNameName="form-control"/>
                          </div>
                          <div className="submitBtn">
                            <button classNameName="btn btn-info float-right mb-2" onClick={this.handleSubmit}>Submit</button>
                          </div>
                          <div id="signUp" className="text-center">
                              <Link to="/signup" className="text-info">New to GamePlan? Sign Up here!</Link>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
    );
  }
}

export default LoginForm;