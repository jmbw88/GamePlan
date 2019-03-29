import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import "./style.css";

class SignUp extends Component {
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
		console.log('sign-up-form, username: ');
		console.log(this.state.username);
		//request to server here
		Axios.post('/user/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response);
				if (!response.data.errmsg) {
					console.log('successful signup');
					this.setState({
						redirectTo: '/login'
					});
				} else {
					console.log('username already taken');
				}
			});
    // event.preventDefault();
    // if(this.validateForm()) {
    //   Axios.post("/user", {
    //     email: this.state.email,
    //     username: this.state.username,
    //     password: this.state.password
    //   }).then((res) => {
    //     if(!res.data.error) {
    //       Axios.post("/user/login", {
    //         username: this.state.username,
    //         password: this.state.password
    //       })
    //       .then((res) => {
    //         if(res.status === 200) {
    //           this.props.updateUser({
    //             loggedIn: true,
    //             username: res.data.username
    //           });
    //           this.setState({
    //             redirectTo: "/"
    //           });
    //         }
    //       }).catch((err) => {
    //         console.log("Server Login Error");
    //         console.log(err);
    //       });
    //     }
    //     else {
    //       console.log("Sign-up error");
    //       this.setState({
    //         errorMsg: res.data.error
    //       });
    //     }
    //   }).catch((err) => {
    //     console.log("Sign up server error");
    //     console.log(err);
    //   });
    // }
  }

  render() {
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    }
    return (
      <div className="row">
        <div className="col-12 mx-auto my-5">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Sign Up</h2>
            </div>
            <div className="card-body">
              {this.state.errorMsg ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.errorMsg}
                </div>
              ) : ""}
              <form>
                <div className="form-group">
                  <label htmlFor="inputEmail">Email Address</label>
                  <input type="email" 
                         id="inputEmail" 
                         placeholder="Enter email"
                         name="email"
                         value={this.state.email}
                         onChange={this.handleChange}
                         className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputUsername">Username</label>
                  <input type="text" 
                        id="inputUsername" 
                        placeholder="Enter username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        className="form-control"
                  />
                </div>
                <div className="form-group">
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
                </div>
                <div className="form-group">
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
                </div>
                <button className="btn btn-primary float-right" onClick={this.handleSubmit}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;