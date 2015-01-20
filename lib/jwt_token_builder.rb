require "jwt"
require "rack/jwt/auth/auth_token"

module JWTTokenBuilder

  def self.issue_token(params)
    jwt_params = {
      exp: ten_seconds_from_now_in_millis,
      issuer: 'Papyrus'
    }

    Rack::Jwt::Auth::AuthToken.issue_token(
      params.merge(jwt_params),
      ENV.fetch('AUTHENTICATION_SECRET'))
  end

  def self.ten_seconds_from_now_in_millis
  	(Time.now + 10).to_i * 1000
  end

end
