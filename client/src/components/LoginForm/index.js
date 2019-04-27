import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

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
      console.log(res.data);
      const userid = res.data.id;
      const username = res.data.username;
      if(res.status === 200) {
        Axios.get(`/api/messages/unread/${userid}`).then((res) => {
          console.log(res.data);
          this.props.updateUser({
            loggedIn: true,
            username: username,
            userid: userid,
            unread: res.data
          });
          sessionStorage.setItem("user", JSON.stringify(username));
          sessionStorage.setItem("userid", JSON.stringify(userid));
          this.setState({
            redirectTo: `/${userid}`
          });
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
      <div className="container">
          <div id="signup-row" className="row justify-content-center align-items-center">
                <div id="signup-column" className="col-md-6">
                    <div id="signup-box" className="col-md-12">
                        <form id="signup-form" className="form p-1" action="" method="post">
                          <h3 className="text-center">Sign In</h3>
                          {this.state.errorMsg ? (
                            <div className="alert alert-danger" role="alert">
                              {this.state.errorMsg}
                            </div>) : ""}
                          <div className="form-group ">
                              <label for="loginUsername">Username</label><br/>
                              <input id="loginUsername" 
                                    placeholder="Enter username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    className="form-control"/>
                          </div>
                          <div className="form-group">
                              <label for="password">Password</label><br/>
                              <input type="password" 
                                      id="loginPassword" 
                                      name="password"
                                      value={this.state.password}
                                      onChange={this.handleChange}
                                      className="form-control"/>
                          </div>
                          <div className="submitBtn">
                            <button className="btn btn-info float-right mb-2" onClick={this.handleSubmit}>Submit</button>
                          </div>
                          <div id="signUp" className="text-center">
                              <Link to="/signup" className="sign-up">New to GamePlan? Sign Up here!</Link>
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