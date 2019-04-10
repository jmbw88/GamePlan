import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
// import "./style.css";
import Autosuggest from 'react-autosuggest';
let games = [];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
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
      console.log(res);
      this.setState({
        games: res.data
      });
      games = res.data.map((game) => {
        return {name: game.title, id: game._id}
      });
      console.log(games);
    }).catch((err) => {
      console.log(err);
    });
  }

  addGame = (selection) => {
    console.log(selection);
    const id = games.filter((game) => game.name === selection)[0].id;
    console.log(id);
    Axios.put(`/api/user/${this.props.userid}/games/${id}`).then((res) => {
      console.log(res);
      this.setState({
        value: ""
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    if(!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    };
    return (
      <React.Fragment>
        <h1>Add game</h1>
        <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
        <button className="btn btn-primary" onClick={() => this.addGame(this.state.value)}>Submit</button>
          {/* {this.state.games ? this.state.games.map((game) => (
            <React.Fragment>
              <p>{game.title}</p> 
              <button className="btn btn-primary" onClick={() => this.addGame(game._id)}>Add</button>
            </React.Fragment>
          )) : ""} */}
      </React.Fragment>
    );
  }
}

export default AddGameForm;