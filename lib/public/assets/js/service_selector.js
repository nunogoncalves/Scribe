$.service_selector = {

  selectedDocType: "api_docs",

  swaggerUiContainer: $("#swagger-ui-container"),
  apisDocsButton: null,
  broadcastsButton: null,
  gemsButton: null,
  howToButton: null,

  selectedService: {
    api_docs_url: null,
    broadcasts_url: null,
    gems_url: null
  },

  init: function(url) {
    this.apisDocsButton = $("#apis_docs_label");
    this.broadcastsButton = $("#broadcasts_label");
    this.gemsButton = $("#gems_label");
    this.howToButton = $("#how_to_label");
    $.swagg_it.init(url);
  },

  servicesActions: {
    api_docs: function(url) { $.service_selector.init(url); },
    broadcasts: function(url) { $.broadcasts.load(url); },
    gems: function(url) { $.gems.load(url); },
  },

  changeService: function(selectedElement) {
    $("#swagger-ui-container").html('');
    var $selectedElement = $(selectedElement);
    var docsType = this.selectedDocType;

    this.selectService($selectedElement.data());

    var url = $selectedElement.data(docsType + "_url");

    this.servicesActions[docsType](url);
  },

  selectService: function(data) {
    this.selectedService.api_docs_url = data.api_docs_url;
    this.selectedService.broadcasts_url = data.broadcasts_url;
    this.selectedService.gems_url = data.gems_url;
  },

  selectApiDocs: function() {
    $("#swagger-ui-container").html('');
    this.selectedDocType = "api_docs";
    if(!this.apisDocsButton.hasClass("active")) {
      this.broadcastsButton.removeClass("active");
      this.gemsButton.removeClass("active");
      this.apisDocsButton.addClass("active");
      this.howToButton.removeClass("active");
      this.showApisDocs();
    }
  },

  selectBroadcast: function() {
    $("#swagger-ui-container").html('');
    this.selectedDocType = "broadcasts";
    if(!this.broadcastsButton.hasClass("active")) {
      this.apisDocsButton.removeClass("active");
      this.gemsButton.removeClass("active");
      this.broadcastsButton.addClass("active");
      this.howToButton.removeClass("active");
      this.showBroadcasts();
    }
  },

  selectGems: function() {
    $("#swagger-ui-container").html('');
    this.selectedDocType = "gems";
    if(!this.gemsButton.hasClass("active")) {
      this.gemsButton.addClass("active");
      this.apisDocsButton.removeClass("active");
      this.broadcastsButton.removeClass("active");
      this.howToButton.removeClass("active");
      this.showGems();
    }
  },

  selectHowTo: function() {
    $("#swagger-ui-container").html('');
    this.selectedDocType = "howTo";
    if(!this.howToButton.hasClass("active")) {
      this.howToButton.addClass("active");
      this.gemsButton.removeClass("active");
      this.apisDocsButton.removeClass("active");
      this.broadcastsButton.removeClass("active");
      this.showHowTo();
    }
  },

  showApisDocs: function() {
    $.service_selector.init(this.selectedService.api_docs_url);
    $("#how_to_container").hide();
  },

  showBroadcasts: function() {
    this.swaggerUiContainer.html();
    $("#message-bar").html("");
    $("#how_to_container").hide();
    $.broadcasts.load($.service_selector.selectedService.broadcasts_url);
  },

  showGems: function() {
    this.swaggerUiContainer.html();
    $("#message-bar").html("");
    $("#how_to_container").hide();
    $.gems.load($.service_selector.selectedService.gems_url);
  },

  showHowTo: function() {
    $("#message-bar").html("");
    $("#how_to_container").show();
  },

  loadExpandCollapse: function() {
    $(".expand_all_a").click(function() {
      var $expandableItems = $(".expandable");
      $expandableItems.slideDown();
      $expandableItems.addClass("expanded");
    });

    $(".colapse_all_a").click(function() {
      var $expandableItems = $(".expandable");
      $expandableItems.slideUp();
      $expandableItems.removeClass("expanded");
    });
  },

};