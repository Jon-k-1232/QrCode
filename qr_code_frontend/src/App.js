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
  const [wifi, setWifi] = useState({});
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
   * Create qr string for static Qrs
   * Different types of qr = https://blog.shahednasser.com/generate-10-qr-code-types-with-react/#wifi-qr-codes
   * vCards options https://github.com/cozy/cozy-vcard/blob/master/test/ios-full.vcf
   * @param {*} qrUseCase - a string value of what type of qr is being created
   */
  const setQrValue = qrUseCase => {
    const { authentication, name, password, hidden } = wifi;
    const { linkedIn, twitter, cellPhone } = contactFields;

    switch (qrUseCase) {
      case 'contactCard':
        setUrl(formVCard(contactFields));
        break;
      case 'call':
        setUrl(`TEL:${cellPhone}`);
        break;
      case 'website':
        setUrl(`http://${website}`);
        break;
      case 'wifi':
        setUrl(`WIFI:T:${authentication};S:${name};${authentication !== 'nopass' ? `P:${password};` : ''}H:${hidden};`);
        break;
      case 'twitter':
        setUrl(`http://twitter.com/${twitter}`);
        break;
      case 'linkedIn':
        setUrl(`http://www.linkedin.com/in/${linkedIn}`);
        break;
      default:
        console.log('Error, No Use Case');
        break;
    }
  };

  /**
   * Create object to be sent to backend for dynamic Qr.
   * @returns {Object} {key:values}
   */
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

  /**
   * Call To create Qr code.
   */
  const getQrCode = async () => {
    const qrState = qrSettings.qrState.value;
    const qrUse = qrSettings.useCase.value;

    if (qrState === 'dynamic') {
      const data = createDataObject();
      const qrCodeObject = await createQrCode(data);

      if (qrCodeObject.status === 200) setUrl(qrCodeObject.qr.url);
    } else {
      setQrValue(qrUse);
    }
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
        {/* TODO Create forms for Wifi */}
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

/**
 * Creates a vCard
 * @param {*} contactFields {Object}
 * @returns '' string - vCard
 */
const formVCard = contactFields => {
  const {
    firstName,
    lastName,
    companyName,
    companyPosition,
    street,
    city,
    state,
    zip,
    workPhone,
    fax,
    cellPhone,
    homePhone,
    personalEmail,
    workEmail,
    website,
    linkedIn,
    twitter,
    facebook
  } = contactFields;

  return `BEGIN:VCARD
          VERSION:3.0
          FN:${firstName}
          LN:${lastName}
          ORG:${companyName}
          TITLE: ${companyPosition}
          ADR:;;${street};${city};${state};${zip};
          TEL;type=WORK;type=VOICE:${workPhone}
          TEL;type=WORK;type=FAX:${fax}
          TEL;type=CELL;type=VOICE:${cellPhone}
          TEL;type=HOME;type=VOICE:${homePhone}
          EMAIL;TYPE=home:${personalEmail}
          EMAIL;TYPE=work:${workEmail}
          URL:${website}
          X-SOCIALPROFILE;type=linkedin:http://www.linkedin.com/in/${linkedIn}
          X-SOCIALPROFILE;type=twitter;x-user=twitteruser:http://twitter.com/${twitter}
          X-SOCIALPROFILE;type=facebook;x-user=facebookuser:http://www.facebook.com/${facebook}
          END:VCARD`;
};
