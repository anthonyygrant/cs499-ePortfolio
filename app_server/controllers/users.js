module.exports.logout = (req, res) => {
  console.log('Logout request received');
  console.log('Session ID:', req.sessionID);
  console.log('Session Data:', req.session); // log the session object
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      console.log("Session Destroy Failed");
      return res.status(500).json({ message: 'Logout failed' });
    }
    console.log("Session Destroy Successful");
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful' });
  });
};