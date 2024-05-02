import React from 'react';
import ReactDOM from 'react-dom';

import MainComponent from './MainComponent';

import './App.css'; // Import CSS file for table styling


function App() {

  return (

  ReactDOM.render(<MainComponent />, document.getElementById('root')) 

  );
}

export default App;
