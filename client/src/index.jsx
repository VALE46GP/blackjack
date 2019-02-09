/* eslint-env browser */
import io from 'socket.io-client';
import ReactDOM from 'react-dom';
import React from 'react';
import Table from './components/Table';

window.React = React;
window.ReactDOM = ReactDOM;
window.Table = Table;
window.socket = io('http://localhost');
