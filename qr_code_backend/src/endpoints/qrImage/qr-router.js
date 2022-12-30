const express = require('express');
const qrRouter = express.Router();
const qrService = require('./qr-service');
const jsonParser = express.json();
const { sanitizeFields } = require('../../utils');
// const { requireAuth } = require('../auth/jwt-auth');
const dayjs = require('dayjs');
const vCardsJS = require('vcards-js');

qrRouter
  .route('/qrInformation/:userId/:qrId')
  // .all(requireAuth)
  .get(async (req, res) => {
    const db = req.app.get('db');
    const userId = JSON.parse(req.params.userId);
    const qrId = JSON.parse(req.params.qrId);

    // Get Qr info
    const qrImage = await qrService.getQr(db, userId, qrId);
    const qrInfo = qrImage[0];

    // Either redirect or create vCard depending on what the user selected the vCard use for, website, or contact card
    if (qrInfo.useCase === 'website') {
      res.status(301).redirect(`https://${qrInfo.website}`);
    } else {
      sendVCard(res, qrInfo);
    }
  });

qrRouter
  .route('/newQr')
  // .all(requireAuth)
  .post(jsonParser, async (req, res) => {
    const db = req.app.get('db');
    const bodyData = { ...req.body.data };
    const sanitizedData = sanitizeFields(bodyData);
    const userId = JSON.parse(sanitizedData.userId);

    const {
      size,
      border,
      backgroundColor,
      foregroundColor,
      useCase,
      companyName,
      firstName,
      lastName,
      phone,
      fax,
      street,
      city,
      zip,
      email,
      website,
      twitter,
      facebook,
      linkedIn,
      instagram,
      otherSocialMedia
    } = sanitizedData;

    // Limits qr codes to 25 per account
    // const numberOfAccountQrCodes = await qrService.getAccountQrCount(db, userId);
    // if (numberOfAccountQrCodes.length >= 25) {
    //   res.send({
    //     message: 'Number of allowed QR codes exceeded',
    //     status: 400
    //   });
    // }

    const mostRecentQrCodeNumber = await qrService.getMostRecentQrCodeNumber(db);
    const nextQrCodeNumber = mostRecentQrCodeNumber[0].max + 1;
    const mostRecentQrCodeInformationNumber = await qrService.getMostRecentQrCodeInformationNumber(db);
    const nextQrCodeInformationNumber = mostRecentQrCodeInformationNumber[0].max + 1;

    const newQr = {
      userId,
      qrInformationId: nextQrCodeInformationNumber,
      url: `www.archNemmy.com/qrInformation/${userId}/${nextQrCodeNumber}`,
      size: Number(size),
      border: Number(border),
      backgroundColor: backgroundColor,
      foregroundColor: foregroundColor,
      creationDate: dayjs().format(),
      isQrActive: true
    };

    const newQrInformation = {
      qrId: nextQrCodeNumber,
      userId,
      numberOfTimesScanned: 0,
      lastAccessed: dayjs().format(),
      creationDate: dayjs().format(),
      useCase: useCase,
      companyName: companyName,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      fax: fax,
      street: street,
      city: city,
      zip: zip,
      email: email,
      website: website,
      twitter: twitter,
      facebook: facebook,
      linkedIn: linkedIn,
      instagram: instagram,
      otherSocialMedia: otherSocialMedia,
      isQrInformationActive: true
    };

    const qrDB = await qrService.insertNewQrImage(db, newQr);
    const qrInformationDB = await qrService.insertNewQrInformation(db, newQrInformation);
    const qr = qrDB[0];
    const qrInformation = qrInformationDB[0];

    res.send({
      qr,
      qrInformation,
      message: 'Successful',
      status: 200
    });
  });

module.exports = qrRouter;

//** Creates the vCard */
const sendVCard = (res, qrInfo) => {
  // Creates new vcard object
  const vCard = vCardsJS();

  // Properties https://www.npmjs.com/package/vcards-js
  (vCard.organization = qrInfo.companyName),
    (vCard.firstName = qrInfo.firstName),
    (vCard.lastName = qrInfo.lastName),
    (vCard.cellPhone = qrInfo.phone),
    (vCard.workFax = qrInfo.fax),
    (vCard.homeAddress.street = qrInfo.street),
    (vCard.homeAddress.city = qrInfo.city),
    (vCard.homeAddress.postalCode = qrInfo.zip),
    (vCard.email = qrInfo.email),
    (vCard.url = qrInfo.website),
    (vCard.socialUrls['twitter'] = qrInfo.twitter),
    (vCard.socialUrls['facebook'] = qrInfo.facebook),
    (vCard.socialUrls['linkedIn'] = qrInfo.linkedIn),
    (vCard.socialUrls['instagram'] = qrInfo.instagram),
    (vCard.socialUrls['custom'] = qrInfo.otherSocialMedia);

  // Reformatting the social media links as error for CHARSET=UTF-8 kept appearing on vcard
  let newVCard = vCard.getFormattedString();
  newVCard = newVCard.replace(/SOCIALPROFILE;CHARSET=UTF-8;/gm, 'SOCIALPROFILE;');

  res.set('Content-Type', `text/vcard; name="${qrInfo.lastName}.vcf"`);
  res.set('Content-Disposition', `inline; filename="${qrInfo.lastName}.vcf"`);
  res.send(newVCard);
};
