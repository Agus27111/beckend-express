# ALUR PEMBUATAN APLIKASI

1. lihat fitur aplikasi dan sesuaikan ERD dan flow
2. siapkan MOCK data
3. instalasi project
4. strukturisasi folder
5. koneksikan ke database
   contoh pada aplikasi ini adalah pembuatn config.js yang mana adalah jembatan dengan env
   pembuatan koneksi ke mongoose dengan folder db

```js
const mongoose = require('mongoose');
const { urlDb } require('../config');

main().catch(err=>console.log(err));
async function main() 
{  
	await mongoose.connect(urlDb);
}
const db = mongoose.connection;
module.exports = db;
```

5. modifikasi file bin/ww karena kita menggunakan express generator

```js
var app = require('../app');
var debug = require('debug')('server-semina:server');
var http = require('http');

// import package db
const db = require('../app/db');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

// bila terjadi error saat connect ke mongdb maka akan tampil error diterminal
db.on('error', function(err){
   console.log('connection error: tidak bisa tersambung ke mongodb' );
});
/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * kode yang mendeteksi jika koneksi dengan MongoDB telah terbuka dan 
 *  aplikasi berhasil terhubung dengan MongoDB, 
 */
db.on('open', function(){
   server.listen(port);
   server.on('error', onError);
   server.on('listening', onListening);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```

6. run aplikasi
7. Buat aplikasi CRUD untuk categories
   *mulai dari model
   kemudian setup controller
   siapkan router dan pasang di app.js*
8. test di postman

---

# MEMBUAT CUSTOM ERROR

* instalasi status code

```js
npm i http-status-codes
```

1. Dalam folder app buatlah folder **errror** dan **middleware**
2. buatlah file js seperti pada aplikasi ini, dengan implementasi oop dari file custom-api-errror.js untuk folder error.js
3. kumpulkan error di folder error/index.js agar mudah dalam exporting dan importing
4. Lalu buatlah file di dalam midddleware seperti di aplikasi untuk menangani not-found
5. Tambahkan middleware di app.js dan ingat route untuk midddleweare selalau di bagian bawah dari router lain
6. coba di postman apakah custom error berjalan dengan baik

* buat services categories

1. service ini akan menyimpan segala code logika yang dibutuhkan di dalam controller sehingga harapannya controller terlihat lebih bersih dan juga mudah untuk di maintanance
2. buat folder services di dalam folder app dan lanjutkan dengan folder mongoose (ORM untuk mongoDB) dan buat logika secara khusus untuk setiap tabel. {*perhatikan kode dalam aplikasi di folder ini*}
3. kemudian gunakan kode sewrvices ini pada controller kita
4. cek di POSTMAN

---

# BUAT CRUD SETIAP TABEL

Buatlah API untuk setiap tabel sesuai dengan kebutuhan aplikasi kita.

1. siapkan bcrypt untuk hash password
   i*ni kita gunakan sesuai kebutuhan saat login(compare) atau signup(hash)*
   *contoh penggunaan ada pada model dari partricipants, users.*
2. siapkan jwt untuk menyimpan webtoken kita, setting jwt bisa diliat dalam utils dan digunakan dalam services auth , participants
   auth services digunakan oleh api auth(signin) dan juga auth middleware. JWT kita gunakan sebagai middleware tambahan untuk masuk ke API kita sehingga sesuai dengan flow aplikasi kita, misalnya admin hanya bisa melihat ticket yang terjual tetapi tidak bisa membuat events baru.

*catatan:*

* untuk upload file gunakan npm multer, cek di middleweare multer dan penggunaannya pada tabel Image
* untuk kirim no OTP ke email user kita bisa gunakan npm nodemailer
  *lihat setting nya di services/ mail*
  *membutuhkan folder views untuk menangani HTML yang akan dikirm ke email user*
