import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
// import "./style.css";

class AddGameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getGames();
  }

  getGames = () => {
    Axios.get("/api/games").then((res) => {
      console.log(res);
      this.setState({
        games: res.data
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  addGame = (id) => {
    Axios.put(`/api/user/${this.props.userid}/games/${id}`).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    if(!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    return (
      <React.Fragment>
        <h1>Add game</h1>
          {this.state.games ? this.state.games.map((game) => (
            <React.Fragment>
              <p>{game.title}</p> 
              <button className="btn btn-primary" onClick={() => this.addGame(game._id)}>Add</button>
            </React.Fragment>
          )) : ""}
      </React.Fragment>
    );
  }
}

export default AddGameForm;