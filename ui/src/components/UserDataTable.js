import React from 'react';
import Table from 'react-bootstrap/Table';

function UserDataTable(props) {
  const { fileData, detailsArr, delimiter, noOfRows, maxNoOfRows } = props;
  return (
    <Table striped bordered hover size="sm" style={{width: '500px'}}>
      <thead>
        <tr>
          { detailsArr.map((item, idx) => (<th key={`${item}${idx}`}>{item}</th>)) }
        </tr>
      </thead>
      <tbody>
        { fileData.filter(
            (item) => item.includes(delimiter))
            .map((item) => {
              var result = item.split(delimiter);
              return result;
            })
            .map((item, index) => {
              if( index < noOfRows && index < maxNoOfRows) {
                return (
                  <tr>
                    {
                      item.map( (i) => {
                        return (<td>{i}</td>);
                      })
                    }
                </tr>
                );
              } else {
                return null;
              }
            })
        } 
      </tbody>
    </Table>
  );
}

export default UserDataTable;