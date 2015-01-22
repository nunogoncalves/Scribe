require 'json'
require 'sinatra/json'
require 'sinatra/partial'

module Scribe
  class Base < Sinatra::Base

    helpers  Sinatra::JSON
    register Sinatra::Partial

    get '/' do
      erb :home
    end

    get "#{@@scribe_path}/authentication_token" do
      status 200

      json token: "#{Scribe::JWTTokenBuilder.issue_token(params)}"
    end


    get "#{@@scribe_path}/sources" do
      json load_sources_file
    end

    private

    def load_sources_file
      if Dir['config/sources.json'].empty?
        json_str = File.read("#{GEMDIR.to_s}/lib/scribe/config/sources.json")
      else
        json_str = File.read('config/sources.json')
      end
      JSON.parse(json_str)
    end
  end
end
