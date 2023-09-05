import axios from 'axios';
import React, { useState } from 'react';
const Aws_Test = () => {
  const [multipleFiles, setMultipleFiles] = useState('');
  const awsUrl = '/api/aws/uploadMultipleFiles';

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const uploadedFiles = new FormData();
    for (let i = 0; i < multipleFiles.length; i++) {
      uploadedFiles.append('uploadedFiles', multipleFiles[i]);
    }
    const config = {
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(awsUrl, uploadedFiles, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>AWS TEST PAGE</div>
      <form onSubmit={handleSubmit}>
        <input
          name='multipleFiles'
          type='file'
          multiple={true}
          onChange={(e: any) => {
            setMultipleFiles(e.currentTarget.files);
          }}
        />
        <button
          style={{
            backgroundColor: '#4CAF50',
            borderRadius: '20px',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
          }}
        >
          Add Files
        </button>
      </form>
    </>
  );
};

export default Aws_Test;
