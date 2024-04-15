import React from 'react';


function GenerateEmailsTable({ data }) {
    return (
      <table>
        <thead>
          <tr>
            <th>Machine</th>
            <th>Cycle Start</th>
            <th>HC</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item['Machine']}</td>
              <td>{item['Cycle Start']}</td>
              <td>{item['HC']}</td>
              <td><button> Send Email</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  export default GenerateEmailsTable;

  