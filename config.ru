require 'rubygems'
require 'bundler/setup' # To allow inclusion via the Bundle/Gemfile
require 'sinatra'       # Sinatra is required so we can call its "set"
require 'scribe'        # And include the application

# Set the environment to :production on production
set :environment, ENV['RACK_ENV'].to_sym

# And fire the application.
run Scribe
