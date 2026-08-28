# *Celaut*: sebuah arsitektur peer-to-peer untuk perancangan dan distribusi perangkat lunak

<br>

**Konteks**

Pada tahun 1940-an, matematikawan John von Neumann, bersama Stanislaw Ulam, memperkenalkan konsep automata seluler dan menciptakan model-model yang menunjukkan bagaimana perilaku kompleks dapat muncul dari aturan sederhana. Berpijak pada fondasi itu, pada 1970 John Horton Conway memperkenalkan "Game of Life", sebuah automaton seluler yang menjadi contoh klasik bagaimana sebuah sistem dapat berkembang menjadi pola-pola rumit dari interaksi dasar. Gagasan-gagasan ini memberi wawasan berharga tentang bagaimana sistem terdesentralisasi dapat mencapai kompleksitas tanpa kendali pusat, dan itulah yang menjadi filosofi pemandu bagi perancangan *Celaut*.

**Definisi**

*Celaut* adalah seperangkat aturan sederhana untuk perancangan dan distribusi perangkat lunak, dengan tujuan menciptakan sistem yang tangguh, dapat diskalakan, dan adaptif melalui prinsip **desentralisasi**, **kesederhanaan**, dan **determinisme**.

**Prinsip**

1. **Desentralisasi**: tidak ada titik kendali atau titik gagal tunggal, sehingga node dapat berkomunikasi dan berkoordinasi secara dinamis.
2. **Kesederhanaan**: aturan minimalis yang menekan kerumitan, memastikan setiap komponen dapat dipahami dan dirawat dengan mudah.
3. **Determinisme**: service berperilaku secara terduga, mengikuti aturan yang telah ditetapkan sehingga hasilnya dapat direproduksi di berbagai node.

**Arsitektur *Celaut*: node dan service**

Arsitektur *Celaut* dibangun di sekitar dua elemen inti: **node** dan **service**. Bersama-sama keduanya membentuk jaringan terdistribusi, tempat setiap bagian menyumbang pada fungsionalitas keseluruhan, mirip dengan agen-agen dalam sebuah automaton seluler.

- **Node**:
    Sebuah node mewakili komputer atau perangkat di dalam jaringan *Celaut* yang dapat berkomunikasi dengan node lain dan mengelola eksekusi service. Sifat terdesentralisasi *Celaut* terwujud dalam cara node berinteraksi, memastikan tidak ada titik gagal tunggal maupun kendali terpusat. Tanggung jawab utama sebuah node meliputi:

    1. **Eksekusi service**: node mengelola instans service dan memutuskan apakah menjalankannya secara lokal atau menyebarkan bebannya ke node rekan. Ini memastikan pemanfaatan sumber daya dan kinerja yang optimal, mirip dengan cara sel dalam automaton seluler berinteraksi dengan tetangganya untuk menjaga keseimbangan sistem.

    2. **Antarmuka komunikasi**: antarmuka yang kokoh memastikan pertukaran data berjalan mulus antara node dan service, sehingga koordinasi berlangsung efektif. Yang patut dicatat, node tidak perlu menyepakati protokol komunikasi tertentu lebih dahulu, karena antarmuka menyembunyikan detail tersebut dan memberi keleluasaan dalam berinteraksi. Fitur ini dijelaskan lebih rinci di bawah.

    3. **Penyediaan alamat dan token**: node memfasilitasi interaksi yang aman dengan mengelola alamat komunikasi dan token autentikasi, sehingga service mudah diakses sambil menjaga keamanan.

    4. **Pengelolaan dependensi**: node memastikan service memiliki akses ke dependensi yang dibutuhkannya. Dependensi ini, yang sering disebut "service anak", dapat berjalan pada node yang sama maupun berbeda. Fitur ini memungkinkan sebuah service induk mengakses dan berkoordinasi dengan service anaknya, memastikan ekosistem service berjalan mulus dan efisien, bahkan saat service tersebar di seluruh jaringan.

    Contoh implementasi sebuah node dengan Python3 dan Rust adalah **Nodo** [di sini](https://github.com/*Celaut*-project/nodo).

- **Service**:
    Sebuah service dalam *Celaut* adalah kontainer perangkat lunak deterministik yang dirancang untuk melakukan tugas tertentu. Mengikuti prinsip **kotak hitam**, service beroperasi terlepas dari detail node yang menjalankannya, dan hanya berfokus pada fungsionalitasnya. Aspek-aspek utama service meliputi:

    - **Eksekusi sebagai instans terisolasi**: ketika seorang pengguna meminta sebuah service, service itu dikirim ke sebuah node, yang menjalankannya sebagai proses terisolasi — entah dalam kontainer atau mesin virtual, bergantung pada arsitektur node. Abstraksi ini sejalan dengan prinsip **kesederhanaan**, karena service tak perlu mengetahui lingkungan eksekusinya.

    - **Perilaku deterministik**: service mengikuti aturan yang telah ditetapkan untuk memastikan hasil yang konsisten. Ini sejalan dengan penekanan *Celaut* pada **determinisme**: dengan masukan yang sama, sebuah service akan selalu menghasilkan keluaran yang sama, terlepas dari node mana yang menjalankannya.

    - **Eksekusi hierarkis**: ciri khas service dalam *Celaut* adalah kemampuannya meminta eksekusi service lain (service anak) melalui node, sehingga memungkinkan alur kerja yang kompleks. Ini mencerminkan perilaku emergen yang terlihat pada automata seluler, di mana interaksi sederhana dapat melahirkan pola yang lebih canggih.

**Menyelaraskan insentif: reputasi dan pembayaran**

Dalam sistem terdesentralisasi seperti *Celaut*, koordinasi bukan sekadar soal interaksi teknis — ia juga menyangkut penyelarasan insentif semua peserta agar sistem berfungsi secara efektif. *Celaut* memakai dua mekanisme utama untuk mencapai keselarasan itu:

- **Sistem reputasi**:
    Setiap node dan service dapat membangun reputasi berdasarkan riwayat interaksinya. Node dan service terdorong untuk menjaga standar keandalan dan mutu yang tinggi demi melestarikan reputasinya. Reputasi yang kuat mendorong node dan pengguna lain untuk mempercayai dan berinteraksi dengan mereka, menciptakan insentif alami untuk berlaku adil dan memberikan service bermutu. Mekanisme reputasi ini melahirkan semacam pengaturan diri di dalam jaringan, di mana para peserta punya kepentingan langsung untuk menjaga nama baiknya.

- **Mekanisme pembayaran**:
    Selain reputasi, kerja sama antara node dan service juga difasilitasi melalui sistem pembayaran. Ketika sebuah node menjalankan service, atau ketika antar-service saling berinteraksi, kompensasi dapat dipertukarkan untuk sumber daya yang dipakai atau tugas yang diselesaikan. Pembayaran ini menciptakan insentif langsung bagi node untuk menyumbangkan sumber daya dan bagi service untuk memberikan nilai, mendorong kolaborasi dan pertukaran yang adil di seluruh jaringan. Mekanisme pembayaran memastikan alokasi sumber daya berlangsung efisien, sehingga node dan service dapat bekerja sesuai kekuatan dan kapasitasnya masing-masing.

Mekanisme-mekanisme ini dijelaskan lebih rinci nanti, sebagai kerangka ekonomi yang menjamin kelayakan pendekatan terdesentralisasi *Celaut*. Serupa dengan cara dua node berkomunikasi tanpa perlu menyepakati protokol tertentu, sistem-sistem ini beroperasi terlepas dari arsitektur inti. Alasan di balik pemisahan itu, dan cara ia memberi keleluasaan serta daya adaptasi dalam berinteraksi, dijelaskan lebih lanjut di bawah.

**Menjembatani yang konseptual dan yang praktis**

Perancangan *Celaut* mencerminkan prinsip-prinsip yang mendasari automata seluler: aturan sederhana pada tingkat node dan service melahirkan sistem yang kompleks dan adaptif. Dengan mendesentralisasi kendali, menyederhanakan interaksi, dan memastikan perilaku deterministik, *Celaut* menciptakan kerangka yang lentur untuk distribusi dan otomatisasi perangkat lunak. Ini memungkinkan service berfokus pada fungsi intinya, sementara node mengurus orkestrasi dan distribusi, sehingga lahir sistem yang mampu beradaptasi dan berkembang seiring munculnya kebutuhan baru.

**Dampak *Celaut* di dunia nyata**

Arsitektur *Celaut* memungkinkan iterasi dan eksperimen yang lebih cepat, seperti menjalankan simulasi dalam lingkungan terkendali. Hal ini membuatnya sangat berharga untuk skenario yang menuntut penerapan dan pengujian metode baru secara cepat. Dengan kemampuan komputasi modern, *Celaut* dapat memanfaatkan prinsip-prinsip ini untuk menyimulasikan sistem kompleks dengan cara yang sebelumnya tak terbayangkan, membuka jalan baru untuk meningkatkan efisiensi dan kinerja di berbagai industri.

Arsitektur ini memungkinkan service berfokus pada fungsionalitasnya, tanpa memusingkan infrastruktur di bawahnya. Node, pada gilirannya, dapat mengelola eksekusi instans secara efisien, tanpa memusingkan kegunaannya.

<br>


## Bagaimana sebuah service dispesifikasikan?

Spesifikasi sebuah service dalam *Celaut* terdiri atas tiga komponen utama:

### Kontainer | *BOX*
Komponen **BOX** mendefinisikan lingkungan tempat service akan berjalan, memastikan konsistensi cara service dijalankan di berbagai node. Tidak seperti metode kontainerisasi lain, BOX milik *Celaut* tidak bergantung pada image atau repositori eksternal; sebaliknya, ia langsung menentukan seluruh struktur berkas yang diperlukan untuk menjalankan service. Ia mencakup rincian berikut:

- **Arsitektur**: menyebutkan mikroarsitektur perangkat keras yang menjadi target service, memastikan kecocokan antara service dan node yang menjalankannya.

- **Sistem berkas**: sistem berkas adalah deskripsi menyeluruh atas struktur berkas service, mencakup semua berkas dan direktori yang dibutuhkan agar service dapat beroperasi. Ini termasuk biner, pustaka, berkas konfigurasi, dan sumber daya lain yang diperlukan.
    - **Item Branches** mendefinisikan struktur sistem berkas, di mana tiap cabang mewakili sebuah berkas, sebuah tautan simbolik, atau struktur direktori bersarang.
    - Pendekatan ini membuat seluruh lingkungan bersifat mandiri, mengurangi ketergantungan pada repositori pihak ketiga dan menjaga **determinisme**, karena lingkungan eksekusi service tetap sama terlepas dari node yang menampungnya.

- **Variabel lingkungan**: menentukan pasangan kunci-nilai yang dapat diakses service saat berjalan, memungkinkan konfigurasi dinamis tanpa mengubah struktur berkas intinya.

- **Entrypoint**: mendefinisikan skrip atau perintah yang memulai proses utama service saat dijalankan. Ini memastikan node tahu cara memulai service dengan benar.

- **Config**: mencakup jalur dan format konfigurasi yang harus dimuat node saat memulai service. Ia menyediakan informasi yang diperlukan seperti alokasi sumber daya awal atau parameter runtime tertentu.

- **Gateway yang diharapkan**: menjelaskan bagaimana service berkomunikasi dengan node *Celaut*, dengan menyebutkan protokol dan metode (protokol aplikasi gateway) yang diharapkannya dari node. Komponen ini memastikan komunikasi berjalan mulus antara service dan lingkungan penampungnya, memperlakukan node layaknya sistem operasi yang menyediakan interaksi tingkat sistem.

Spesifikasi BOX membuat service *Celaut* portabel, dapat direproduksi, dan bebas dari dependensi pihak ketiga, sejalan dengan prinsip **kesederhanaan** dan **determinisme**.

### Antarmuka | *API*
*API* (Application Programming Interface) dalam Celaut adalah seperangkat aturan dan spesifikasi yang menentukan bagaimana klien dan service lain dapat berinteraksi dengan sebuah service di dalam ekosistem. Tujuan utamanya adalah menetapkan cara yang jelas dan konsisten agar berbagai komponen perangkat lunak dapat saling berkomunikasi, memastikan service dapat diakses dan dipakai dengan cara yang terduga.

Melalui *API*, protokol komunikasi dan endpoint didefinisikan agar sebuah service dapat menerima dan memproses permintaan. Ini memastikan entitas luar mana pun, baik pengguna maupun service lain, dapat berintegrasi dengan service tersebut dengan mengikuti seperangkat instruksi baku, tanpa perlu memahami cara kerja internalnya.

Aspek mendasar dari *API* dalam Celaut adalah perannya dalam desentralisasi. Dengan menyediakan antarmuka yang terdefinisi jelas, service dapat beroperasi secara otonom tanpa bergantung pada pengendali terpusat untuk mengatur interaksi. Ini membuat sistem lebih dapat diskalakan dan lebih tangguh, karena tiap service mandiri dalam kemampuannya berkomunikasi dan berkolaborasi dengan komponen lain dalam ekosistem.

Spesifikasi *API* memungkinkan service diakses dan dipakai dengan mudah oleh klien sambil menjaga cara berinteraksi yang konsisten. Ia menopang prinsip **desentralisasi** *Celaut* dengan membiarkan service mandiri dalam komunikasinya, tanpa perlu bergantung pada pengendali terpusat untuk negosiasi protokol.

### Jaringan | *NET*
Komponen **NET** mendefinisikan cakupan akses jaringan eksternal yang boleh diminta dan digunakan sebuah service. Secara bawaan, sebuah service terisolasi dari jaringan eksternal, hanya mampu berkomunikasi dengan service induknya (klien yang membuatnya), service anaknya, dan node *Celaut* yang menjalankannya. Isolasi ini menjamin **determinisme** dan memperkuat **keamanan** dengan mencegah kebocoran data atau interaksi yang tak berwenang.

Namun, sebagian service memerlukan akses ke jaringan eksternal agar dapat berfungsi. Misalnya, sebuah service yang berperan sebagai node Bitcoin perlu berinteraksi dengan jaringan Bitcoin yang lebih luas. Untuk memungkinkan hal itu tanpa mengorbankan keamanan, *Celaut* mengizinkan hal berikut:

- **Akses eksternal terkendali**: service tidak langsung mengakses alamat IP atau node eksternal. Sebaliknya, ia mengirim permintaan ke node *Celaut*-nya, menyebutkan kebutuhannya akan akses ke suatu jaringan tertentu (misalnya "bitcoin-mainnet"). Node *Celaut* kemudian memverifikasi dan menyediakan daftar node rekan tepercaya yang boleh diajak berinteraksi oleh service tersebut.

- **Permintaan service atas rekan jaringan**: sebuah service seperti node Bitcoin dapat meminta sumber daya tambahan atau rekan jaringan dengan berkomunikasi dengan node *Celaut*-nya. Misalnya, ia bisa meminta, "Saya butuh rekan dari 'bitcoin-mainnet'." Node menilai permintaan itu dan mengembalikan daftar instans terverifikasi (yang bisa jadi node Bitcoin lain yang berjalan sebagai service di jaringan *Celaut*).

- **Kesadaran dan pengalihan oleh node**: jika node *Celaut* yang menerima permintaan service itu tahu bahwa ia tak dapat menemukan rekan yang sesuai (misalnya tak ada node Bitcoin lain di jaringannya), ia akan mencari node *Celaut* rekan yang dapat memenuhi kebutuhan tersebut. Ini memastikan service selalu dapat menemukan koneksi jaringan yang diperlukan, sekalipun node *Celaut* awalnya terbatas.

Komponen **NET** memungkinkan *Celaut* menyeimbangkan kebutuhan akan konektivitas eksternal dengan nilai inti **keamanan** dan **determinisme**, memastikan service tetap terisolasi kecuali secara eksplisit diizinkan mengakses jaringan yang lebih luas.

<br><br>

Spesifikasi sebuah service adalah bagian kunci arsitektur *Celaut*, karena ia memungkinkan service diterapkan dan dijalankan dengan cara yang konsisten dan terduga.

<br>

Node akan memuat service dari binernya dan menyediakan sumber daya yang dibutuhkannya untuk berjalan.

Tidak ada satu cara tunggal untuk mendefinisikan sebuah service.
Sebagai contoh, [implementasi Proto3](https://github.com/*Celaut*-project/service-lib/blob/master/node-driver/src/node_driver/gateway/protos/*Celaut*.proto#L66) adalah salah satu dari banyak variasi yang mungkin.

<br>

Tidak semua node akan menerima semua variasi spesifikasi service yang mungkin.

>Misalnya, node A memahami sebuah spesifikasi proto3 tertentu dan satu lagi dalam JSON. Node B yang lain memahami spesifikasi JSON dan satu lagi dalam JSON+berkas zip. Kedua node dapat saling mengirimkan service dalam spesifikasi yang sama-sama mereka miliki, dalam hal ini JSON.

<br>

## Berbagai jenis peran pengguna dalam sistem

Sebagai pengguna, kita dapat memainkan tiga jenis peran:

- Pengelola node (mirip seseorang yang mengelola penambang dalam sebuah blockchain).
- Pengembang service. Service ini dapat dijalankan siapa saja pada node mana pun (node mana pun yang kompatibel, dari sisi arsitektur, dan seterusnya).
- Pengguna yang menjalankan service pada node.

Karena itu, orang yang mengelola sebuah node (pengguna tipe 1) tidak peduli apakah yang berjalan itu penambangan PoW, bot trading, analisis sekuens DNA, atau apa pun yang dilakukan service yang dijalankannya. Ia sekadar menjalankan service yang diminta pengguna tipe 3, sebagai imbalan atas bukti pembayaran (di sebuah blockchain atau metode pembayaran apa pun yang diterima). Pengembang (pengguna tipe 2) hanya perlu mengirimkannya ke satu atau beberapa node, dan node-node itulah yang akan menangani penyebaran service ke node lain dan/atau mengunggahnya ke sistem reputasi, sehingga pengguna (atau service lain) tahu apakah, kapan, dan mengapa memakainya.

>Ini adalah pandangan sederhana atas sistem tersebut; dengan menambah kerumitan, jumlah peran pengguna yang mungkin pun bisa bertambah.

<br>


## Mengikuti jejak alam dalam ekosistem digital

Bayangkan *Celaut* sebagai ekosistem digital yang mencerminkan dinamika ekosistem biologis di alam. Dalam analogi ini:

1. Node sebagai organisme: node di dalam *Celaut* dapat diibaratkan organisme dalam ekosistem alami. Tiap node mewakili entitas tersendiri dengan kemampuan dan fungsinya sendiri, layaknya spesies berbeda yang menempati berbagai relung di lingkungan. Node-node ini saling berinteraksi, membentuk jaringan yang menyerupai jalinan kehidupan yang saling terhubung dalam ekosistem.

2. Service sebagai fungsi biologis: service di dalam *Celaut* analog dengan fungsi atau proses biologis pada organisme. Tiap service menjalankan tugas tertentu, mirip organ dalam makhluk hidup yang mengemban fungsi khusus. Sebagaimana organ bekerja selaras untuk menopang kehidupan, service berkolaborasi di dalam node untuk memenuhi beragam kebutuhan komputasi.

3. Desentralisasi sebagai keanekaragaman: prinsip desentralisasi *Celaut* dapat disetarakan dengan keanekaragaman hayati dalam ekosistem alami. Di alam, keanekaragaman hayati menjamin ketangguhan dan daya adaptasi, karena spesies yang beragam menyumbang pada kestabilan dan fungsi ekosistem. Serupa itu, desentralisasi dalam *Celaut* menekan risiko yang terkait titik gagal tunggal dan memperkuat kemampuan sistem beradaptasi terhadap kondisi yang berubah.

4. Efisiensi sebagai optimalisasi energi: efisiensi dalam *Celaut* mencerminkan optimalisasi energi yang teramati pada sistem alami. Dalam ekosistem biologis, energi mengalir lewat jejaring makanan, dengan organisme mengoptimalkan pengeluaran energi demi memaksimalkan kelangsungan hidup dan reproduksi. Demikian pula, *Celaut* mengoptimalkan sumber daya komputasi, menyebarkan tugas ke berbagai node untuk menekan latensi dan pemborosan sumber daya.

5. Kesederhanaan dan determinisme sebagai hukum alam: prinsip kesederhanaan dan determinisme dalam *Celaut* bergema dengan hukum-hukum yang mendasari sistem alami. Sebagaimana hukum fisika menentukan perilaku materi dan energi di alam semesta, aturan sederhana *Celaut* mengatur interaksi antara node dan service. Kerangka deterministik ini menjamin konsistensi dan keterdugaan, analog dengan keterdugaan gejala alam yang tunduk pada hukum-hukum dasar.

<br>


## Sistem kepercayaan

Dalam *Celaut*, bagian-bagian sistem yang berbeda — node dan service — tidak saling mempercayai, karena itu ia adalah sistem trustless. Inilah sebabnya kecil kemungkinan sebuah node akan menjalankan service secara gratis, atau sebuah service akan bekerja tanpa adanya pembayaran dalam sebuah kontrak dan bukti penerimaannya (walaupun tentu saja mereka boleh melakukannya jika mau; untuk service hal itu layak secara ekonomi karena biaya marjinalnya nol).
<br>Namun, agar bagian-bagian ini dapat berinteraksi tanpa saling percaya, dibutuhkan kontrak — kontrak sosial (dalam sebuah masyarakat node dan service) — untuk memindahkan nilai dan memberikan reputasi pada tiap bagian. Karena itu kita punya dua jenis sistem (dari sudut pandang yang relatif abstrak): sistem pembayaran dan sistem reputasi.

> Salah satu strategi yang mungkin bagi sebuah node adalah menawarkan eksekusi service tanpa pertukaran nilai pada awalnya, guna menaikkan reputasinya, lalu ketika sudah punya reputasi dari pihak lain, mulai menaikkan biayanya.

> Berbeda dari node, sifat service adalah memiliki biaya marjinal nol; artinya tidak ada batas jumlah unit yang dieksekusi secara bersamaan (karena biaya menjalankannya jatuh pada node). Maka besar kemungkinan banyak service akan mulai dengan biaya nol untuk meraih reputasi, mengenakan biaya ketika sudah punya reputasi dan tetap kompetitif, lalu kembali ke biaya nol ketika tak lagi kompetitif.


### Sistem pembayaran

Sistem pembayaran memungkinkan pemindahan nilai antar-entitas di dalam *Celaut*. Berikut beberapa jenis yang mungkin:

#### Smart contract lisensi

Sebuah sistem kontrak yang memungkinkan penerbitan lisensi penggunaan untuk service dan node, di mana Ledger adalah jaringan tempat kebenaran disepakati. Dengan begitu, jika A hendak menjalankan sebuah metode milik B, ia akan memeriksa kontraknya, menjalankan perintah yang telah ditetapkan (dengan terhubung ke Ledger), dan kontrak di Ledger akan menerbitkan sebuah lisensi, yang kemudian dikirim A kepada B agar B mengizinkan eksekusi metode yang diinginkan.

Ada empat jenis lisensi yang berbeda berdasarkan dua klasifikasi. Di satu sisi, apakah lisensi itu elastis atau statis; di sisi lain, apakah ia interaktif atau non-interaktif.

- **Lisensi elastis** adalah lisensi yang memungkinkan pembatasan penggunaannya berdasarkan parameter tertentu (jumlah permintaan, waktu, metode, variabel lingkungan, dan sebagainya).

- **Lisensi statis** adalah lisensi yang tidak membatasi penggunaan. B mengetahui kunci lisensinya, dan kontrak menyediakan lisensi itu tanpa mampu membatasi pemakaiannya.

- **Lisensi interaktif** mengharuskan B terhubung ke Ledger untuk memverifikasi keabsahan lisensi yang diberikan.

- Lisensi **non-interaktif** tidak mengharuskan B terhubung ke Ledger untuk memverifikasi keabsahan lisensi yang diberikan.

<br>

Dari sini muncul empat jenis lisensi:

- Statis interaktif (sangat lugas — kurang berguna)
- Statis non-interaktif (lebih cocok untuk service)
- Elastis interaktif (lebih cocok untuk node)
- Elastis non-interaktif (cukup rumit — serbaguna)

<br>

> Ledger bisa berupa jaringan publik tanpa izin seperti Bitcoin atau Ergo, atau platform tertutup dan privat seperti Stripe. Satu-satunya syarat adalah semua peserta harus mendukungnya.

<br>


### Sistem reputasi

Sistem reputasi memungkinkan pengguna, node, dan service membentuk ekosistem sosial yang menjadi dasar pengambilan keputusan. Bagi node, mereka perlu tahu rekan mana yang dapat dipercaya untuk dimintai eksekusi service.
Bagi pengguna yang menjalankan service, sistem ini membantu menentukan service mana yang akan bekerja paling baik untuk tugas yang ingin mereka kerjakan.

Dalam *Celaut*, reputasi diwujudkan sebagai catatan pada Ledger, yang merepresentasikan sebuah opini.

Dalam kasus service, sifat deterministiknya memberi sudut pandang yang berbeda atas reputasinya dibandingkan node.
Sebuah bukti reputasi (sebuah catatan) yang diterbitkan beberapa waktu lalu bisa jadi bernilai sama dengan yang terbaru sejauh menyangkut sebuah service (ini benar bila service itu tidak berinteraksi dengan jaringan, yang merupakan bentuk bawaan sebuah service: terisolasi sepenuhnya).
Jika ia memang berinteraksi dengan suatu jaringan, reputasinya bisa bergantung pada reputasi jaringan yang dihubunginya, dan itu tidak memiliki sifat deterministik tersebut karena dapat berubah seiring waktu. Sebab service itu sendiri tidak berubah.

Sebaliknya, reputasi sebuah node semakin bernilai bila semakin baru, sebab perilakunya dapat berubah seiring waktu.
Ketika node saling memperkenalkan diri, mereka menunjukkan bukti reputasinya, dan pihak lain boleh berpendapat — tanpa perlu konsensus — apakah mereka lebih atau kurang layak dipercaya.

Setiap node, service, atau aktor lain dalam sistem reputasi mempercayai berbagai sumber dengan derajat berbeda-beda, dan sumber-sumber itu pada gilirannya mempercayai sumber, node, service, atau entitas lain dengan derajat yang berbeda pula. Jadi, ketika seorang aktor dihadapkan pada entitas yang tak dikenal, ia akan memeriksa pendapat sumber-sumber yang dipercayainya.

Untuk pemahaman yang lebih spesifik tentang cara kerja sistem reputasi, kamu dapat membaca: [Dokumentasi Sigma Reputation Panel](https://github.com/reputation-systems/sigma-reputation-panel/blob/master/README.md)

<br>


## Mengapa ini diperlukan

*Celaut* hendak menyelesaikan justru pemisahan antara "*bagaimana suatu masalah diselesaikan*" dan "*di mana serta oleh siapa masalah itu diselesaikan*".

Ambil contoh sebuah bot trading.

>Bot trading adalah program perangkat lunak otomatis yang mengeksekusi order beli dan jual di pasar keuangan berdasarkan algoritme yang telah ditetapkan. Mereka penting karena dapat beroperasi 24/7, bereaksi cepat terhadap perubahan pasar, dan menghilangkan bias emosional, sehingga meningkatkan efisiensi dan konsistensi strategi perdagangan.


<br>

Dalam konteks ini, jika kamu ingin memakai bot trading sekarang juga, kamu akan membuka web dan bisa:

1. Mencari layanan web yang akan mengelola portofolio asetmu, yang punya:
    1. Kelebihan:
        1. Kamu tak perlu menjalankan infrastrukturnya sendiri.
        2. Kamu tak perlu mengonfigurasi apa pun.
    2. Kekurangan:
        1. Kamu tak bisa menyematkan reputasi padanya, karena pengembang layanan
        web itu tak mampu membuktikan bahwa sistemnya tak berubah (misalnya,
        ketika sebuah bot telah meraih banyak pengguna, mereka bisa saja menurunkan
        kinerjanya agar kamu beralih ke yang lebih baru).
        2. Para pengembang layanan web tak dapat menjaminmu bahwa mereka tidak
        menyalahgunakan data dari permintaanmu (dalam kasus ini,
        pergerakan portofoliomu).
2. Mencari kode sumber (di GitHub, dan lain-lain) yang bisa kamu jalankan sendiri di PC-mu (atau di cloud).
    1. Kelebihan:
        1. Ia deterministik, dalam arti (jika tak bisa terhubung ke
        internet) kamu akan yakin bahwa perilaku dan/atau kinerjanya tak akan berubah di kemudian hari, karena pengembang tak dapat mengubah sumber yang telah kamu unduh sebelumnya.
        2. Pengembang service tak punya kendali atas data permintaanmu.
    2. Kekurangan:
        1. Kamu perlu memiliki perangkat (infrastruktur) yang sanggup menjalankan kodenya.
        2. Kamu harus berurusan dengan soal konfigurasi sistem (yang sering kali
        cukup berat sehingga pengguna awam memilih layanan web saja).

Berhadapan dengan dua pilihan itu, *Celaut* memungkinkan pengambilan kelebihan dari kedua solusi sebelumnya tanpa kekurangannya. Inilah sebabnya:



- Pengelolaan infrastruktur tak diperlukan, karena node yang menanganinya. Tak perlu mencari penyedia cloud.

- Tak ada konfigurasi yang dibutuhkan. Spesifikasi service sudah mencakup bagaimana kontainer dibangun, arsitekturnya, kebutuhan jaringannya, dan antarmukanya. Pengguna tak perlu memusingkan semua itu.

- Pengembang service tidak dapat mengendalikan, mengubah, atau menarik data dari service tersebut. Mereka tidak mengendalikan node yang menyebarkan dan menjalankannya. Meski begitu, mereka tetap bisa memiliki insentif untuk membuatnya.

<br>


## Perilaku sistem

Bagian ini menjelaskan perilaku sistem, yang mencakup interaksi antar-bagian sistem,
untuk memperlihatkan sifat arsitekturnya dengan lebih jernih.

- [Eksekusi sebuah service](execution_of_a_service.md)
- [Penyeimbangan beban service](service_balancer.md)
- [Handshake node]()
