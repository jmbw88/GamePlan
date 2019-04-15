import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import "./style.css";

class EditProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: null,
        about: null,
        sex: null,
        zipcode: null,
        img: null,
        errorMsg: "",
        redirectTo: null       
    }
    this.componentDidMount = this.componentDidMount.bind(this);
}

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    Axios.get(`/api/user/${this.props.userid}`).then((res) => {
      this.setState({
        name: res.data.profile.name,
        about: res.data.profile.about,
        zipcode: res.data.profile.zipcode,
        img: res.data.profile.img
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState( {
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // const userid = JSON.parse(sessionStorage.getItem("userid"));
    Axios.put(`/api/user/profile/${this.props.userid}`, {
      name: this.state.name,
      zipcode: this.state.zipcode,
      about: this.state.about,
      img: this.state.img
    }).then((res) => {
      console.log(res);
      this.setState({
        redirectTo: `/${this.props.userid}`
      });
    });
  }

  render() {
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    } 
    if(!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    return (
      <div id="edit-block">
      <div class="container profile-form">
            <div class="pageTitle">
                <br/>
                <h2>Edit Profile</h2>
                <hr/>
            </div>
            <div class="row">
                <div class="col-md-3" id="profImage">
                    <div class="text-center">
                        <div class="img-circle m-auto" 
                             alt="avatar"
                             style={ { backgroundImage: `url(${this.state.img})` }}
                        />
                    </div>
                </div>
                <div class="col-md-9 personal-info">
                    {this.state.errorMsg ? (
                      <div className="alert alert-danger" role="alert">
                        {this.state.errorMsg}
                      </div>
                    ) : ""}
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Name:</label>
                            <div class="col-lg-8">
                              <input type="text" 
                                    id="updateName" 
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    className="form-control"
                              />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Zipcode:</label>
                            <div class="col-lg-8">
                              <input type="text" 
                                id="updateZipcode" 
                                placeholder="Zipcode"
                                name="zipcode"
                                value={this.state.zipcode}
                                onChange={this.handleChange}
                                className="form-control"
                              />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">About:</label>
                            <div class="col-lg-8">
                              <input type="text" 
                                id="updateAbout" 
                                name="about"
                                value={this.state.about}
                                onChange={this.handleChange}
                                className="form-control"
                              />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">Image Link:</label>
                            <div class="col-md-8">
                              <input type="text" 
                                    id="updateImg"
                                    name="img"
                                    value={this.state.img}
                                    onChange={this.handleChange}
                                    className="form-control"
                              />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label"></label>
                            <div class="col-md-8">
                                <button class="btn btn-primary" id="saveBtn" value="Save Changes" onClick={this.handleSubmit}>Save Changes</button>
                            </div>
                        </div>
                    </form>
                    <br/>
                </div>
            </div>
      
      </div>
        </div>
    );
  }
}

export default EditProfileForm;