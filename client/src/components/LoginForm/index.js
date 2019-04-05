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
      <div className="row">
        <div className="col-12 mx-auto my-5">
          <div className="card">
            <div className="card-header">
             <h2 className="text-center">Login</h2>
            
            </div>
            <div className="card-body">
              {this.state.errorMsg ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.errorMsg}
                </div>
              ) : ""}
              <form>
                <div className="form-group">
                <label htmlFor="loginUsername">Username</label>
                <input type="text" 
                      id="loginUsername" 
                      placeholder="Enter username"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      className="form-control"
                      />
                </div>
                <div className="form-group">
                  <label htmlFor="loginPassword">Password</label>
                  <input type="password" 
                        id="loginPassword" 
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        className="form-control"
                  />
                </div>
                <button className="btn btn-primary float-right" onClick={this.handleSubmit}>Submit</button>
              </form>
              <p>Don't have an account? <Link to="/signup">Sign up here.</Link></p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default LoginForm;