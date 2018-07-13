import resolvers from '../resolvers';

function saveForm(req, res) {
  req.body.formData.values = JSON.stringify(req.body.formData.values);
  resolvers.Creation.createServiceForm(req.body.formData).then(
    creationResponse => {
      res.send(creationResponse);
    }
  );
}

module.exports = saveForm;
