import 'dotenv/config';

export default {
  expo: {
    name: 'globemobile',
    slug: 'globemobile',
    version: '1.0.0',
    extra: {
        URL: process.env.URL,
    },
  },
};
