import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
import "./style.css";
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

class Search extends Component {
  constructor() {
    super();
    this.state = {
      suggestions: [],
      value: ""
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

  // get users by game
  getUsersByGame = (event) => {
    event.preventDefault();
    const gameNames = games.map((game) => game.name);
    if(gameNames.includes(this.state.value)) {
      const id = games.filter((game) => game.name === this.state.value)[0].id;
      Axios.get(`/api/user/games/${id}`).then((res) => {
        console.log(res.data);
        this.setState({
          users: res.data,
          groups: null,
          events: null
        });
      }).catch((err) => {
        console.log(err);
      });
    } else {
      alert("Pick a game from the list");
    }
  }

  getGroups = () => {
    Axios.get("/api/groups").then((res) => {
      console.log(res.data);
      this.setState({
        groups: res.data,
        users: null,
        events: null
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  getEvents = () => {
    Axios.get("/api/events").then((res) => {
      console.log(res.data);
      this.setState({
        events: res.data,
        users: null,
        groups: null
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
      placeholder: "Search For Game",
      value,
      onChange: this.onChange
    };
    return (
      <React.Fragment>
        <body className="background" id ="mainContainer">
          <h2>Search</h2>
            <div id="signup-row" className="row justify-content-center align-items-center">
              <div id="signup-column" className="col-md-8">
                <div id="signup-box" className="col-md-12">
                  <h3>Search for Users by Game <br></br>
                      or <br></br>
                      View Groups &amp; Events</h3>
                  <div className="autosuggest col-md-12 justify-content-center">
                    <form>
                      <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                      getSuggestionValue={getSuggestionValue}
                      renderSuggestion={renderSuggestion}
                      inputProps={inputProps} />
                      <button className="btn btn-primary" onClick={this.getUsersByGame}>Users</button>
                    </form>

                    <button className="btn btn-primary" onClick={this.getEvents}>Events</button>
                    <button className="btn btn-primary" onClick={this.getGroups}>Groups</button>
                  </div>
                </div>
              </div>

              <div id="signup-column" className="col-md-8">
                <div id="signup-box" className="col-md-12">
                  <h3>Results</h3>
                  <div className="searchResults col-md-4">
                    {this.state.users ? this.state.users.map((user) => (
                      <Link to={`/${user._id}`}><p className="searchResults col-md-4">{user.account.username}</p></Link>
                    )) : ""}
                    {this.state.groups ? this.state.groups.map((group) => (
                      <Link to={`/groups/${group._id}`}><p className="searchResults col-md-4">{group.name}</p></Link>
                    )) : ""}
                    {this.state.events ? this.state.events.map((event) => (
                      <Link to={`/events/${event._id}`}><p className="searchResults col-md-4">{event.title}</p></Link>
                    )) : ""}

                    <p className="searchResults col-md-4"><a href="#">TEST</a></p>

                  </div>
                </div>
              </div>

            </div>
        </body>
      </React.Fragment>
    )
  }
}

export default Search;