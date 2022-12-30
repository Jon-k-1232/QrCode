import { Container, Button } from '@mui/material';
import React, { useState } from 'react';
import './App.css';
import Header from './Header/Header';
import QrCodeImage from './QrCodeImage/QrCodeImage';
import UserQrCodeImageSettings from './QrCodeImage/UserQrCodeImageSettings';
import QrTypeSelections from './QrInformationFields/QrTypeSelections';
import WebAddressFields from './QrInformationFields/WebAddressFields';
import { createQrCode } from './ApiCalls/PostCalls';

function App() {
  const [url, setUrl] = useState('');
  const [qr, setQr] = useState('');
  const [website, setWebsite] = useState('');
  const [contactForms, setContactForms] = useState({});
  const [qrSettings, setQrSettings] = useState({
    backgroundColor: '#000000',
    foregroundColor: '#FFFFFF',
    border: 0,
    size: 400,
    qrState: null,
    useCase: null
  });
  const [user, setUser] = useState({
    userId: 1,
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    lastUpdatedDate: '',
    creationDate: '',
    isUserActive: true
  });

  const getQrCode = async () => {
    const qrState = qrSettings.qrState.value;
    if (qrState === 'dynamic') {
      const data = createDataObject();
      const qrCodeObject = await createQrCode(data);

      if (qrCodeObject.status === 200) {
        setUrl(qrCodeObject.qr.url);
      } else {
        console.log(qrCodeObject);
      }
    } else {
      setUrl(website);
    }
  };

  const createDataObject = () => {
    const useCase = qrSettings.useCase.value;
    return {
      website,
      ...user,
      ...qrSettings,
      useCase
      // ...contactForms
    };
  };

  return (
    <div className='app'>
      <Header />
      <Container style={{ display: 'flex' }}>
        <Container direction='column' spacing={2}>
          <QrTypeSelections qrSettings={qrSettings} setQrSettings={data => setQrSettings(data)} />
        </Container>
        <Container direction='column' spacing={2}>
          <UserQrCodeImageSettings qrSettings={qrSettings} setQrSettings={data => setQrSettings(data)} />
        </Container>
      </Container>
      <Container>
        <WebAddressFields website={website} setWebsite={data => setWebsite(data)} />
      </Container>
      <Container style={{ margin: '10px' }}>
        <Button variant='contained' onClick={getQrCode}>
          Create Qr Code
        </Button>
      </Container>
      <QrCodeImage qr={qr} setQr={setQr} url={url} qrSettings={qrSettings} showDownloadButton={false} />
    </div>
  );
}

export default App;
