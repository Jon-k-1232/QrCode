import React, { useEffect } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';

export default function UserQrCodeImageSettings({ qrSettings, setQrSettings }) {
  const { size, border, backgroundColor, foregroundColor } = qrSettings;

  const initialState = {
    ...qrSettings,
    backgroundColor: '#000000',
    foregroundColor: '#FFFFFF',
    border: 0,
    size: 250
  };

  useEffect(() => {
    setQrSettings(initialState);
  }, []);

  return (
    <Container style={{ display: 'flex' }}>
      <Stack>
        <TextField
          label='Qr Size'
          type='number'
          variant='standard'
          value={size || ''}
          onChange={e => setQrSettings(otherSettings => ({ ...otherSettings, size: e.target.value }))}
          style={style.textBoxes}
        />

        <TextField
          label='Qr Border Thickness'
          type='number'
          variant='standard'
          value={border || ''}
          onChange={e => setQrSettings(otherSettings => ({ ...otherSettings, border: e.target.value }))}
          style={style.textBoxes}
        />
      </Stack>
      <Stack style={{ alignSelf: 'self-end' }}>
        <Container style={style.pickers}>
          <Typography style={style.text}>Background Color</Typography>
          <input
            type='color'
            value={backgroundColor || ''}
            onChange={e => setQrSettings(otherSettings => ({ ...otherSettings, backgroundColor: e.target.value }))}
          />
        </Container>

        <Container style={style.pickers}>
          <Typography style={{ color: '#666666', margin: '0 8px 0 0', padding: 0 }}>Foreground Color</Typography>
          <input
            type='color'
            value={foregroundColor || ''}
            onChange={e => setQrSettings(otherSettings => ({ ...otherSettings, foregroundColor: e.target.value }))}
          />
        </Container>
      </Stack>
    </Container>
  );
}

const style = {
  text: {
    color: '#666666',
    margin: '0 5px 0 0',
    padding: 0
  },
  textBoxes: {
    margin: '0',
    padding: 0,
    width: '200px'
  },
  pickers: {
    display: 'flex',
    padding: 0,
    margin: '0 10px 10px',
    width: '325px'
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    margin: 0
  }
};
