import React from 'react';
import { TextField } from '@mui/material';

export default function WebAddressFields({ website, setWebsite }) {
  return (
    <>
      <TextField label='https://www.example.com' variant='standard' value={website} onChange={e => setWebsite(e.target.value)} />
    </>
  );
}
