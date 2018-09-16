import resolvers from '../resolvers';

async function getDashboardData(req, res){
  if (req.isAuthenticated()) {
    let userId = req.user.id;
    let user = await resolvers.Query.getOneUser({id: userId});
    let userServices = await JSON.parse(user.services);
    let services = await resolvers.Query.getServices(userServices);
    res.send(services)
  } else {
    res.send("404");
  }
}

module.exports = getDashboardData;
