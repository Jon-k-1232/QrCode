import React from 'react';
import ContactFields from './ContactFields';
import WebAddressFields from './WebAddressFields';
import WifiFields from './WifiFields';

export default function UserQrFieldOrchestrator({ stateFields, setWebsite, setContactFields, setWifi }) {
  const { website, qrSettings } = stateFields;
  const { useCase } = qrSettings;

  return (
    <>
      {useCase && useCase.value === 'contactCard' && <ContactFields setContactFields={data => setContactFields(data)} />}
      {useCase && useCase.value === 'website' && <WebAddressFields website={website} setWebsite={data => setWebsite(data)} />}
      {useCase && useCase.value === 'wifi' && <WifiFields setWifi={data => setWifi(data)} />}
    </>
  );
}
