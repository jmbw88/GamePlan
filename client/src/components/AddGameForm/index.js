import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
// import "./style.css";
import Autosuggest from "react-autosuggest";
let games = [];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return games.filter(game => regex.test(game.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}
class AddGameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      value: ''
    };
  }

  componentDidMount() {
    this.getGames();
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getGames = () => {
    Axios.get("/api/games").then((res) => {
      this.setState({
        games: res.data
      });
      games = res.data.map((game) => {
        return {name: game.title, id: game._id}
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  addGame = (selection) => {
    const gameNames = games.map((game) => game.name);
    if(gameNames.includes(this.state.value)) {
      const id = games.filter((game) => game.name === selection)[0].id;
      Axios.put(`/api/user/${this.props.userid}/games/${id}`).then((res) => {
        this.setState({
          value: "",
          redirectTo: `/${this.props.userid}`
        });
      }).catch((err) => {
        console.log(err);
      });
    } else {
      // alert("Please select a game from the list");
      this.setState({
        errorMsg: "Please select a game from the list"
      });
    }
  }

  render() {
    if(!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    }

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search For Game",
      value,
      onChange: this.onChange
    };
    return (
      <React.Fragment>
          <body className="background" id ="mainContainer">
            <div id="signup-row" className="row justify-content-center align-items-center">
              <div id="signup-column" className="col-md-8">
               <h3 className="newEvent">Add game</h3>
               <div id="signup-box" className="col-md-8 mx-auto my-3">
               <h4>Select Game From Dropdown</h4>
                  <form>
                  {this.state.errorMsg ? (
                    <div className="alert alert-danger" role="alert">
                      {this.state.errorMsg}
                    </div>) : ""}
                    <Autosuggest 
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps} />
                    <button className="btn btn-primary" onClick={(event) => {event.preventDefault(); this.addGame(this.state.value)}}>Submit</button>
                  </form>
               </div>

              </div>
            </div>
          </body>
      </React.Fragment>
    );
  }
}

export default AddGameForm;