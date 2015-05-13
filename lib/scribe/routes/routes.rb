require 'json'
require 'sinatra/json'

module Scribe
  class Base < Sinatra::Base

    helpers  Sinatra::JSON

    get '/' do
      @scribe_path = Scribe::Base.standalone_mode? ? "" : "/scribe"
      erb :home, layout: false
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
      binding.pry
      if Dir['config/sources.json'].empty?
        json_str = File.read("#{GEMDIR.to_s}/lib/scribe/config/sources.json")
      else
        json_str = File.read('config/sources.json')
      end
      JSON.parse(json_str)
    end

    # def load_sources_file
    #   json_str = File.read(sources_file_location)
    #   JSON.parse(json_str)
    # end

    def sources_file_location
      if sources_file_location_exists?
        'config/sources.json'
      else
        "#{GEMDIR.to_s}/lib/scribe/config/sources.json"
      end
    end

    def sources_file_location_exists?
      !Dir['config/sources.json'].empty?
    end
  end
end
