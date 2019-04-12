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
      <div id="edit-block">
      <div class="container profile-form">
            <div class="pageTitle">
                <br/>
                <h2>Edit Profile</h2>
                <hr/>
            </div>
            <div class="row">
                {/* left column */}
                <div class="col-md-3" id="profImage">
                    <div class="text-center">
                        <div class="img-circle m-auto" 
                             alt="avatar"
                             style={ { backgroundImage: `url(${this.state.img})` }}
                        />
                         {/* <h6>Upload a Profile Image</h6>
                        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg">  */}
                    </div>
                </div>

                {/* edit form column */}
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
                        {/* <!-- <div class="form-group">
                            <label class="col-lg-3 control-label">Time Zone:</label>
                            <div class="col-lg-8">
                                <div class="ui-select">
                                    <select id="user_time_zone" class="form-control">
                                        <option value="Hawaii">(GMT-10:00) Hawaii</option>
                                        <option value="Alaska">(GMT-09:00) Alaska</option>
                                        <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US
                                            &amp;
                                            Canada)</option>
                                        <option value="Arizona">(GMT-07:00) Arizona</option>
                                        <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time
                                            (US &amp;
                                            Canada)</option>
                                        <option value="Central Time (US &amp; Canada)" selected="selected">
                                            (GMT-06:00) Central
                                            Time (US &amp; Canada)</option>
                                        <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US
                                            &amp;
                                            Canada)</option>
                                        <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                                    </select>
                                </div>
                            </div>
                        </div> --> */}
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
                        {/* <!-- <div class="form-group">
                            <label class="col-md-3 control-label">Password:</label>
                            <div class="col-md-8">
                                <input class="form-control" type="password" value="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">Confirm password:</label>
                            <div class="col-md-8">
                                <input class="form-control" type="password" value="">
                            </div>
                        </div> --> */}
                        <div class="form-group">
                            <label class="col-md-3 control-label"></label>
                            <div class="col-md-8">
                                <button class="btn btn-primary" id="saveBtn" value="Save Changes" onClick={this.handleSubmit}>Save Changes</button>
                                {/* <span></span>
                                <button class="btn btn-primary" id="cancelBtn" value="Cancel">Cancel</button> */}
                            </div>
                        </div>
                    </form>
                    <br/>
                </div>
            </div>
      
      </div>
        </div>


      // <div className="container">

      //   <div className="row">
      //     <div className="col-12 mx-auto my-5">
      //       <div className="card">
      //         <div className="card-header">
      //           <h2 className="text-center">Edit Profile</h2>
      //         </div>
      //         <div className="card-body">
      //           {this.state.errorMsg ? (
      //             <div className="alert alert-danger" role="alert">
      //               {this.state.errorMsg}
      //             </div>
      //           ) : ""}
      //           <form>
      //             <div className="form-group">
      //               <label htmlFor="updateName">Name</label>
      //               <input type="text" 
      //                     id="updateName" 
      //                     placeholder="Name"
      //                     name="name"
      //                     value={this.state.name}
      //                     onChange={this.handleChange}
      //                     className="form-control"
      //               />
      //             </div>
      //             <div className="form-group">
      //               <label htmlFor="updateZipcode">Zipcode</label>
      //               <input type="text" 
      //                     id="updateZipcode" 
      //                     placeholder="Zipcode"
      //                     name="zipcode"
      //                     value={this.state.zipcode}
      //                     onChange={this.handleChange}
      //                     className="form-control"
      //                     />
      //             </div>
      //             <div className="form-group">
      //               <label htmlFor="updateAbout">About</label>
      //               <input type="text" 
      //                     id="updateAbout" 
      //                     name="about"
      //                     value={this.state.about}
      //                     onChange={this.handleChange}
      //                     className="form-control"
      //                     />
      //             </div>
      //             <div className="form-group">
      //               <label htmlFor="updateImg">Image Link</label>
      //               <input type="text" 
      //                     id="updateImg"
      //                     name="img"
      //                     value={this.state.img}
      //                     onChange={this.handleChange}
      //                     className="form-control"
      //               />
      //             </div>
      //             <button className="btn btn-primary float-right" onClick={this.handleSubmit}>Submit</button>
      //           </form>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default EditProfileForm;