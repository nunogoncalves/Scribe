$.gems = {

  init: function() {
    $.service_selector.loadExpandCollapse();
    $(".clickable").click(function() {
      var $content = $(this).closest(".gem").find(".expandable");
      if($content.hasClass("expanded")) {
        $content.removeClass("expanded");
        $content.slideUp();
      } else {
        $content.addClass("expanded");
        $content.slideDown();
      }
    });
  },

  load: function(url) {
    var _this = this;
    $.authenticator.fetchToken({}, function(token) {
      _this._fetchGemsAndDisplayThem(url, token);
    });
  },

  _fetchGemsAndDisplayThem: function(url, token) {
    var _this = this;
    $.ajax({
      method: 'get',
      beforeSend: function(req) {
        req.setRequestHeader('authorization', token);
      },
      url: url,
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      success: function(data) {
        _this.addGemsToDom(data);
        _this.init();
      },
      error: function(jqXHR, textStatus, error) {
        _this.addGemsToDom({error: "There was an error requesting the gems " +
          ". Check if the service has CORS activated"});
      }
    });

    return false;
  },

  addGemsToDom: function(gems) {
    var source   = $("#gems_template").html();
    var template = Handlebars.compile(source);
    var html = template(gems);
    $("#swagger-ui-container").html(html);
  }
};