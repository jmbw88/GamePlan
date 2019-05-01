import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="home">
            <div className="headerLine">
              <div id="menuF" className="default">
                <div className="container">
                  <div className="row">
                    <div className="logo col-md-4">
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row gallery">
                  <div className="col-md-12"> 
                      <div className="img-responsive fadeFromBottom">
                        <h2>A place for gamers of all types to meet, organize, and connect. </h2>
                      </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4 about">
                  <h2>Profile</h2>
                  <p>When you sign up, create a profile to help other users find you. Add your favorite games and your location to get started. </p>
                </div>
                <div className="col-md-4 about">
                  <h2>Explore</h2>
                  <p>After you have created a profile, search for other games you might be interested in playing, or search other players to meet up with.</p>
                </div>
                <div className="col-md-4 about">
                  <h2>Play!</h2>
                  <p>Create groups with common interests and chat with other players. Get to know your players before meeting up for a game.</p>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12 app">
                  <h4>The ultimate app to find new games, new gaming friends, and connections.</h4>
                </div>
              </div>
            </div>
          </div>

          <div id="GameTable">
            <div className="line4">
              <div className="container">
                <div className="row games">
                  <div className="col-md-12">
                    <h3>Our Favorite Games</h3>
                    <p>See the latest and greatest games our users love</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row game">
                <div className="col-md-6  text-left">
                  <img className="img-responsive picsGall" src="assets/images/games/citadels.jpg" alt="citadels"/>
                  <h3>Citadels</h3>
                  <p>Battle against waves of enemies to prevent them from breaching your defense to the heart of the Citadel. The Defense of the Citadel is a cooperative hero defense board game for 1 to 4 players.</p>
                  <hr className="hrGames"/>
                </div>
                <div className="col-md-6 text-right">
                  <img className="img-responsive picsGall" src="assets/images/games/betrayals.jpg" alt="betrayals"/>
                  <h3>Betrayal at the House on the Hill</h3>
                  <p>Players all begin as allies exploring a haunted house filled with dangers. As players journey to new parts of the mansion, room tiles are chosen at random and placed on the game board. Eventually the "haunt" begins, one player usually "betrays" the others and takes the side of the enemies, while the remaining players collaborate to defeat them.</p>
                  <hr className="hrGames"/>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row game2 game">
                <div className="col-md-6 text-left">
                  <img className="img-responsive picsGall" src="assets/images/games/scythe.jpg" alt="scythe"/>
                  <h3>Scythe</h3>
                  <p>The game takes place in an alternate 1920s period. It is a time of farming and war, broken hearts and rusted gears, innovation and valor. In Scythe, each player represents a fallen leader attempting to restore their honor and lead their faction to power in Eastern Europa.</p>
                  <hr className="hrGames"/>
                </div>
                <div className="col-md-6 text-right">
                  <img className="img-responsive picsGall" src="assets/images/games/coup.jpg" alt="coup"/>
                  <h3>Coup</h3>
                  <p>You are head of a family in an Italian city-state, a city run by a weak and corrupt court. You need to manipulate bluff and bribe your way to power. Your object is to destroy the influence of all the other families, forcing them into exile. Only one family will survive!</p>
                  <hr className="hrGames"/>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row game2 game">
                <div className="col-md-6 text-left">
                  <img className="img-responsive picsGall" src="assets/images/games/DD.jpg" alt="dungeons and dragons"/>
                  <h3>Dungeons &amp; Dragons</h3>
                  <p>A roleplaying game about storytelling in worlds of sword and sorcery. It shares elements with childhood games of make-believe. Like those games, D&amp;D is driven by imagination. It’s about picturing the towering castle beneath the stormy night sky and imagining how a fantasy adventurer might react to the challenges that scene presents.</p>
                  <hr className="hrGames"/>
                </div>
                <div className="col-md-6 text-right">
                  <img className="img-responsive picsGall" src="assets/images/games/sheriff.jpg" alt="sheriff of nottingham"/>
                  <h3>The Sheriff of Nottingham</h3>
                  <p>A fun and engaging game for all where each player will have the chance to step into the shoes of the Sheriff himself! Other players, acting as Merchants will attempt to bring their goods into the city for profit.</p>
                  <hr className="hrGames"/>
                </div>
              </div>
            </div>

          <div className="line4">
            <div className="container">
              <div className="row games">
                <div className="col-md-12">
                  <h3>Connect with us!</h3>
                  <p>Email: admin@clevelandgameplan.com</p>
                  <p>HQ: Cleveland, OH</p>
                </div>
              </div>
            </div>
          </div>

            <div className="lineBlack">
              <div className="container">
                <div className="row downLine">
                  <div className="col-md-6 text-left copy">
                    <p>Copyright GamePlan &copy; 2019. All Rights Reserved.</p>
                  </div>
                  <div className="col-md-6 text-right dm">
                    <ul id="downMenu">
                      {!this.props.loggedIn ? (
                        <React.Fragment>
                          <li><Link to="/signup">Sign Up</Link></li>
                          <li><Link to="/login">Sign In</Link></li>
                        </React.Fragment>
                      ) : ""}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </React.Fragment>
    )
  }
}

export default Home;