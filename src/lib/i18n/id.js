/*
 * Salinan bahasa Indonesia. Struktur kunci sama persis dengan en.js —
 * kunci apa pun yang hilang di sini otomatis jatuh kembali ke bahasa
 * Inggris, jadi halaman tidak pernah kosong.
 *
 * Pedoman penerjemahan
 * --------------------
 * • Sapaan "kamu", yang lazim dipakai di situs teknis berbahasa
 *   Indonesia.
 * • Istilah khas paradigma (BOX, API, NET, node, service, microVM,
 *   DePIN, nodo, Ergo) dibiarkan apa adanya: itu kosakata proyek,
 *   bukan kata yang perlu diterjemahkan.
 * • HTML inline (<strong>, <em>) dan tanda baca tipografis aslinya
 *   dipertahankan.
 */

export default {
	common: {
		scroll: 'Gulir',
		toTop: '↑ Atas',
		backToTop: 'Kembali ke atas',
		gains: 'Untung',
		costs: 'Biaya',
		visit: 'Kunjungi →',
		readMore: 'Baca selengkapnya →',
		viewOnGitHub: 'Lihat di GitHub →',
		languageLabel: 'Bahasa',
		switchLanguage: 'Ganti bahasa'
	},
	theme: {
		toLight: 'Beralih ke tema terang',
		toDark: 'Beralih ke tema gelap',
		toggle: 'Ganti tema'
	},
	topbar: {
		nav: 'Bagian Celaut',
		links: {
			depin: {
				label: 'Sewakan PC-mu',
				short: 'Sewa PC'
			},
			developers: {
				label: 'Pengembang',
				short: 'Dev'
			},
			users: {
				label: 'Pengguna',
				short: 'Pengguna'
			},
			paradigm: {
				label: 'Paradigma',
				short: 'Paradigma'
			}
		}
	},
	home: {
		hero: {
			tagline: 'Arsitektur Peer-to-Peer untuk Perancangan dan Distribusi Perangkat Lunak',
			primary: 'Mulai pakai',
			secondary: 'Pelajari lebih lanjut',
			facts: [
				'Terinspirasi automata seluler — perilaku global yang tangguh muncul dari aturan lokal yang sederhana.',
				'Deterministik sejak rancangan: masukan yang sama selalu menghasilkan keluaran yang sama dan dapat diverifikasi.',
				'Tanpa registri pusat. Service tersebar peer-to-peer di antara node-node independen.',
				'Setiap service dialamatkan berdasarkan isinya — hash-nya adalah namanya, jadi tak ada yang bisa ditukar diam-diam.',
				'Node menjalankan setiap service tersegel di dalam lingkungan mikro terisolasinya sendiri.',
				'Reputasi hidup di on-chain: kepercayaan itu diraih dan bisa dibuktikan, bukan diberikan oleh penjaga gerbang.',
				'Tiga prinsip, dari hulu ke hilir: desentralisasi, kesederhanaan, dan determinisme.'
			]
		},
		atoms: {
			eyebrow: 'Dua unsur dasar',
			heading: 'Node dan service',
			intro: 'Celaut dibangun dari dua konsep atomik. Selebihnya — spesifikasi, eksekusi, pembayaran, reputasi — hanyalah cara keduanya berinteraksi.',
			items: [
				{
					title: 'Sebuah node',
					body: '<strong>Komputer atau perangkat</strong> yang berbicara dengan sesamanya dan mengelola eksekusi service. Ia menyediakan perangkat keras, memutuskan apakah pekerjaan dijalankan secara lokal atau diteruskan, dan tak pernah perlu memahami apa yang dilakukan perangkat lunaknya.'
				},
				{
					title: 'Sebuah service',
					body: '<strong>Kontainer perangkat lunak deterministik</strong> yang dibuat untuk satu tugas. Ia tersegel dari node yang menjalankannya: node tidak memeriksa isi programnya, dan program tidak tahu mesin mana yang ia tempati.'
				}
			]
		},
		index: {
			nav: 'Navigasi bagian',
			title: 'Di halaman ini',
			open: 'Buka menu bagian',
			close: 'Tutup menu bagian',
			sections: {
				foundations: 'Asal usul',
				atoms: 'Node & service',
				nodes: 'Node',
				services: 'Service',
				'service-spec': 'Spesifikasi',
				execution: 'Eksekusi',
				determinism: 'Determinisme',
				coordination: 'Koordinasi',
				'user-roles': 'Kamu yang mana?',
				'core-principles': 'Prinsip',
				'what-is-not': 'Yang bukan Celaut',
				implementations: 'Implementasi',
				'coordination-detail': 'Insentif',
				'service-distribution': 'Distribusi',
				applications: 'Aplikasi'
			}
		},
		scenes: {
			foundations: {
				label: 'Dari mana asalnya',
				beats: [
					{
						h: 'Semuanya bermula dari segelintir aturan.',
						p: 'Pada 1940-an, <strong>John von Neumann</strong> dan <strong>Stanislaw Ulam</strong> memperkenalkan automata seluler: model yang menunjukkan bagaimana perilaku rumit bisa lahir dari yang sederhana.'
					},
					{
						h: 'Tak ada yang mengatur ini.',
						p: 'Pada 1970, <strong>&ldquo;Game of Life&rdquo; karya John Horton Conway</strong> menjadi contoh klasiknya: sebuah petak di mana tiap sel hanya melihat tetangganya, namun keseluruhannya menghasilkan struktur rumit yang terus berkembang.'
					},
					{
						h: 'Itulah seluruh filosofi rancangannya.',
						p: 'Gagasan ini memberi petunjuk bagaimana sistem terdesentralisasi bisa <strong>mencapai kerumitan tanpa kendali pusat</strong> — filosofi yang memandu Celaut. Aturan sederhana di tingkat node dan service, sistem adaptif di atasnya.',
						note: 'Desentralisasi · Kesederhanaan · Determinisme'
					}
				]
			},
			nodes: {
				label: 'Jaringannya',
				beats: [
					{
						h: 'Punya node bukanlah pembedanya.',
						p: 'Kebanyakan jaringan terdesentralisasi punya node, dan sebagian besar tetap bergantung pada satu hal yang berkuasa: <strong>protokol yang harus dijalankan semua orang</strong>. Aturannya jadi pusat, sekalipun mesinnya tidak.'
					},
					{
						h: 'Celaut tak punya protokol yang harus disepakati.',
						p: 'Node tak perlu menyepakati protokol komunikasi lebih dulu — mereka <strong>menyatakan antarmuka yang didukung dan metode pembayaran yang diterima saat berkontak</strong>. Dua node membicarakan apa pun yang kebetulan sama-sama mereka punya; di mana tak ada irisan, mereka cukup tidak bicara.'
					},
					{
						h: 'Jadi kamu mengubah node-mu, bukan jaringannya.',
						p: 'Kebijakan harga baru, metode pembayaran lain, format spesifikasi yang belum diurai siapa pun — kamu <strong>menerapkannya di node-mu sendiri</strong> dan ia bekerja dengan siapa pun yang sudah mendukungnya. Tak ada pemungutan suara, tak ada yang perlu dimigrasikan, dan <strong>tak ada hard fork yang harus dilewati</strong>.',
						note: 'Tanpa protokol bersama. Tanpa versi bersama. Tanpa izin.'
					}
				]
			},
			services: {
				label: 'Apa yang berjalan di atasnya',
				beats: [
					{
						h: 'Service adalah kontainer tersegel.',
						p: 'Service di Celaut adalah <strong>kontainer perangkat lunak deterministik</strong> yang dirancang untuk tugas tertentu. Tak lebih rumit dari itu.'
					},
					{
						h: 'Mengikuti prinsip kotak hitam.',
						p: 'Mereka beroperasi <strong>terlepas dari node yang menjalankannya</strong>, dan hanya fokus pada fungsinya. Node tak perlu memahami service, dan service tak perlu tahu apa pun tentang node.'
					},
					{
						h: 'Terisolasi, setiap kali.',
						p: 'Setiap permintaan berjalan sebagai <strong>proses terisolasi</strong> — dalam kontainer atau mesin virtual, tergantung node-nya — yang menyembunyikan lingkungan eksekusi dan menjaga batas keamanan tetap utuh.',
						note: 'Apa yang masuk, apa yang keluar. Itulah seluruh antarmukanya.'
					}
				]
			},
			'service-spec': {
				label: 'Bagaimana service dispesifikasikan',
				beats: [
					{
						h: '<strong>BOX</strong> — lingkungannya.',
						p: 'Arsitektur, sistem berkas, variabel lingkungan, entrypoint, konfigurasi, dan sumber daya. Ia menentukan seluruh struktur berkas secara langsung alih-alih bergantung pada image atau repositori eksternal, dan itulah yang membuat eksekusi bisa direproduksi di node mana pun.'
					},
					{
						h: '<strong>API</strong> — antarmukanya.',
						p: 'Cara berkomunikasi dengan service, sistem pembayaran yang diterimanya, dan biaya terkait. Ini memungkinkan service dipakai tanpa ada pengendali pusat yang menegosiasikan protokol atas namanya.'
					},
					{
						h: '<strong>NET</strong> — cakupan jaringannya.',
						p: 'Secara bawaan sebuah service <strong>terisolasi</strong>: ia hanya bisa bicara dengan induknya, anak-anaknya, dan node yang menjalankannya. Jika ia butuh dunia luar, <strong>jaringan yang akan dijangkaunya disebutkan dalam spesifikasinya sendiri</strong> — node memberikannya, karena ia ingin menjalankan service dengan benar, dan kamu mendapat jaminan bahwa ia tak akan pernah menjangkau tempat lain.'
					},
					{
						h: 'Tiga komponen. Satu service portabel.',
						p: 'Bersama-sama ketiganya menciptakan <strong>service yang portabel dan dapat direproduksi</strong>, yang berperilaku konsisten di seluruh jaringan sambil menjaga keamanan dan determinisme.',
						note: 'Tanpa dependensi pihak ketiga. Tak ada yang dibiarkan implisit.'
					}
				]
			},
			execution: {
				label: 'Siapa memutuskan apa',
				beats: [
					{
						h: 'Sebuah service meminta anak-anaknya.',
						p: 'Service bisa meminta eksekusi <strong>service anak</strong> lewat node-nya. Ia menyatakan <strong>sumber daya yang dibutuhkan masing-masing</strong> dan menyerahkan anggaran untuk dibelanjakan. Bukan mesin, bukan wilayah — sumber daya.'
					},
					{
						h: 'Node memutuskan di mana mereka berjalan.',
						p: 'Ia membandingkan <strong>biaya menjalankan instans secara lokal dengan harga yang ditawarkan tiap rekannya</strong> dan memilih yang dianggap terbaik. Satu anak tinggal di sini; yang lain mendarat di rekan lain.'
					},
					{
						h: 'Induknya tak pernah tahu.',
						p: 'Ia tak tahu apakah seorang anak berakhir di mesin ini atau di tempat lain, dan memang tak perlu tahu. Yang ia amati hanyalah <strong>apa yang dikonsumsi anak-anaknya dan seberapa cepat mereka membelanjakannya</strong>, supaya bisa menyeimbangkannya.'
					},
					{
						h: 'Pemisahan itulah seluruh kuncinya.',
						p: 'Pengelola node mengurus sisi fisik: perangkat keras, kapasitas, harga, penempatan. Pengembang service <strong>menyatakan sumber daya yang dibutuhkan dan tak menyebut apa pun soal infrastruktur</strong>. Tak ada yang harus mengerjakan tugas pihak lain — dan justru itulah yang menjaga kedua sisi tetap sederhana.',
						note: 'Dua urusan. Satu garis bersih di antaranya.'
					}
				]
			},
			determinism: {
				label: 'Kenapa ini bertahan',
				beats: [
					{
						h: 'Masukan sama. Keluaran sama. Selalu.',
						p: 'Service dispesifikasikan sepenuhnya untuk menjamin <strong>hasil yang dapat direproduksi</strong> lintas waktu dan node. Dengan masukan yang sama, keluarannya selalu sama, terlepas dari di mana atau kapan dijalankan.'
					},
					{
						h: 'Yang membuat kepercayaan bisa diukur.',
						p: 'Karena perangkat lunaknya tak bisa melenceng, <strong>bukti reputasi yang dicatat beberapa waktu lalu masih mengatakan sesuatu yang benar hari ini</strong> — sepanjang service itu tak menjangkau jaringan, yang memang keadaan bawaannya.'
					},
					{
						h: 'Dan ia ikut berpindah.',
						p: 'Karena tak ada bagian lingkungan yang diserahkan pada mesin inang, spesifikasi yang sama menghasilkan perilaku yang sama di <strong>sebuah laptop, server nganggur, atau node yang belum pernah kamu dengar</strong>. Di mana ia berjalan berhenti menjadi bagian dari jawabannya.',
						note: 'Dispesifikasikan penuh, jadi tak ada yang diserahkan pada mesin.'
					}
				]
			},
			coordination: {
				label: 'Bagaimana orang asing bekerja sama',
				beats: [
					{
						h: 'Reputasi lebih dulu.',
						p: 'Node dan service <strong>tidak saling percaya</strong> — Celaut adalah sistem trustless. Jadi tak ada yang dimulai dengan jabat tangan; semuanya dimulai dengan penelusuran. Reputasi adalah <strong>catatan di ledger</strong>, opini alih-alih vonis, dan tiap pelaku menimbang sumber yang sudah ia percayai untuk memutuskan apakah orang asing layak diajak bicara.'
					},
					{
						h: 'Lalu kamu membayar untuk sebuah janji sumber daya.',
						p: 'Baru setelah catatannya cocok, ada yang bergerak. Pemohon membayar <strong>di muka</strong>, dan yang ia beli adalah sebuah janji: <strong>sekian komputasi, selama sekian lama</strong>. Mekanisme pembayaran berada <strong>di luar arsitektur inti</strong>, jadi tak ada ledger tertentu yang dipatri di dalamnya.'
					},
					{
						h: 'Jaminan node adalah reputasinya.',
						p: 'Tak ada yang memaksanya menepati janji itu. Yang menahannya adalah bahwa <strong>hasilnya dituliskan kembali ke ledger</strong> — dan node yang catatannya menyebut ia menerima bayaran lalu kurang menyampaikan akan berhenti dipilih. Tiap pihak punya kepentingan tetap agar orang asing berikutnya menyukai apa yang ia baca.',
						note: 'Periksa · bayar · antarkan · catat. Lalu berputar lagi.'
					}
				]
			}
		},
		roles: {
			eyebrow: 'Pilih jalan masukmu',
			heading: 'Kamu yang mana?',
			intro: 'Sebagai pengguna, kita bisa memainkan tiga jenis peran dalam ekosistem ini. Masing-masing punya jalan masuknya sendiri.',
			items: [
				{
					eyebrow: 'Peran 01',
					title: 'Pengelola node',
					lede: 'Mirip penambang di sistem blockchain, pengelola node menyediakan sumber daya komputasi bagi jaringan. Mereka menjalankan service yang diminta pengguna dengan imbalan bayaran, tanpa perlu memahami fungsi spesifik service tersebut.',
					points: [
						'Menyediakan sumber daya perangkat keras',
						'Menjalankan service saat diminta',
						'Menerima kompensasi atas sumber daya'
					],
					primary: 'Sewakan PC-mu',
					secondary: 'Jalankan node'
				},
				{
					eyebrow: 'Peran 02',
					title: 'Pengembang service',
					lede: 'Pengembang membuat service yang bisa berjalan di node kompatibel mana pun di jaringan. Mereka fokus membangun fungsionalitas tanpa memusingkan detail infrastruktur di bawahnya.',
					points: [
						'Merancang spesifikasi service',
						'Membangun aplikasi deterministik',
						'Mendistribusikan service ke node'
					],
					primary: 'Bangun di Celaut',
					secondary: 'Jelajahi Skills'
				},
				{
					eyebrow: 'Peran 03',
					title: 'Pengguna service',
					lede: 'Pengguna akhir menjalankan service di node, dan membayar sumber daya komputasi yang dipakai.',
					points: [
						'Meminta eksekusi service',
						'Membayar sumber daya komputasi',
						'Memakai keluaran service'
					],
					primary: 'Gunakan jaringannya',
					secondary: 'Jelajahi Skills'
				}
			]
		},
		principles: {
			eyebrow: 'Aturan yang dipegangnya',
			heading: 'Prinsip inti Celaut',
			intro: 'Tiga komitmen yang menurunkan seluruh arsitekturnya. Semua di atas — node tanpa protokol, service tersegel, jaringan yang dideklarasikan — adalah konsekuensi dari ketiganya.',
			items: [
				{
					title: 'Desentralisasi',
					body: 'Celaut menghapus <strong>titik kendali atau titik gagal tunggal</strong> dengan membiarkan node berkomunikasi dan berkoordinasi secara dinamis, tanpa perantara yang harus dimintai izin.'
				},
				{
					title: 'Kesederhanaan',
					body: 'Arsitekturnya mengikuti <strong>aturan minimalis</strong> yang menekan kerumitan, sehingga tiap komponen tetap cukup kecil untuk dipahami dan dirawat sendiri.'
				},
				{
					title: 'Determinisme',
					body: 'Service dispesifikasikan sepenuhnya untuk menjamin <strong>hasil yang dapat direproduksi</strong> lintas waktu dan node. Dengan masukan yang sama, keluarannya sama, terlepas dari di mana atau kapan dijalankan.'
				}
			]
		},
		whatIsNot: {
			eyebrow: 'Salah kaprah yang umum',
			heading: 'Yang bukan Celaut',
			intro: 'Arsitektur ini cukup dekat dengan beberapa hal yang sudah akrab sehingga mudah dikira sama. Ada baiknya kita presisi soal perbedaannya.',
			items: [
				{
					title: 'Bukan satu jaringan tunggal',
					body: 'Celaut mendefinisikan <strong>arsitektur yang fleksibel</strong>, bukan satu jaringan yang sudah ditentukan. Jaringan dominan mungkin saja muncul, tetapi sistemnya mendukung banyak bentuk peer-to-peer alih-alih mendikte satu bentuk saja.'
				},
				{
					title: 'Bukan tumpukan protokol yang lengkap',
					body: 'Ia menyediakan <strong>prinsip inti</strong> untuk membangun tumpukan distribusi komputasi, bukan tumpukan penuh yang serba menentukan. Implementasi saat ini bersandar pada komponen seperti gRPC atau Docker, dan itu pilihan yang bisa ditukar.'
				},
				{
					title: 'Bukan proyek blockchain',
					body: 'Celaut <strong>tidak punya mata uang kripto sendiri</strong> dan tidak punya DAO. Ia memang memakai teknologi blockchain di tempat yang memang pantas — mencatat reputasi, menyelesaikan pembayaran antar orang asing — tanpa mengadopsi ekosistem luas di sekitarnya.'
				}
			]
		},
		nodes: {
			eyebrow: 'Mesin-mesinnya',
			heading: 'Node: fondasi jaringan',
			intro: 'Node adalah <strong>komputer atau perangkat</strong> yang berkomunikasi dengan sesamanya dan mengelola eksekusi service. Empat tugas, tanpa koordinator di atasnya.',
			jobs: [
				{
					title: 'Eksekusi service',
					body: 'Ia menegosiasikan biaya eksekusi dengan rekan-rekannya dan memutuskan apakah menjalankan service secara lokal atau mendelegasikannya, agar sumber daya mengalir ke tempat termurah.'
				},
				{
					title: 'Komunikasi',
					body: 'Ia menyatakan antarmuka yang didukung dan metode pembayaran yang diterima saat berkontak, dan itulah yang membuat protokol bisa berkembang tanpa kesepakatan sebelumnya.'
				},
				{
					title: 'Keamanan',
					body: 'Ia menerbitkan dan mengelola alamat serta token autentikasi yang menjadi identitas tiap interaksi service.'
				},
				{
					title: 'Dependensi',
					body: 'Ia memastikan sebuah service bisa menjangkau apa yang dibutuhkannya, di mana pun dependensi itu kebetulan berjalan di jaringan.'
				}
			],
			implementationsHeading: 'Implementasi yang bisa kamu jalankan hari ini',
			implementations: [
				{
					name: 'Nodo',
					body: 'Implementasi rujukan, dibangun dengan Python3 dan Rust — contoh nyata bagaimana sebuah node dijalankan dalam praktik.'
				},
				{
					name: 'Chatui',
					body: 'Node untuk perangkat Android. Ia menyajikan service lewat antarmuka obrolan sederhana, tanpa menuntut kepercayaan pada node mana pun.'
				}
			]
		},
		coordination: {
			eyebrow: 'Yang membuat orang asing mau bekerja sama',
			heading: 'Mekanisme koordinasi',
			intro: 'Keduanya bukan bagian dari arsitektur inti, dan itu disengaja: keduanya berada di luar, supaya tak pernah ada ledger atau mata uang tertentu yang dipatri di dalamnya.',
			items: [
				{
					title: 'Sistem reputasi',
					body: 'Riwayat interaksi, dicatat di ledger sebagai opini, bukan vonis. Inilah <strong>yang pertama kali dilihat</strong>, sebelum siapa pun menyanggupi apa pun.',
					points: [
						'Tiap pelaku menimbang sendiri sumber-sumber yang sudah ia percayai.',
						'Nama baik layak dijaga, sehingga ia menjadi jaminan di balik sebuah janji.',
						'Hasilnya adalah pengaturan diri, tanpa otoritas yang menjatuhkan vonis.'
					]
				},
				{
					title: 'Mekanisme pembayaran',
					body: 'Sebuah node dibayar <strong>di muka</strong> sebagai imbalan atas janji sumber daya yang akan dikonsumsi — sekian komputasi, selama sekian lama. Jaminannya bukan tagihan setelah pekerjaan usai; melainkan <strong>reputasinya</strong>.',
					points: [
						'Pembayaran ditarik di muka, sebelum eksekusi dimulai.',
						'Bukti pembayaran membuka akses ke service yang memintanya.',
						'Node yang menerima bayaran lalu kurang menyampaikan kehilangan reputasi, sehingga berhenti dipilih.'
					]
				}
			],
			note: 'Periksa catatannya · bayar haknya · antarkan · catat hasilnya.'
		},
		distribution: {
			eyebrow: 'Menyebarkannya',
			heading: 'Distribusi service',
			intro: 'Tak ada toko untuk menerbitkannya dan tak ada tinjauan untuk ditunggu. Pengembang menyerahkan service ke satu node, dan jaringan membawanya dari sana.',
			items: [
				{
					title: 'Penemuan terdesentralisasi',
					body: 'Celaut <strong>tak punya registri service pusat</strong>. Service menyebar antar node secara peer-to-peer, jadi bisa ditemukan langsung — dan tak ada penjaga gerbang yang memutuskan apakah kamu boleh masuk.'
				},
				{
					title: 'Integrasi blockchain opsional',
					body: 'Service juga bisa dideklarasikan pada blockchain yang mengimplementasikan registri — seperti <strong>Sigma Reputation System</strong> di Ergo — ketika visibilitas dan jejak yang bisa diaudit lebih berharga daripada tetap sepenuhnya off-chain.'
				}
			]
		},
		applications: {
			eyebrow: 'Di mana ia sudah berjalan',
			heading: 'Dampak dan penerapan di dunia nyata',
			intro: 'Arsitektur ini bukan eksperimen pikiran. Inilah tempat-tempat ia dipakai hari ini.',
			ours: [
				{
					name: 'DePin',
					body: 'Siapa pun bisa menjalankan node Celaut dan menjadi bagian dari jaringan infrastruktur fisik terdesentralisasi. Tiap node menemukan rekan, menjalankan dan mengorkestrasi service, serta mengelola dependensinya — mengubah komputer biasa menjadi komputasi bersama yang tahan sensor.'
				},
				{
					name: 'Unstoppable Skills',
					body: 'Registri tanpa server yang sepenuhnya on-chain, di mana masalah menjadi tokoh utamanya. Alih-alih memburu service, agen mencari sebuah skill lalu menemukan service yang menutupinya, lengkap dengan tolok ukur nyata dan peringkat berbasis reputasi. Dibangun di atas Ergo dan Celaut, dengan taruhan yang nyata: tak ada yang bisa spam tanpa mempertaruhkan reputasi.'
				}
			],
			thirdPartyHeading: 'Pihak ketiga',
			thirdPartyTag: 'bukan buatan kami',
			thirdParty: {
				name: 'Game of Prompts',
				body: [
					'Platform kompetitif tempat kreator merancang <strong>game-service</strong> yang menilai robot yang memainkannya, dan pemain menulis <strong>solver-service</strong> yang berusaha memaksimalkan skornya.',
					'Service-nya mengikuti paradigma Celaut, dan seluruh sistemnya memakai blockchain Ergo untuk mencatat hasil dan mentransfer hadiah.'
				]
			},
			ergoDocs: 'Dokumentasi Ergo',
			formalPaper: 'Makalah formal'
		}
	},
	depin: {
		meta: {
			title: 'Sewakan PC-mu — Celaut DePIN',
			description: 'Jual sumber daya komputermu saat sedang tak kamu pakai. Lapisan DePIN Celaut sepenuhnya peer-to-peer, membiarkanmu menetapkan harga komputasi berdasarkan biaya listrikmu, dan mengisolasi tiap beban kerja di dalam microVM.'
		},
		topbarTitle: 'Sewakan PC-mu',
		hero: {
			eyebrow: 'Celaut DePIN',
			title: 'Sewakan PC-mu.',
			tagline: 'Jual sumber daya komputermu saat sedang tak kamu pakai.',
			lede: 'Mesinmu menganggur sebagian besar hari. Celaut mengubah kapasitas menganggur itu menjadi sesuatu yang orang mau bayar — langsung, sesuai syaratmu, dengan tiap beban kerja tersegel jauh dari sistemmu.',
			actions: [
				'Mulai sewakan PC-mu',
				'Lihat cara kerjanya'
			],
			stats: [
				{
					value: '100%',
					label: 'peer-to-peer — tanpa perusahaan di tengah'
				},
				{
					value: 'Kamu',
					label: 'yang menetapkan harga, dengan tagihan listrik ikut dihitung'
				},
				{
					value: 'microVM',
					label: 'isolasi untuk tiap beban kerja yang kamu tampung'
				}
			]
		},
		scenes: {
			rent: {
				label: 'Idenya',
				beats: [
					{
						h: 'PC-mu sedang menganggur saat ini.',
						p: 'Kebanyakan mesin pribadi tak terpakai sepanjang sebagian besar hari. Itu perangkat keras sungguhan — inti prosesor, memori, disk — yang sama sekali tak melakukan apa-apa.'
					},
					{
						h: 'Jual yang tak kamu pakai.',
						p: 'Celaut memotong mesinmu menjadi <strong>kapasitas yang bisa kamu sewakan</strong>. Kamu menentukan berapa banyak yang diserahkan ke jaringan dan berapa yang tetap jadi milikmu — sisa mesinnya bekerja persis seperti biasa.'
					},
					{
						h: 'Dibayar untuk pekerjaan yang dilakukannya.',
						p: 'Rekan yang butuh komputasi menemukan node-mu, menyepakati harga langsung dengannya, dan membayar per eksekusi. <strong>Pembayaran diselesaikan di Ergo</strong> seiring tiap pekerjaan rampung.',
						note: 'Tanpa pusat data. Tanpa perantara. Tanpa menunggu pencairan bulanan.'
					}
				]
			},
			p2p: {
				label: 'Keunggulan 01',
				beats: [
					{
						h: 'Sepenuhnya peer-to-peer.',
						p: 'Setiap platform &ldquo;sewakan perangkat kerasmu&rdquo; yang lain menaruh sebuah perusahaan di tengah. Ia memegang pasarnya, mengambil potongannya, menetapkan aturannya, dan bisa mengeluarkanmu dari jaringannya kapan saja.'
					},
					{
						h: 'Tak ada siapa pun di tengah.',
						p: 'Celaut <strong>tak punya yayasan maupun perusahaan</strong> yang duduk di antara kedua pihak. Node-mu dan rekan yang menginginkan komputasi berbicara <strong>langsung</strong> satu sama lain — penemuan, negosiasi, eksekusi, penyelesaian.'
					},
					{
						h: 'Artinya tak ada yang bisa memutusmu.',
						p: 'Tak ada akun untuk ditangguhkan, tak ada syarat yang berubah di bawahmu, tak ada biaya yang diam-diam membesar. Interaksinya <strong>sepenuhnya peer-to-peer</strong>, jadi satu-satunya yang jadi sandaran tiap pihak adalah pihak lainnya.',
						note: 'Tak ada yang perlu didaftari. Tak ada tempat untuk mendepakmu.'
					}
				]
			},
			electricity: {
				label: 'Keunggulan 02',
				beats: [
					{
						h: 'Komputasi tak gratis untuk diberikan.',
						p: 'Menyalakan mesinmu memakan listrik, dan biayanya tak rata — ia bergerak sepanjang hari dan berbeda tergantung di mana kamu tinggal.'
					},
					{
						h: 'Masukkan ke dalam harga.',
						p: 'Celaut membiarkanmu <strong>secara opsional memasukkan biaya listrik</strong> ke dalam harga yang kamu tetapkan untuk komputasimu. Node-mu menghargai pekerjaan dengan tagihan listrik ikut dalam persamaan, jadi menyewakan kapasitas tak pernah diam-diam merugikanmu.'
					},
					{
						h: 'Dan tentukan kapan kamu buka.',
						p: '<strong>Ketersediaan dan lama jalan juga kamu yang atur.</strong> Sewakan mesin hanya pada malam hari saat listrik termurah, batasi berapa lama satu pekerjaan boleh berjalan, atau matikan sepenuhnya — jaringan tinggal mengalihkannya ke tempat lain.',
						note: 'Tarifmu. Jammu. Marginmu.'
					}
				]
			},
			isolation: {
				label: 'Keunggulan 03',
				beats: [
					{
						h: 'Kode siapa yang berjalan di PC-ku?',
						p: 'Itu pertanyaan pertama siapa pun yang berpikir waras. Menyewakan mesinmu tak boleh berarti menyerahkan kuncinya kepada orang asing.'
					},
					{
						h: 'Isolasi eksekusi penuh.',
						p: 'Tiap beban kerja berjalan tersegel di dalam <strong>microVM</strong>-nya sendiri — mesin virtual sungguhan dengan kernel sendiri dan batas yang ditegakkan perangkat keras, bukan kontainer berbagi kernel. Ia tak bisa melihat berkasmu, jaringanmu, atau beban kerja lain di mesin itu.'
					},
					{
						h: 'Teknologi yang sama dengan yang dipakai cloud besar.',
						p: 'microVM adalah yang dipakai <strong>penyedia cloud besar</strong> untuk menjalankan kode tak tepercaya dari jutaan orang asing di perangkat keras bersama. Celaut menaruh model isolasi yang sama di mejamu — jaminannya bukan janji, melainkan arsitekturnya.',
						note: 'Pekerjaan selesai, VM dihancurkan. Tak ada yang tersisa.'
					}
				]
			}
		},
		payoff: {
			heading: 'Apa yang benar-benar kamu dapat',
			items: [
				{
					title: 'Perangkat keras menganggur, jadi bekerja',
					body: 'Rig gaming yang tidur pukul 3 pagi, workstation yang nganggur di akhir pekan, satu kotak cadangan di lemari. Kalau bisa menjalankan nodo, ia bisa menghasilkan.'
				},
				{
					title: 'Kamu yang menetapkan syarat',
					body: 'Harga per satuan komputasi, jam berapa kamu tersedia, seberapa banyak mesin yang mau kamu serahkan. Semuanya bisa kamu ubah kapan saja.'
				},
				{
					title: 'Dibayar di muka',
					body: 'Sebuah node dibayar lebih dulu untuk janji sumber daya — di Ergo (ERG), tanpa faktur, tanpa jadwal pencairan platform, tanpa ambang minimum. Reputasi adalah jaminan bahwa ia akan menyampaikan.'
				},
				{
					title: 'Tak ada yang perlu dipercaya',
					body: 'Service dialamatkan berdasarkan isinya: pemohon mendapat persis perangkat lunak yang ia minta, dan kamu menjalankannya tanpa perlu memeriksanya atau menjaminnya.'
				},
				{
					title: 'Berkasmu tetap milikmu',
					body: 'Sebuah beban kerja hidup di microVM-nya sendiri dengan kernel sendiri. Ia tak pernah melihat diskmu, jaringanmu, atau apa pun yang lain di mesin itu.'
				},
				{
					title: 'Pergi kapan saja',
					body: 'Hentikan node-nya dan jaringan akan memutar melewatimu. Tak ada kontrak, tak ada keterikatan, dan tak ada siapa pun untuk dimintai izin.'
				}
			]
		},
		steps: {
			heading: 'Dari pasang sampai penghasilan',
			items: [
				{
					title: 'Pasang nodo',
					body: 'Satu perintah di Linux, satu installer di Windows. Mesinmu bergabung ke jaringan dan mulai menemukan rekan-rekannya.'
				},
				{
					title: 'Tetapkan harga dan jammu',
					body: 'Beri tahu node berapa biaya komputasimu — termasuk listrik kalau mau ikut dihitung — dan kapan ia tersedia.'
				},
				{
					title: 'Terima pekerjaan',
					body: 'Rekan bernegosiasi langsung dengan node-mu. Beban kerja yang diterima berjalan tersegel di dalam microVM, terisolasi dari segala hal lain.'
				},
				{
					title: 'Dapatkan bayaran',
					body: 'Pembayaran ditarik di muka di Ergo; reputasi dicatat seiring pekerjaan ditunaikan. Kontribusi diganjar; hasilnya tetap bisa diaudit.'
				}
			]
		},
		roles: {
			heading: 'Sisi lain dari pertukaran ini',
			intro: 'Menyewakan PC-mu adalah separuh dari jaringan. Separuh lainnya adalah bisa <em>memakainya</em> — dan sifat-sifat yang melindungimu sebagai host itulah yang membuat jaringan ini layak dibeli.',
			items: [
				{
					title: 'Pengembang',
					body: 'Kirim program sekali sebagai service tersegel yang dialamatkan berdasarkan isinya, lalu biarkan jaringan menampung, menemukan, dan menskalakannya. Reproduktibilitas datang dari rancangannya, bukan dari SLA penyedia.',
					link: 'Untuk pengembang →'
				},
				{
					title: 'Agen &amp; pengguna',
					body: 'Minta service berdasarkan masalah yang dipecahkannya dan bayar per eksekusi. Tanpa akun cloud, tanpa keterikatan — dan segelnya membuktikan kamu mendapat persis perangkat lunak yang kamu minta.',
					link: 'Untuk pengguna akhir →'
				},
				{
					title: 'Host',
					body: 'Itu kamu. Sumbangkan perangkat keras apa pun yang kamu punya; lapisan virtualisasi node berarti beban kerja tetap mendarat di tempat yang cocok, bahkan lintas arsitektur CPU.'
				}
			]
		},
		cta: {
			heading: 'Nyalakan mesin menganggurmu.',
			body: 'Memasang node cuma butuh satu perintah. Itulah cara tercepat melihat berapa nilai perangkat kerasmu saat sedang tak melakukan apa-apa.',
			actions: [
				'Jalankan node',
				'Baca paradigmanya'
			]
		}
	},
	developers: {
		meta: {
			title: 'Untuk pengembang — Bangun sekali, jalan di mana saja | Celaut',
			description: 'Bangun service Celaut: tentukan BOX, API, dan cakupan NET, serahkan ke satu node, lalu biarkan jaringan mendistribusikan dan menjalankannya. Tanpa infrastruktur, tanpa konfigurasi, tanpa platform di tengah.'
		},
		topbarTitle: 'Untuk pengembang',
		hero: {
			eyebrow: 'Pengembang service',
			title: 'Bangun sekali saja.',
			tagline: 'Lalu berhenti memikirkan di mana ia berjalan.',
			lede: 'Service Celaut bukan sebuah deployment — ia sebuah spesifikasi. Uraikan lingkungannya, antarmukanya, dan cakupan jaringannya, serahkan ke satu node, dan jaringan mengurus sisanya.',
			actions: [
				'Jelajahi Skills',
				'Lihat cara kerjanya'
			],
			stats: [
				{
					value: 'BOX · API · NET',
					label: 'tiga komponen — itu seluruh spesifikasinya'
				},
				{
					value: 'Tanpa DevOps',
					label: 'node menangani eksekusi; tak ada akun cloud untuk dibuka'
				},
				{
					value: 'Deterministik',
					label: 'masukan sama, keluaran sama, di node mana pun, kapan pun'
				}
			]
		},
		scenes: {
			spec: {
				label: 'Idenya',
				beats: [
					{
						h: 'Kamu tak men-deploy. Kamu menspesifikasikan.',
						p: 'Tak ada server untuk disiapkan, tak ada image untuk didorong, tak ada pipeline yang harus dijaga tetap hijau. Sebuah service di Celaut adalah deskripsi tertulis tentang apa yang ia butuhkan untuk berjalan.'
					},
					{
						h: 'Tiga komponen. Itu saja semuanya.',
						p: '<strong>BOX</strong> menguraikan lingkungan eksekusi — arsitektur, sistem berkas, variabel lingkungan, entrypoint, konfigurasi. Ia menentukan seluruh struktur berkas secara langsung, alih-alih menunjuk ke image eksternal, dan itulah yang menjaga eksekusi tetap bisa direproduksi.'
					},
					{
						h: 'Dan bagaimana dunia menjangkaunya.',
						p: '<strong>API</strong> mendefinisikan bagaimana klien dan service lain berbicara dengannya, ditambah metode pembayaran yang diterima dan biayanya. <strong>NET</strong> menyebutkan jaringan eksternal yang akan dijangkaunya — secara bawaan sebuah service terisolasi, dan apa pun yang lebih luas dideklarasikan di dalam spesifikasinya sendiri, jadi pengguna tahu sejak awal ke mana ia bisa pergi.',
						note: 'Portabel, dapat direproduksi, bebas dependensi pihak ketiga.'
					}
				]
			},
			agnostic: {
				label: 'Keunggulan 01',
				beats: [
					{
						h: 'Apa pun yang kamu tulis, ia dikirim dengan cara yang sama.',
						p: 'Celaut tak memintamu mengadopsi framework, runtime, atau SDK. Ia meminta sebuah sistem berkas dan sebuah entrypoint.'
					},
					{
						h: 'Node pun tak peduli.',
						p: 'Service mengikuti <strong>prinsip kotak hitam</strong>: mereka beroperasi terlepas dari detail node yang menjalankannya, dan node menjalankannya tanpa perlu memahami apa yang mereka lakukan.'
					},
					{
						h: 'Jadi node kompatibel mana pun akan menerimanya.',
						p: 'BOX menyatakan mikroarsitektur yang ia tuju, jadi node tahu apakah mereka cocok. Selebihnya, <strong>service-mu bisa dijalankan siapa saja di node kompatibel mana pun</strong> — itulah seluruh kontraknya.',
						note: 'Tanpa keterikatan, karena tak ada yang bisa mengikat.'
					}
				]
			},
			distribute: {
				label: 'Keunggulan 02',
				beats: [
					{
						h: 'Serahkan ke satu node.',
						p: 'Kamu tak menerbitkan ke toko dan tak menunggu tinjauan. Pengembang hanya perlu <strong>mengirim service ke satu node atau lebih</strong>.'
					},
					{
						h: 'Jaringan membawanya dari sana.',
						p: 'Node-node itu menangani <strong>penyebaran service ke node lain</strong>. Tak ada registri service pusat — service menyebar peer-to-peer, jadi tak ada titik gagal tunggal dan tak ada penjaga gerbang yang memutuskan apakah kamu boleh masuk.'
					},
					{
						h: 'Bisa ditemukan, kalau kamu mau.',
						p: 'Node juga bisa <strong>mengunggah service ke sistem reputasi</strong>, agar pengguna dan service lain bisa menilai apakah dan kapan memakainya. Service bisa dideklarasikan di registri blockchain — seperti <strong>Sigma Reputation System</strong> di Ergo — untuk meningkatkan visibilitas dan kepercayaan.',
						note: 'Tak ada yang perlu didaftari. Tak ada yang mengambil potongan.'
					}
				]
			},
			compose: {
				label: 'Keunggulan 03',
				beats: [
					{
						h: 'Service yang memanggil service.',
						p: 'Sebuah service bisa meminta eksekusi service lain — <strong>service anaknya</strong> — lewat node yang menjalankannya. Alur kerja rumit dibangun lewat komposisi, bukan lewat konfigurasi orkestrasi.'
					},
					{
						h: 'Node memutuskan di mana mereka mendarat.',
						p: 'Node mengelola instans service dan memutuskan apakah menjalankannya secara lokal atau menyebar bebannya ke rekan-rekannya. Dependensi adalah urusan node — ia memastikan service bisa menjangkau apa yang dibutuhkan di seluruh jaringan.'
					},
					{
						h: 'Dan kamu tak pernah tahu di mana.',
						p: '<strong>Service induk tidak tahu di mana dependensinya dijalankan.</strong> Tiap anak hanya menyatakan sumber daya yang ia butuhkan. Kamu menulis komposisinya; jaringan yang memecahkan penempatannya.',
						note: 'Tak ada penjadwal untuk dikonfigurasi. Tak ada topologi untuk dirawat.'
					}
				]
			}
		},
		payoff: {
			heading: 'Apa yang diberikan arsitektur ini padamu',
			items: [
				{
					title: 'Spesifikasikan, jangan deploy',
					body: 'Sebuah service adalah BOX (arsitektur, sistem berkas, lingkungan, entrypoint, konfigurasi), sebuah API, dan cakupan NET. Tuliskan itu dan kamu selesai — tak ada langkah deployment yang harus kamu urus.'
				},
				{
					title: 'Mandiri sejak konstruksi',
					body: 'BOX menguraikan seluruh struktur berkas yang dibutuhkan service, alih-alih menunjuk ke image atau repositori eksternal. Tak ada registri pihak ketiga yang bisa lenyap di bawahmu.'
				},
				{
					title: 'Kotak hitam, memang disengaja',
					body: 'Service beroperasi terlepas dari node yang menjalankannya. Kamu tak pernah menulis untuk lingkungan sebuah node, karena kamu tak pernah diberi tahu lingkungannya seperti apa.'
				},
				{
					title: 'Dapat direproduksi, bukan sekadar &ldquo;semampunya&rdquo;',
					body: 'Dengan masukan yang sama, sebuah service selalu menghasilkan keluaran yang sama, terlepas dari di mana atau kapan ia berjalan. Di sini determinisme adalah sifat arsitektural, bukan janji penyedia.'
				},
				{
					title: 'Komposisi tanpa orkestrasi',
					body: 'Sebuah service bisa meminta eksekusi service anak lewat node-nya. Induknya tak tahu di mana mereka berjalan; masing-masing hanya menyatakan sumber daya yang dibutuhkan.'
				},
				{
					title: 'Reputasi yang bisa kamu kumpulkan',
					body: 'Karena sebuah service bersifat deterministik dan terisolasi secara bawaan, bukti reputasi yang dicatat beberapa waktu lalu masih mengatakan sesuatu yang benar tentangnya hari ini.'
				}
			]
		},
		steps: {
			heading: 'Dari kode sampai berjalan di jaringan',
			items: [
				{
					title: 'Tulis service-nya',
					body: 'Bahasa apa pun, tumpukan apa pun. Yang penting adalah sistem berkas yang ia butuhkan dan perintah yang menjalankannya — bukan framework yang kamu pilih.'
				},
				{
					title: 'Tentukan BOX, API, dan NET',
					body: 'Deklarasikan lingkungannya, bagaimana pemanggil berbicara dengan service, dan akses jaringan eksternal apa (kalau ada) yang boleh ia minta.'
				},
				{
					title: 'Kirim ke sebuah node',
					body: 'Satu node sudah cukup. Ia menyebarkan service ke node lain dan bisa menerbitkannya ke sistem reputasi agar pengguna dan service lain bisa menemukannya.'
				},
				{
					title: 'Biarkan jaringan menjalankannya',
					body: 'Node menegosiasikan biaya dan memutuskan di mana tiap instans dijalankan. Kamu tak ada dalam lingkaran itu, dan tak punya infrastruktur untuk dijaga tetap hidup.'
				}
			]
		},
		tradeoffs: {
			heading: 'Pertukaran yang sebenarnya kamu lakukan',
			intro: 'Hari ini, mengirim perangkat lunak berarti memilih antara menampungnya sendiri atau meminta orang menjalankannya sendiri. Kedua pilihan itu ada harganya. Klaim Celaut sempit dan spesifik: ia mengambil kelebihan keduanya tanpa kekurangannya — dengan harga kendalimu atas service yang sedang berjalan.',
			items: [
				{
					label: 'Layanan web yang ditampung sendiri',
					good: 'Pengguna tak butuh infrastruktur dan tak perlu konfigurasi.',
					bad: 'Kamu tak bisa membuktikan bahwa sistemnya tak berubah, dan pengguna harus percaya begitu saja bahwa data permintaan mereka tak disalahgunakan.'
				},
				{
					label: 'Kode sumber yang mereka jalankan sendiri',
					good: 'Deterministik — setelah diunduh, kamu tak bisa mengubahnya di bawah mereka — dan data permintaan mereka tak pernah sampai kepadamu.',
					bad: 'Mereka butuh perangkat keras yang mumpuni dan harus bertahan melewati konfigurasinya, dan di situlah kebanyakan orang menyerah.'
				},
				{
					label: 'Sebuah service Celaut',
					good: 'Tak ada infrastruktur untuk dikelola dan tak ada yang perlu dikonfigurasi, karena spesifikasinya sudah mencakup kontainer, arsitektur, kebutuhan jaringan, dan antarmukanya.',
					bad: 'Kamu melepas kendali: kamu tak bisa mengubah, mencekik, atau menarik data dari sebuah service begitu ia sudah beredar. Justru itulah intinya.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Sisa jaringannya',
			intro: 'Service-mu butuh tempat untuk berjalan dan seseorang untuk dilayani. Keduanya juga manusia.',
			items: [
				{
					title: 'Pengelola node',
					body: 'Mereka menyediakan perangkat keras dan menjalankan apa pun yang diminta, tanpa perlu memahami apa yang dilakukan service-mu, dengan imbalan bayaran.',
					link: 'Sewakan PC-mu →'
				},
				{
					title: 'Pengguna akhir',
					body: 'Mereka menjalankan service di node dan membayar sumber daya komputasi yang dipakai — dan bisa memverifikasi bahwa yang berjalan persis seperti yang diuraikan spesifikasinya.',
					link: 'Untuk pengguna akhir →'
				},
				{
					title: 'Paradigmanya',
					body: 'Arsitektur lengkapnya: node, service, spesifikasi, koordinasi lewat sistem reputasi dan pembayaran, dan mengapa semua itu perlu.',
					link: 'Baca makalahnya →'
				}
			]
		},
		cta: {
			heading: 'Mulailah dari masalahnya.',
			body: 'Unstoppable Skills adalah registri di mana masalah menjadi tokoh utamanya: cari sebuah skill, lalu temukan service yang menutupinya, tolok ukurnya, dan reputasinya. Inilah jalan terpendek dari &ldquo;apa yang harus kubangun&rdquo; ke &ldquo;siapa yang membutuhkannya&rdquo;.',
			actions: [
				'Jelajahi Skills',
				'Baca paradigmanya'
			]
		}
	},
	users: {
		meta: {
			title: 'Untuk pengguna akhir — Jalankan, bayar yang terpakai | Celaut',
			description: 'Jalankan service di node Celaut dan bayar hanya sumber daya komputasi yang dipakai. Tanpa akun, tanpa langganan, tanpa platform di tengah — service berjalan terisolasi dan deterministik, jadi kamu mendapat persis yang diuraikan spesifikasinya.'
		},
		topbarTitle: 'Untuk pengguna akhir',
		hero: {
			eyebrow: 'Pengguna service',
			title: 'Jalankan.',
			tagline: 'Bayar yang terpakai. Tak lebih.',
			lede: 'Jalankan sebuah service di node, ambil hasilnya, bayar komputasi yang ia habiskan. Tak ada akun untuk dibuat, tak ada langganan untuk dibatalkan, dan tak ada perusahaan yang duduk antara kamu dan mesin yang mengerjakannya.',
			actions: [
				'Jelajahi Skills',
				'Lihat cara kerjanya'
			],
			stats: [
				{
					value: 'Tanpa akun',
					label: 'tak ada yang perlu didaftari, tak ada yang bisa mengunci kamu di luar'
				},
				{
					value: 'Per eksekusi',
					label: 'kamu membayar sumber daya komputasi yang benar-benar dipakai'
				},
				{
					value: 'Terisolasi',
					label: 'service berjalan tersegel, dan tak melihat apa pun yang tak diberikan padanya'
				}
			]
		},
		scenes: {
			ask: {
				label: 'Idenya',
				beats: [
					{
						h: 'Tanyakan pada jaringan, bukan pada perusahaan.',
						p: 'Kamu ingin sesuatu dikerjakan — model dijalankan, sekuens dianalisis, bot berdagang, berkas diproses. Hari ini itu berarti memilih penyedia dan membuka akun di sana.'
					},
					{
						h: 'Node menjawab langsung.',
						p: 'Celaut <strong>tak punya registri service pusat</strong>. Service tersebar di antara node secara peer-to-peer, dan node menyatakan antarmuka yang didukung serta <strong>metode pembayaran yang diterima saat berkontak</strong> — jadi tak ada yang perlu disepakati dengan siapa pun sebelumnya.'
					},
					{
						h: 'Kamu berurusan dengan mesin yang mengerjakannya.',
						p: 'Node-mu menegosiasikan biaya eksekusi dengan sebuah rekan, lalu pekerjaannya berjalan. Tak ada <strong>platform di tengah</strong> yang mengambil potongan, menetapkan aturan, atau bisa mengeluarkanmu dari jaringan yang tak pernah kamu masuki.',
						note: 'Tanpa pendaftaran. Tanpa langganan. Tanpa perantara.'
					}
				]
			},
			proof: {
				label: 'Keunggulan 01',
				beats: [
					{
						h: 'Bagaimana kamu tahu apa yang sebenarnya berjalan?',
						p: 'Dengan layanan yang ditampung pihak lain, kamu tak bisa tahu. Operatornya tak bisa membuktikan sistemnya tak berubah — jadi ketika sebuah alat jadi populer, tak ada yang menghalangi performanya diam-diam menurun untuk mendorongmu ke yang lebih baru.'
					},
					{
						h: 'Di sini, service <em>adalah</em> spesifikasinya.',
						p: 'Sebuah service menentukan seluruh lingkungannya — arsitektur, sistem berkas, entrypoint, konfigurasi. Ubah salah satunya dan ia jadi <strong>service yang berbeda</strong>, bukan pembaruan diam-diam atas yang tadinya kamu pakai.'
					},
					{
						h: 'Jadi hasilnya bisa direproduksi.',
						p: 'Dengan masukan yang sama, sebuah service <strong>selalu menghasilkan keluaran yang sama</strong>, terlepas dari node mana yang menjalankannya atau kapan. Itulah yang membuat catatan reputasi dari berbulan-bulan lalu masih berharga hari ini.',
						note: 'Determinisme adalah jaminannya. Bukan janji — tapi rancangannya.'
					}
				]
			},
			sealed: {
				label: 'Keunggulan 02',
				beats: [
					{
						h: 'Permintaanmu bukan urusan siapa pun.',
						p: 'Saat kamu mengirim beban kerja ke suatu tempat, pertanyaan jujurnya adalah siapa lagi yang bisa melihatnya di sepanjang jalan.'
					},
					{
						h: 'Setiap eksekusi terisolasi.',
						p: 'Node menjalankan service sebagai <strong>instans terisolasi</strong> — sebuah kontainer atau mesin virtual. Secara bawaan sebuah service terputus sepenuhnya dari jaringan eksternal, hanya bisa bicara dengan induknya, anak-anaknya, dan node yang menjalankannya.'
					},
					{
						h: 'Dan pengembangnya tak ada di ujung sana.',
						p: '<strong>Pengembang service tak bisa mengendalikan, mengubah, atau menarik data dari sebuah service</strong>, karena mereka tak menguasai node yang menyebarkan dan menjalankannya. Akses jaringan yang lebih luas harus dideklarasikan dalam spesifikasinya, secara terbuka, sebelum kamu pernah menjalankannya.',
						note: 'Terisolasi secara bawaan. Akses diminta, tak pernah diasumsikan.'
					}
				]
			},
			pay: {
				label: 'Keunggulan 03',
				beats: [
					{
						h: 'Kamu membayar sebelum ia berjalan. Titik.',
						p: 'Pengguna menjalankan service di node dan <strong>membayar di muka untuk sebuah janji sumber daya</strong>. Itulah seluruh hubungan komersialnya.'
					},
					{
						h: 'Tak ada yang menumpuk saat kamu menganggur.',
						p: 'Tak ada kursi, tak ada tingkatan, dan tak ada batas bawah bulanan. Pembayaran ditarik <strong>lebih dulu</strong> sebagai imbalan atas sumber daya yang akan dikonsumsi; bukti pembayaran membuka akses. Jaminan node adalah reputasinya, bukan tagihan di akhir.'
					},
					{
						h: 'Dihargai oleh pasar, bukan oleh halaman harga.',
						p: 'Node menetapkan biayanya sendiri dan bersaing di sana, dan <strong>service punya biaya marjinal nol</strong> — biaya menjalankan satu instans ditanggung node — sehingga banyak yang mulai gratis untuk membangun reputasi. Sistem pembayaran berada di luar arsitektur inti, jadi ledger mana yang menyelesaikannya pun tak dipatok.',
						note: 'Bayar per eksekusi. Pergi kapan saja. Tak ada yang perlu dibatalkan.'
					}
				]
			}
		},
		payoff: {
			heading: 'Apa yang benar-benar kamu dapat',
			items: [
				{
					title: 'Tak ada infrastruktur untuk dikelola',
					body: 'Node yang mengurusnya. Tak ada penyedia cloud untuk dipilih, tak ada mesin untuk dijaga tetap hidup, dan tak ada yang perlu terus berjalan di antara pemakaian.'
				},
				{
					title: 'Tanpa konfigurasi',
					body: 'Spesifikasi service sudah mencakup bagaimana kontainernya dibangun, arsitektur yang dibutuhkannya, kebutuhan jaringannya, dan antarmukanya. Tak satu pun dari itu urusanmu.'
				},
				{
					title: 'Pengembangnya tak punya jangkauan',
					body: 'Pengembang service tak bisa mengendalikan, mengubah, atau menarik data dari sebuah service — mereka tak menguasai node yang menyebarkan dan menjalankannya.'
				},
				{
					title: 'Ia tak bisa berubah di bawahmu',
					body: 'Sebuah service bersifat deterministik: masukan yang sama menghasilkan keluaran yang sama, kapan pun dan di mana pun ia berjalan. Tak ada yang bisa diam-diam memburukkannya untuk mendorongmu ke yang lebih baru.'
				},
				{
					title: 'Dinilai oleh reputasi, bukan peringkat',
					body: 'Reputasi hidup sebagai catatan di sebuah ledger, dan tiap peserta menimbang sumber yang ia percayai. Tak ada halaman depan redaksional yang memutuskan apa yang kamu lihat.'
				},
				{
					title: 'Tak ada tempat untuk mendepakmu',
					body: 'Penemuan berlangsung peer-to-peer tanpa registri pusat, jadi tak ada akun untuk ditangguhkan dan tak ada entri untuk ditarik.'
				}
			]
		},
		steps: {
			heading: 'Dari “aku butuh ini” sampai jadi hasil',
			items: [
				{
					title: 'Temukan service-nya',
					body: 'Cari berdasarkan masalah yang ingin kamu pecahkan. Node menemukan service secara peer-to-peer, dan registri seperti Unstoppable Skills memetakan masalah ke service yang menutupinya.'
				},
				{
					title: 'Minta sebuah eksekusi',
					body: 'Node-mu berbicara langsung dengan rekan yang bisa menjalankannya. Antarmuka dan metode pembayaran yang diterima dinyatakan saat berkontak, jadi tak ada yang perlu disepakati sebelumnya.'
				},
				{
					title: 'Ia berjalan, tersegel',
					body: 'Node menjalankan service sebagai instans terisolasi — sebuah kontainer atau mesin virtual — tanpa akses melebihi yang diminta spesifikasinya.'
				},
				{
					title: 'Bayar di muka',
					body: 'Sebuah node dibayar lebih dulu untuk sebuah janji sumber daya, dengan bukti pembayaran yang membuka akses. Reputasi adalah jaminannya. Tanpa langganan, tanpa minimum, tanpa tagihan berjalan.'
				}
			]
		},
		tradeoffs: {
			heading: 'Dibandingkan dua pilihan yang kamu punya hari ini',
			intro: 'Ambil bot trading sebagai contoh. Saat ini kamu entah menyerahkan portofoliomu ke sebuah layanan web, atau mencari kode sumbernya dan menjalankannya sendiri. Tiap pilihan memberimu satu hal dan mengambil hal lain.',
			items: [
				{
					label: 'Pakai layanan web',
					good: 'Kamu tak menjalankan infrastruktur dan tak mengonfigurasi apa pun.',
					bad: 'Kamu tak bisa menyematkan reputasi padanya, karena operatornya tak bisa membuktikan sistemnya tak berubah — dan tak bisa menjaminmu bahwa data permintaanmu tak disalahgunakan.'
				},
				{
					label: 'Jalankan kode sumbernya sendiri',
					good: 'Ia deterministik, dan pengembangnya tak punya kendali atas data permintaanmu.',
					bad: 'Kamu butuh perangkat keras yang mampu menjalankannya, dan harus berurusan dengan konfigurasinya — yang biasanya jadi titik orang menyerah dan kembali ke pilihan pertama.'
				},
				{
					label: 'Pakai service Celaut',
					good: 'Tanpa infrastruktur, tanpa konfigurasi, dan pengembangnya tetap tak bisa mengendalikan, mengubah, atau menarik data dari service itu.',
					bad: 'Kamu membayar per eksekusi, dan kamu bergantung pada adanya node di jaringan yang mau menjalankannya di harga yang kamu terima.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Orang-orang lain di jaringan',
			intro: 'Seseorang menulis service-nya dan mesin seseorang menjalankannya. Kedua peran itu juga terbuka untukmu.',
			items: [
				{
					title: 'Pengelola node',
					body: 'Mereka menyediakan perangkat keras yang menjalankan apa yang kamu minta, dengan imbalan bayaran — tanpa perlu tahu apa yang dilakukan service itu.',
					link: 'Punya perangkat keras nganggur? →'
				},
				{
					title: 'Pengembang service',
					body: 'Mereka menulis service yang bisa dijalankan node kompatibel mana pun, dan menyerahkannya ke jaringan alih-alih menampungnya sendiri.',
					link: 'Untuk pengembang →'
				},
				{
					title: 'Paradigmanya',
					body: 'Node, service, spesifikasi, serta sistem reputasi dan pembayaran yang membuat pihak-pihak yang tak saling percaya tetap bisa bekerja sama.',
					link: 'Baca makalahnya →'
				}
			]
		},
		cta: {
			heading: 'Mulailah dari masalah yang kamu punya.',
			body: 'Unstoppable Skills adalah registri tanpa server yang sepenuhnya on-chain, di mana masalah itu sendiri yang jadi tokoh utamanya. Cari sebuah skill lalu temukan service yang menutupinya, tolok ukur pembanding yang nyata, diskusi, dan peringkat berbasis reputasi.',
			actions: [
				'Jelajahi Skills',
				'Sewakan PC-mu saja'
			]
		}
	},
	install: {
		meta: {
			title: 'Pasang Nodo — Celaut',
			description: 'Pasang node Celaut (nodo) di Linux, Windows, atau macOS.'
		},
		topbarTitle: 'Pasang nodo',
		heading: 'Jalankan node Celaut',
		subtitle: 'Pasang <strong>nodo</strong> dan bergabunglah ke jaringan terdesentralisasi — temukan rekan, jalankan dan orkestrasikan service, dan ubah mesinmu jadi komputasi bersama yang tahan sensor.',
		tabs: {
			linux: 'Linux',
			windows: 'Windows',
			mac: 'macOS'
		},
		copy: 'Salin',
		copied: 'Tersalin ✓',
		linux: {
			heading: 'Linux',
			intro: 'Pemasangan dasar — jalankan ini di terminalmu:',
			notes: [
				'Skripnya butuh <code>sudo</code> untuk penyiapan di tingkat sistem. Runtime Python, Java, dan <code>yq</code> dipasang secara lokal di bawah direktori utama node.',
				'Lebih suka pemasangan manual tanpa sudo? Ikuti {link}.'
			],
			manualLink: 'panduan manual'
		},
		windows: {
			heading: 'Windows 11',
			intro: 'Unduh dan jalankan installer resminya:',
			download: 'Unduh Nodo-Setup.exe',
			notes: [
				'Installer otomatis membuat distribusi Linux terisolasi khusus untuk Nodo, sehingga node berjalan terpisah dari sistemmu yang lain.',
				'Tak perlu menyiapkan lingkungan Linux secara manual.'
			]
		},
		mac: {
			heading: 'macOS',
			intro: 'Installer macOS asli <strong>belum tersedia</strong>.',
			notes: [
				'Dukungan untuk macOS sedang direncanakan. Sementara itu, kamu bisa menjalankan node di mesin Linux atau VM Linux.',
				'Ikuti {link} untuk pembaruan.'
			],
			repoLink: 'repositori nodo'
		}
	},
	paradigm: {
		meta: {
			title: 'Celaut — Makalah Formal',
			description: 'Celaut: arsitektur peer-to-peer untuk perancangan dan distribusi perangkat lunak — makalah formalnya.'
		},
		topbarTitle: 'Makalah Formal',
		toc: 'Indeks',
		tocNav: 'Daftar isi',
		systemBehaviorHeading: 'Perilaku sistem',
		executionHeading: 'Eksekusi sebuah service',
		balancerHeading: 'Penyeimbangan beban service'
	},
	viz: {
		home: {
			generation: 'generasi {n}',
			lifeRule: '2 atau 3 tetangga: hidup · tepat 3: lahir',
			oneProtocol: 'satu protokol yang harus dijalankan semua',
			networkSplits: 'ubah aturannya dan jaringan terbelah',
			whereOverlap: 'mereka bicara di mana pun mereka beririsan',
			noVote: 'tanpa voting · tanpa migrasi · tanpa fork',
			blackBox: 'kotak hitam',
			input: 'masukan',
			output: 'keluaran',
			box: 'BOX',
			environment: 'lingkungan',
			api: 'API',
			interface: 'antarmuka',
			netDeclared: 'NET · dideklarasikan di spesifikasi',
			nowhereElse: 'dan tak ke mana pun lagi',
			itsNodeItsParent: 'node-nya · induknya',
			aService: 'sebuah service',
			children: 'anak-anak',
			whatTheySpend: 'apa yang mereka belanjakan, bukan di mana mereka',
			developersShort: 'pengembang · apa yang dibutuhkan',
			developersLong: 'pengembang · apa yang dibutuhkan, apa yang dibelanjakan',
			operatorsShort: 'operator · di mana ia berjalan',
			operatorsLong: 'operator · di mana ia berjalan, berapa biayanya',
			thisNode: 'node ini',
			aPeer: 'sebuah rekan',
			cost: 'biaya {value}',
			oneInput: 'satu masukan',
			when: [
				'sekarang',
				'setahun lagi',
				'di perangkat keras lain'
			],
			identicalEveryTime: 'identik, setiap kali',
			reputationLedger: 'reputasi · catatan di ledger',
			sourcesYouTrust: 'sumber yang kamu percayai',
			firstWhatSources: 'pertama: apa kata sumberku tentangnya?',
			rightShort: '2 vCPU · 30 mnt',
			rightLong: 'hak atas 2 vCPU · 30 mnt',
			paymentRights: 'pembayaran ⇄ hak sumber daya',
			outcomeRecorded: 'hasilnya masuk ke catatannya',
			nextStranger: 'dan itulah yang dibaca orang asing berikutnya',
			requester: 'pemohon',
			node: 'node'
		},
		developers: {
			box: 'BOX',
			api: 'API',
			net: 'NET',
			service: 'service',
			anyCompatibleNode: 'node kompatibel mana pun',
			optionalRegistry: 'registri reputasi opsional',
			yourService: 'service-mu',
			itsNode: 'node-nya',
			neverFindOut: 'kamu tak pernah tahu di mana'
		},
		users: {
			you: 'kamu',
			noAccount: 'tanpa akun',
			whatYouAsked: 'yang kamu minta',
			whatNodeRuns: 'yang dijalankan node',
			identicalItRuns: 'identik — ia berjalan',
			microvm: 'microVM',
			destroyed: 'dihancurkan',
			theDeveloper: 'pengembangnya',
			theHostMachine: 'mesin host',
			computeUsed: 'komputasi yang benar-benar kamu pakai',
			whatYouPay: 'yang kamu bayar',
			chargingStops: 'pekerjaan selesai — penagihan berhenti',
			subscription: 'langganan, menagih tanpa peduli'
		},
		depin: {
			electricityCost: 'biaya listrikmu',
			priceYouSet: 'harga yang kamu tetapkan',
			availableWindow: 'tersedia 22.00 – 07.00',
			marginCovered: 'margin tertutup'
		}
	}
};
