import config from '../config';

export const createQrCode = async data => {
  return fetch(`${config.API_ENDPOINT}/qrImage/newQr`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      //  BearerAuthorization: `${config.API_TOKEN}`,
      Origin: `${config.FRONT_WEB}`
    },
    body: JSON.stringify({ data })
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
};
