import React from 'react';
import { TextField } from '@mui/material';

export default function WebAddressFields({ website, setWebsite }) {
  return (
    <div className='WebAddressFields' style={{ width: '200px', margin: '10px' }}>
      <TextField label='https://www.example.com' variant='standard' value={website} onChange={e => setWebsite(e.target.value)} />
    </div>
  );
}
