import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import "./style.css";

class EditProfileForm extends Component {
  constructor(props) {
    super(props);

    const profile = JSON.parse(sessionStorage.getItem("profile"));
    if(profile) {
      this.state = {
          name: profile.name,
          about: profile.about,
          sex: profile.sex,
          zipcode: profile.zipcode,
          img: profile.img,
          errorMsg: "",
          redirectTo: null
      }
    }
    else {
      this.state = {
          name: null,
          about: null,
          sex: null,
          zipcode: null,
          img: null,
          errorMsg: "",
          redirectTo: null       
     }
  }
}

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState( {
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userid = JSON.parse(sessionStorage.getItem("userid"));
    Axios.put(`/api/user/profile/${userid}`, {
      name: this.state.name,
      zipcode: this.state.zipcode,
      about: this.state.about,
      img: this.state.img
    }).then((res) => {
      console.log(res);
      this.setState({
        redirectTo: `/${userid}`
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
      <div className="row">
        <div className="col-12 mx-auto my-5">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Edit Profile</h2>
            </div>
            <div className="card-body">
              {this.state.errorMsg ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.errorMsg}
                </div>
              ) : ""}
              <form>
                <div className="form-group">
                  <label htmlFor="updateName">Name</label>
                  <input type="text" 
                         id="updateName" 
                         placeholder="Name"
                         name="name"
                         value={this.state.name}
                         onChange={this.handleChange}
                         className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="updateZipcode">Zipcode</label>
                  <input type="text" 
                        id="updateZipcode" 
                        placeholder="Zipcode"
                        name="zipcode"
                        value={this.state.zipcode}
                        onChange={this.handleChange}
                        className="form-control"
                        />
                </div>
                <div className="form-group">
                  <label htmlFor="updateAbout">About</label>
                  <input type="text" 
                        id="updateAbout" 
                        name="about"
                        value={this.state.about}
                        onChange={this.handleChange}
                        className="form-control"
                        />
                </div>
                <div className="form-group">
                  <label htmlFor="updateImg">Image Link</label>
                  <input type="text" 
                        id="updateImg"
                        name="img"
                        value={this.state.img}
                        onChange={this.handleChange}
                        className="form-control"
                  />
                </div>
                <button className="btn btn-primary float-right" onClick={this.handleSubmit}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfileForm;