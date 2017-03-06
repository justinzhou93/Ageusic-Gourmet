import React from 'react';
import Navbar from '../react/navbar';
import Menu from '../react/menu';
import Sidebar from '../react/sidebar';

const Root = ({children}) => (
  <div>
    <Navbar />
    <Menu />
    { children }
    <Sidebar />
  </div>
);
