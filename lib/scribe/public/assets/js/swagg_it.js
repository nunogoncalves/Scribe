$.swagg_it = {

  init: function(url) {
    window.swaggerUi = this.buildSwaggerUi(url);
    $.authenticator.fetchToken({}, function() {
      window.swaggerUi.load();
    });
  },

  buildSwaggerUi: function(url) {
    var _this = this;
    return new SwaggerUi({
      url: url,
      dom_id: "swagger-ui-container",
      supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
      sorter: 'method',
      docExpansion: 'list', //none, list, full
      onComplete: function(swaggerApi, swaggerUi){
        $('pre code').each(function(i, e) { hljs.highlightBlock(e); });
        _this.setUpClickHandlers();
        $("#swagger-ui-container").prepend($("#jwt_notice_template").html())
      },
      onFailure: function(data) {},
    });
  },

  setUpClickHandlers: function() {
    $("#resources a").click(function() {
      setTimeout(function() {
        history.pushState(null, "", "/scribe");
      }, 1);
    });

    var $tryItButtonContainers = $('.sandbox_header');
    $.each($tryItButtonContainers, function() {
      var $container = $(this);
      $container.find("input").hide();
      $container.append('<input type="button" class="fake_submit" value="Try me!">');
    });

    $.each($tryItButtonContainers, function() {
      $(this).find(".fake_submit").on("click", function() {
        var _this = this,
            $form = $(this).closest('form');

        $.authenticator.fetchToken(
          $.swagg_it.getNecessaryDataToBuildJWTOnServe($form),
          function() {
            $(_this).parent().find('input.submit').click();
        });
      });
    });
  },

  getNecessaryDataToBuildJWTOnServe: function($form) {
    var jwtData = {};

    $.each($.authenticator.jwtFields, function(i, field) {
      var fieldVal = $form.find('[name="'+ field + '"]').val();
      jwtData[field] = fieldVal
    });

    return jwtData;
  }
};