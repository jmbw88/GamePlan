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
        <Switch>
          <div class="container">
          {/* JUST TESTING */}
            {this.state.loggedIn ? <p>Hello {this.state.username}</p> : ""}
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/login" render={() => <LoginForm updateUser={this.updateUser}/>} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
