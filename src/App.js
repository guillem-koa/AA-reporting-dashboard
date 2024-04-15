import React from 'react';
import ReactDOM from 'react-dom';
import GenerateOutputsTable from './GenerateOutputsTable';
import GenerateEmailsTable from './GenerateEmailsTable';

import MainComponent from './MainComponent';

import './App.css'; // Import CSS file for table styling


function App() {
  const outputsDataArray = [
    {'Machine': 'AA-001', 'Cycle Progress': '70%', 'Cycle Start': '2024-04-08 18:06:43', 'Cycle Complete' : '🟠', 'Action': 'Generate'},
    {'Machine': 'AA-002', 'Cycle Progress': '40%', 'Cycle Start': '2024-04-08 20:06:43', 'Cycle Complete' : '🟠', 'Action': 'Generate'},
    {'Machine': 'AA-006', 'Cycle Progress': '100%', 'Cycle Start': '2024-04-08 20:06:43', 'Cycle Complete' : '🟢', 'Action': 'Generate'}
  ];
  const emailsDataArray = [
    {'Machine': 'AA-001', 'Cycle Start': '2024-04-08 18:06:43', 'HC' : '🟠', 'Action': 'Generate'}
  ];

  return (

    /*<div>
    <h2> Aquagar Generate Outputs</h2>
    <GenerateOutputsTable data={outputsDataArray} />
    <h2> Aquagar Send Emails</h2>
    <GenerateEmailsTable data={emailsDataArray} />
  </div> */

    ReactDOM.render(<MainComponent />, document.getElementById('root'))

  );
}

export default App;
