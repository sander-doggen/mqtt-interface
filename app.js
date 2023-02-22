const X = require('express');
const APP = X();

APP.use('/', X.static(__dirname));

module.exports = APP;