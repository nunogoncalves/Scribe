require 'rack/contrib/try_static'

ENV['SCRIBE_RUNNING_STANDALONE'] = 'true'
ENV['AUTHENTICATION_SECRET'] = 'this_is_a_sample_secret'

require 'rubygems'
require 'bundler/setup' # To allow inclusion via the Bundle/Gemfile
require 'sinatra'       # Sinatra is required so we can call its "set"
require 'scribe'        # And include the application

# Set the environment to :production on production
set :environment, ENV['RACK_ENV'].to_sym

use Rack::TryStatic,
    :root => File.expand_path('../public', __FILE__),
    :urls => %w[/], try: [
      "/scribe/assets/css/*.css",
      "/scribe/assets/img/*",
      "scribe/js/vendor/jquery-1.8.0.min.js", #making sure jquery is loaded first
      "scribe/js/vendor/underscore.js",
      "scribe/js/vendor/*.js",
      "scribe/js/*.js"
    ]

run Scribe::Base
