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
  
  // TODO REFACTOR NEWEST
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
        contact: otherid,
        contacts: this.state.contacts.map((contact) => {
          if (otherid === contact.id) {
            this.props.updateUser({
              unread: Number(this.props.unread) - Number(contact.unreadCount)
            });
            contact.unreadCount = 0;
          }
          return contact;
        }),
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
      const newest = res.data;
      this.setState({
        thread: [...this.state.thread, res.data],
        message: "",
        contacts: this.state.contacts.map((contact) => {
          if (this.state.contact === contact.id) {
            contact.newest = newest;
          }
          return contact;
        }),
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
      <div className="msg p-5">
          <div className="container msg-container p-0">
            <div className="messaging">
                <div className="inbox_msg">
                    <h3 className="text-left msg-h3">Inbox</h3>
                    <hr className="msg-hr"/>
                    <div className="inbox_people">
                        <div className="heading_srch">
                            <div className="recent_heading">
                                <h4>Recent</h4>
                            </div>
                        </div>
                        <div className="inbox_chat">
                        <div className="chat_list">
                          {this.state.contacts.map((contact) => (
                            <div className="chat_people" onClick={(event) => {
                              this.getThread(contact.id);
                              this.setActive(event.currentTarget);
                            }}>
                              <div className="chat_img">
                                <img className="msg-img" src={contact.img || "https://via.placeholder.com/100"} alt="avatar"/>
                              </div>
                              {/* UNREAD */}
                              {contact.unreadCount > 0 ? <span className="badge badge-danger unread"> {contact.unreadCount} </span> : ""}
                              {/* END UNREAD */}
                              <div className="chat_ib">
                                <h5>
                                    {contact.username} 
                                    <span className="timestamp">{contact.newest ? contact.newest.createdAt : ""}</span>
                                </h5>
                                <p>{contact.newest ? contact.newest.body : ""}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        </div>
                    </div>
                    <div className="messages">
                        <div className="msg_history" id="chatbox">
                        {this.state.thread ? this.state.thread.map((msg) => (
                          msg.to === this.props.userid ? (
                            <div className="incoming_msg">
                              <div className="incoming_msg_img">
                                <Link to={`/${this.state.contact}`}>
                                  <img className="msg-img" src={this.state.contacts.filter((contact) => contact.id === this.state.contact)[0].img || "https://via.placeholder.com/100"} alt="avatar"/>
                                </Link>
                              </div>
                              <div className="received_msg">
                                    <div className="received_withd_msg">
                                        <p>{msg.body}</p>
                                        <span className="timestamp">{msg.createdAt}</span>
                                    </div>
                                </div>
                            </div>
                          ) : (
                            <div className="outgoing_msg">
                                <div className="sent_msg">
                                    <p>{msg.body}</p>
                                    <span className="timestamp">{msg.createdAt}</span>
                                </div>
                            </div>
                          )
                        )) 
                        : ""}
                        </div>
                        <form className="type_msg">
                            <div className="input_msg_write">
                                <input type="text" 
                                      className="write_msg" 
                                      placeholder="Type a message"
                                      name="message"
                                      value={this.state.message}
                                      onChange={this.handleChange}
                                />
                                <button className="msg_send_btn" onClick={this.sendMessage}>
                                  <i className="far fa-envelope fa-2"aria-hidden="true"></i>
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