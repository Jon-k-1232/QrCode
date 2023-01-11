import React, { useState } from 'react';
import { TextField, Checkbox, FormGroup, FormControlLabel, Autocomplete } from '@mui/material';

export default function WifiFields({ setWifi }) {
  const [wifiFields, setWifiFields] = useState({
    authentication: null,
    name: '',
    password: '',
    isHidden: false
  });

  const { authentication, name, password, isHidden } = wifiFields;

  return (
    <>
      <Autocomplete
        options={authTypes}
        getOptionLabel={option => option.display}
        value={authentication || null}
        onChange={(e, v) => {
          setWifi(otherSettings => ({ ...otherSettings, authentication: v }));
          setWifiFields(otherSettings => ({ ...otherSettings, authentication: v }));
        }}
        renderInput={params => <TextField {...params} label='authentication' variant='standard' />}
        style={style.textBoxes}
      />

      <TextField
        label='name'
        variant='standard'
        value={name}
        onChange={e => {
          setWifi(otherSettings => ({ ...otherSettings, name: e.target.value }));
          setWifiFields(otherSettings => ({ ...otherSettings, name: e.target.value }));
        }}
        style={style.textBoxes}
      />

      <TextField
        label='password'
        variant='standard'
        value={password}
        onChange={e => {
          setWifi(otherSettings => ({ ...otherSettings, password: e.target.value }));
          setWifiFields(otherSettings => ({ ...otherSettings, password: e.target.value }));
        }}
        style={style.textBoxes}
      />

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              label='Hidden'
              checked={isHidden}
              onChange={(e, v) => {
                setWifi(otherSettings => ({ ...otherSettings, isHidden: v }));
                setWifiFields(otherSettings => ({ ...otherSettings, isHidden: v }));
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label='Hidden Network'
        />
      </FormGroup>
    </>
  );
}

const style = {
  textBoxes: {
    margin: '10px',
    padding: 0,
    width: '200px'
  }
};

const authTypes = [
  { display: 'none', value: 'none' },
  { display: 'WEP', value: 'WEP' },
  { display: 'WPA', value: 'WPA' },
  { display: 'WPA2', value: 'WPA2' },
  { display: 'WPA3', value: 'WPA3' }
];
