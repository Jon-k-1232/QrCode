import React, { useState } from 'react';
import './App.css';
import { Container, Button } from '@mui/material';
import { createQrCode } from './ApiCalls/PostCalls';
import Header from './Header/Header';
import QrCodeImage from './QrCodeImage/QrCodeImage';
import UserQrCodeImageSettings from './QrCodeImage/UserQrCodeImageSettings';
import QrTypeSelections from './QrInformationFields/QrTypeSelections';
import UserQrFieldOrchestrator from './QrInformationFields/userQrFieldOrchestrator';

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

  console.log(wifi);

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
        setUrl(`WIFI:T:${authentication};S:${name};${!password.length ? `P:${password}` : ''};H:${hidden};`);
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
    // If user forget to select dynamic or static, auto update to static.
    if (!qrSettings.qrState) {
      setQrSettings(otherSettings => ({
        ...otherSettings,
        qrState: {
          display: 'Static',
          value: 'static'
        }
      }));
    }

    const qrState = qrSettings.qrState ? qrSettings.qrState.value : 'static';
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
        <UserQrFieldOrchestrator
          stateFields={{ website, contactFields, qrSettings }}
          setContactFields={data => setContactFields(data)}
          setWebsite={data => setWebsite(data)}
          setWifi={data => setWifi(data)}
        />
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
    companyName,
    firstName,
    lastName,
    companyPosition,
    street,
    city,
    state,
    zip,
    workPhone,
    cellPhone,
    homePhone,
    personalEmail,
    workEmail,
    website,
    linkedIn,
    twitter,
    facebook,
    instagram
  } = contactFields;

  // Do not try to use spacing or re-format. Will break qr code.
  const vCard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}
ORG:${companyName}
TITLE: ${companyPosition}
ADR;TYPE=home:;;${street};${city};${state};${zip};USA
TEL;type=WORK;type=VOICE:${workPhone}
TEL;type=CELL;type=VOICE:${cellPhone}
TEL;type=HOME;type=VOICE:${homePhone}
EMAIL;TYPE=home:${personalEmail}
EMAIL;TYPE=work:${workEmail}
URL:${website}
X-SOCIALPROFILE;type=linkedin:http://www.linkedin.com/in/${linkedIn}
X-SOCIALPROFILE;type=twitter;http://twitter.com/${twitter}
X-SOCIALPROFILE;type=facebook;http://www.facebook.com/${facebook}
X-SOCIALPROFILE;type=instagram;http://www.instagram.com/${instagram}
END:VCARD`;

  return vCard;
};
