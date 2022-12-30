module.exports = {
  PORT: 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_HOST: 'localhost',
  BACKEND_WEB_ADDRESS: 'www.archNemmy.com',
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_URL: 'qr_test',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://@localhost/qr_test',
  API_TOKEN: process.env.API_TOKEN,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  JWT_EXPIRATION: '10h'
};
