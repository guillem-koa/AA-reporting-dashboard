import React, { useState, useEffect } from 'react';

function MainComponent() {
  const [apiResponse, setApiResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [loading, setLoading] = useState(false);


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
      <h2>Generate Outputs</h2>
      {apiResponse[0] && apiResponse[0].length > 0 ? (
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
                    <button onClick={() => window.open(value, '_blank')}>
                      Go to Folder
                    </button>
                ) : (
                  value
                )}
                  </td>
              ))}
              <td>
              {loading ? (
                  <img src="https://i.gifer.com/ZKZg.gif" alt="Loading..." style={{ width: '20px', height: '20px' }}/>
                ) : (
                  <button onClick={() => handleOutputsButtonClick(item['Machine'], item['Cycle Start'], item['Folder ID'].split("/").pop())}>
                    Generate Output
                  </button>
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

  const sendEmailsTable = (
    <div>
      <h2>Send Emails</h2>
      {apiResponse[1] && apiResponse[1].length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(apiResponse[1][0]).map(key => (
                <th key={key}>{key}</th>
              ))}
              <th>Test Mail</th>
              <th>Report Mail</th>
            </tr>
          </thead>
          <tbody>
            {apiResponse[1].map((item, index) => (
              <tr key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <td key={key}>
                    {key === "Folder ID" ? (
                      <button onClick={() => window.open(value, '_blank')}>
                        Go to Folder
                      </button>
                    ) : (
                      value
                    )}
                  </td>
                ))}
                {/* This generates the Send Mail button (only if HC is true) */}
                <td>
                  {item['HC'] === '🟢' ? (
                    <button onClick={() => handleEmailsButtonClick(item['Machine'], item['Cycle Start'], item['Folder ID'].split("/").pop(), true)}>
                      Send
                    </button>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </td>
                <td>
                  {item['HC'] === '🟢' ? (
                    <button onClick={() => handleEmailsButtonClick(item['Machine'], item['Cycle Start'], item['Folder ID'].split("/").pop(), false)}>
                      Send
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
  
  async function handleOutputsButtonClick(machine, cycleStart, experiment_folder_id) {
    const url = `http://37.187.176.243:8001/AA_generate_outputs?serial_num=${machine}&cycle_start=${cycleStart}&experiment_folder_id=${experiment_folder_id}`;
    try {
      setLoading(true); // Set loading state to true when the button is clicked
      const response = await fetch(url);
      if (response.ok) {
        window.open(url, '_blank');
        window.location.reload(); // Reload the entire page after opening the window
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Reset loading state after the API call completes
    }
  }

  async function handleEmailsButtonClick(machine, cycleStart, experiment_folder_id, isTest) {
    const url = `http://37.187.176.243:8001/AA_send_emails?serial_num=${machine}&cycle_start=${cycleStart}&experiment_folder_id=${experiment_folder_id}&test=${isTest}`;
    window.open(url, '_blank');
    window.location.reload(); // Refresh the entire page
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
      {generateOutputsTable}
      {sendEmailsTable}
    </div>
  );
}


export default MainComponent;
