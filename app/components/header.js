import React from 'react';

const Header = (props) => (
  <div className="app-header">
    <div id="header-title">
      <a href="/">{props.title}</a>
    </div>
  </div>
);

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default Header;

