﻿require "rake"

lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'version'

Gem::Specification.new do |s|
  s.name  = "scribe"
  s.version = Scribe::VERSION
  s.summary = 'Empowers your api with a documentation interface based on '     \
              'swagger. You only need to take care of creating the '           \
              'documention itself and make sure the documentation json files ' \
              'are set in place.'

  s.description = 'Check your api documentation without needing to worry '     \
                  'about the inteface. Just build your documentation files, '  \
                  'and run localhost:port/scribe'


  s.authors = ["Nuno Gonçalves"]
  s.email = "nuno.goncalves@linkedcare.com"
  s.homepage = ""

  s.files = ([`git ls-files lib/`.split("\n")] + [`git ls-files assets/`.split("\n")]).flatten
  # s.executables << 'scribe'

  s.test_files = `git ls-files spec/`.split("\n")

  s.add_runtime_dependency 'json', '~> 1.7'
  s.add_runtime_dependency 'rack-jwt-auth', '0.0.3'
  s.add_runtime_dependency 'sinatra', '1.4.5'
  s.add_runtime_dependency 'sinatra-contrib', '1.4.2'
  s.add_runtime_dependency 'sinatra-partial', '0.4.0'
  s.add_runtime_dependency 'sinatra-assetpack', '0.3.3'#, :require => 'sinatra/assetpack'
end
