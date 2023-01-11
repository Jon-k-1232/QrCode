import React, { useState } from 'react';
import { TextField } from '@mui/material';

export default function ContactFields({ setContactFields }) {
  const [contactField, setContactField] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    companyPosition: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    workPhone: '',
    cellPhone: '',
    homePhone: '',
    personalEmail: '',
    workEmail: '',
    website: '',
    linkedIn: '',
    twitter: '',
    facebook: '',
    instagram: ''
  });

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
  } = contactField;

  return (
    <>
      <TextField
        label='Company Name'
        variant='standard'
        value={companyName}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, companyName: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, companyName: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='First Name'
        variant='standard'
        value={firstName}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, firstName: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, firstName: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='Last Name'
        variant='standard'
        value={lastName}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, lastName: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, lastName: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='Company Role'
        variant='standard'
        value={companyPosition}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, companyPosition: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, companyPosition: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='Cell Phone'
        variant='standard'
        value={cellPhone}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, cellPhone: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, cellPhone: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='Home Phone'
        variant='standard'
        value={homePhone}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, homePhone: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, homePhone: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='WorkPhone'
        variant='standard'
        value={workPhone}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, workPhone: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, workPhone: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='Street'
        variant='standard'
        value={street}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, street: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, street: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='City'
        variant='standard'
        value={city}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, city: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, city: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='State'
        variant='standard'
        value={state}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, state: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, state: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='Zip'
        variant='standard'
        value={zip}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, zip: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, zip: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='Personal Email'
        variant='standard'
        value={personalEmail}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, personalEmail: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, personalEmail: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='Work Email'
        variant='standard'
        value={workEmail}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, workEmail: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, workEmail: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='Website'
        variant='standard'
        value={website}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, website: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, website: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='LinkedIn Profile Url'
        variant='standard'
        value={linkedIn}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, linkedIn: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, linkedIn: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='Twitter Profile Url'
        variant='standard'
        value={twitter}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, twitter: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, twitter: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='Facebook Profile Url'
        variant='standard'
        value={facebook}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, facebook: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, facebook: e.target.value }));
        }}
        style={style.textBoxes}
      />
      <TextField
        label='Instagram Profile Url'
        variant='standard'
        value={instagram}
        onChange={e => {
          setContactField(otherSettings => ({ ...otherSettings, instagram: e.target.value }));
          setContactFields(otherSettings => ({ ...otherSettings, instagram: e.target.value }));
        }}
        style={style.textBoxes}
      />
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
