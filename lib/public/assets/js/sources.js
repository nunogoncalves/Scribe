$.sources = {

  selector: null,

  format: function(service) {
    var originalOption = service.element;
    return "<img class='service-icon' src='scriber/img/papyrus.png')/>" + service.text;
  },

  load: function() {
    var _this = this;
    var services = null;
    this.selector = $("#service_select");

    $.get("scriber/sources", function(data) {
      services = data.services;

      _this.appendSourcesToElement(services);

      $.service_selector.selectService(data.services[0]);

      $.service_selector.init($.service_selector.selectedService.api_docs_url);

      _this.loadSelect2();

    });
    return false;
  },

  appendSourcesToElement: function(services) {
    var _that = this;
    _that.selector.html("");
    $.each(services, function(index, value) {
      _that.selector.append('<option value="' +value.shortName +
        '" data-icon="' + value.icon +
        '" data-api_docs_url="' + value.api_docs_url +
        '" data-broadcasts_url="' + value.broadcasts_url +
        '" data-gems_url="' + value.gems_url + '">' + value.name + '</option>');
    });
  },

  loadSelect2: function() {
    this.selector.select2({
      width: '400px',
      formatResult: $.sources.format,
      formatSelection: $.sources.format,
      escapeMarkup: function(m) { return m; }
    });

    this.selector.on("change", function() {
       $.service_selector.changeService(this.selectedOptions);
      }
    );
  }
};