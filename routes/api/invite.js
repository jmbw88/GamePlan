const Router = require("express").Router();
const inviteController = require("../../controllers/inviteController");

// INVITE ROUTES
// CREATE
// GET INVITES BY USER
// GET INVITES FOR EVENT OR GROUP
// ACCEPT INVITE: deletes invite and adds them to the event/group
// DECLINE INVITE: deletes invite (for now)

// Router.route("/groups")
//     .post(inviteController.inviteGroup)
//     .delete(inviteController.deleteGroupInvite);

// Router.route("/event")
//     .post(inviteController.inviteEvent)
//     .delete(inviteController.deleteEventInvite);

module.exports = Router;