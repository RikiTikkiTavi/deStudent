import resolvers from '../resolvers';

const paypalModule = require('paypal-rest-api');

function paymentVer(req, res) {
  const reqUrl = `v1/payments/payment/${req.body.payment.paymentID}`;

  const paypal = new paypalModule.PayPalRestApi({
    client_id:
      'ATxBLtc-8ZqZuTl8LZSCvVnRaNNXSzXksBMmCOcytinSsWGUsqNXUZu7cplbGjFjSReLNLwlIZIfGNDN',
    client_secret:
      'ENT_Z-nYetS6e-jo2AswSOwOnAVS3D1lTSptY1bXgCkYwaM0o_VJd3Rs9fTsnqjqs7AZnXWYfNJC838A',
    mode: 'sandbox'
  });

  function handleResponse(response) {
    resolvers.Query.getServiceContent({ id: 1 }).then(serviceContent => {
      if (
        response.body.state === 'approved' &&
        // CHECK AMOUNT OF PAYMENT
        response.body.transactions[0].amount.total === serviceContent.price
      ) {
        res.send(serviceContent);
      } else {
        res.send('HandleResponse Error');
      }
    });
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
}

module.exports = paymentVer;
