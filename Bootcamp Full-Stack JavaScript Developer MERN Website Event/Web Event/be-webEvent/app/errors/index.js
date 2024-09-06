const CustomAPIError = require('./custom-api-error');
const BadRequestError = require('./bad-request');
const NotFoundError = require('./not-found');
const UnauthenticatedError = require ('./unauthenticated.js');
const UnauthorizedError = require ('./unauthorized.js');

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError
};