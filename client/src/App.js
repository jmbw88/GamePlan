import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";
import Home from "../src/pages/Home";
import Profile from "../src/pages/Profile";
import Groups from "../src/pages/Groups";
import Events from "../src/pages/Events";
import Messages from "../src/pages/Messages";
import Search from "../src/pages/Search";
import SignUpForm from "../src/components/SignUpForm"
import LoginForm from "../src/components/LoginForm";
import NavBar from "../src/components/NavBar";
import EditProfileForm from "../src/components/EditProfileForm";


// TODO FIX SO THAT IF USER SESSION IS NOT ON SERVER IT REFLECTS THAT ON THE CLIENT
class App extends Component {
  constructor() {
    super();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userid = JSON.parse(sessionStorage.getItem("userid"));
    if(user && userid) {
      this.state = {
        loggedIn: true,
        username: user,
        userid: userid
      }
    }
    else {
      this.state = {
        loggedIn: false,
        username: null,
        userid: null
      }
      this.getUser();
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
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userid = JSON.parse(sessionStorage.getItem("userid"));
    if(user) {
      console.log("GET FROM SESSION STORAGE");
      console.log(user);
      this.setState({
        loggedIn: true,
        username: user,
        userid: userid
      });
    } else {
      console.log("GET FROM SERVER");
      Axios.get("/user").then((res) => {
        console.log("RES",res);
        if (res.data.user) {
          this.setState({
            loggedIn: true,
            username: res.data.user.username
          });
          sessionStorage.setItem("user", JSON.stringify(res.data.username));
        } else {
          this.setState({
            loggedIn: false,
            username: null
          });
        }
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <Router>
          <NavBar username={this.state.username} 
                  loggedIn={this.state.loggedIn} 
                  updateUser={this.updateUser} />
          {/* <div className="container"> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" render={() => <SignUpForm updateUser={this.updateUser}/>} />
              <Route exact path="/login" render={() => <LoginForm updateUser={this.updateUser}/>} />
              <Route exact path="/messages" render={() => <Messages updateUser={this.updateUser} loggedIn={this.state.loggedIn} username={this.state.username}/>} />
              <Route exact path="/profile" render={() => <Profile updateUser={this.updateUser} loggedIn={this.state.loggedIn} username={this.state.username}/>} />
              <Route exact path="/groups" render={() => <Groups updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>} />
              <Route exact path="/events" render={() => <Events updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>} />
              <Route exact path="/search" render={() => <Search updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>} />
              <Route exact path="/profile/edit" render={() => <EditProfileForm updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>} />
          </Switch>
        {/* </div> */}
      </Router>
    );
  }
}

export default App;
