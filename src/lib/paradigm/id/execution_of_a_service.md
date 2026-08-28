[*<-- Kembali ke halaman utama*](README.md#system-behavior)


### Diagram urutan eksekusi sebuah instans service

![Diagram kasus penggunaan](assets/e29d99_service_execution_diagram.excalidraw.svg)*__Gambar e29__: diagram urutan eksekusi sebuah instans service*

<br>

Pihak-pihak yang terlibat dalam diagram urutan di atas (Gambar e29) adalah sebagai berikut:

- Service utama: ini adalah instans service yang meminta agar service lain diinstansiasi pada node-nya.

- Node: ini adalah node yang diminta oleh service utama untuk membuat instans baru.

- Dependensi: ini adalah instans baru yang ingin digunakan oleh service utama.

<br>

Selama urutan tersebut, terjadi interaksi berikut:

1. Instans service utama mengirimkan spesifikasi service lain ke node-nya menggunakan metode *StartService()*. Diasumsikan bahwa node akan menangani eksekusi sebuah instans dari service tersebut dan akan mengembalikan alamat instans baru itu beserta token yang bersangkutan.

2. Setelah menerima permintaan dari service utama, node menyimpan spesifikasi lengkapnya atau, jika sudah tersimpan, menghentikan aliran permintaan (untuk hanya mengambil hash dari service yang diminta).

3. Node menginstansiasi service yang diminta, memuat konfigurasinya (berkas *__config__* di direktori akarnya) dan menjalankan entrypoint-nya.

4. Dependensi mulai berjalan sesuai eksekusi yang dijelaskan pada entrypoint di spesifikasinya.

5. Node memperoleh alamat instans kontainer tersebut dan menghitung token yang sesuai; token itu adalah pengenal rahasia dari instans service baru dan bergantung pada implementasi node. ~~Node menyimpan instans tersebut dalam registri sebagai instans internal, dan service yang memintanya sebagai induknya.~~ Terakhir, node mengembalikan alamat dan token instans itu kepada service utama.

6. Service utama, yaitu pihak yang meminta instans, memakai dependensi tersebut melalui alamat yang telah diberikan node kepadanya.

7. Service utama memutuskan untuk menghentikan dependensi, maka ia menjalankan metode *StopService()* milik node sambil mengirimkan token dependensi tersebut.

8. Node menghentikan kontainer dependensi itu dan menghapusnya dari registri.

>Metode *StartService()* dan *StopService()* adalah metode rujukan, tetapi bisa berbeda antar-implementasi node. Antarmuka node — yang dipakai klien dan service lokal (service yang menjalankan node) untuk mengajukan permintaan serta mengendalikan sumber daya dan dependensi — disediakan oleh node kepada klien atau service lokal yang baru.

>Berkas *__config__* menunjukkan konfigurasi setiap service (variabel lingkungan, antarmuka node, dan sebagainya), yang bergantung pada masing-masing service karena skemanya dinyatakan dalam spesifikasi service itu sendiri. Node bisa saja mampu menulis dalam satu skema atau lebih; jika tidak kompatibel, ia dapat memutuskan untuk tidak menginstansiasi service tersebut atau memakai sebuah service penerjemah.
