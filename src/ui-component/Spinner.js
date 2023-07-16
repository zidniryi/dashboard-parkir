import React from 'react';
import {Audio} from 'react-loader-spinner';

function Spinner() {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Audio height="100" width="100" radius="9" color="#DFDFDF" ariaLabel="loading" wrapperStyle wrapperClass />
    </div>
  );
}

export default Spinner;
