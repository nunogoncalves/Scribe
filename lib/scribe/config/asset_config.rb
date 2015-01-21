require 'sinatra/base'
require 'sinatra/assetpack'

module Scribe
  class Base < Sinatra::Base

    register Sinatra::AssetPack

    assets {
      serve "#{@@scribe_path}/js",     from: "../public/assets/js"
      serve "#{@@scribe_path}/css",    from: "../public/assets/css"
      serve "#{@@scribe_path}/img",    from: "../public/assets/img"

      css :application, "css/application.css", ["#{@@scribe_path}/css/*.css"]

      js :application, "js/application.js", [
        "#{@@scribe_path}/js/vendor/jquery-1.8.0.min.js", #making sure jquery is loaded first
        "#{@@scribe_path}/js/vendor/underscore.js",
        "#{@@scribe_path}/js/vendor/*.js",
        "#{@@scribe_path}/js/*.js"
      ]


      js_compression  :jsmin    # :jsmin | :yui | :closure | :uglify
      css_compression :simple   # :simple | :sass | :yui | :sqwish
    }

  end
end