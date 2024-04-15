import React from 'react';

function GenerateOutputsTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Machine</th>
          <th>Cycle Progress</th>
          <th>Cycle Start</th>
          <th>Cycle Complete</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item['Machine']}</td>
            <td>{item['Cycle Progress']}</td>
            <td>{item['Cycle Start']}</td>
            <td>{item['Cycle Complete']}</td>
            <td><button> Generate Outputs</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GenerateOutputsTable;

