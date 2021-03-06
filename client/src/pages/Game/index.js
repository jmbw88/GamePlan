import React, { Component } from "react";
import Axios from "axios";

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
      // console.log(res);
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
        <div className="background">
          <div id="signup-row" className="row justify-content-center align-items-center">
            <div id="signup-column" className="col-md-8">
            <h3 className="newEvent">{this.state.title}</h3>
              {this.state.img ? <img className="game-img" src={this.state.img} alt="Game Art"/> : ""}
              <div id="signup-box" className="game-box col-md-12">
                <div className="difficulty col-md-3">
                  <h4>Difficulty:</h4>
                  <p>{this.state.difficulty}</p>
                </div>
                <div className="length col-md-3">
                  <h4>Play Length:</h4>
                  <p>{this.state.length}</p>
                </div>
                <div className="uniqueness col-md-3">
                  <h4>Uniqueness:</h4>
                  <p>{this.state.uniqueness}</p>
                </div>
                <div className="cooperative col-md-3">
                  <h4>Cooperative:</h4>
                  <p>{this.state.cooperative ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>

    )
  }
}

export default Game;