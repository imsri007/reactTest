import React, { useState, useRef } from 'react';
import { Button }  from 'react-bootstrap';
import UserDataTable from './UserDataTable';

import './AppContainer.css';


function AppContent() {
  const [ fileData, setFileData ] = useState([]);
  const [noOfRows, setNoOfRows] = useState(2);
  
  // default delimiter is ','  we can also use '|' and '-' as per sample.txt data for test
  const [ delimiter, setDelimiter] = useState(',');
  const fileInputEl = useRef(null);
  const maxNoOfRows = 4;
  const detailsArr = ["name", "address", "city", "country", "pin"];



  const onUpload = (ev) => {
    ev.preventDefault();
    const data = new FormData();

    data.append('file', fileInputEl.current.files[0]);
    data.append('filename', fileInputEl.current.files[0].name);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        setFileData(body.file.split('\n'));
      });
    });
  };

  return (
    <>
      <div className="container">
        <h3 className="page-header">Fetch and Populate Person's Data</h3>
        <hr/>
        <div className='row'>
          <div className='col-xs-12 col-md-6 col-md-offset-3'>
            <input ref={fileInputEl} type="file" />
            <Button variant="primary" onClick={onUpload}>Upload File</Button>
          </div>
        </div>
        <div className='row' style={{marginTop: '10px'}}>
          <div className='col-xs-12 col-md-6 col-md-offset-3'>
            <label >Number of Rows</label>
            <input
              type="text"
              id="numberOfRows"
              style={{marginLeft: '10px', marginTop: '10px'}}
              onChange={e => setNoOfRows(e.target.value)}
              defaultValue={noOfRows}
            /> 
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-md-6 col-md-offset-3'>
            <label>Delimiter(use pipe, dash or comma)</label>
            <input
              type="text"
              id="delimiter"
              style={{marginLeft: '10px', marginTop: '10px'}}
              onChange={e => setDelimiter(e.target.value)}
              defaultValue={delimiter}
            /> 
          </div>
        </div>
        <hr/>
        <br/>
        {fileData.length > 0 ? 
          <UserDataTable 
            fileData={fileData}
            detailsArr={detailsArr}
            delimiter={delimiter}
            noOfRows={noOfRows}
            maxNoOfRows={maxNoOfRows}
          /> :
          <div class="alert alert-info">
            <strong>Info!</strong> Please upload data file to populate the tabular view!
          </div>
          }
      </div>
    </>
  );
}

export default AppContent;


