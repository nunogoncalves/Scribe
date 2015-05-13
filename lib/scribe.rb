require "scribe/config/env"
require "scribe/routes/routes"
require "scribe/version"
require 'scribe/modules/jwt_token_builder'
require 'sinatra/base'

GEMDIR = Pathname.new(File.expand_path(File.join(File.dirname(__FILE__), '..')))

module Scribe

  class << self
    attr_accessor :authentication_secret
  end

  def self.configure
    yield self
  end
  class Base < Sinatra::Base

    this_dir = GEMDIR.join("lib/scribe")
    set :views,  this_dir.join("views")
    set :public_folder, this_dir.join("public")

    Scribe.authentication_secret = ENV['AUTHENTICATION_SECRET']
  end
end
