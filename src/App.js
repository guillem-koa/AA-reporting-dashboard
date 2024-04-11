import React from 'react';
import Table from './GenerateOutputsTable';
import './App.css'; // Import CSS file for table styling


function App() {
  const dataArray = [
    {'Machine': 'AA-001', 'Cycle Progress': '70%', 'Cycle Start': '2024-04-08 18:06:43', 'Cycle Complete' : '🟠', 'Action': 'Generate'},
    {'Machine': 'AA-0012', 'Cycle Progress': '40%', 'Cycle Start': '2024-04-08 20:06:43', 'Cycle Complete' : '🟠', 'Action': 'Generate'}
  ];

  return (
    <div>
      <h1> Aquagar Reporting</h1>
      <Table data={dataArray} />
    </div>
  );
}

export default App;
