require 'sinatra/base'

module Scribe
  class Base < Sinatra::Base

    def self.standalone_mode?
      ENV['SCRIBE_RUNNING_STANDALONE'] == 'true'
    end

    @@scribe_path ||= standalone_mode? ? '/scribe' : ''

  end
end