ENV['SCRIBE_RUNNING_STANDALONE'] = 'true'
ENV['AUTHENTICATION_SECRET'] = 'this_is_a_sample_secret'

require 'rubygems'
require 'bundler/setup' # To allow inclusion via the Bundle/Gemfile
require 'sinatra'       # Sinatra is required so we can call its "set"
require 'scribe'        # And include the application

# Set the environment to :production on production
set :environment, ENV['RACK_ENV'].to_sym

# And fire the application.

run Scribe::Base
