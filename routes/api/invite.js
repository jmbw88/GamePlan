const Router = require("express").Router();
const inviteController = require("../../controllers/inviteController");

// INVITE ROUTES
// CREATE
// GET INVITES BY USER
// GET INVITES FOR EVENT OR GROUP
// ACCEPT INVITE: deletes invite and adds them to the event/group
// DECLINE INVITE: deletes invite (for now)

Router.route("/groups")
    .post(inviteController.groupInvite);

Router.route("/groups/:id")
    .get(inviteController.getGroupInvites);

Router.route("/groups/user/:id")
    .get(inviteController.getUserGroupInvites)
    .put(inviteController.acceptGroupInvite)
    .delete(inviteController.declineGroupInvite);

Router.route("/event")
    .post(inviteController.eventInvite);

Router.route("/events/:id")
    .get(inviteController.getEventInvites);

Router.route("/events/user/:id")
    .get(inviteController.getUserEventInvites)
    .put(inviteController.acceptEventInvite)
    .delete(inviteController.declineEventInvite);

module.exports = Router;