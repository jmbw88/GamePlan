import React, { Component } from "react";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { animateScroll } from "react-scroll";

class Messages extends Component {
  constructor(props) {
    super();
    this.state = {
      contacts: [],
      contact: null,
      thread: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
    this.getContacts();
  }
  
  getContacts = () => {
    Axios.get(`/api/messages/${this.props.userid}`).then((res) => {
      const getNewest = (contact) => {
        return new Promise ((resolve, reject) => {
          Axios.get(`/api/messages/newest/${this.props.userid}/${contact.id}`).then((res) => {
            contact.newest = res.data;
            resolve(contact)
          }).catch((err) => {
            reject(err);
          });
        })
      }

      let promises = res.data.map((contact) => {
        return getNewest(contact).then((contact) => {
          return contact;
        });
      });

      Promise.all(promises).then((results) => {
        console.log(results);
        this.setState({
          contacts: results
        });
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  getThread = (otherid) => {
    Axios.get(`/api/messages/${this.props.userid}/${otherid}`).then((res) => {
      this.setState({
        thread: res.data,
        contact: otherid
      }, this.scrollToBottom);
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
    const message = {
      to: this.state.contact,
      from: this.props.userid,
      body: this.state.message,
    }
    Axios.post("/api/messages", message).then((res) => {
      this.setState({
        thread: [...this.state.thread, res.data],
        message: ""
      }, this.scrollToBottom);
    }).catch((err) => {
      console.log(err);
    });
  }

  setActive = (target) => {
    const chatPeople = Array.from(document.querySelectorAll(".chat_people"));
    chatPeople.forEach((person) => {
      person.classList.remove("active_chat");
    });
    target.classList.add("active_chat");
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "chatbox",
      duration: 5
  });

}

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
    return (
      <div class="msg p-5">
          <div class="container msg-container p-0">
            <div class="messaging">
                <div class="inbox_msg">
                    <h3 class="text-left msg-h3">Inbox</h3>
                    <hr class="msg-hr"/>
                    <div class="inbox_people">
                        <div class="heading_srch">
                            <div class="recent_heading">
                                <h4>Recent</h4>
                            </div>
                        </div>
                        <div class="inbox_chat">
                        <div class="chat_list">
                          {this.state.contacts.map((contact) => (
                            <div class="chat_people" onClick={(event) => {
                              this.getThread(contact.id);
                              this.setActive(event.currentTarget);
                            }}>
                              <div class="chat_img">
                                <img class="msg-img" src={contact.img || "https://via.placeholder.com/100"} alt="avatar"/>
                              </div>
                              <div class="chat_ib">
                                <h5>{contact.username} <span class="timestamp">{contact.newest ? contact.newest.createdAt : ""}</span></h5>
                                <p>{contact.newest ? contact.newest.body : ""}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        </div>
                    </div>
                    <div class="messages">
                        <div class="msg_history" id="chatbox">
                        {this.state.thread ? this.state.thread.map((msg) => (
                          msg.to === this.props.userid ? (
                            <div class="incoming_msg">
                              <div class="incoming_msg_img">
                                <Link to={`/${this.state.contact}`}>
                                  <img class="msg-img" src={this.state.contacts.filter((contact) => contact.id === this.state.contact)[0].img || "https://via.placeholder.com/100"} alt="avatar"/>
                                </Link>
                              </div>
                              <div class="received_msg">
                                    <div class="received_withd_msg">
                                        <p>{msg.body}</p>
                                        <span class="timestamp">{msg.createdAt}</span>
                                    </div>
                                </div>
                            </div>
                          ) : (
                            <div class="outgoing_msg">
                                <div class="sent_msg">
                                    <p>{msg.body}</p>
                                    <span class="timestamp">{msg.createdAt}</span>
                                </div>
                            </div>
                          )
                        )) 
                        : ""}
                        </div>
                        <form class="type_msg">
                            <div class="input_msg_write">
                                <input type="text" 
                                      class="write_msg" 
                                      placeholder="Type a message"
                                      name="message"
                                      value={this.state.message}
                                      onChange={this.handleChange}
                                />
                                <button class="msg_send_btn" onClick={this.sendMessage}>
                                  <i class="far fa-envelope fa-2"aria-hidden="true"></i>
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Messages;