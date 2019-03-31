import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";
import Home from "../src/pages/Home";
import SignUpForm from "../src/components/SignUpForm"
import LoginForm from "../src/components/LoginForm";
import NavBar from "../src/components/NavBar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser = (userObj) => {
    this.setState(userObj);
  }

  getUser = () => {
    Axios.get("/user").then((res) => {
      console.log(res.data.user);
      if (res.data.user) {
        this.setState({
          loggedIn: true,
          username: res.data.user.username
        });
      } else {
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }

  render() {
    console.log(this.state);
    return (
      <Router>
          <NavBar username={this.state.username} 
                  loggedIn={this.state.loggedIn} 
                  updateUser={this.updateUser} />
          <Switch>
          <div class="container">
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" render={() => <SignUpForm updateUser={this.updateUser}/>} />
            <Route exact path="/login" render={() => <LoginForm updateUser={this.updateUser}/>} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
