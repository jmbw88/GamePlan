import React, { Component } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";

class Game extends Component {
  constructor(props) {
    super();
    this.state = {
      title: "",
      difficulty: "",
      length: "",
      uniqueness: "",
      cooperative: "",
      img: null
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.getGame(params.id);
  }

  getGame = (id) => {
    Axios.get(`/api/games/${id}`).then((res) => {
      console.log(res);
      this.setState({
        title: res.data.title,
        difficulty: res.data.description.difficulty,
        length: res.data.description.length,
        uniqueness: res.data.description.uniqueness,
        cooperative: res.data.description.cooperative,
        img: res.data.img
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.title}</h1>
        {this.state.img ? <img src={this.state.img} alt="game-image"/> : ""}
        <p>{this.state.difficulty}</p>
        <p>{this.state.length}</p>
        <p>{this.state.uniqueness}</p>
        <p>{this.state.cooperative ? "Cooperative" : ""}</p>
      </React.Fragment>

    )
  }
}

export default Game;