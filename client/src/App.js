import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";
import Home from "../src/pages/Home";
import SignUpForm from "../src/components/SignUpForm"
import LoginForm from "../src/components/LoginForm";

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
      if (res.data.user) {
        this.setState({
          loggedIn: true,
          username: res.data.user.account.username
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
    return (
      <Router>
        <Switch>
          <div class="container">
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/login" render={() => <LoginForm />} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
