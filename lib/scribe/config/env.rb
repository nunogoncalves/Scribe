require 'sinatra/base'

module Scribe
  class Base < Sinatra::Base
    @@scribe_path = ENV['SCRIBE_RUNNING_STANDALONE'] == 'true' ?  '/scribe' : ''
  end
end