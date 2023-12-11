import React from 'react';

const Logout = ({ onLogout }) => (
  <button className="logout-button" onClick={onLogout}>
    Log Out
  </button>
);

export default Logout;