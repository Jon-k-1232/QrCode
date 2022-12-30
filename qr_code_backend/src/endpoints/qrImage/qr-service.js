const qrService = {
  getQr(db, userId, qrId) {
    return db
      .select()
      .from('qrs')
      .where('qrs.userId', userId)
      .where('qrs.qrId', qrId)
      .join('qrInformation', 'qrs.qrInformationId', '=', 'qrInformation.qrInformationId');
  },

  getMostRecentQrCodeNumber(db) {
    return db.select().from('qrs').max('qrId');
  },

  getMostRecentQrCodeInformationNumber(db) {
    return db.select().from('qrInformation').max('qrInformationId');
  },

  getAccountQrCount(db, userId) {
    return db.select().from('qrs').where('userId', userId).whereIn('isQrActive', [true]);
  },

  insertNewQrImage(db, newQr) {
    return db.insert(newQr).into('qrs').returning('*');
  },

  insertNewQrInformation(db, newQrInformation) {
    return db.insert(newQrInformation).into('qrInformation').returning('*');
  }
};

module.exports = qrService;
