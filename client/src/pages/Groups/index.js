import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

class Groups extends Component {
  constructor(props) {
    super();
    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
      this.getGroups();
  }

  getGroups = () => {      
    Axios.get(`/api/user/${this.props.userid}/groups`).then((res) => {
      if (res.status === 403) {
        this.setState({
          redirectTo: "/login"
        });
      } else {
        this.setState({
          groups: res.data
        });
      }
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

    const formComplete = Object.values(newGroup).every(val => val);
    if(formComplete) {
      Axios.post(`/api/groups`, newGroup).then((res) => {
        if (res.status === 403) {
          Axios.put(`/api/user/${this.props.userid}/groups/${res.data._id}`).then((res) => {
            this.setState({
              redirectTo: `/groups/${res.data._id}`
            });
          }).catch((err) => {
            console.log(err);
          });
        } else {
          this.setState({
            redirectTo: "/login"
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.setState({
        errorMsg: "Please complete form"
      });
    }
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    }
    // console.log(this.state);
    return (
      <React.Fragment>
        <div className="background">
        <div id="signup-row" className="row justify-content-center align-items-center">
              <div id="signup-column" className="col-md-8">
              <h3 className="newEvent">Your Groups</h3>
                <div id="signup-box" className="col-md-12">
                  {this.state.groups ? this.state.groups.map((group) => (
                    <div className="yourGroups col-md-6">
                      <h4><Link to={`/groups/${group._id}`}>{group.name}</Link></h4>
                      <p className="text-center noPadding">{group.description}</p>
                      <p className="text-center noPadding">{group.zipcode}</p>
                    </div>
                  )) : ""}
                  
                </div>
              </div>
            </div>
            <div id="signup-row" className="row justify-content-center align-items-center">
              <div id="signup-column" className="col-md-8">
              <h3 className="newEvent">Create New Group</h3>
                <div id="signup-box" className="col-md-12">
                  <form>
                    {this.state.errorMsg ? (
                      <div className="alert alert-danger" role="alert">
                        {this.state.errorMsg}
                      </div>) : ""}
                    <div className="form-group">
                    <h3 className="eventForm"> <label for="groupName">Group Name</label><br/></h3>
                      <input id="groupName" 
                              placeholder="Name"
                              name="groupName"
                              value={this.state.groupName}
                              onChange={this.handleChange}
                              className="form-control"/>
                    </div>
                    <div className="form-group">
                      <h3 className="eventForm"> <label for="groupDesc">Group Description</label><br/></h3>
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
        </div>
      </React.Fragment>
    )
  }
}

export default Groups;