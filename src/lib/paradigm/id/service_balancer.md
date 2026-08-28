[*<-- Kembali ke halaman utama*](README.md#system-behavior)

### Diagram urutan proses penyeimbangan service

Ketika sebuah node menerima permintaan untuk menginstansiasi sebuah service, node itulah yang memutuskan di node mana dalam jaringan service tersebut harus diinstansiasi — secara lokal atau pada node lain. Untuk itu, ia membandingkan biaya menjalankan instans tersebut pada setiap rekannya dengan biaya menjalankannya secara lokal, lalu memilih yang dianggapnya terbaik (misalnya yang paling murah).

Ketika klien (rekan-rekan lain) menanyakan berapa biayanya untuk menjalankan sebuah service, ia akan memberi mereka biaya menjalankannya secara lokal atau pada salah satu rekannya.

<br>

Pada diagram urutan berikut (Gambar 4c0) dipaparkan proses penyeimbangan beban untuk menjalankan instans service baru. Diasumsikan bahwa sebuah service telah menerima permintaan untuk menjalankan instans dari suatu service.

![Diagram penyeimbang service](assets/4c0f64_service_balance_diagram.excalidraw.svg) *Gambar 4c0: diagram penyeimbangan service*

<br>

Pihak-pihak yang terlibat dalam diagram urutan di atas (Gambar 4c0) adalah sebagai berikut:

- Node A adalah node yang menanyakan biaya dan meminta pembuatan instans baru dari sebuah service.
- Node B adalah node lain dalam jaringan.

Selama urutan tersebut, terjadi interaksi berikut:

1. Node A menanyakan biaya menjalankan sebuah instans service kepada masing-masing rekannya di jaringan. Ia memakai metode pengambilan biaya sesuai antarmuka tiap rekan.

2. Node B menghitung biaya menjalankan service itu secara lokal.

3. Node A menghitung biaya menjalankan service itu secara lokal dan membandingkannya dengan biaya-biaya yang diterimanya. Dalam kasus ini, ia memutuskan bahwa biaya terendah adalah milik Node B.

4. Node A meminta Node B untuk menjalankan sebuah instans service tersebut, mengirimkan spesifikasinya kepada Node B, dan menunggu Node B mengembalikan alamat serta token instans itu.

5. Node B menjalankan instans service yang diserahkan Node A kepadanya, menyimpan instans tersebut dalam registrinya dengan menganggap Node A sebagai induknya, lalu mengembalikan alamat dan token-nya.

6. Node A menerima alamat dan token dari Node B, lalu menyimpan instans itu dalam registri sebagai instans eksternal.
