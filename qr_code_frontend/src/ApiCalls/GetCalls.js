// export const getQrCode = async date => {
//   return fetch(`${config.API_ENDPOINT}/employeeTime/history/${date}`, getHeader)
//     .then(resp => {
//       if (!resp.ok) {
//         throw new Error(resp.status);
//       }
//       return resp.json();
//     })
//     .then(res => res)
//     .catch(error => error);
// };

// const noData = {
//   rawData: [],
//   tableData: [],
//   tableHeaders: []
// };

// const getHeader = {
//   method: 'GET',
//   headers: {
//     'content-type': 'application/json',
//     Authorization: `${config.JWT_TOKEN}`,
//     BearerAuthorization: `${config.API_TOKEN}`,
//     Origin: `${config.FRONT_WEB}`
//   }
// };
