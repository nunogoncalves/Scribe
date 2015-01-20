require "scribe/version"
require 'json'
require 'scribe/jwt_token_builder'
require 'sinatra/base'
require 'sinatra/json'
require 'sinatra/partial'
require 'sinatra/assetpack'

GEMDIR = Pathname.new(File.expand_path(File.join(File.dirname(__FILE__), '..')))

module Scribe
  class Base < Sinatra::Base

  helpers  Sinatra::JSON
  register Sinatra::Partial
  register Sinatra::AssetPack

  this_dir = GEMDIR.join("lib")
  set :views,  this_dir.join("views")
  set :public_folder, this_dir.join("public")
  set :partial_template_engine, :erb

  assets {
    serve '/js',     from: "public/assets/js"
    serve '/css',    from: "public/assets/css"
    serve '/img',    from: "public/assets/img"

    css :application, "css/application.css", ['/css/*.css']

    js :application, "js/application.js", [
      "/js/vendor/jquery-1.8.0.min.js", #making sure jquery is loaded first
      "/js/vendor/underscore.js",
      "/js/vendor/*.js",
      "/js/*.js"
    ]


    js_compression  :jsmin    # :jsmin | :yui | :closure | :uglify
    css_compression :simple   # :simple | :sass | :yui | :sqwish
  }

  get '/' do
    erb :home
  end

  get '/authentication_token' do
    status 200

    json token: "#{Scribe::JWTTokenBuilder.issue_token(params)}"
  end

  get '/sources' do
    json load_sources_file
  end

  private

  def load_sources_file
    if Dir['config/sources.json'].empty?
      json_str = File.read("#{GEMDIR.to_s}/lib/config/sources.json")
    else
      json_str = File.read('config/sources.json')
    end
    JSON.parse(json_str)
  end

end
end