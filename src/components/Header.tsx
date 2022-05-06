import React from 'react';
import './header.css';

const Header = ({ message }:any) => {
  return (
    <div className="header-container">
      <h1 className="header-title">{message}</h1>
    </div>
  )
}

export default Header;