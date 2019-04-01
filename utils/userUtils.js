module.exports = {
  filterUserAccountInfo: (user) => {
    user.account = { 
      username: user.account.username, 
      createdAt: user.account.createdAt, 
      lastActive: user.account.lastActive 
    };
    return user;
  }
}