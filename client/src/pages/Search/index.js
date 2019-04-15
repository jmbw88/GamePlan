import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
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

  // get users by game
  getUsersByGame = (event) => {
    event.preventDefault();
    const gameNames = games.map((game) => game.name);
    if(gameNames.includes(this.state.value)) {
      const id = games.filter((game) => game.name === this.state.value)[0].id;
      Axios.get(`/api/user/games/${id}`).then((res) => {
        this.setState({
          users: res.data,
          groups: null,
          events: null
        });
      }).catch((err) => {
        console.log(err);
      });
    } else {
      // alert("Pick a game from the list");
      this.setState({
        errorMsg: "Select a game from the list"
      });
    }
  }

  getGroups = () => {
    Axios.get("/api/groups").then((res) => {
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
            <div id="signup-row" className="row justify-content-center align-items-center">
              <div id="signup-column" className="col-md-8">
              <h3 className="newEvent">Search</h3>
                <div id="signup-box" className="col-md-12">
                  {/* <h4>Search for Users by Game <br></br>
                      or <br></br>
                      View Groups &amp; Events</h4> */}
                  <h4>Search for Users by Game</h4>
                  <div className="autosuggest col-md-12 justify-content-center">
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
                      <button className="btn btn-primary float-right" onClick={this.getUsersByGame}>Users</button>
                    </form>
                    <h4>View Groups &amp; Events</h4>
                    <div className="text-center">
                      <button className="btn btn-primary float-none" onClick={this.getEvents}>Events</button>
                      <button className="btn btn-primary float-none" onClick={this.getGroups}>Groups</button>
                    </div>
                  </div>
                </div>
              </div>

              <div id="signup-column" className="col-md-8">
                <div id="signup-box" className="col-md-12">
                  <h3 className="newEvent">Results</h3>
                  <div>
                    {this.state.users ? this.state.users.map((user) => (
                      <p className="searchResults col-md-4"><Link to={`/${user._id}`}>{user.account.username}</Link></p>
                    )) : ""}
                    {this.state.groups ? this.state.groups.map((group) => (
                      <p className="searchResults col-md-4"><Link to={`/groups/${group._id}`}>{group.name}</Link></p>
                    )) : ""}
                    {this.state.events ? this.state.events.map((event) => (
                      <p className="searchResults col-md-4"><Link to={`/events/${event._id}`}>{event.title}</Link></p>
                    )) : ""}

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