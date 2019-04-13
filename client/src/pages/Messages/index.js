import React, { Component } from "react";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { animateScroll } from "react-scroll";
import "./style.css";

class Messages extends Component {
  constructor(props) {
    super();
    // const contacts = JSON.parse(sessionStorage.getItem("contacts"));
    // const thread = JSON.parse(sessionStorage.getItem("thread"));
    this.state = {
      contacts: [],
      contact: null,
      thread: []
    }
    // if (contacts) {
    //   this.state.contacts = contacts
    // }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
    this.getContacts();
  }

  componentDidUpdate() {
    // const chatbox = document.getElementsByClassName("msg_history");
    // chatbox.scrollTop = chatbox.scrollHeight;
  }
  
  getContacts = () => {
    Axios.get(`/api/messages/${this.props.userid}`).then((res) => {
      console.log(res.data);
      const getNewest = (contact) => {
        return new Promise ((resolve, reject) => {
          Axios.get(`/api/messages/newest/${this.props.userid}/${contact.id}`).then((res) => {
            contact.newest = res.data;
            console.log(contact);
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

      

      // res.data = res.data.map((contact) => {
      //   Axios.get(`/api/messages/newest/${this.props.userid}/${contact.id}`).then((res) => {
      //     console.log(res);
      //     contact.newest = res.data;
      //   }).catch((err) => {
      //     console.log(err);
      //   });
      //   console.log(contact);
      //   return contact;
      // });
      // this.setState({
      //   contacts: res.data
      // });
      
      // sessionStorage.setItem("contacts", JSON.stringify(res.data));
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
      // const chatbox = document.getElementsByClassName("msg_history");
      // chatbox.scrollTop = chatbox.scrollHeight;
    }).catch((err) => {
      console.log(err);
    });
  }

  setActive = (target) => {
    const chatPeople = Array.from(document.querySelectorAll(".chatPeople"));
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
    console.log(this.state);
    if (!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }}/>
    }
      //     const chatbox = document.getElementsByClassName("msg_history");
      // chatbox.scrollTop = chatbox.scrollHeight;
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
                            {/* <!-- <div class="srch_bar">
                                <div class="stylish-input-group">
                                    <input type="text" class="search-bar" placeholder="Search">
                                    <span class="input-group-addon">
                                        <button type="button"> <i class="fa fa-search" aria-hidden="true"></i></button>
                                    </span>
                                </div>
                            </div> --> */}
                        </div>
                        <div class="inbox_chat">
                        <div class="chat_list">
                        {console.log(this.state.contacts)}
                          {this.state.contacts.map((contact) => (
                            <div class="chat_people" onClick={(event) => {
                              this.getThread(contact.id);
                              console.log("event", event.currentTarget);
                              this.setActive(event.currentTarget);
                            }}>
                              <div class="chat_img">
                                <img class="msg-img" src={contact.img} alt="avatar"/>
                              </div>
                              <div class="chat_ib">
                                <h5>{contact.username} <span class="timestamp">{contact.newest ? contact.newest.createdAt : ""}</span></h5>
                                <p>{contact.newest ? contact.newest.body : ""}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                            {/* <div class="chat_list active_chat">
                                <div class="chat_people">
                                    <div class="chat_img"><img class="msg-img" src="https://via.placeholder.com/100" alt="avatar"/></div>
                                    <div class="chat_ib">
                                        <h5>Username<span class="timestamp">TIMESTAMP</span></h5>
                                        <p>Asperiores, consequatur? Voluptas culpa deserunt nihil aliquid nam voluptate
                                            rerum voluptatibus officiis quo nobis!</p>
                                    </div>
                                </div>
                            </div>
                            <div class="chat_list">
                                <div class="chat_people">
                                    <div class="chat_img"><img class="msg-img" src="https://via.placeholder.com/100" alt="avatar"/></div>
                                    <div class="chat_ib">
                                        <h5>Username<span class="timestamp">TIMESTAMP</span></h5>
                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="chat_list">
                                <div class="chat_people">
                                    <div class="chat_img"> <img class="msg-img" src="https://via.placeholder.com/100" alt="avatar"/></div>
                                    <div class="chat_ib">
                                        <h5>Username<span class="timestamp">TIMESTAMP</span></h5>
                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="chat_list">
                                <div class="chat_people">
                                    <div class="chat_img"><img class="msg-img" src="https://via.placeholder.com/100" alt="avatar"/></div>
                                    <div class="chat_ib">
                                        <h5>Username<span class="timestamp">TIMESTAMP</span></h5>
                                        <p>Tenetur maxime eaque illum natus.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="chat_list">
                                <div class="chat_people">
                                    <div class="chat_img"><img class="msg-img" src="https://via.placeholder.com/100" alt="avatar"/></div>
                                    <div class="chat_ib">
                                        <h5>Username<span class="timestamp">TIMESTAMP</span></h5>
                                        <p>Tenetur maxime eaque illum natus.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="chat_list">
                                <div class="chat_people">
                                    <div class="chat_img"><img class="msg-img" src="https://via.placeholder.com/100" alt="avatar"/></div>
                                    <div class="chat_ib">
                                        <h5>Username<span class="timestamp">TIMESTAMP</span></h5>
                                        <p>Tenetur maxime eaque illum natus.</p>
                                    </div>
                                </div>
                            </div> */}
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
                            {/* <div class="incoming_msg">
                                <div class="incoming_msg_img"> <img class="msg-img" src="https://via.placeholder.com/100" alt="avatar"/>
                                </div>
                                <div class="received_msg">
                                    <div class="received_withd_msg">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        <span class="timestamp">TIMESTAMP</span>
                                    </div>
                                </div>
                            </div>
                            <div class="outgoing_msg">
                                <div class="sent_msg">
                                    <p>Ipsam!</p>
                                    <span class="timestamp">TIMESTAMP</span>
                                </div>
                            </div>
                            <div class="incoming_msg">
                                <div class="incoming_msg_img"> <img class="msg-img" src="https://via.placeholder.com/100" alt="avatar"/>
                                </div>
                                <div class="received_msg">
                                    <div class="received_withd_msg">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                        <span class="timestamp">TIMESTAMP</span>
                                    </div>
                                </div>
                            </div>
                            <div class="outgoing_msg">
                                <div class="sent_msg">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    <span class="timestamp">TIMESTAMP</span>
                                </div>
                            </div>
                            <div class="incoming_msg">
                                <div class="incoming_msg_img"> <img class="msg-img" src="https://via.placeholder.com/100" alt="avatar"/>
                                </div>
                                <div class="received_msg">
                                    <div class="received_withd_msg">
                                        <p>Distinctio nesciunt rerum voluptas!</p>
                                        <span class="timestamp">TIMESTAMP</span>
                                    </div>
                                </div>
                            </div>
                            <div class="incoming_msg">
                                <div class="incoming_msg_img"> <img class="msg-img" src="https://via.placeholder.com/100" alt="avatar"/>
                                </div>
                                <div class="received_msg">
                                    <div class="received_withd_msg">
                                        <p>Distinctio nesciunt rerum voluptas!</p>
                                        <span class="timestamp">TIMESTAMP</span>
                                    </div>
                                </div>
                            </div>
                            <div class="incoming_msg">
                                <div class="incoming_msg_img"> <img class="msg-img" src="https://via.placeholder.com/100" alt="avatar"/>
                                </div>
                                <div class="received_msg">
                                    <div class="received_withd_msg">
                                        <p>Distinctio nesciunt rerum voluptas!</p>
                                        <span class="timestamp">TIMESTAMP</span>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        {/* <input type="text" 
                          id="chatMsg" 
                          placeholder="Enter message"
                          name="message"
                          value={this.state.message}
                          onChange={this.handleChange}/>
            <button className="btn btn-secondary" onClick={this.sendMessage}>Submit</button> */}
                        <div class="type_msg">
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
                        </div>

                    </div>
                </div>
            </div>
        </div>
      
      {/* <React.Fragment>
        <h1>Messages</h1>
        <h3>Contacts</h3>
        {this.state.contacts ? this.state.contacts.map((contact) => (
          <React.Fragment>
            <button className="btn btn-primary d-block my-2" onClick={() => this.getThread(contact.id)}>{contact.username}</button> 
            <Link to={`/${contact.id}`}>View Profile</Link>
          </React.Fragment>
        )) : ""}
        {this.state.thread ? this.state.thread.map((msg) => (
          <p className={msg.to === this.props.userid ? "text-info" : "text-danger"}>
            {msg.to === this.props.userid ? this.state.contacts.filter((contact) => contact.id === this.state.contact)[0].username : this.props.username}: {msg.body} {msg.createdAt}
          </p>
        )) 
        : ""}
        {this.state.thread ? (
          <React.Fragment>
            <input type="text" 
                          id="chatMsg" 
                          placeholder="Enter message"
                          name="message"
                          value={this.state.message}
                          onChange={this.handleChange}/>
            <button className="btn btn-secondary" onClick={this.sendMessage}>Submit</button>
          </React.Fragment>
        ) : ""}
      </React.Fragment> */}
      </div>
    )
  }
}

export default Messages;