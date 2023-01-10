import React, { useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

export default function QrTypeSelections({ qrSettings, setQrSettings }) {
  const { useCase, qrState } = qrSettings;

  const initialState = {
    ...qrSettings,
    qrState: null,
    useCase: null
  };

  useEffect(() => {
    setQrSettings(initialState);
  }, []);

  return (
    <div className='qrTypeSelections' style={{ width: '200px' }}>
      <Autocomplete
        required
        options={useTypes}
        getOptionLabel={option => option.display}
        value={useCase || null}
        onChange={(e, v) => setQrSettings(otherSettings => ({ ...otherSettings, useCase: v }))}
        renderInput={params => <TextField {...params} label='Website or Contact' variant='standard' />}
      />
      <Autocomplete
        options={qrOptions}
        getOptionLabel={option => option.display}
        value={qrState || null}
        onChange={(e, v) => setQrSettings(otherSettings => ({ ...otherSettings, qrState: v }))}
        renderInput={params => <TextField {...params} label='Type of Qr' variant='standard' required />}
      />
    </div>
  );
}

const useTypes = [
  {
    display: 'Contact Card',
    value: 'contactCard'
  },
  {
    display: 'Call',
    value: 'call'
  },
  {
    display: 'Website',
    value: 'website'
  },
  {
    display: 'Wifi',
    value: 'wifi'
  },
  {
    display: 'Twitter',
    value: 'twitter'
  },
  {
    display: 'LinkedIn',
    value: 'linkedIn'
  }
];

const qrOptions = [
  {
    display: 'Dynamic',
    value: 'dynamic'
  },
  {
    display: 'Static',
    value: 'static'
  }
];
