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
        if (swaggerUi.api === undefined || swaggerUi.api == null) {
          var client = new SwaggerClient({
             authorizations: {
               api_key: new SwaggerClient.ApiKeyAuthorization("Authorization", data.token, "header")
             }
          });
          swaggerUi.api = client
        }

        if(callback !== undefined || callback !== null) {
          callback(data.token);
        }
      },
    });
  },
};