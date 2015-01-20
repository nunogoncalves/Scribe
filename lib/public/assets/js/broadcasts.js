$.broadcasts = {

  init: function() {
    $.service_selector.loadExpandCollapse();
    $(".clickable").click(function() {
      var $content = $(this).closest(".broadcast").find(".expandable");
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
      _this._fetchBroadcastsAndDisplayThem(url, token);
    });
  },

  _fetchBroadcastsAndDisplayThem: function(url, token) {
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
        _this.addBroadcastsToDom(data);
        _this.init();
      },
      error: function(jqXHR, textStatus, error) {
        _this.addBroadcastsToDom({error: "There was an error requesting the " +
          "broadcasts information. Check if the service has CORS activated"});
      }
    });

    return false;
  },

  addBroadcastsToDom: function(broadcasts) {
    var source   = $("#broadcast_template").html();
    var template = Handlebars.compile(source);
    var html = template(broadcasts);
    $("#swagger-ui-container").html(html);
  }
};