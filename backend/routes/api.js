import resolvers from '../resolvers';

const paypalModule = require('paypal-rest-api');
const express = require('express');

const router = express.Router();

/* PAYMENT */
router.post('/payment_ver', (req, res) => {
  const reqUrl = `v1/payments/payment/${req.body.payment.paymentID}`;

  const paypal = new paypalModule.PayPalRestApi({
    client_id:
      'ATxBLtc-8ZqZuTl8LZSCvVnRaNNXSzXksBMmCOcytinSsWGUsqNXUZu7cplbGjFjSReLNLwlIZIfGNDN',
    client_secret:
      'ENT_Z-nYetS6e-jo2AswSOwOnAVS3D1lTSptY1bXgCkYwaM0o_VJd3Rs9fTsnqjqs7AZnXWYfNJC838A',
    mode: 'sandbox'
  });

  function handleResponse(response) {
    /* handle verification */
    res.send(response.body.state);
  }

  function handleError(err) {
    res.send(err);
  }

  paypal.client
    .request({
      method: 'GET',
      uri: reqUrl
    })
    .then(response => {
      handleResponse(response);
    })
    .catch(err => {
      handleError(err);
    });
});
router.get('/getService', (req, res) => {
  resolvers.Query.getServiceContent({ id: 1 }).then(serviceContent => {
    res.send(serviceContent);
  });
});

/* HANDLE INDEX */
router.get('/', (req, res) => {
  res.send('/api');
});

module.exports = router;