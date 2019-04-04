const db = require("../models");

module.exports = {
  // req.body has user and group
  // check to see if user is already in group or invited
  // check if user making request is admin of group
  groupInvite: (req, res) => {

  },

  getGroupInvites: (req, res) => {

  },

  getUserGroupInvites: (req, res) => {

  },

  acceptGroupInvite: (req, res) => {

  },

  declineGroupInvite: (req, res) => {

  },

  // req.body has user and group
  eventInvite: (req, res) => {

  },

  getEventInvites: (req ,res) => {

  },

  getUserEventInvites: (req, res) => {

  },

  acceptEventInvite: (req, res) => {

  },

  declineEventInvite: (req, res) => {

  }

}