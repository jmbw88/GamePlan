import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

class Messages extends Component {
  constructor(props) {
    super();
    const contacts = JSON.parse(sessionStorage.getItem("contacts"));
    // const thread = JSON.parse(sessionStorage.getItem("thread"));
    this.state = {}
    if (contacts) {
      this.state.contacts = contacts
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
    this.getContacts();
  }
  
  getContacts = () => {
    const userid = JSON.parse(sessionStorage.getItem("userid"));
    Axios.get(`/api/messages/${userid}`).then((res) => {
      console.log(res);
      this.setState({
        contacts: res.data
      });
      sessionStorage.setItem("contacts", JSON.stringify(res.data));
    }).catch((err) => {
      console.log(err);
    });
  }

  getThread = (otherid) => {
    // console.log(userid);
    // /:userid/:otherid"
    const userid = JSON.parse(sessionStorage.getItem("userid"));
    Axios.get(`/api/messages/${userid}/${otherid}`).then((res) => {
      console.log(res);
      this.setState({
        thread: res.data,
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

  sendMessage = (event) => {
    event.preventDefault();

  }

  render() {
    console.log(this.state);
    if (!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    return (
      <React.Fragment>
        <h1>Messages</h1>
        <h3>Contacts</h3>
        {this.state.contacts ? this.state.contacts.map((contact) => (
          <button className="btn btn-primary d-block my-2" onClick={() => this.getThread(contact.id)}>{contact.username}</button>
        )) : ""}
        {this.state.thread ? this.state.thread.map((msg) => (
          // <p className={msg.to === JSON.parse(sessionStorage.getItem("userid")) ? "text-left" : "text-right"}>{msg.body}</p>
          <p>{msg.body}</p>
        )): ""}
        <input type="text" 
                      id="chatMsg" 
                      placeholder="Enter message"
                      name="message"
                      value={this.state.message}
                      onChange={this.handleChange}/>
        <button className="btn btn-secondary" onClick={this.sendMessage}>Submit</button>
      </React.Fragment>
    )
  }
}

export default Messages;