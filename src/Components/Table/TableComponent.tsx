import React from 'react';

interface Props<T> {
  data: T[];

}

const TableComponent = <T extends Record<string, any>>({ data}: Props<T>) => {
  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          {Object.keys(data[0]).map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {Object.keys(data[0]).map((column, colIndex) => (
              <td key={colIndex}>{item[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
