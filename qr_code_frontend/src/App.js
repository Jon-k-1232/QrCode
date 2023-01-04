import React, { useState } from 'react';
import './App.css';
import { Container, Button } from '@mui/material';
import { createQrCode } from './ApiCalls/PostCalls';
import Header from './Header/Header';
import QrCodeImage from './QrCodeImage/QrCodeImage';
import UserQrCodeImageSettings from './QrCodeImage/UserQrCodeImageSettings';
import QrTypeSelections from './QrInformationFields/QrTypeSelections';
import WebAddressFields from './QrInformationFields/WebAddressFields';
import ContactFields from './QrInformationFields/ContactFields';

function App() {
  const [url, setUrl] = useState('');
  const [qr, setQr] = useState('');
  const [website, setWebsite] = useState('');
  const [contactFields, setContactFields] = useState({});
  const [qrSettings, setQrSettings] = useState({});
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

  /**
   * Call To create Qr code.
   */
  const getQrCode = async () => {
    const qrState = qrSettings.qrState.value;

    if (qrState === 'dynamic') {
      const data = createDataObject();
      console.log(data);
      const qrCodeObject = await createQrCode(data);

      if (qrCodeObject.status === 200) {
        setUrl(qrCodeObject.qr.url);
      } else {
        console.log(qrCodeObject);
      }
    } else {
      // ToDo different types of qr = https://blog.shahednasser.com/generate-10-qr-code-types-with-react/#wifi-qr-codes
      setUrl(website);
    }
  };

  const createDataObject = () => {
    const useCase = qrSettings.useCase.value;
    return {
      ...user,
      ...qrSettings,
      ...contactFields,
      website,
      useCase
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
        {qrSettings.useCase && qrSettings.useCase.value === 'website' && (
          <WebAddressFields website={website} setWebsite={data => setWebsite(data)} />
        )}
        {qrSettings.useCase && qrSettings.useCase.value === 'contactCard' && (
          <ContactFields contactFields={contactFields} setContactFields={data => setContactFields(data)} />
        )}
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
