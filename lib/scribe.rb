require "config/env"
require "config/asset_config"
require "routes/routes"
require "scribe/version"
require 'scribe/jwt_token_builder'
require 'sinatra/base'

GEMDIR = Pathname.new(File.expand_path(File.join(File.dirname(__FILE__), '..')))

module Scribe
  class Base < Sinatra::Base

    this_dir = GEMDIR.join("lib")
    set :views,  this_dir.join("views")
    set :public_folder, this_dir.join("public")
    set :partial_template_engine, :erb

  end
end