import React, { Component } from "react";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
import "./style.css";

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      errorMsg: "",
      redirectTo: null
    }
  }

  // Validate form on submit
  validateForm = () => {
    this.setState({
      errorMsg: ""
    });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email)){
      this.setState({
        errorMsg: "Email is invalid."
      });
      return false;
    }
    else if (this.state.email.length < 1 || this.state.username.length < 1) {
      this.setState({
        errorMsg: "All fields are required."
      });
      return false;
    }
    else if (this.state.password.length < 8) {
      this.setState({
        errorMsg: "Password must be at least 8 characters."
      });
      return false;
    }
    else if (this.state.password.search(/[a-z]/i) < 0) {
      this.setState({
        errorMsg: "Password must contain at least one letter."
      });
      return false;
    }
    else if (this.state.password.search(/[0-9]/) < 0) {
      this.setState({
        errorMsg: "Password must contain at least one digit."
      });
      return false;
    }
    else if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errorMsg: "Passwords must match."
      });
      return false;
    }
    return true;
  }

  passwordsMatch = () => (
    this.state.password.length > 0 &&
    this.state.password === this.state.confirmPassword
  );

  handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "username") {
      value = value.substring(0,15);
    }
    this.setState( {
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.validateForm()) {
      Axios.post("/account", {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }).then((res) => {
        console.log(res);
        if(!res.data.error) {
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
                redirectTo: `/${res.data.id}`
              });
            }
          }).catch((err) => {
            console.log("Server Login Error");
            console.log(err);
          });
        }
        else {
          console.log("Sign-up error");
          this.setState({
            errorMsg: res.data.error
          });
        }
      }).catch((err) => {
        console.log("Sign up server error");
        console.log(err);
      });
    }
  }

  render() {
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    }
    return (
      <div id="signup">
        {/* <div id="logo">
            <img src="assets/images/logo2.png"/>
        </div> */}
        <div className="container">
            <div id="signup-row" className="row justify-content-center align-items-center">
                <div id="signup-column" className="col-md-6">
                    <div id="signup-box" className="col-md-12">
                        <form id="signup-form" className="form p-1" action="" method="post">
                                <h3>Fill out the form <br></br>to get started!</h3>
                                {this.state.errorMsg ? (
                                  <div className="alert alert-danger" role="alert">
                                    {this.state.errorMsg}
                                  </div>
                                ) : ""}
                                    <div id="signup-form">
                                        <div className="form-group" id="email">
                                          <label htmlFor="inputEmail">Email Address</label>
                                          <input type="email" 
                                                id="inputEmail" 
                                                placeholder="Enter email"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                className="form-control"
                                          />
                                            {/* <label for="email" className="text-info">Email Address:</label><br/>
                                            <input type="text" name="email" id="email" className="form-control"/> */}
                                        </div>
                                        <div className="form-group" id="username">
                                          <label htmlFor="inputUsername">Username</label>
                                          <input type="text" 
                                                id="inputUsername" 
                                                placeholder="Enter username"
                                                name="username"
                                                value={this.state.username}
                                                onChange={this.handleChange}
                                                className="form-control"
                                          />
                                            {/* <label for="username" className="text-info">Username:</label><br/>
                                            <input type="text" name="username" id="username" className="form-control"/> */}
                                        </div>
                                        <div className="form-group" id="password">
                                          <label htmlFor="inputPassword">Password</label>
                                          <input type="password" 
                                                id="inputPassword" 
                                                aria-describedby="passwordHelp"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                                className={"form-control" + (this.passwordsMatch() ? " border border-success" : "")}
                                          />
                                          <small id="passwordHelp" className="form-text text-muted">Password must be at least 8 characters</small>
                                            {/* <label for="password" className="text-info">Password:</label><br/>
                                            <input type="password" name="password" id="password" className="form-control"/> */}
                                        </div>
                                        <div className="form-group" id="password">
                                          <label htmlFor="confirmPassword">Confirm Password</label>
                                          <input type="password" 
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={this.confirmPassword}
                                                onChange={this.handleChange}
                                                className={"form-control" + (this.passwordsMatch() ? " border border-success" : "")}
                                          />
                                          {this.passwordsMatch() ? (
                                            <small className="form-text text-success">Passwords match</small>
                                          ) : ""}
                                            {/* <label for="password" className="text-info">Confirm Password:</label><br/>
                                            <input type="password" name="password" id="password" className="form-control"/> */}
                                        </div>
                                    </div>
                                    <div className="submitBtn">
                                      <button className="btn btn-info btn-md float-right mb-2" onClick={this.handleSubmit}>Sign Up</button>
                                    </div>
                                    {/* <p>Already have an account? <Link to="/login">Login here.</Link></p> */}
                                    <div id="signIn" className="text-center">
                                        <Link to="/login" className="text-info sign-up">Already have an account? Login here!</Link>
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

export default SignUpForm;