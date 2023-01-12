import React from 'react';
import { TextField } from '@mui/material';
import ContactFields from './ContactFields';
import WifiFields from './WifiFields';

export default function UserQrFieldOrchestrator({ stateFields, singleText, setSingleText, setContactFields, setWifi }) {
  const { qrSettings } = stateFields;
  const { useCase } = qrSettings;

  return (
    <>
      {useCase && useCase.value === 'contactCard' && <ContactFields setContactFields={data => setContactFields(data)} />}
      {useCase && useCase.value === 'wifi' && <WifiFields setWifi={data => setWifi(data)} />}
      {useCase && useCase.value === 'website' && (
        <TextField
          label={'https://www.NameOfWebsite.com'}
          variant='standard'
          value={singleText}
          onChange={e => setSingleText(e.target.value)}
          style={style.singleText}
        />
      )}
      {useCase && useCase.value === 'phoneCall' && (
        <TextField
          label={'Phone Number'}
          variant='standard'
          value={singleText}
          onChange={e => setSingleText(e.target.value)}
          style={style.singleText}
        />
      )}
      {useCase && useCase.value === 'twitter' && (
        <TextField
          label={'Twitter url'}
          variant='standard'
          value={singleText}
          onChange={e => setSingleText(e.target.value)}
          style={style.singleText}
        />
      )}
      {useCase && useCase.value === 'facebook' && (
        <TextField
          label={'Facebook url'}
          variant='standard'
          value={singleText}
          onChange={e => setSingleText(e.target.value)}
          style={style.singleText}
        />
      )}
      {useCase && useCase.value === 'instagram' && (
        <TextField
          label={'Instagram url'}
          variant='standard'
          value={singleText}
          onChange={e => setSingleText(e.target.value)}
          style={style.singleText}
        />
      )}
      {useCase && useCase.value === 'linkedIn' && (
        <TextField
          label={'linkedIn url'}
          variant='standard'
          value={singleText}
          onChange={e => setSingleText(e.target.value)}
          style={style.singleText}
        />
      )}
    </>
  );
}

const style = {
  singleText: { width: '350px' }
};
