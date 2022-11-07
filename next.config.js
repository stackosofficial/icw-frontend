/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');


const nextConfig = {
  publicRuntimeConfig: {
    TEST: 'testVar',
  },
  reactStrictMode: true,
  i18n,
  output: 'standalone'
};

module.exports = nextConfig;
