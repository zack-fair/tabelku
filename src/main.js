(function($) {

  $.fn.tabelku = function(params) {

    var args = arguments;

    if ($.type(params) !== 'string') {
      params = $.extend($.fn.tabelku.defaults, params);
    }

    // Gunakan this.each untuk mendukung collection dan chaining    
    return this.each(function() {      
      if ($.type(params) === 'string') {
        // Eksekusi method
        if (this.tabel) {          
          this.tabel[params].apply(this.tabel, Array.prototype.slice.call(args, 1));
        }
      } else {        
        // Buat object baru
        if (this.tabel) {
          return;
        }
        this.tabel = new LATIHAN.Tabelku(this, params);      
      }
    });

  };  

    // Nilai parameter default
  $.fn.tabelku.defaults = {      
    kolom: [],
    data: [],
    checkStateChanged: $.noop,
    sebelumHapus: $.noop,
    ajaxDataUrl: '',
    ajaxTambahUrl: '',
    ajaxHapusUrl: ''    
  };     

  // Custom selector.
  $.expr[':'].tabelku = function(elem) {    
    return elem.tabel;
  };

}(jQuery));
