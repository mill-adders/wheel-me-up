/* eslint-disable no-undef */
'use strict';

const User = require('../auth/Users-models.js');

module.exports = (required_capability) => {
  
  return (req, res, next) => {

    try {
      let [authType, authString] = req.headers.authorization.split(/\s+/);
      slog.log('middleware called headers: ', req.headers.authorization);
      switch (authType.toLowerCase()) {
      case 'basic':
        return _authBasic(authString);
      case 'bearer':
        return _authBearer(authString);
      default:
        return _authError();
      }
    } catch (e) {
      _authError();
    }


    function _authBasic(str) {

      let base64Buffer = Buffer.from(str, 'base-64'); 
      let bufferString = base64Buffer.toString();    
      let [username, password] = bufferString.split(':'); 
      let auth = {username, password};
      slog.log('auth basic username pass: ', auth);

      return User.authenticateBasic(auth)
        .then(user => _authenticate(user))
        .then(() => {})
        .catch(_authError);
    }

    function _authBearer(authString) {
      return User.authenticateToken(authString)
        .then(user => _authenticate(user))
        .then(() => {})
        .catch(_authError);
    }

    async function _authenticate(user) {
      slog.log('authenticate basic called with user: ', user);
      
      if ( user ) {
        let user_has_capability = false;
        if (!required_capability) {
          user_has_capability = true;
        } else {
          //required capability
          user_has_capability = await user.can(required_capability);
        }
        if (user_has_capability) {
          req.user = user;
          req.token = await user.generateToken();
          next();
        } else {
          _authError();
        }
      }
      else {
        _authError();
      }
    }

    function _authError() {
      next('Invalid User ID/Password');
    }

  };
  
};