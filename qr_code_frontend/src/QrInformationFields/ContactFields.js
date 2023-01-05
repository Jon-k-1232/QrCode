import React, { useEffect } from 'react';
import { TextField } from '@mui/material';

export default function ContactFields({ contactFields, setContactFields }) {
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

  useEffect(() => {
    setContactFields(fields);
  }, []);

  return (
    <>
      {/* TODO - UPDATE ALL CONTACT FIELDS */}
      <TextField
        label='Company Name'
        variant='standard'
        value={companyName || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, companyName: e.target.value }))}
        style={style.textBoxes}
      />
      <TextField
        label='First Name'
        variant='standard'
        value={firstName || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, firstName: e.target.value }))}
        style={style.textBoxes}
      />
      <TextField
        label='Last Name'
        variant='standard'
        value={lastName || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, lastName: e.target.value }))}
        style={style.textBoxes}
      />
      <TextField
        label='Phone'
        variant='standard'
        value={phone || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, phone: e.target.value }))}
        style={style.textBoxes}
      />
      <TextField
        label='Fax'
        variant='standard'
        value={fax || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, fax: e.target.value }))}
        style={style.textBoxes}
      />
      <TextField
        label='Street'
        variant='standard'
        value={street || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, street: e.target.value }))}
        style={style.textBoxes}
      />
      <TextField
        label='City'
        variant='standard'
        value={city || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, city: e.target.value }))}
        style={style.textBoxes}
      />
      <TextField
        label='Zip'
        variant='standard'
        value={zip || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, zip: e.target.value }))}
        style={style.textBoxes}
      />
      <TextField
        label='Email'
        variant='standard'
        value={email || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, email: e.target.value }))}
        style={style.textBoxes}
      />
      <TextField
        label='Website'
        variant='standard'
        value={website || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, website: e.target.value }))}
        style={style.textBoxes}
      />
      <TextField
        label='Twitter'
        variant='standard'
        value={twitter || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, twitter: e.target.value }))}
        style={style.textBoxes}
      />
      <TextField
        label='Facebook'
        variant='standard'
        value={facebook || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, facebook: e.target.value }))}
        style={style.textBoxes}
      />
      <TextField
        label='LinkedIn'
        variant='standard'
        value={linkedIn || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, linkedIn: e.target.value }))}
        style={style.textBoxes}
      />
      <TextField
        label='Instagram'
        variant='standard'
        value={instagram || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, instagram: e.target.value }))}
        style={style.textBoxes}
      />
      <TextField
        label='Other Social Media'
        variant='standard'
        value={otherSocialMedia || ''}
        onChange={e => setContactFields(otherSettings => ({ ...otherSettings, otherSocialMedia: e.target.value }))}
        style={style.textBoxes}
      />
    </>
  );
}

const fields = {
  firstName: '',
  lastName: '',
  companyName: '',
  companyPosition: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  workPhone: '',
  fax: '',
  cellPhone: '',
  homePhone: '',
  personalEmail: '',
  workEmail: '',
  website: '',
  linkedIn: '',
  twitter: '',
  facebook: ''
};

const style = {
  textBoxes: {
    margin: '10px',
    padding: 0,
    width: '200px'
  }
};
