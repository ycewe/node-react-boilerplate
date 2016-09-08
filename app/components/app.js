import React from 'react';
import Header from './header.js';
import HamburgerInput from './drawer/hamburger-input.js';
import HamburgerIcon from './drawer/hamburger-icon.js';
import Menu from './drawer/menu.js';
import PageBody from './body.js';

const appName = '';

const App = () => (
  <div>
    <HamburgerInput />
    <HamburgerIcon />
    <Header title={appName} />
    <Menu />
    <PageBody />
  </div>
);

export default App;
