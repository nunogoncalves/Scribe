<h1>Scribe</h1>


This gem communicates with rack API services in order to get necessary information to properly display documentation about those APIs.

#Usage

In order to add it your app, you need to:

## 1) Add it to your gemfile
## 2) Add the following to your config.ru file
  ```ruby
    jwt_auth_exceptions = []

    if ENV.fetch('SHOW_DOCUMENTATION') == 'true'
      map '/scribe' do
        run Scribe::Base
      end

      use Rack::TryStatic,
        :root => File.expand_path('../public', __FILE__),
        :urls => %w[/], :try => ['/docs/*.json']

      jwt_auth_exceptions = ['/scribe', '/scribe/*']
    end

    use Rack::Jwt::Auth::Authenticate, { except: jwt_auth_exceptions, secret: ENV['AUTHENTICATION_SECRET'] }
  ```

Note that you need the following environment keys:
SHOW_DOCUMENTATION ('true' or 'false') and AUTHENTICATION_SECRET. The secret is used to build a JWToken to send as http authorization header. This is the way we communicate with services at Linkedcare.

## 3) This app already provides two json files to be consumed. broadcasts.json and gems.json that are contained in the public/docs folder. This will allow the client side to build the broadcasts and gems information.

## 4) To provide api documentation, you need to add your apis docs json file to the same directory.
    If you want to costumize the locations of these files you can add a sources.json file to the config folder which looks like this:

    ```JSON
      {
        "services": [
          {
            "name": "My Service name",
            "api_docs_url": "docs/docs.json",
            "broadcasts_url": "/docs/broadcasts.json",
            "gems_url": "/docs/gems.json",
            "shortName": "xxx",
            "icon": "icon"
          }
        ]
      }
    ```

---
