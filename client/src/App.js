import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "../src/components/SignUp"

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <div class="container">
            {/* Temporary */}
            <Route exact path="/" render={() => <SignUp />} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
