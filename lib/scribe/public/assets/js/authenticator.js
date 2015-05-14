$.authenticator = {

  jwtFields: [
    'creator_id',
    'creator_type',
    'patient_id',
    'uid',
    'app_token',
    'layer_token',
    'lang'
  ],

  fetchToken: function(dataToBuildTokenWith, callback) {
    $.ajax({
      url: 'scribe/authentication_token',
      method: 'get',
      data: dataToBuildTokenWith,
      success: function(data, textStatus, jqXHR) {
        window.authorizations.add(
          'api_key', new ApiKeyAuthorization('authorization', data.token, 'header'));
        if(callback !== undefined || callback !== null) {
          callback(data.token);
        }
      },
    });
  },
};