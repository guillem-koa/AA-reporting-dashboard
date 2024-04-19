import React, { useState, useEffect } from 'react';

function MainComponent() {
  const [apiResponse, setApiResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://37.187.176.243:8001/AA_outputs_and_emails_tables_optimized');
      const data = await response.json();
      setApiResponse(data);
      setIsLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  const generateOutputsTable = (
    <div>
      <h2>Generate Outputs Table</h2>
      <table>
        <thead>
          <tr>
            {apiResponse[0] && Object.keys(apiResponse[0][0]).map(key => (
              <th key={key}>{key}</th>
            ))}
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {apiResponse[0] && apiResponse[0].map((item, index) => (
            <tr key={index}>
              {Object.entries(item).map(([key,value]) => (
                <td key={key}>
                  {key === "Folder ID" ? (
                  <button onClick={() => window.location.href = value}>
                    Open Folder
                  </button>
                ) : (
                  value
                )}
                  </td>
              ))}
              <td>
                <button onClick={() => handleOutputsButtonClick(item['Machine'], item['Cycle Start'])}>
                  Generate Output
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const sendEmailsTable = (
    <div>
      <h2>Send Emails Table</h2>
      {apiResponse[1] && apiResponse[1].length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(apiResponse[1][0]).map(key => (
                <th key={key}>{key}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {apiResponse[1].map((item, index) => (
              <tr key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <td key={key}>
                    {key === "Folder ID" ? (
                      <button onClick={() => window.location.href = value}>
                        Open Folder
                      </button>
                    ) : (
                      value
                    )}
                  </td>
                ))}
                {/* This generates the Send Mail button (only if HC is true) */}
                <td>
                  {item['HC'] === '✅' ? (
                    <button onClick={() => handleEmailsButtonClick(item['Machine'], item['Cycle Start'])}>
                      Send Email
                    </button>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center' }}>Everything is up to date! 🫡</p>
      )}
    </div>
  );
  
  function handleOutputsButtonClick(machine, cycleStart) {
    const url = `http://37.187.176.243:8001/AA_generate_outputs?serial_num=${machine}&experiment_folder=${cycleStart}`;
    window.open(url, '_blank');
  }

  function handleEmailsButtonClick(machine, cycleStart) {
    const url = `http://37.187.176.243:8001/AA_send_emails?serial_num=${machine}&experiment_folder=${cycleStart}`;
    window.open(url, '_blank');
  }

  if (isLoading) {
    return (
        <div style={{ textAlign: 'center' }}>
        {/* Loading message */}
        <h2>Loading...</h2>
        {/* Animated gif */}
        <img src="https://i.pinimg.com/originals/aa/77/d9/aa77d976114e57a093118db5b3508f0d.gif" alt="Loading animation" style={{ display: 'block', margin: '0 auto' }} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ textAlign: 'center' , margin: '20px'}}>
      <b>Atention ⚠️</b>
      <p> The data shown is not from the actual AQUAGAR folder, it's from copy I made. for testing purposes.</p>
      <p> Generate Outputs button is not functioning properly (yet).</p>
    </div>
      {generateOutputsTable}
      {sendEmailsTable}
    </div>
  );
}


export default MainComponent;
