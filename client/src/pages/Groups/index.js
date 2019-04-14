import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

class Groups extends Component {
  constructor(props) {
    super();
    const groups = JSON.parse(sessionStorage.getItem("groups"));
    this.state = {};
    if(groups) {
      this.state = {
        groups: groups
      }
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
      this.getGroups();
  }

  getGroups = () => {      
    Axios.get(`/api/user/${this.props.userid}/groups`).then((res) => {
      console.log(res);
      this.setState({
        groups: res.data
      });
      sessionStorage.setItem("groups", JSON.stringify(res.data));
    }).catch((err) => {
      console.log(err);
    });
  }

  handleChange = (event) => {
    this.setState( {
      [event.target.name]: event.target.value
    });
  }

  // create group, add user as admin and creator, add group to user
  handleSubmit = (event) => {
    event.preventDefault();
    const newGroup = {
      name: this.state.groupName,
      description: this.state.groupDesc,
      public: true,
      zipcode: this.state.groupZip,
      createdBy: this.props.userid,
      admins: [this.props.userid]
    }

    Axios.post(`/api/groups`, newGroup).then((res) => {
      console.log(res);
      Axios.put(`/api/user/${this.props.userid}/groups/${res.data._id}`).then((res) => {
        console.log(res);
        this.setState({
          redirectTo: `/groups/${res.data._id}`
        });
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    }
    console.log(this.state);
    return (
      <React.Fragment>
        <body className="background">
          <h2 className="newEvent">Create New Group</h2>
            <div id="signup-row" className="row justify-content-center align-items-center">
              <div id="signup-column" className="col-md-8">
                <div id="signup-box" className="col-md-12">
                  <form>
                    <div className="form-group">
                    <h3 className="eventForm"> <label for="groupName">Group Name:</label><br/></h3>
                      <input id="groupName" 
                              placeholder="Name"
                              name="groupName"
                              value={this.state.groupName}
                              onChange={this.handleChange}
                              className="form-control"/>
                    </div>
                    <div className="form-group">
                      <h3 className="eventForm"> <label for="groupDesc">Group Description:</label><br/></h3>
                      <input id="groupDesc" 
                              placeholder="Description"
                              name="groupDesc"
                              value={this.state.groupDesc}
                              onChange={this.handleChange}
                              className="form-control"/>
                    </div>
                    <div className="form-group">
                      <h3 className="eventForm"> <label for="groupZip">Zipcode</label><br/></h3>
                      <input id="groupZip" 
                              placeholder="Zipcode"
                              name="groupZip"
                              value={this.state.groupZip}
                              onChange={this.handleChange}
                              className="form-control"/>
                    </div>
                    <div className="submitBtn">
                      <button className="btn btn-info float-right mb-2" onClick={this.handleSubmit}>Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div> 

            <h2 className="newEvent">Your Groups</h2>
            <div id="signup-row" className="row justify-content-center align-items-center">
              <div id="signup-column" className="col-md-8">
                <div id="signup-box" className="col-md-12">
                  {this.state.groups ? this.state.groups.map((group) => (
                    <div>
                      <h4><Link to={`/groups/${group._id}`}>{group.name}</Link></h4>
                      <p className="text-center">{group.description}</p>
                      <p className="text-center">{group.zipcode}</p>
                    </div>
                  )) : ""}
                </div>
              </div>
            </div>
                          
       
        </body>
      </React.Fragment>
    )
  }
}

export default Groups;