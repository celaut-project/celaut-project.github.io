/*
 * Türkçe metin. en.js ile birebir aynı anahtar yapısı — burada eksik
 * kalan her anahtar otomatik olarak İngilizceye düşer, dolayısıyla
 * sayfa hiçbir zaman boş kalmaz.
 *
 * Çeviri ilkeleri
 * ---------------
 * • Türkçe teknik sitelerde alışıldık olan "sen" hitabı kullanılır.
 * • Paradigmaya ait terimler (BOX, API, NET, node, servis, microVM,
 *   DePIN, nodo, Ergo) olduğu gibi bırakılır: bunlar projenin söz
 *   dağarcığıdır, çevrilecek kelimeler değil.
 * • Satır içi HTML (<strong>, <em>) ve özgün metnin tipografik
 *   noktalama işaretleri korunur.
 */

export default {
	common: {
		scroll: 'Kaydır',
		toTop: '↑ Başa',
		backToTop: 'Başa dön',
		gains: 'Kazançlar',
		costs: 'Maliyetler',
		visit: 'Ziyaret et →',
		readMore: 'Devamını oku →',
		viewOnGitHub: "GitHub'da görüntüle →",
		languageLabel: 'Dil',
		switchLanguage: 'Dili değiştir',
		toc: {
			nav: 'Bölüm gezintisi',
			title: 'Bu sayfada',
			open: 'Bölüm menüsünü aç',
			close: 'Bölüm menüsünü kapat'
		}
	},
	theme: {
		toLight: 'Açık temaya geç',
		toDark: 'Koyu temaya geç',
		toggle: 'Temayı değiştir'
	},
	topbar: {
		nav: 'Celaut bölümleri',
		links: {
			depin: {
				label: "PC'ni kirala",
				short: 'PC kirala'
			},
			developers: {
				label: 'Geliştiriciler',
				short: 'Dev'
			},
			users: {
				label: 'Kullanıcılar',
				short: 'Kullanıcı'
			},
			paradigm: {
				label: 'Paradigma',
				short: 'Paradigma'
			}
		}
	},
	home: {
		hero: {
			tagline: 'Yazılım tasarımı ve dağıtımı için eşler arası bir mimari',
			primary: 'Kullanmaya başla',
			secondary: 'Daha fazlasını öğren',
			facts: [
				'Hücresel otomatlardan esinlenildi — basit yerel kurallardan doğan dayanıklı bir küresel davranış.',
				'Tasarımı gereği deterministik: aynı girdiler her zaman aynı, doğrulanabilir çıktıyı verir.',
				"Merkezi bir kayıt defteri yok. Servisler bağımsız node'lar arasında eşler arası dağılır.",
				"Her servis içerikle adreslenir — hash'i onun adıdır, dolayısıyla hiçbir şey sessizce değiştirilemez.",
				"Node'lar her servisi kendi yalıtılmış mikro ortamında mühürlü olarak çalıştırır.",
				'İtibar zincir üzerinde yaşar: güven kazanılır ve kanıtlanır, bir kapı bekçisi tarafından dağıtılmaz.',
				'Baştan sona üç ilke: merkeziyetsizlik, sadelik ve determinizm.'
			]
		},
		atoms: {
			eyebrow: 'İki temel yapı taşı',
			note: 'İki atom. Şartname, yürütme, ödeme ve itibar bu ikisinin nasıl etkileştiğidir.',
			items: [
				{
					title: 'Bir node',
					body: 'Eşleriyle konuşan ve servis yürütmesini yöneten bir <strong>bilgisayar ya da cihaz</strong>. Donanımı sağlar, işi yerelde mi çalıştıracağına yoksa devredeceğine mi karar verir ve yazılımın ne yaptığını anlamak zorunda hiç kalmaz.'
				},
				{
					title: 'Bir servis',
					body: "Tek bir işi yapmak için kurulmuş <strong>deterministik bir yazılım konteyneri</strong>. Kendisini çalıştıran node'a karşı mühürlüdür: node programın içine bakmaz, program da hangi makineye düştüğünü bilmez."
				}
			]
		},
		index: {
			sections: {
				foundations: 'Kökenler',
				atoms: "Node'lar ve servisler",
				nodes: 'Ağ',
				services: 'Servisler',
				'service-spec': 'Şartname',
				execution: 'Yürütme',
				determinism: 'Determinizm',
				coordination: 'Eşgüdüm',
				'core-principles': 'İlkeler',
				'what-is-not': 'Ne değildir',
				implementations: 'Uygulamalar',
				applications: 'Kullanım alanları',
				'user-roles': 'Sen hangisisin?'
			}
		},
		scenes: {
			foundations: {
				label: 'Nereden geliyor',
				beats: [
					{
						h: 'Her şey bir avuç kuralla başlıyor.',
						p: "1940'larda <strong>John von Neumann</strong> ile <strong>Stanislaw Ulam</strong> hücresel otomatları ortaya attı: karmaşık davranışların basit olanlardan nasıl doğabileceğini gösteren modeller."
					},
					{
						h: 'Bunu yöneten kimse yok.',
						p: "1970'te <strong>John Horton Conway'in &ldquo;Yaşam Oyunu&rdquo;</strong> klasik örnek oldu: her hücrenin yalnızca komşularına baktığı bir ızgara, buna rağmen bütünün ürettiği şey karmaşık ve sürekli evrilen bir yapı."
					},
					{
						h: 'Tasarım felsefesinin tamamı bu.',
						p: "Bu fikirler, merkeziyetsiz sistemlerin <strong>merkezi denetim olmadan karmaşıklığa nasıl ulaşabileceğini</strong> gösteriyor — Celaut'un arkasındaki yol gösterici felsefe. Node ve servis düzeyinde basit kurallar, üstünde uyum sağlayan bir sistem.",
						note: 'Merkeziyetsizlik · Sadelik · Determinizm'
					}
				]
			},
			nodes: {
				label: 'Ağ',
				beats: [
					{
						h: "Node'a sahip olmak fark değil.",
						p: 'Merkeziyetsiz ağların çoğunda node var ve çoğu hâlâ güçlü tek bir şeye bağımlı: <strong>herkesin çalıştırmak zorunda olduğu protokol</strong>. Makineler merkez olmasa bile kurallar merkezdedir.'
					},
					{
						h: "Celaut'ta üzerinde anlaşılacak bir protokol yok.",
						p: "Node'ların bir iletişim protokolünde önceden uzlaşması gerekmez — temas anında <strong>destekledikleri arayüzleri ve kabul ettikleri ödeme yöntemlerini beyan ederler</strong>. İki node ortak neyi varsa onun üzerine konuşur; örtüşmedikleri yerde ise basitçe konuşmazlar."
					},
					{
						h: "Yani ağı değil, kendi node'unu değiştirirsin.",
						p: "Yeni bir fiyat politikası, başka bir ödeme yöntemi, henüz kimsenin ayrıştıramadığı bir şartname biçimi — <strong>bunu kendi node'unda uygularsın</strong> ve halihazırda destekleyen herkesle çalışır. Kimse oy vermez, hiçbir şeyin göç ettirilmesi gerekmez ve <strong>atlatılması gereken bir hard fork yoktur</strong>.",
						note: 'Ortak protokol yok. Ortak sürüm yok. İzin yok.'
					}
				]
			},
			services: {
				label: 'Üzerinde ne çalışıyor',
				beats: [
					{
						h: 'Servis, mühürlü bir konteynerdir.',
						p: "Celaut'ta servisler, belirli bir görevi yerine getirmek için tasarlanmış <strong>deterministik yazılım konteynerleridir</strong>. Bundan daha karmaşık bir şey değil."
					},
					{
						h: 'Kara kutu ilkesine göre.',
						p: "Yalnızca kendi işlevlerine odaklanarak <strong>kendilerini çalıştıran node'lardan bağımsız</strong> işlerler. Node'un servisi anlamasına gerek yoktur, servisin de node hakkında bir şey bilmesine."
					},
					{
						h: 'Her seferinde, yalıtılmış olarak.',
						p: 'Her istek <strong>yalıtılmış bir süreç</strong> olarak çalışır — kendi çekirdeğine ve donanımla dayatılan bir sınıra sahip, kendine ait bir <strong>sanal makinede</strong> — bu da yürütme ortamını soyutlar ve güvenlik sınırını sağlam tutar.',
						note: 'Ne giriyor, ne çıkıyor. Arayüzün tamamı bu.'
					}
				]
			},
			'service-spec': {
				label: 'Bir servis nasıl tanımlanır',
				explore: '{what} bölümünü keşfet',
				exploreClose: 'Servisin tamamına dön',
				beats: [
					{
						h: '<strong>BOX</strong> — ortam.',
						p: "Mimari, dosya sistemi, ortam değişkenleri, giriş noktası, yapılandırma ve kaynaklar. Dış imajlara veya depolara dayanmak yerine tüm dosya yapısını doğrudan belirtir; yürütmeyi herhangi bir node'da yeniden üretilebilir kılan da budur."
					},
					{
						h: '<strong>API</strong> — arayüz.',
						p: 'Servisle nasıl iletişim kurulacağı, kabul ettiği ödeme sistemleri ve bunlara bağlı maliyetler. Bu sayede servisler, adlarına protokol pazarlığı yapan merkezi bir denetleyici olmadan kullanılabilir.'
					},
					{
						h: '<strong>NET</strong> — ağ kapsamı.',
						p: "Varsayılan olarak bir servis <strong>yalıtılmıştır</strong>: yalnızca ebeveyniyle, çocuklarıyla ve kendisini çalıştıran node'la konuşabilir. Dış dünyaya ihtiyaç duyarsa <strong>ulaşacağı ağlar kendi şartnamesinde adlarıyla belirtilir</strong> — node bunlara izin verir, çünkü servisi düzgün çalıştırmak ister; sen de başka hiçbir yere ulaşamayacağı güvencesini alırsın."
					},
					{
						h: 'Üç bileşen. Tek bir taşınabilir servis.',
						p: 'Birlikte <strong>taşınabilir, yeniden üretilebilir servisler</strong> oluştururlar; güvenliği ve determinizmi korurken ağ boyunca tutarlı biçimde dağıtılırlar.',
						note: 'Üçüncü taraf bağımlılığı yok. Örtük bırakılan hiçbir şey yok.'
					}
				]
			},
			execution: {
				label: 'Neye kim karar veriyor',
				beats: [
					{
						h: 'Bir servis çocuklarını ister.',
						p: "Bir servis, node'u aracılığıyla <strong>çocuk servislerin</strong> yürütülmesini isteyebilir. <strong>Her birinin ihtiyaç duyduğu kaynakları</strong> belirtir ve harcamaları için bir bütçe devreder. Bir makine değil, bir bölge değil — kaynaklar."
					},
					{
						h: 'Nerede çalışacaklarına node karar verir.',
						p: 'Örneği <strong>yerelde çalıştırmanın maliyetiyle her bir eşin verdiği fiyatı</strong> karşılaştırır ve en iyi bulduğunu seçer. Bir çocuk burada kalır; bir diğeri bir eşe düşer.'
					},
					{
						h: 'Ebeveyn bunu asla öğrenmez.',
						p: 'Bir çocuğun bu makinede mi yoksa başka bir yerde mi son bulduğunu bilmez, bilmesine de gerek yoktur. İzlediği tek şey, dengeyi kurabilmek için <strong>çocuklarının ne tükettiği ve ne hızla harcadığıdır</strong>.'
					},
					{
						h: 'Bütün numara bu ayrımda.',
						p: 'Node işletmecileri fiziksel tarafla ilgilenir: donanım, kapasite, fiyat, yerleşim. Servis geliştiricileri ise <strong>ihtiyaç duydukları kaynakları beyan eder ve altyapı hakkında hiçbir şey söylemez</strong>. Kimsenin ötekinin işini yapması gerekmez — iki yarıyı da sade tutan tam olarak budur.',
						note: 'İki ayrı mesele. Aralarında tek bir temiz çizgi.'
					}
				]
			},
			determinism: {
				label: 'Neden ayakta kalıyor',
				beats: [
					{
						h: 'Aynı girdi. Aynı çıktı.',
						p: "Servisler, zaman ve node'lar boyunca <strong>yeniden üretilebilir sonuçları</strong> hedefleyecek şekilde tam olarak tanımlanır. Aynı girdiler verildiğinde, aynı şartnamenin nerede ya da ne zaman çalıştığından bağımsız olarak aynı çıktıları üretmesi beklenir."
					},
					{
						h: 'Her durumda bir garanti değil.',
						p: 'Bir ağa uzanan servis kusursuz biçimde yeniden üretilebilir olamaz — ağ her seferinde başka yanıt verir. Ama bir <strong>şartname bir Docker tanımından çok daha fazlasını taşır</strong>: mimariyi, dosya sisteminin tamamını, giriş noktasını, yapılandırmayı. Yani bu, bir imaj çekip en iyisini ummaktan çok, sıradan bir programı çalıştırmaya yakındır.'
					},
					{
						h: 'Bu da güveni ölçülebilir kılar.',
						p: 'Yazılım kayamayacağı için, <strong>bir süre önce kaydedilmiş bir itibar kanıtı bugün de doğru bir şey söyler</strong> — yeter ki servis bir ağa uzanmasın, ki varsayılan hâli zaten budur.'
					},
					{
						h: 'Üstelik bu özellik onunla birlikte gezer.',
						p: "Ortamla ilgili hiçbir şey ev sahibine bırakılmadığı için, aynı şartname <strong>bir dizüstünde, boştaki bir sunucuda ya da adını hiç duymadığın bir node'da</strong> aynı davranışı üretir. Nerede çalıştığı artık cevabın parçası olmaktan çıkar.",
						note: 'Tam olarak tanımlı, yani makineye bırakılan bir şey yok.'
					}
				]
			},
			coordination: {
				label: 'Yabancılar nasıl işbirliği yapar',
				more: 'Güven modelinin tamamı →',
				beats: [
					{
						h: 'Önce itibar gelir.',
						p: "<strong>Taraflar arasında güven asla varsayılmaz.</strong> Node'lar başka node'lara güvenmez; sen ne bir servise ne de onu çalıştıran node'a baştan güvenirsin; bir node da çalıştırdığı servise güvenmek zorunda değildir. Tutan tek yön bunun tersidir: bir servis kendi node'una güvenebilir, çünkü onu çalıştırmaya karar veren taraf o node'u seçmiştir. Dolayısıyla hiçbir şey el sıkışmayla başlamaz; bir sorgulamayla başlar: itibar, <strong>defterlerdeki kayıtlardır</strong>, hüküm değil görüş; her aktör bunları zaten güvendiği kaynaklara göre tartar."
					},
					{
						h: 'Sonra bir kaynak vaadi için ödeme yaparsın.',
						p: 'Ancak kayıt sınavı geçtikten sonra bir şey kımıldar. İsteyen taraf <strong>peşin</strong> öder ve satın aldığı şey bir vaattir: <strong>şu kadar işlem gücü, şu kadar süre</strong>. Ödeme mekanizmaları <strong>çekirdek mimarinin dışında</strong> durur, dolayısıyla içine belirli bir defter gömülü değildir.'
					},
					{
						h: "Node'un güvencesi kendi itibarıdır.",
						p: 'Bu vaadi yerine getirmeye onu zorlayan bir şey yok. Onu tutan şey, <strong>sonucun deftere geri yazılmasıdır</strong> — kaydı, ödemeyi alıp eksik teslim ettiğini söyleyen bir node artık seçilmez olur. Her iki tarafın da, bir sonraki yabancının okuduğundan hoşnut kalmasında kalıcı bir çıkarı vardır.',
						note: 'Kontrol et · öde · teslim et · kaydet. Sonra bir tur daha.'
					}
				]
			},
			'core-principles': {
				label: 'Bağlı kaldığı kurallar',
				beats: [
					{
						h: 'Bunların hiçbiri bir özellik listesi değildi.',
						p: 'Üzerinde anlaşılacak protokolü olmayan bir ağ, kendisini çalıştıran makinelere karşı mühürlenmiş servisler, önceden bildirilen ağlar, yürütmeden önce yapılan ödeme — bunların her biri birer <strong>sonuç</strong>. Üç taahhüt bunları üretiyor ve üçü birbirini ayakta tutuyor.'
					},
					{
						h: 'Merkeziyetsizlik.',
						p: 'Tek bir <strong>denetim ya da arıza noktası</strong> yok. Düğümler, izin isteyeceği hiçbir aracı olmadan dinamik biçimde iletişim kurar ve eşgüdüm sağlar — zaten üzerinde anlaşılacak bir protokolün en baştan bulunmamasının nedeni bu.'
					},
					{
						h: 'Yalınlık.',
						p: 'Karmaşıklığı azaltan <strong>asgari kurallar</strong>; böylece her bileşen tek başına anlaşılıp bakımı yapılabilecek kadar küçük kalır. Bir servis bir kapsayıcı, bir arayüz ve bir ağ kapsamıdır; hepsi bu.'
					},
					{
						h: 'Belirlenimcilik.',
						p: 'Servisler, zamana ve makineye bağlı kalmadan <strong>sonuçlarını yeniden üretebilecek</strong> kadar eksiksiz tanımlanır. Aynı girdi, aynı çıktı; nerede ve ne zaman çalışırsa çalışsın. Bir yıl önce kaydedilmiş bir itibarın bugün hâlâ okunmaya değer olmasının nedeni budur.',
						note: 'Üçünden birini çıkarın, kalan ikisinin kıymeti neredeyse kalmaz.'
					}
				]
			}
		},
		roles: {
			eyebrow: 'Giriş yolunu seç',
			heading: 'Sen hangisisin?',
			intro: 'Kullanıcılar olarak ekosistemde üç tür rol üstlenebiliriz. Her birinin kendi giriş kapısı var.',
			items: [
				{
					eyebrow: 'Rol 01',
					title: 'Node işletmecileri',
					lede: 'Blok zinciri sistemlerindeki madencilere benzer biçimde, node işletmecileri ağa hesaplama kaynağı sağlar. Kullanıcıların istediği servisleri ücret karşılığında çalıştırırlar; bu servislerin belirli işlevini anlamalarına gerek yoktur.',
					points: [
						'Donanım kaynağı sağlamak',
						'İstek üzerine servis çalıştırmak',
						'Kaynaklar karşılığında ödeme almak'
					],
					primary: "PC'ni kirala",
					secondary: 'Node çalıştır'
				},
				{
					eyebrow: 'Rol 02',
					title: 'Servis geliştiricileri',
					lede: "Geliştiriciler, ağdaki uyumlu herhangi bir node'da çalışabilen servisler üretir. Altyapı ayrıntılarıyla uğraşmadan işlevsellik kurmaya odaklanırlar.",
					points: [
						'Servis şartnameleri tasarlamak',
						'Deterministik uygulamalar kurmak',
						"Servisleri node'lara dağıtmak"
					],
					primary: 'Celaut üzerinde geliştir',
					secondary: "Skills'i keşfet"
				},
				{
					eyebrow: 'Rol 03',
					title: 'Servis kullanıcıları',
					lede: "Son kullanıcılar node'larda servis başlatır ve kullanılan hesaplama kaynakları için ödeme yapar.",
					points: [
						'Servis yürütmesi istemek',
						'Hesaplama kaynakları için ödeme yapmak',
						'Servis çıktılarını kullanmak'
					],
					primary: 'Ağı kullan',
					secondary: "Skills'i keşfet"
				}
			]
		},
		principles: {
			items: [
				{
					title: 'Merkeziyetsizlik'
				},
				{
					title: 'Sadelik'
				},
				{
					title: 'Determinizm'
				}
			]
		},
		whatIsNot: {
			eyebrow: 'Yaygın yanlış okumalar',
			heading: 'Celaut ne değildir',
			intro: 'Bu mimari, tanıdık birkaç şeye onlarla karıştırılacak kadar yakın duruyor. Farklar konusunda net olmakta fayda var.',
			items: [
				{
					title: 'Tek bir ağ değil',
					body: 'Celaut, önceden belirlenmiş tek bir ağ değil <strong>esnek bir mimari</strong> tanımlar. Baskın ağlar pekâlâ ortaya çıkabilir, ama sistem tek bir kurguyu dayatmak yerine pek çok eşler arası yapıyı destekler.'
				},
				{
					title: 'Eksiksiz bir protokol yığını değil',
					body: 'Hesaplama dağıtım yığınları kurmak için <strong>temel ilkeler</strong> sunar, her şeye karar vermiş eksiksiz bir yığın değil. Mevcut uygulamalar gRPC ya da Ergo gibi bileşenlere yaslanıyor ve bunlar değiştirilebilir tercihler.'
				},
				{
					title: 'Bir blok zinciri projesi değil',
					body: "Celaut'un <strong>kendi kripto parası yok</strong> ve DAO'ları da yok. Blok zinciri teknolojilerini hak ettikleri yerlerde kullanıyor — itibarı kaydetmek, yabancılar arasındaki ödemeyi sonuçlandırmak — ama çevrelerindeki geniş ekosistemi benimsemeden."
				}
			]
		},
		implementations: {
			eyebrow: 'Yazılım',
			heading: 'Bugün ne var',
			intro: 'Mimari bir şartname; isteyen herkes ona uygun bir düğüm geliştirebilir. Ağı bugün fiilen çalıştıran bir uygulama var; ikincisi ise duyurulmuş bir yön ve öyle işaretlenmiş durumda.',
			items: [
				{
					name: 'Nodo',
					stage: 'Çalışıyor',
					body: "Python3 ve Rust ile yazılmış referans uygulama. Servisleri çalıştırır, eşlerle maliyet pazarlığı yapar, adres ve jeton sağlar, bağımlılıkları nerede çalışırlarsa çalışsınlar çözer. Linux'ta tek komutla, Windows 11'de ise kendi yalıtılmış Linux ortamını kuran resmî bir yükleyiciyle kurulur."
				},
				{
					name: 'Chatui',
					stage: 'Kavram',
					body: 'Başka hiçbir düğüme güvenmeden, sade bir sohbet arayüzü üzerinden servislere ulaşan bir Android düğümü yapma niyetinin beyanı. Depo şu an yalnızca bu açıklamayı barındırıyor — çalıştırılacak bir kod henüz yok.'
				}
			],
			note: 'Burada hiçbir şey, başka bir yerde zaten çalışan bir şeyin yerini geçici olarak tutmuyor. Çalışan çalışır; çalışmayan da bunu söyler.'
		},
		applications: {
			eyebrow: 'Zaten çalıştığı yerler',
			heading: 'Gerçek dünyadaki etki ve kullanım alanları',
			intro: 'Bu mimari bir düşünce deneyi değil. İki farklı mesafede kullanılıyor — katmanın kendisi olarak ve var olmak için kendi gerekçesi olan bir şeyin temeli olarak.',
			layerHeading: 'Açılmış hâliyle mimari',
			layerTag: 'Katmanın kendisi',
			layerIntro: "İkisi de Celaut üzerine kurulmuş birer uygulama değil. Düğümler gerçekten çalışmaya başladığında Celaut'un <strong>kendisi</strong> bunlardır.",
			layer: [
				{
					name: 'DePIN',
					body: 'İsteyen herkes bir Celaut düğümü çalıştırıp merkeziyetsiz fiziksel altyapı ağının parçası olabilir. Her düğüm eşleri bulur, servisleri çalıştırıp düzenler ve bağımlılıklarını yönetir — sıradan bilgisayarları paylaşılan, sansüre dirençli işlem gücüne dönüştürür. Bu, ağın üzerindeki bir ürün değil, ağın kendisidir.'
				},
				{
					name: 'Unstoppable Skills',
					body: 'Baş rolde problemlerin olduğu, tamamen zincir üstünde ve sunucusuz bir kayıt defteri. Ajanlar servis aramak yerine bir beceri arar ve o beceriyi karşılayan servisleri, gerçek kıyaslamalar ve itibara dayalı sıralamayla bulur. Paradigmanın itibar katmanına pratikte böyle ulaşılır — Ergo üzerinde ve gerçek bir riskle: kimse itibarını tehlikeye atmadan ortalığı doldurmaz.'
				}
			],
			builtOnHeading: 'Üzerine inşa edilenler',
			builtOnTag: 'Bağımsız proje',
			builtOnIntro: 'Bir adım daha dışarıda: kendi amacı ve kendi kullanıcıları olan, tesadüfen Celaut servislerinden kurulmuş bir ürün. Başka bir şeyin üzerine yeniden yapılsa da anlamlı kalırdı — onu bir kanıt hâline getiren de tam olarak bu.',
			builtOn: {
				name: 'Game of Prompts',
				body: [
					'Yaratıcıların, oynayan robotları değerlendiren <strong>oyun servisleri</strong> tasarladığı, oyuncuların ise puanlarını en üst düzeye çıkarmaya çalışan <strong>çözücü servisler</strong> yazdığı rekabetçi bir platform.',
					'Servisler Celaut paradigmasını izler ve sistemin tamamı sonuçları kaydetmek ile ödülleri aktarmak için Ergo blok zincirini kullanır.'
				]
			},
			ergoDocs: 'Ergo belgeleri',
			formalPaper: 'Resmi makale'
		}
	},
	depin: {
		meta: {
			title: "PC'ni kirala — Celaut DePIN",
			description: "Kullanmadığın zamanlarda bilgisayarının kaynaklarını sat. Celaut'un DePIN katmanı tamamen eşler arasıdır, hesaplama gücünü elektrik maliyetine göre fiyatlandırmana izin verir ve her iş yükünü bir microVM içinde yalıtır."
		},
		topbarTitle: "PC'ni kirala",
		index: {
			sections: {
				rent: 'Fikir',
				p2p: 'Uçtan uca',
				electricity: 'Elektrik faturan',
				isolation: 'Yalıtım',
				payoff: 'Eline ne geçer',
				responsibilities: 'Düğüm ne yapar',
				steps: 'Kurulumdan gelire',
				roles: 'Öbür taraf',
				cta: 'Başla'
			}
		},
		hero: {
			eyebrow: 'Celaut DePIN',
			title: "PC'ni kirala.",
			tagline: 'Kullanmadığın zamanlarda bilgisayarının kaynaklarını sat.',
			lede: 'Makinen günün büyük bölümünde boş duruyor. Celaut, o kullanılmayan kapasiteyi insanların para ödediği bir şeye çeviriyor — doğrudan, senin şartlarınla ve her iş yükü sisteminden mühürlü biçimde ayrılmış olarak.',
			actions: [
				"PC'ni kiralamaya başla",
				'Nasıl çalıştığını gör'
			],
			stats: [
				{
					value: '%100',
					label: 'eşler arası — arada şirket yok'
				},
				{
					value: 'Sen',
					label: 'fiyatı belirlersin, elektrik faturanı da hesaba katarak'
				},
				{
					value: 'microVM',
					label: 'barındırdığın her iş yükü için yalıtım'
				}
			]
		},
		scenes: {
			rent: {
				label: 'Fikir',
				beats: [
					{
						h: "PC'n şu anda boşta.",
						p: 'Kişisel makinelerin çoğu her günün büyük bölümünde kullanılmadan duruyor. Bu gerçek donanım — çekirdekler, bellek, disk — hem de hiçbir şey yapmadan.'
					},
					{
						h: 'Kullanmadığını sat.',
						p: 'Celaut makineni <strong>kiralayabileceğin kapasiteye</strong> böler. Ne kadarının ağa gideceğine, ne kadarının sende kalacağına sen karar verirsin — makinenin geri kalanı her zamanki gibi çalışmaya devam eder.'
					},
					{
						h: 'Yaptığı iş için ödeme al.',
						p: "Hesaplama gücüne ihtiyacı olan eşler node'unu bulur, doğrudan onunla fiyatta anlaşır ve yürütme başına öder. Her iş tamamlandıkça <strong>ödeme Ergo üzerinde sonuçlanır</strong>.",
						note: 'Veri merkezi yok. Aracı yok. Aylık ödeme beklemek yok.'
					}
				]
			},
			p2p: {
				label: 'Avantaj 01',
				beats: [
					{
						h: 'Tamamen eşler arası.',
						p: 'Diğer bütün &ldquo;donanımını kirala&rdquo; platformları araya bir şirket koyar. Pazar yerini o tutar, payı o alır, kuralları o koyar ve canı istediğinde seni ağından çıkarabilir.'
					},
					{
						h: 'Arada kimse yok.',
						p: "Celaut'ta iki taraf arasında oturan <strong>ne bir vakıf ne de bir şirket</strong> var. Node'un ile hesaplama gücü isteyen eş <strong>doğrudan</strong> konuşur — keşif, pazarlık, yürütme, ödeşme."
					},
					{
						h: 'Yani kimse bağlantını kesemez.',
						p: 'Askıya alınacak bir hesap, altından değiştirilecek koşullar, sessizce büyüyen bir komisyon yok. Etkileşim <strong>tamamen eşler arasıdır</strong>, dolayısıyla her iki tarafın bel bağladığı tek şey karşı taraftır.',
						note: 'Kaydolunacak bir şey yok. Dışlanacak bir yer yok.'
					}
				]
			},
			electricity: {
				label: 'Avantaj 02',
				beats: [
					{
						h: 'Hesaplama gücünü bedavaya vermek mümkün değil.',
						p: 'Makineni çalıştırmak elektrik harcar ve bu maliyet sabit değildir — gün içinde değişir ve yaşadığın yere göre farklılaşır.'
					},
					{
						h: 'Fiyata dahil et.',
						p: "Celaut, hesaplama gücün için belirlediğin fiyata <strong>elektrik maliyetini isteğe bağlı olarak katmana</strong> izin verir. Node'un işi, elektrik faturan denklemde olacak şekilde fiyatlandırır; böylece kapasite kiralamak hiçbir zaman sessizce sana zarar ettirmez."
					},
					{
						h: 'Ne zaman açık olduğuna da sen karar ver.',
						p: '<strong>Erişilebilirlik ve çalışma süresi de senin belirlediğin şeyler.</strong> Makineyi yalnızca elektriğin en ucuz olduğu gece saatlerinde kirala, tek bir işin ne kadar sürebileceğini sınırla ya da tamamen çevrimdışı ol — ağ basitçe başka yere yönlendirir.',
						note: 'Senin fiyatın. Senin saatlerin. Senin kârın.'
					}
				]
			},
			isolation: {
				label: 'Avantaj 03',
				beats: [
					{
						h: "PC'mde kimin kodu çalışıyor?",
						p: 'Aklı başında herkesin sorduğu ilk soru bu. Makineni kiralamak, anahtarlarını yabancılara vermek anlamına gelemez.'
					},
					{
						h: 'Tam yürütme yalıtımı.',
						p: "Her iş yükü kendi <strong>microVM</strong>'i içinde mühürlü çalışır — çekirdeği paylaşan bir konteyner değil, kendi çekirdeğine ve donanımla dayatılan bir sınıra sahip gerçek bir sanal makine. Ne dosyalarını, ne ağını, ne de makinedeki başka bir iş yükünü görebilir."
					},
					{
						h: 'Büyük bulutların üzerinde çalıştığı teknolojinin aynısı.',
						p: "microVM'ler, <strong>büyük bulut sağlayıcıların</strong> milyonlarca yabancının güvenilmez kodunu paylaşılan donanımda çalıştırmak için kullandığı şeydir. Celaut aynı yalıtım modelini senin masana koyar — buradaki güvence bir söz değil, mimarinin kendisidir.",
						note: 'İş biter, VM yok edilir. Geriye hiçbir şey kalmaz.'
					}
				]
			}
		},
		payoff: {
			heading: 'Gerçekte ne elde ediyorsun',
			items: [
				{
					title: 'Boştaki donanım iş başında',
					body: 'Gece üçte uyuyan oyun bilgisayarı, hafta sonu boyunca boş duran iş istasyonu, dolaptaki yedek kasa. nodo çalıştırabiliyorsa kazanabilir.'
				},
				{
					title: 'Şartları sen koyarsın',
					body: 'Hesaplama birimi başına fiyat, hangi saatlerde açık olduğun, makinenin ne kadarını vermeye razı olduğun. Hepsi istediğin zaman değiştirebileceğin şeyler.'
				},
				{
					title: 'Peşin ödeme',
					body: "Bir node'a bir kaynak vaadi karşılığında önceden ödeme yapılır — Ergo (ERG) üzerinde, fatura yok, platform ödeme takvimi yok, asgari eşik yok. Teslim edeceğinin güvencesi itibarıdır."
				},
				{
					title: 'Güvenilecek bir şey yok',
					body: 'Servisler içerikle adreslenir: isteyen taraf tam olarak istediği yazılımı alır, sen de onu incelemeden ya da ona kefil olmadan çalıştırırsın.'
				},
				{
					title: 'Dosyaların senin kalır',
					body: "Bir iş yükü kendi çekirdeğine sahip kendi microVM'inde yaşar. Ne diskini, ne ağını, ne de makinedeki başka bir şeyi asla görmez."
				},
				{
					title: 'İstediğin zaman ayrıl',
					body: "Node'u durdur, ağ seni atlayarak yoluna devam etsin. Sözleşme yok, bağlanma yok ve izin isteyeceğin kimse yok."
				}
			]
		},
		responsibilities: {
			heading: 'Makinendeki düğüm aslında ne yapıyor',
			intro: 'Düğüm, eşlerle iletişim kuran ve servislerin çalıştırılmasını yöneten bir <strong>bilgisayar ya da cihazdır</strong>. Paradigma ona dört iş verir ve üstüne hiçbir eşgüdümcü koymaz.',
			items: [
				{
					title: 'Servis yürütme',
					body: 'Eşleriyle yürütme maliyetlerini pazarlık eder ve bir servisi yerelde mi çalıştıracağına yoksa devredeceğine mi karar verir; böylece kaynaklar en ucuz oldukları yere gider.'
				},
				{
					title: 'İletişim',
					body: 'Temas anında desteklediği arayüzleri ve kabul ettiği ödeme yöntemlerini beyan eder; protokollerin önceden anlaşma olmadan evrilmesini sağlayan da budur.'
				},
				{
					title: 'Güvenlik',
					body: 'Her servis etkileşiminin kendisiyle tanımlandığı adresleri ve kimlik doğrulama jetonlarını üretir ve yönetir.'
				},
				{
					title: 'Bağımlılıklar',
					body: 'Bir servisin ihtiyaç duyduğu şeye ulaşabilmesini sağlar — o bağımlılık ağın neresinde çalışıyor olursa olsun.'
				}
			],
			note: 'Bunların hiçbiri, çalıştırdığı yazılımın ne işe yaradığını bilmeyi gerektirmez.'
		},
		steps: {
			heading: 'Kurulumdan gelire',
			items: [
				{
					title: "nodo'yu kur",
					body: "Linux'ta tek komut, Windows'ta bir kurulum programı. Makinen ağa katılır ve eşlerini bulmaya başlar."
				},
				{
					title: 'Fiyatını ve saatlerini belirle',
					body: "Hesaplama gücünün ne kadara mal olduğunu — istersen elektrik dahil — ve ne zaman erişilebilir olduğunu node'a söyle."
				},
				{
					title: 'İş kabul et',
					body: "Eşler doğrudan node'unla pazarlık eder. Kabul edilen iş yükleri bir microVM içinde mühürlü olarak, her şeyden yalıtılmış biçimde çalışır."
				},
				{
					title: 'Ödemeni al',
					body: 'Ödeme Ergo üzerinde peşin alınır; itibar ise iş yerine getirildikçe kaydedilir. Katkı ödüllendirilir, sonuçlar denetlenebilir kalır.'
				}
			]
		},
		roles: {
			heading: 'Alışverişin öteki tarafı',
			intro: "PC'ni kiralamak ağın yarısı. Diğer yarısı onu <em>kullanabilmek</em> — ve seni ev sahibi olarak koruyan özellikler, ağı satın almaya değer kılan şeylerin ta kendisi.",
			items: [
				{
					title: 'Geliştiriciler',
					body: "Bir programı mühürlü, içerikle adreslenmiş bir servis olarak bir kez gönder ve barındırmayı, keşfi ve ölçeklendirmeyi ağa bırak. Yeniden üretilebilirlik tasarımdan gelir, bir sağlayıcının SLA'sinden değil.",
					link: 'Geliştiriciler için →'
				},
				{
					title: 'Ajanlar &amp; kullanıcılar',
					body: 'Servisleri çözdükleri probleme göre iste ve yürütme başına öde. Bulut hesabı yok, bağlanma yok — üstelik mühür, tam olarak istediğin yazılımı aldığını kanıtlar.',
					link: 'Son kullanıcılar için →'
				},
				{
					title: 'Ev sahipleri',
					body: "Yani sen. Elindeki donanım neyse onu katkı olarak ver; node'un sanallaştırma katmanı sayesinde iş yükleri, CPU mimarileri farklı olsa bile kendilerine uyan bir yere iner."
				}
			]
		},
		cta: {
			heading: 'Boştaki makineni çalıştır.',
			body: 'Bir node kurmak tek bir komut sürüyor. Donanımın başka hiçbir şey yapmadığında ne kadar değerli olduğunu görmenin en hızlı yolu bu.',
			actions: [
				'Node çalıştır',
				'Paradigmayı oku'
			]
		}
	},
	developers: {
		meta: {
			title: 'Geliştiriciler için — Bir kez kur, her yerde çalışsın | Celaut',
			description: "Celaut servisleri kur: bir BOX, bir API ve bir NET kapsamı tanımla, tek bir node'a ver ve dağıtmayı ve çalıştırmayı ağa bırak. Altyapı yok, yapılandırma yok, arada platform yok."
		},
		topbarTitle: 'Geliştiriciler için',
		index: {
			sections: {
				spec: 'Fikir',
				agnostic: 'Her yerde çalışır',
				distribute: 'Dağıtım',
				compose: 'Bileşim',
				payoff: 'Eline ne geçer',
				distribution: 'Nasıl yayılır',
				steps: 'Koddan ağa',
				tradeoffs: 'Yaptığın takas',
				roles: 'Diğerleri',
				cta: 'Başla'
			}
		},
		hero: {
			eyebrow: 'Servis geliştiricileri',
			title: 'Bir kez kur.',
			tagline: 'Sonra nerede çalıştığını düşünmeyi bırak.',
			lede: "Bir Celaut servisi bir dağıtım değil, bir şartnamedir. Ortamı, arayüzü ve ağ kapsamını tarif et, tek bir node'a ver; gerisini ağ halleder.",
			actions: [
				"Skills'i keşfet",
				'Nasıl çalıştığını gör'
			],
			stats: [
				{
					value: 'BOX · API · NET',
					label: 'üç bileşen — şartnamenin tamamı bu'
				},
				{
					value: 'DevOps yok',
					label: "yürütmeyi node'lar üstlenir; açılacak bir bulut hesabı yok"
				},
				{
					value: 'Deterministik',
					label: "aynı girdiler, aynı çıktılar, herhangi bir node'da, herhangi bir zamanda"
				}
			]
		},
		scenes: {
			spec: {
				label: 'Fikir',
				beats: [
					{
						h: 'Dağıtmıyorsun. Tanımlıyorsun.',
						p: "Hazırlanacak bir sunucu, gönderilecek bir imaj, yeşil tutulacak bir işlem hattı yok. Celaut'ta bir servis, çalışmak için neye ihtiyaç duyduğunun yazılı tarifidir."
					},
					{
						h: 'Üç bileşen. Hepsi bu.',
						p: '<strong>BOX</strong> yürütme ortamını tarif eder — mimari, dosya sistemi, ortam değişkenleri, giriş noktası, yapılandırma. Dış bir imajı işaret etmek yerine tüm dosya yapısını doğrudan belirtir; yürütmeyi yeniden üretilebilir tutan da budur.'
					},
					{
						h: 'Ve dünyanın ona nasıl ulaştığı.',
						p: '<strong>API</strong>, istemcilerin ve diğer servislerin onunla nasıl konuştuğunu, ayrıca kabul edilen ödeme yöntemlerini ve maliyetleri tanımlar. <strong>NET</strong> ise ulaşacağı dış ağların adını verir — varsayılan olarak bir servis yalıtılmıştır ve daha geniş olan her şey şartnamenin kendisinde beyan edilir, böylece kullanıcılar nereye gidebileceğini baştan bilir.',
						note: 'Taşınabilir, yeniden üretilebilir, üçüncü taraf bağımlılığından uzak.'
					}
				]
			},
			agnostic: {
				label: 'Avantaj 01',
				beats: [
					{
						h: 'Neyle yazdıysan yaz, aynı şekilde gönderilir.',
						p: 'Celaut senden bir çatı, bir çalışma zamanı ya da bir SDK benimsemeni istemez. İstediği şey bir dosya sistemi ve bir giriş noktasıdır.'
					},
					{
						h: 'Node da umursamıyor.',
						p: "Servisler <strong>kara kutu ilkesini</strong> izler: kendilerini çalıştıran node'ların ayrıntılarından bağımsız işlerler ve node'lar onları ne yaptıklarını anlamaya gerek duymadan çalıştırır."
					},
					{
						h: 'Yani uyumlu her node onu kabul eder.',
						p: "BOX hedeflediği mikro mimariyi beyan eder, böylece node'lar uyup uymadıklarını bilir. Bunun ötesinde, <strong>servisini uyumlu herhangi bir node'da herkes çalıştırabilir</strong> — sözleşmenin tamamı bu.",
						note: 'Bağlanma yok, çünkü bağlanılacak bir şey yok.'
					}
				]
			},
			distribute: {
				label: 'Avantaj 02',
				beats: [
					{
						h: "Tek bir node'a ver.",
						p: "Bir mağazaya yayınlamıyorsun ve inceleme beklemiyorsun. Geliştiricinin yapması gereken tek şey <strong>servisi bir ya da birkaç node'a göndermek</strong>."
					},
					{
						h: 'Oradan sonrasını ağ taşır.',
						p: "O node'lar <strong>servisi diğerleri arasında dağıtma</strong> işini üstlenir. Merkezi bir servis kayıt defteri yok — servisler eşler arası yayılır, dolayısıyla tek arıza noktası ve içeri girip giremeyeceğine karar veren bir kapı bekçisi yoktur."
					},
					{
						h: 'İstersen bulunabilir de olur.',
						p: "Node'lar ayrıca <strong>servisi bir itibar sistemine yükleyebilir</strong>; böylece kullanıcılar ve diğer servisler onu kullanıp kullanmayacaklarına ve ne zaman kullanacaklarına karar verebilir. Görünürlüğü ve güveni artırmak için servisler bir blok zinciri kayıt defterinde beyan edilebilir — Ergo üzerindeki <strong>Sigma Reputation System</strong> gibi.",
						note: 'Kaydolunacak bir şey yok. Pay alan kimse yok.'
					}
				]
			},
			compose: {
				label: 'Avantaj 03',
				beats: [
					{
						h: 'Servis çağıran servisler.',
						p: 'Bir servis, kendisini çalıştıran node aracılığıyla başka servislerin — kendi <strong>çocuk servislerinin</strong> — yürütülmesini isteyebilir. Karmaşık iş akışları orkestrasyon yapılandırmasıyla değil, bileşimle kurulur.'
					},
					{
						h: 'Nereye ineceklerine node karar verir.',
						p: "Node'lar servis örneklerini yönetir ve onları yerelde mi çalıştıracaklarına yoksa yükü eşlere mi dağıtacaklarına karar verir. Bağımlılıklar node'un çözeceği bir sorundur — servislerin ağ boyunca ihtiyaç duyduklarına ulaşabilmesini o sağlar."
					},
					{
						h: 'Ve sen nerede olduğunu asla öğrenmezsin.',
						p: '<strong>Ebeveyn servis, bağımlılıklarının nerede çalıştırıldığını bilmez.</strong> Her çocuk yalnızca ihtiyaç duyduğu kaynakları belirtir. Bileşimi sen yazarsın; yerleşimi ağ çözer.',
						note: 'Yapılandırılacak zamanlayıcı yok. Bakımı yapılacak topoloji yok.'
					}
				]
			}
		},
		payoff: {
			heading: 'Mimarinin sana verdikleri',
			items: [
				{
					title: 'Dağıtma, tanımla',
					body: 'Bir servis; bir BOX (mimari, dosya sistemi, ortam, giriş noktası, yapılandırma), bir API ve bir NET kapsamıdır. Bunu yaz, bitti — sahiplenmen gereken bir dağıtım adımı yok.'
				},
				{
					title: 'Yapısı gereği kendine yeterli',
					body: 'BOX, dış imajları ya da depoları işaret etmek yerine servisin ihtiyaç duyduğu tüm dosya yapısını tarif eder. Hiçbir üçüncü taraf kayıt defteri ayağının altından kaybolamaz.'
				},
				{
					title: 'Bilerek bir kara kutu',
					body: "Servisler, kendilerini çalıştıran node'lardan bağımsız işler. Bir node'un ortamına göre kod yazmazsın, çünkü o ortamın ne olduğu sana hiçbir zaman söylenmez."
				},
				{
					title: '&ldquo;Elimizden geleni yaparız&rdquo; değil, yeniden üretilebilir',
					body: 'Aynı girdiler verildiğinde bir servis, nerede ya da ne zaman çalıştığından bağımsız olarak hep aynı çıktıları üretir. Burada determinizm bir sağlayıcı sözü değil, mimarinin bir özelliğidir.'
				},
				{
					title: 'Orkestrasyonsuz bileşim',
					body: "Bir servis, node'u aracılığıyla çocuk servislerin yürütülmesini isteyebilir. Ebeveyn onların nerede çalıştığını bilmez; her biri yalnızca ihtiyaç duyduğu kaynakları belirtir."
				},
				{
					title: 'Biriktirebileceğin bir itibar',
					body: 'Bir servis deterministik ve varsayılan olarak yalıtılmış olduğundan, bir süre önce kaydedilmiş bir itibar kanıtı bugün de onun hakkında doğru bir şey söyler.'
				}
			]
		},
		steps: {
			heading: 'Koddan ağ üzerinde çalışmaya',
			items: [
				{
					title: 'Servisi yaz',
					body: 'Herhangi bir dil, herhangi bir yığın. Önemli olan ihtiyaç duyduğu dosya sistemi ve onu başlatan komut — uzandığın çatı değil.'
				},
				{
					title: "BOX, API ve NET'i tanımla",
					body: 'Ortamı, çağıranların servisle nasıl konuşacağını ve (varsa) isteyebilmesi gereken dış ağ erişimini beyan et.'
				},
				{
					title: "Bir node'a gönder",
					body: 'Tek bir node yeterli. Servisi diğerlerine dağıtır ve kullanıcılarla diğer servislerin bulabilmesi için bir itibar sisteminde yayımlayabilir.'
				},
				{
					title: 'Çalıştırmayı ağa bırak',
					body: "Node'lar maliyeti pazarlık eder ve her örneğin nerede çalışacağına karar verir. Sen bu döngünün içinde değilsin ve hayatta tutman gereken bir altyapın yok."
				}
			]
		},
		distribution: {
			heading: 'Bir servis gerçekte nasıl yayılır',
			intro: 'Yayınlanacak bir mağaza ve beklenecek bir inceleme yok. Servis tek bir düğüme teslim edilir, gerisini ağ taşır — varsayılan olarak zincir dışında, isteğe bağlı olarak zincir üstünde.',
			items: [
				{
					title: 'Varsayılan olarak uçtan uca',
					body: "Celaut'ta <strong>merkezi bir servis kayıt defteri yoktur</strong>. Servisler node'lar arasında eşler arası yayılır, böylece doğrudan bulunabilirler — ve içeri girip giremeyeceğine karar veren bir kapı bekçisi yoktur."
				},
				{
					title: 'Değerse, bir kayıt defterinde',
					body: 'Görünürlük ve denetlenebilir bir iz, tamamen zincir dışında kalmaktan daha değerliyse servisler bir kayıt defteri uygulayan blok zincirinde de beyan edilebilir — Ergo üzerindeki <strong>Sigma Reputation System</strong> gibi.'
				}
			]
		},
		tradeoffs: {
			heading: 'Aslında yaptığın takas',
			intro: "Bugün yazılım göndermek, onu kendin barındırmakla insanlardan kendilerinin çalıştırmasını istemek arasında seçim yapmak demek. İkisinin de bir bedeli var. Celaut'un iddiası dar ve belirli: her ikisinin avantajını dezavantajları olmadan alıyor — çalışan servis üzerindeki denetimin karşılığında.",
			items: [
				{
					label: 'Barındırılan bir web servisi',
					good: 'Kullanıcıların ne altyapıya ne de yapılandırmaya ihtiyacı olur.',
					bad: 'Sistemin değişmediğini kanıtlayamazsın ve kullanıcıların, istek verilerinin kötüye kullanılmadığına dair sana güvenmesi gerekir.'
				},
				{
					label: 'Kendilerinin çalıştırdığı kaynak kod',
					good: 'Deterministik — bir kez indirildiğinde altından değiştiremezsin — ve istek verileri sana hiç ulaşmaz.',
					bad: 'Yeterli donanıma ihtiyaçları var ve yapılandırmayı atlatmaları gerekiyor; çoğu insanın pes ettiği yer de tam burası.'
				},
				{
					label: 'Bir Celaut servisi',
					good: 'Yönetilecek altyapı ve yapılandırılacak bir şey yok, çünkü şartname konteyneri, mimariyi, ağ ihtiyaçlarını ve arayüzü zaten kapsıyor.',
					bad: 'Denetimden vazgeçersin: bir servis bir kez dışarı çıktığında onu değiştiremez, kısıtlayamaz ya da içinden veri çekemezsin. Mesele de bu zaten.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Ağın geri kalanı',
			intro: 'Servisinin çalışacağı bir yere ve hizmet edeceği birine ihtiyacı var. İkisi de insan.',
			items: [
				{
					title: 'Node işletmecileri',
					body: 'Donanımı onlar sağlar ve ne isteniyorsa ücret karşılığında çalıştırır; servisinin ne yaptığını anlamalarına gerek yoktur.',
					link: "PC'ni kirala →"
				},
				{
					title: 'Son kullanıcılar',
					body: "Node'larda servis başlatır ve kullanılan hesaplama kaynakları için öderler — üstelik çalışanın tam olarak şartnamede tarif edilen şey olduğunu doğrulayabilirler.",
					link: 'Son kullanıcılar için →'
				},
				{
					title: 'Paradigma',
					body: "Mimarinin tamamı: node'lar, servisler, şartname, itibar ve ödeme sistemleri üzerinden eşgüdüm ve bütün bunların neden gerekli olduğu.",
					link: 'Makaleyi oku →'
				}
			]
		},
		cta: {
			heading: 'İşe problemlerden başla.',
			body: 'Unstoppable Skills, başrolde problemlerin olduğu bir kayıt defteri: bir beceri ara ve onu karşılayan servisleri, kıyaslamalarını ve itibarlarını bul. &ldquo;Ne kurmalıyım&rdquo; ile &ldquo;kimin ihtiyacı var&rdquo; arasındaki en kısa yol.',
			actions: [
				"Skills'i keşfet",
				'Paradigmayı oku'
			]
		}
	},
	users: {
		meta: {
			title: 'Son kullanıcılar için — Çalıştır, kullandığın kadar öde | Celaut',
			description: "Celaut node'larında servis başlat ve yalnızca kullanılan hesaplama kaynakları için öde. Hesap yok, abonelik yok, arada platform yok — servisler yalıtılmış ve deterministik çalışır, dolayısıyla tam olarak şartnamede tarif edileni alırsın."
		},
		topbarTitle: 'Son kullanıcılar için',
		index: {
			sections: {
				ask: 'Fikir',
				proof: 'Sana ne döner',
				sealed: 'Mühürlü',
				pay: 'Ne ödersin',
				payoff: 'Eline ne geçer',
				steps: 'İstekten sonuca',
				tradeoffs: 'Yaptığın takas',
				roles: 'Diğerleri',
				cta: 'Başla'
			}
		},
		hero: {
			eyebrow: 'Servis kullanıcıları',
			title: 'Çalıştır.',
			tagline: 'Kullandığın kadar öde. Başka bir şey yok.',
			lede: "Bir node'da servis başlat, sonucu al, tükettiği hesaplama gücü için öde. Oluşturulacak bir hesap, iptal edilecek bir abonelik ve seninle işi yapan makine arasında oturan bir şirket yok.",
			actions: [
				"Skills'i keşfet",
				'Nasıl çalıştığını gör'
			],
			stats: [
				{
					value: 'Hesap yok',
					label: 'kaydolunacak bir şey yok, dışında kalınacak bir şey yok'
				},
				{
					value: 'Yürütme başına',
					label: 'gerçekten kullanılan hesaplama kaynakları için ödersin'
				},
				{
					value: 'Yalıtılmış',
					label: 'servisler mühürlü çalışır ve kendilerine verilmeyen hiçbir şeyi görmez'
				}
			]
		},
		scenes: {
			ask: {
				label: 'Fikir',
				beats: [
					{
						h: 'Bir şirkete değil, ağa sor.',
						p: 'Bir işin yapılmasını istiyorsun — bir model çalıştırmak, bir diziyi analiz etmek, bir botun işlem yapması, bir dosyayı işlemek. Bugün bu, bir sağlayıcı seçip orada hesap açmak demek.'
					},
					{
						h: "Node'lar doğrudan yanıt verir.",
						p: "Celaut'ta <strong>merkezi bir servis kayıt defteri yoktur</strong>. Servisler node'lar arasında eşler arası dağıtılmıştır ve node'lar desteklediği arayüzleri ve <strong>kabul ettiği ödeme yöntemlerini temas anında beyan eder</strong> — yani kimseyle önceden anlaşılması gereken bir şey yoktur."
					},
					{
						h: 'İşi yapan makineyle doğrudan muhatap olursun.',
						p: "Node'un bir eşle yürütme maliyetini pazarlık eder ve iş gerçekleşir. Pay alan, kuralları koyan ya da seni hiç katılmadığın bir ağdan çıkarabilecek <strong>arada bir platform yoktur</strong>.",
						note: 'Kayıt yok. Abonelik yok. Aracı yok.'
					}
				]
			},
			proof: {
				label: 'Avantaj 01',
				beats: [
					{
						h: 'Gerçekte ne çalıştığını nereden biliyorsun?',
						p: 'Barındırılan bir serviste bilemezsin. İşletmeci sistemin değişmediğini kanıtlayamaz — dolayısıyla bir araç popülerleştiğinde, maliyetten kısmak için performansının sessizce düşmesini engelleyen hiçbir şey yoktur.'
					},
					{
						h: 'Burada servis, kendi şartnamesinin <em>ta kendisidir</em>.',
						p: 'Bir servis tüm ortamını tanımlar — mimari, dosya sistemi, giriş noktası, yapılandırma. Bunlardan herhangi birini değiştir, o artık <strong>başka bir servistir</strong>; kullandığının sessiz bir güncellemesi değil.'
					},
					{
						h: 'Yani sonuç yeniden üretilebilir.',
						p: "Aynı girdiler verildiğinde bir servis, hangi node'un ne zaman çalıştırdığından bağımsız olarak <strong>hep aynı çıktıları üretir</strong>. Aylar önceki bir itibar kaydının bugün hâlâ değerli olmasının nedeni budur.",
						note: 'Güvence determinizmdir. Bir söz değil — tasarımın kendisi.'
					}
				]
			},
			sealed: {
				label: 'Avantaj 02',
				beats: [
					{
						h: 'İsteğin başkasını ilgilendirmez.',
						p: 'Bir iş yükünü bir yere gönderirken sorulacak dürüst soru, yolda onu başka kimin göreceğidir.'
					},
					{
						h: 'Her yürütme yalıtılmıştır.',
						p: "Node servisi <strong>yalıtılmış bir örnek</strong> olarak çalıştırır — kendine ait bir sanal makinede. Varsayılan olarak bir servis dış ağlardan tamamen koparılmıştır; yalnızca ebeveyniyle, çocuklarıyla ve kendisini çalıştıran node'la konuşabilir."
					},
					{
						h: 'Üstelik diğer uçta geliştirici oturmuyor.',
						p: "<strong>Servis geliştiricileri bir servisi denetleyemez, değiştiremez ya da içinden veri çekemez</strong>, çünkü onu dağıtan ve çalıştıran node'ları denetlemezler. Daha geniş her ağ erişiminin, sen onu çalıştırmadan önce şartnamede açıkça beyan edilmiş olması gerekir.",
						note: 'Varsayılan olarak yalıtılmış. Erişim istenir, asla varsayılmaz.'
					}
				]
			},
			pay: {
				label: 'Avantaj 03',
				beats: [
					{
						h: 'Çalışmadan önce ödersin. Nokta.',
						p: "Kullanıcılar node'larda servis başlatır ve <strong>bir kaynak vaadi için peşin öder</strong>. Ticari ilişkinin tamamı budur."
					},
					{
						h: 'Boştayken hiçbir şey birikmiyor.',
						p: "Koltuk yok, kademe yok, aylık taban yok. Ödeme, tüketilecek kaynaklar karşılığında <strong>önceden</strong> alınır; ödeme kanıtı erişimi açar. Node'un güvencesi, sonda gelen bir fatura değil, kendi itibarıdır."
					},
					{
						h: 'Fiyatı bir fiyat sayfası değil, piyasa belirler.',
						p: "Node'lar kendi maliyetlerini belirler ve bunun üzerinden rekabet eder; ayrıca <strong>servislerin marjinal maliyeti sıfırdır</strong> — birini çalıştırmanın maliyeti node'a düşer — bu yüzden birçoğu itibar biriktirmek için ücretsiz başlar. Ödeme sistemleri çekirdek mimarinin dışında durduğundan, hangi defterin ödeşmeyi yaptığı da sabit değildir.",
						note: 'Yürütme başına öde. İstediğin zaman ayrıl. İptal edilecek bir şey yok.'
					}
				]
			}
		},
		payoff: {
			heading: 'Gerçekte ne elde ediyorsun',
			items: [
				{
					title: 'Yönetilecek altyapı yok',
					body: "Bunu node'lar hallediyor. Seçilecek bir bulut sağlayıcı, hayatta tutulacak bir makine ve kullanımlar arasında açık bırakılacak bir şey yok."
				},
				{
					title: 'Yapılandırma yok',
					body: 'Servis şartnamesi konteynerin nasıl kurulduğunu, ihtiyaç duyduğu mimariyi, ağ gereksinimlerini ve arayüzünü zaten kapsıyor. Bunların hiçbiri senin çözeceğin bir şey değil.'
				},
				{
					title: 'Geliştiricinin eli ulaşmıyor',
					body: "Servis geliştiricileri bir servisi denetleyemez, değiştiremez ya da içinden veri çekemez — onu dağıtan ve çalıştıran node'ları denetlemiyorlar."
				},
				{
					title: 'Altından değişemez',
					body: 'Bir servis deterministiktir: aynı girdiler, ne zaman ve nerede çalışırsa çalışsın aynı çıktıları üretir. Kimse maliyetten kısmak için onu sessizce kötüleştiremez.'
				},
				{
					title: 'Sıralamayla değil, itibarla değerlendirilir',
					body: 'İtibar bir defterdeki kayıtlar olarak yaşar ve her katılımcı güvendiği kaynakları kendi tartar. Ne göreceğine karar veren editoryal bir ana sayfa yoktur.'
				},
				{
					title: 'Çıkarılacağın bir yer yok',
					body: 'Keşif merkezi bir kayıt defteri olmadan eşler arası yürür, dolayısıyla askıya alınacak bir hesap ve kaldırılacak bir kayıt yoktur.'
				}
			]
		},
		steps: {
			heading: '“Şunun yapılması lazım”dan sonuca',
			items: [
				{
					title: 'Servisi bul',
					body: "Çözülmesini istediğin probleme göre ara. Node'lar servisleri eşler arası keşfeder ve Unstoppable Skills gibi kayıt defterleri problemleri onları karşılayan servislerle eşleştirir."
				},
				{
					title: 'Bir yürütme iste',
					body: "Node'un, bunu çalıştırabilecek bir eşle doğrudan konuşur. Arayüzler ve kabul edilen ödeme yöntemleri temas anında beyan edilir, dolayısıyla önceden anlaşılması gereken bir şey yoktur."
				},
				{
					title: 'Mühürlü olarak çalışır',
					body: 'Node servisi yalıtılmış bir örnek olarak çalıştırır — kendine ait bir sanal makinede — şartnamenin istediğinin ötesinde hiçbir erişim olmadan.'
				},
				{
					title: 'Peşin öde',
					body: "Bir node'a bir kaynak vaadi için önceden ödeme yapılır ve ödeme kanıtı erişimi açar. Güvence itibardır. Abonelik yok, asgari tutar yok, süregelen fatura yok."
				}
			]
		},
		tradeoffs: {
			heading: 'Bugün elindeki iki seçeneğe karşı',
			intro: 'Örnek olarak bir alım satım botunu ele al. Şu anda ya portföyünü bir web servisine teslim ediyorsun ya da kaynak kodu bulup kendin çalıştırıyorsun. Her iki seçim de sana bir şey kazandırıp bir şey kaybettiriyor.',
			items: [
				{
					label: 'Bir web servisi kullan',
					good: 'Altyapı işletmiyorsun ve hiçbir şey yapılandırmıyorsun.',
					bad: 'Ona itibar atfedemezsin, çünkü işletmeci sistemin değişmediğini kanıtlayamaz — ve istek verilerinin kötüye kullanılmadığına dair sana güvence veremez.'
				},
				{
					label: 'Kaynak kodu kendin çalıştır',
					good: 'Deterministiktir ve geliştiricinin istek verilerin üzerinde hiçbir denetimi yoktur.',
					bad: 'Onu çalıştırabilecek donanıma ihtiyacın var ve yapılandırmayla uğraşman gerekiyor — insanların genelde pes edip birinci seçeneğe döndüğü nokta da burası.'
				},
				{
					label: 'Bir Celaut servisi kullan',
					good: 'Altyapı yok, yapılandırma yok ve geliştirici yine de servisi denetleyemez, değiştiremez ya da içinden veri çekemez.',
					bad: 'Yürütme başına ödersin ve ağda, kabul ettiğin bir fiyattan onu çalıştırmaya razı bir node bulunmasına bağımlısın.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Ağdaki diğer insanlar',
			intro: 'Servisi biri yazdı ve birinin makinesi onu çalıştırıyor. Her iki rol de sana açık.',
			items: [
				{
					title: 'Node işletmecileri',
					body: 'İstediğin şeyi çalıştıran donanımı ücret karşılığında sağlarlar — servisin ne yaptığını bilmelerine gerek olmadan.',
					link: 'Boşta donanımın mı var? →'
				},
				{
					title: 'Servis geliştiricileri',
					body: "Uyumlu herhangi bir node'un çalıştırabileceği servisler yazar ve barındırmak yerine onları ağa verirler.",
					link: 'Geliştiriciler için →'
				},
				{
					title: 'Paradigma',
					body: "Node'lar, servisler, şartname ve birbirine güvenmeyen tarafların yine de işbirliği yapmasını sağlayan itibar ve ödeme sistemleri.",
					link: 'Makaleyi oku →'
				}
			]
		},
		cta: {
			heading: 'Elindeki problemden başla.',
			body: 'Unstoppable Skills, tamamen zincir üzerinde çalışan, sunucusuz bir kayıt defteri; burada başrolde problemlerin kendisi var. Bir beceri ara ve onu karşılayan servisleri, gerçek karşılaştırmalı kıyaslamaları, tartışmayı ve itibara dayalı sıralamayı bul.',
			actions: [
				"Skills'i keşfet",
				"Onun yerine PC'ni kirala"
			]
		}
	},
	install: {
		meta: {
			title: 'Nodo Kurulumu — Celaut',
			description: "Linux, Windows ya da macOS üzerinde bir Celaut node'u (nodo) kur."
		},
		topbarTitle: 'nodo kur',
		heading: "Bir Celaut node'u çalıştır",
		subtitle: "<strong>nodo</strong>'yu kur ve merkeziyetsiz ağa katıl — eşleri keşfet, servisleri çalıştır ve düzenle, makineni paylaşılan ve sansüre dirençli hesaplama gücüne dönüştür.",
		tabs: {
			linux: 'Linux',
			windows: 'Windows',
			mac: 'macOS'
		},
		copy: 'Kopyala',
		copied: 'Kopyalandı ✓',
		linux: {
			heading: 'Linux',
			intro: 'Temel kurulum — bunu terminalinde çalıştır:',
			notes: [
				"Betik, sistem düzeyindeki kurulum için <code>sudo</code> gerektirir. Python, Java ve <code>yq</code> çalışma zamanları node'un ana dizini altına yerel olarak kurulur.",
				"Elle, sudo'suz kurulumu mu tercih edersin? {link} izle."
			],
			manualLink: 'elle kurulum kılavuzunu'
		},
		windows: {
			heading: 'Windows 11',
			intro: 'Resmi kurulum programını indir ve çalıştır:',
			download: "Nodo-Setup.exe'yi indir",
			notes: [
				"Kurulum programı, Nodo'ya ayrılmış yalıtılmış bir Linux dağıtımını otomatik olarak oluşturur; böylece node sisteminin geri kalanından ayrı çalışır.",
				'Elle Linux ortamı kurmana gerek yok.'
			]
		},
		mac: {
			heading: 'macOS',
			intro: 'Yerel bir macOS kurulum programı <strong>henüz mevcut değil</strong>.',
			notes: [
				"macOS desteği planlanıyor. Bu arada bir node'u bir Linux makinesinde ya da Linux sanal makinesinde çalıştırabilirsin.",
				'Güncellemeler için {link} takip et.'
			],
			repoLink: 'nodo deposunu'
		}
	},
	paradigm: {
		meta: {
			title: 'Celaut — Resmi Makale',
			description: 'Celaut: yazılım tasarımı ve dağıtımı için eşler arası bir mimari — resmi makale.'
		},
		topbarTitle: 'Resmi Makale',
		toc: 'Dizin',
		tocNav: 'İçindekiler',
		systemBehaviorHeading: 'Sistem davranışı',
		executionHeading: 'Bir servisin yürütülmesi',
		balancerHeading: 'Servis yük dengeleme'
	},
	viz: {
		home: {
			generation: '{n}. kuşak',
			lifeRule: '2 ya da 3 komşu: yaşar · tam 3: doğar',
			oneProtocol: 'herkesin çalıştırmak zorunda olduğu tek protokol',
			networkSplits: 'kuralları değiştir, ağ ikiye bölünsün',
			whereOverlap: 'örtüştükleri yerde konuşurlar',
			noVote: 'oylama yok · göç yok · fork yok',
			blackBox: 'kara kutu',
			input: 'girdi',
			output: 'çıktı',
			box: 'BOX',
			environment: 'ortam',
			api: 'API',
			interface: 'arayüz',
			nets: [
				'bitcoin-mainnet',
				'ipfs',
				'nostr',
				'google.com',
				'family-photos.lan',
				'api.weather.gov',
				'pg-cluster-a'
			],
			netsCompact: [
				'bitcoin',
				'ipfs',
				'google.com',
				'family-photos',
				'nostr',
				'weather-api'
			],
			zoom: {
				source: 'celaut.proto · message Service',
				box: {
					title: 'BOX · Container',
					rows: [
						'architecture — ihtiyaç duyduğu işlemci ve ortam',
						'filesystem — her dosya içeride, bir imaj adı değil',
						'init — giriş noktası ve nasıl başladığı',
						'config_declaration — hangi dosyaların yapılandırma olduğu',
						'resources — at_init ve at_most',
						'environment_variables — biçimleriyle birlikte beyan edilir'
					]
				},
				api: {
					title: 'API · Arayüz',
					rows: [
						'slot — bir port ve konuştuğu taşıma katmanı',
						'protocol_stack — o slottaki protokoller',
						'mu_per_call — her metodun fiyatı',
						'payment_contracts — kabul ettiği defterler',
						'başlangıçta sabit maliyet, sonrasında kullanım maliyeti'
					]
				},
				net: {
					title: 'NET · Network',
					rows: [
						'ulaşabileceği her iletişim alanı için bir kayıt',
						'tags / prose / formal — alanın nasıl adlandırıldığı',
						'protocol_stack — o eşlerin ne konuşması gerektiği',
						'environment_variable — hangi eşlerin kendisinden sayıldığı',
						'burada hiçbir şey beyan etmemek, hiç dışarı çıkmamak demektir'
					]
				}
			},
			net: 'NET',
			netDeclared: 'NET · şartnamede beyan edilir',
			nowhereElse: 've başka hiçbir yere',
			itsNodeItsParent: "kendi node'u · kendi ebeveyni",
			aService: 'bir servis',
			children: 'çocuklar',
			whatTheySpend: 'nerede oldukları değil, ne harcadıkları',
			developersShort: 'geliştiriciler · neye ihtiyacı var',
			developersLong: 'geliştiriciler · neye ihtiyacı var, ne harcıyor',
			operatorsShort: 'işletmeciler · nerede çalışıyor',
			operatorsLong: 'işletmeciler · nerede çalışıyor, kaça mal oluyor',
			thisNode: 'bu node',
			aPeer: 'bir eş',
			cost: 'maliyet {value}',
			oneInput: 'tek girdi',
			when: [
				'şimdi',
				'bir yıl sonra',
				'başka donanımda'
			],
			identicalEveryTime: 'her seferinde birebir aynı',
			reputationLedger: 'itibar · defterdeki kayıtlar',
			sourcesYouTrust: 'güvendiğin kaynaklar',
			principles: {
				consequences: [
					'→ anlaşılacak protokol yok',
					'→ bir kapsayıcı, bir arayüz, bir kapsam',
					'→ anlamını koruyan itibar'
				],
				derivedFrom: 'geri kalan her şey buradan türer'
			},
			firstWhatSources: 'önce: kaynaklarım bunun hakkında ne diyor?',
			rightShort: '2 vCPU · 30 dk',
			rightLong: '2 vCPU · 30 dk hakkı',
			paymentRights: 'ödeme ⇄ kaynak hakları',
			outcomeRecorded: 'sonuç onun kaydına işlenir',
			nextStranger: 've bir sonraki yabancının okuduğu şey tam da budur',
			requester: 'isteyen',
			node: 'node'
		},
		developers: {
			box: 'BOX',
			api: 'API',
			net: 'NET',
			service: 'servis',
			anyCompatibleNode: 'uyumlu herhangi bir node',
			optionalRegistry: 'isteğe bağlı itibar kayıt defteri',
			yourService: 'senin servisin',
			itsNode: "onun node'u",
			neverFindOut: 'nerede olduğunu asla öğrenmezsin'
		},
		users: {
			you: 'sen',
			noAccount: 'hesap yok',
			eachPeerItsUnit: 'her eş kabul ettiği birimden fiyat verir',
			whatYouAsked: 'istediğin şey',
			whatNodeRuns: "node'un çalıştırdığı şey",
			identicalItRuns: 'birebir aynı — çalışıyor',
			microvm: 'microVM',
			destroyed: 'yok edildi',
			theDeveloper: 'geliştirici',
			theHostMachine: 'ev sahibi makine',
			computeUsed: 'gerçekten kullandığın hesaplama gücü',
			whatYouPay: 'ödediğin şey',
			chargingStops: 'iş biter — ücretlendirme durur',
			subscription: 'ne olursa olsun ücret kesen bir abonelik'
		},
		depin: {
			electricityCost: 'senin elektrik maliyetin',
			priceYouSet: 'belirlediğin fiyat',
			availableWindow: '22.00 – 07.00 arası açık',
			marginCovered: 'kâr karşılandı'
		}
	}
};
