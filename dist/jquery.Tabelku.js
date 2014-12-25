/*! Tabelku - v0.0.1 - 2014-12-25
* https://github.com/zack-fair/Tabelku
* Copyright (c) 2014 zack-fair; Licensed MIT */
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

var LATIHAN = LATIHAN || {};

(function($) {  

  LATIHAN.Tabelku = function(elem, params) {
    this.elem = elem;
    this.params = params;
    this.jumlahBaris = 0;        
    var $$ = $(elem);

    // Buat wrapper dan atur CSS
    $$.addClass('table table-hover');
    $$.wrap("<div class='table-responsive'></div>");

    // Buat header
    var tblHead = document.createElement('thead');
    var barisHead = $('<tr/>');    
    barisHead.append("<th><input type='checkbox' id='checkSemua' class='checkBaris' /></th>");
    params.kolom.forEach(function(e) {
      barisHead.append("<th>" + e.text + "</th>");
    });    
    tblHead.appendChild(barisHead[0]);
    $$.append(tblHead);

    // Buat body
    this.tblBody = document.createElement('tbody');
    $$.append(this.tblBody);

    // Event untuk checkbox      
    var object = this;
    $$.on('click', function(event) {
      if ($(event.target).hasClass('checkBaris')) {
        if (event.target.id === 'checkSemua') {
          object.check(-1, event.target.checked);
        } 
        params.checkStateChanged.call(object, event);
      }      
    });

    // Refresh tabel
    this.refresh();    
  };    

  LATIHAN.Tabelku.prototype.refresh = function(nilaiBaru) {        
    var object = this;
    if (nilaiBaru) {
      object.params.data = nilaiBaru;
      _refresh.call(object);      
    } else if (object.params.ajaxDataUrl === '') {
      _refresh.call(object);      
    } else {
      // Ambil data baru melalui Ajax
      if (object.params.ajaxDataUrl !== '') {
        $.get(object.params.ajaxDataUrl, function(data) {
          object.params.data = data;
          _refresh.call(object);
        }, 'json');
      }    
    }            
  };

  function _refresh() {    
    $(this.tblBody).empty();
    this.jumlahBaris = 0;
    var object = this;
    this.params.data.forEach(function(data) {
      _tambahBaris.call(object, data);      
    });
  }

  LATIHAN.Tabelku.prototype.tambahBaris = function(dataBaru, ajax) {        
    var object = this;
    ajax = (ajax !== undefined)? ajax: true;
    // Request Ajax bila perlu    
    if (ajax && (this.params.ajaxTambahUrl !== '')) {
      $.ajax({
        url: this.params.ajaxTambahUrl,
        type: 'POST',
        data: JSON.stringify(dataBaru),
        contentType: 'application/json; charset=utf-8',
        success: function() {
          _tambahBaris.call(object, dataBaru);  
        }
      });
    } else {
      _tambahBaris.call(object, dataBaru);
    }
  };

  function _tambahBaris(dataBaru) {
    var baris = $('<tr/>');
    baris.append("<td><input type='checkbox' class='checkBaris' /></td>");
    this.params.kolom.forEach(function(kolom) {
      baris.append("<td>" + dataBaru[kolom.nama] + "</td>");
    });
    this.jumlahBaris++;
    baris.appendTo(this.tblBody);
  }

  LATIHAN.Tabelku.prototype.hapusBarisTerpilih = function() {
    // Request Ajax bila perlu
    if (this.params.hapusUrl !== '') {                
      $.ajax({
        url: this.params.ajaxHapusUrl,
        type: 'POST',
        data: JSON.stringify(this.objectTerpilih()),
        contentType: 'application/json; charset=utf-8'
      });
    }

    // Hapus seluruh baris terpilih    
    var barisTerpilih = $(this.tblBody).find('tr').has('td input:checked');
    this.jumlahBaris -= barisTerpilih.size();
    var hasil = this.params.sebelumHapus.call(this, barisTerpilih);    
    if ((hasil !== undefined) && (hasil === false)) {
      return;
    } else {
      barisTerpilih.remove();    
    }
  };

  LATIHAN.Tabelku.prototype.check = function(index, pilih) {
    var $tblBody = $(this.tblBody);
    if (index >= 0) {
      $tblBody.find('tr td input').eq(index).prop('checked', pilih);
    } else {
      $tblBody.find('tr td input').prop('checked', pilih);
    }
  };

  LATIHAN.Tabelku.prototype.indexTerpilih = function() {
    var semuaBaris = this.tblBody.children;
    var hasil = [];
    for (var i=0; i < semuaBaris.length; i++) {
      if (semuaBaris[i].firstChild.firstChild.checked) {
        hasil.push(i);
      }
    }
    return hasil;
  };

  LATIHAN.Tabelku.prototype.objectTerpilih = function() {
    var semuaBaris = this.tblBody.children;
    var hasil = [];
    for (var i=0; i < semuaBaris.length; i++) {
      if (semuaBaris[i].firstChild.firstChild.checked) {
        hasil.push(this.params.data[i]);
      }
    }
    return hasil;
  };

}(jQuery));
