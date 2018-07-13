import resolvers from '../resolvers';
import saveForm from './save-form.api';
import paymentVer from './payment-ver.api';
import { login, auth, isLoggedIn } from './login.api';

const express = require('express');

const router = express.Router();

/* SAVING AND CHECKING FORM */
router.post('/save_form', (req, res) => saveForm(req, res));

/* PAYMENT */
router.post('/payment_ver', (req, res) => paymentVer(req, res));

/* GET SERVICE TEST */
router.get('/getService', (req, res) => {
  resolvers.Query.getServiceContent({ id: 1 }).then(serviceContent => {
    res.send(serviceContent);
  });
});

/* LOGIN */
router.post('/login', auth(), (req, res) => login(req, res));
router.get('/is_logged_in', (req, res) => isLoggedIn(req, res));

/* router.post('/register', (req, res) => register(req, res));
router.post('/logout', (req, res) => logout(req, res)); */

/* HANDLE INDEX */
router.get('/', (req, res) => {
  res.send('/api');
});

module.exports = router;
