import React, { useState } from 'react';
import FetchCache from 'fetch-cache';

const fc = new FetchCache();
const url = 'https://reqres.in/api/users';

function Create(props) {
  const [fname, setFname] = useState('Jane');
  const [lname, setLname] = useState('Smith');
  const [job, setJob] = useState('cook');
  const [showToast, setShowToast] = useState(props.showToast);

  return (
    <div>
      {showToast && <div>Uploaded successfully</div>}
      {!showToast && (
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={fname}
            onChange={(event) => setFname(event.target.value)}
          />
          <label>Last Name</label>
          <input
            type="text"
            value={lname}
            onChange={(event) => setLname(event.target.value)}
          />
          <label>Job</label>
          <input
            type="text"
            value={job}
            onChange={(event) => setJob(event.target.value)}
          />
          <button
            onClick={() => {
              setFname('');
              setLname('');
              setJob('');
              const payload = {
                name: `${fname} ${lname}`,
                job: `${job}`,
              };
              fc.post(url, payload);
              setShowToast(true);
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export default Create;
