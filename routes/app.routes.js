const constants = require('../config/constants');
const user = require('../src/user/user.routes');
const item = require('../src/item/item.routes');

const apiString = `/api/${constants.API_VERSION}`;

module.exports = function (app) {
  app.use(apiString + '/user', user);
  app.use(apiString + '/item', item);
};
