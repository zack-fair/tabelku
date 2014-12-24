# Tabelku

Latihan tabel Bootstrap & jQuery

## Cara Pakai

Untuk memakai library ini, dibutuhkan jQuery dan Bootstrap.  Tambahkan baris seperti berikut pada `<head>` untuk menyertakan library ini:

```
<script src="js/jquery.Tabelku.js"></script>
```

Untuk memakai versi yang lebih hemat (tetapi lebih sulit di-debug), gunakan file `jquery.Tabelku.min.js`.  File ini dapat dijumpai di folder `dist`.

Seandainya bila terdapat elemen HTML seperti berikut ini:

```
<table id='tblUtama'></table>
```

maka untuk mendekorasinya bisa dengan perintah JavaScript berikut ini:

```
$('#tblUtama').tabelku({
  kolom: [
    {nama: 'kodeBarang', text: 'Kode Barang'},
    {nama: 'namaBarang', text: 'Nama Barang'},
    {nama: 'qty', text: 'Qty'}
  ]
});
```

Perintah di atas membuat sebuah tabel kosong yang terdiri atas 3 kolom.

Untuk memanggil method yang disediakan oleh library ini, pengguna dapat menggunakan metode JavaScript biasa atau metode yang umum dijumpai pada plugin jQuery.

Contoh program berikut ini memanggil method dengan cara plain JavaScript:

```
var tblUtama = document.getElementById('tblUtama').tabel;
tblUtama.tambahBaris({kodeBarang: 'KODE-1', namaBarang: 'NAMA-1', qty: 99});
```

Bila element diperoleh melalui JQuery, gunakan cara seperti berikut ini untuk memperoleh object `Tabelku`:

```
var tblUtama = $('#tblUtama')[0].tabel;
```

Contoh berikut ini melakukan pemanggilan dengan metode yang umum dipakai pada plugin jQuery:

```
$("table").tabelku("hapusBarisTerpilih").tabelku("tambahBaris", {kodeBarang: 'KODE-1', namaBarang: 'NAMA-1', qty: 99});
```

Baris program di atas akan mengerjakan method `hapusBarisTerpilih()` dan `tambahBaris()` untuk semua `<table>` yang dijumpai di dokumen HTML.  Agar lebih aman, gunakan selector `:tabelku` sehingga hanya `<table>` yang sudah didekorasi oleh Tabelku saja yang akan diproses:

```
$(":tabelku").tabelku("hapusBarisTerpilih");
```

## Daftar Parameter

Parameter yang dapat diberikan pada saat membuat object baru adalah:

* `kolom` adalah sebuah array yang mendeklarasikan kolom di tabel.  Setiap kolom dideklarasikan dalam bentuk object yang memiliki atribut berupa `nama` dan `text`.
* `data` adalah sebuah array yang berisi daftar object yang akan ditampilkan oleh tabel ini.
* `ajaxDataUrl` adalah URL yang akan di-hit bila pengguna memanggil `refresh()` untuk memperbaharui isi tabel.  Nilai ini tidak wajib ada.
* `ajaxTambahUrl` adalah URL yang akan di-hit bila pengguna menambah baris baru dengan `tambahBaris()`.  Nilai ini tidak wajib ada.
* `ajaxHapusUrl` adalah URL yang akan di-hit bila pengguna menghapus baris dengan memanggil `hapusBarisTerpilih()`.
* `checkStateChanged` adalah function yang akan dikerjakan setiap kali baris dicentang.
* `sebelumHapus` adalah function yang akan dikerjakan saat baris dihapus.

## Daftar Method

Method `refresh()` dapat dipakai untuk memperbaharui isi tabel.  Bila nilai `ajaxDataUrl` tidak kosong, maka method `refresh()` melakukan request Ajax ke URL tersebut untuk memperoleh isi data terbaru.

Method `tambahBaris(object)` dipakai untuk menambah baris baru.  Bila nilai `ajaxTambahUrl` tidak kosong, maka method ini akan melakukan request Ajax ke URL tersebut untuk mengirim object yang baru saja ditambahkan.  Perilaku ini bisa diubah dengan memberikan parameter kedua dengan nilai `false`.

Method `hapusBarisTerpilih()` akan menghapus seluruh baris yang telah dicentang.  Bila nilai `ajaxHapusUrl` tidak kosong, maka method ini akan melakukan request Ajax ke URL tersebut untuk mengirim object yang baru saja dihapus.  Nilai yang dikirim adalah sebuah array yang berisi daftar object.

Method `check(index, boolean)` akan mengubah tanda centang pada baris posisi `index` (mulai dari 0).  Untuk mengubah seluruh baris, beri nilai `-1` untuk `index`.  Bila nilai `boolean` adalah `true` maka baris akan memiliki tanda centang, sebaliknya, bila bernilai `false` maka baris tidak akan memiliki tanda centang.

Method `indexTerpilih()` akan mengembalikan array yang berisi nomor baris yang diberi tanda centang.  Nomor baris dimulai dari 0.

Method `objectTerpilih()` akan mengembalikan array yang berisi object pada baris yang diberi tanda centang.

## Daftar Property

Property `elem` merujuk pada elemen yang didekorasi oleh Tabelku.  Elemen ini adalah sebuah `<table>`.

Property `params` berisi parameter yang diberikan pada saat membuat object baru dari class Tabelku.

Property `jumlahBaris` berisi jumlah baris di tabel.

## Pengembangan

Untuk pengembangan, persyaratan yang dibutuhkan adalah Node.js dan npm.  Grunt dan Bower harus sudah ter-install secara global dengan menggunakan npm.  Catatan: Ini hanya dibutuhkan pada saat pengembangan untuk mengelola proyek.  Pengguna yang ingin memakai hasil akhir cukup men-download file `jquery.Tabelku.js` atau `jquery.Tabelku.min.js` yang dihasilkan di folder `dist`.

Setelah melakukan cloning, berikan perintah berikut ini saat berada di folder proyek:

```
npm install
```

Perintah tersebut akan mendownload package npm yang dibutuhkan ke dalam folder `node_modules`.

Langkah berikutnya adalah men-download package front-end seperti Bootstrap, jQuery, dan qUnit.  Caranya adalah dengan memberikan perintah berikut ini:

```
grunt bower
```

Perintah di atas akan menghapus isi folder `libs` (bila sudah ada) dan men-download package Bower yang dibutuhkan ke dalam folder tersebut.  Untuk mengubah dependency Bower, edit file `bower.json` di bagian seperti berikut ini:

```
"dependencies": {
    "jquery": "2.1.3",
    "bootstrap": "3.3.1",
    "qunit": "1.16.0"
}
```

Untuk menghasilkan output dari proyek ini, berikan perintah berikut ini:

```
grunt
```

Pastikan hasil dari task `qunit` adalah OK semua (dengan kata lain, semua pengujian lulus).  Hasil akhir dari proyek dapat dijumpai di folder `dist`.

Untuk melakukan pengujian secara otomatis pada saat file berubah selama penulisan kode program, jalankan perintah berikut ini:

```
grunt watch
```

Jangan tutup console ini.  Setiap kali file di direktori `src` atau `test` berubah, maka task `qunit` akan dikerjakan (pastikan pengujian lulus!).

Pengujian melalui PhantomJS tidak dapat sepenuhnya menggantikan browser yang sesungguhnya.  Oleh sebab itu, usahakan juga untuk membuka file HTML yang ada di folder `test` melalui browser.