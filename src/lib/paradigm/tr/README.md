# *Celaut*: yazılım tasarımı ve dağıtımı için eşler arası bir mimari

<br>

**Bağlam**

1940'larda matematikçi John von Neumann, Stanislaw Ulam ile birlikte hücresel otomat kavramını ortaya attı ve karmaşık davranışların basit kurallardan nasıl doğabileceğini gösteren modeller kurdu. Bu temel üzerine 1970'te John Horton Conway, temel etkileşimlerden yola çıkarak bir sistemin nasıl karmaşık örüntülere evrilebileceğinin klasik örneği hâline gelen hücresel otomat "Yaşam Oyunu"nu tanıttı. Bu fikirler, merkeziyetsiz sistemlerin merkezi denetim olmadan nasıl karmaşıklığa ulaşabileceği konusunda değerli bir kavrayış sunuyor ve *Celaut*'un tasarımına yol gösteren felsefe de bu.

**Tanım**

*Celaut*, yazılım tasarımı ve dağıtımı için basit kurallardan oluşan bir bütündür; **merkeziyetsizlik**, **sadelik** ve **determinizm** ilkeleri aracılığıyla sağlam, ölçeklenebilir ve uyum sağlayan bir sistem yaratmayı amaçlar.

**İlkeler**

1. **Merkeziyetsizlik**: tek bir denetim ya da arıza noktası yoktur; bu da node'ların dinamik biçimde iletişim kurup eşgüdüm sağlamasına imkân tanır.
2. **Sadelik**: karmaşıklığı azaltan minimalist kurallar, her bileşenin kolayca anlaşılıp bakımının yapılabilmesini güvence altına alır.
3. **Determinizm**: servisler öngörülebilir davranır; farklı node'larda sonuçların yeniden üretilebilirliğini sağlayan tanımlı kuralları izler.

***Celaut* mimarisi: node'lar ve servisler**

*Celaut*'un mimarisi iki temel öge etrafında kurulmuştur: **node'lar** ve **servisler**. Bunlar birlikte, her parçanın bütünün işlevine katkı verdiği dağıtık bir ağ oluşturur; tıpkı bir hücresel otomattaki etmenler gibi.

- **Node'lar**:
    Bir node, *Celaut* ağı içinde diğer node'larla iletişim kurabilen ve servislerin yürütülmesini yönetebilen bir bilgisayarı ya da cihazı temsil eder. *Celaut*'un merkeziyetsiz doğası, node'ların birbiriyle etkileşme biçiminde vücut bulur ve tek bir arıza noktası ya da merkezî denetim olmamasını güvence altına alır. Bir node'un başlıca sorumlulukları şunlardır:

    1. **Servis yürütme**: node'lar servis örneklerini yönetir; bunları yerelde mi çalıştıracaklarına yoksa yükü eş node'lara mı dağıtacaklarına karar verirler. Bu, kaynak kullanımını ve başarımı en iyi düzeyde tutar; tıpkı bir hücresel otomattaki hücrelerin sistem dengesini korumak için komşularıyla etkileşmesi gibi.

    2. **İletişim arayüzü**: sağlam bir arayüz, node'lar ile servisler arasındaki veri alışverişinin pürüzsüz olmasını sağlayarak etkili bir eşgüdüme imkân verir. Dikkate değer biçimde, node'ların belirli bir iletişim protokolü üzerinde önceden anlaşmasına gerek yoktur; arayüz bu ayrıntıları soyutlar ve etkileşimlerde esneklik bırakır. Bu özellik aşağıda ayrıntılı olarak açıklanmaktadır.

    3. **Adres ve jeton sağlama**: node'lar, iletişim adreslerini ve kimlik doğrulama jetonlarını yöneterek güvenli etkileşimleri kolaylaştırır; böylece servisler güvenlik korunurken kolayca erişilebilir kalır.

    4. **Bağımlılık yönetimi**: node'lar, servislerin ihtiyaç duydukları bağımlılıklara erişebilmesini sağlar. Çoğu zaman "çocuk servisler" diye anılan bu bağımlılıklar aynı node'da ya da farklı node'larda çalışabilir. Bu özellik, bir ebeveyn servisin çocuk servislerine erişip onlarla eşgüdüm kurmasına imkân verir; böylece servisler ağ boyunca dağılmış olsa bile pürüzsüz ve verimli bir servis ekosistemi korunur.

    Python3 ve Rust kullanan bir node uygulaması örneği **Nodo**'dur [burada](https://github.com/*Celaut*-project/nodo).

- **Servisler**:
    *Celaut*'ta bir servis, belirli bir görevi yerine getirmek üzere tasarlanmış deterministik bir yazılım konteyneridir. **Kara kutu** ilkesini izleyen servisler, kendilerini çalıştıran node'ların ayrıntılarından bağımsız olarak işler ve yalnızca kendi işlevlerine odaklanır. Servislerin başlıca yönleri şunlardır:

    - **Yalıtılmış örnekler olarak yürütme**: bir kullanıcı bir servis istediğinde, bu servis bir node'a gönderilir ve node onu yalıtılmış bir süreç olarak çalıştırır — node'un mimarisine göre bir konteynerde ya da bir sanal makinede. Bu soyutlama **sadelik** ilkesiyle uyumludur, çünkü servislerin yürütme ortamından haberdar olması gerekmez.

    - **Deterministik davranış**: servisler tutarlı sonuçlar sağlamak için önceden tanımlanmış kuralları izler. Bu, *Celaut*'un **determinizm** vurgusuyla örtüşür: aynı girdiler verildiğinde bir servis, hangi node onu çalıştırırsa çalıştırsın, her zaman aynı çıktıyı üretir.

    - **Hiyerarşik yürütme**: *Celaut*'taki servislerin ayırt edici bir özelliği, node aracılığıyla başka servislerin (çocuk servislerin) yürütülmesini isteyebilmeleri ve böylece karmaşık iş akışlarına imkân tanımalarıdır. Bu, basit etkileşimlerin daha incelikli örüntülere yol açabildiği hücresel otomatlardaki beliren davranışları yansıtır.

**Teşvikleri eşgüdümlemek: itibar ve ödemeler**

*Celaut* gibi merkeziyetsiz sistemlerde eşgüdüm yalnızca teknik etkileşimlerle ilgili değildir; sistemin etkin biçimde işlemesi için tüm katılımcıların teşviklerini hizalamayı da içerir. *Celaut* bu hizalamayı sağlamak için iki temel mekanizma kullanır:

- **İtibar sistemleri**:
    Her node ve servis, etkileşim geçmişine dayalı bir itibar inşa edebilir. Node'lar ve servisler, itibarlarını korumak için yüksek güvenilirlik ve kalite standartlarını sürdürmeye teşvik edilir. Güçlü bir itibar, diğer node'ların ve kullanıcıların onlara güvenmesini ve onlarla etkileşmesini sağlar; bu da adil davranmak ve nitelikli servis sunmak için doğal bir teşviktir. Bu itibar mekanizması ağ içinde bir tür öz düzenleme yaratır: katılımcıların iyi konumlarını korumakta doğrudan çıkarları vardır.

- **Ödeme mekanizmaları**:
    İtibarın ötesinde, node'lar ile servisler arasındaki işbirliği ödeme sistemleriyle de kolaylaştırılır. Bir node bir servisi çalıştırdığında ya da servisler birbiriyle etkileştiğinde, kullanılan kaynaklar veya tamamlanan görevler karşılığında bir bedel takas edilebilir. Bu ödemeler, node'ların kaynak katmasını ve servislerin değer üretmesini doğrudan teşvik ederek ağ genelinde işbirliğini ve adil alışverişi güçlendirir. Ödeme mekanizmaları kaynak dağıtımının verimli olmasını sağlar; böylece node'lar ve servisler kendi güçlü yanlarına ve kapasitelerine göre çalışabilir.

Bu mekanizmalar ileride daha ayrıntılı anlatılır ve *Celaut*'un merkeziyetsiz yaklaşımının yaşayabilirliğini güvence altına alan iktisadi çerçeveyi oluşturur. Tıpkı iki node'un belirli bir protokolde anlaşmaya gerek duymadan iletişim kurması gibi, bu sistemler de çekirdek mimariden bağımsız işler. Bu ayrımın gerekçesi ve etkileşimlerde nasıl esneklik ve uyum sağladığı aşağıda daha ayrıntılı açıklanmaktadır.

**Kavramsal olanla pratik olanı birleştirmek**

*Celaut*'un tasarımı hücresel otomatların temel ilkelerini yansıtır: node ve servis düzeyindeki basit kurallar karmaşık, uyum sağlayan bir sisteme yol açar. Denetimi merkeziyetsizleştirerek, etkileşimleri sadeleştirerek ve deterministik davranışı güvence altına alarak *Celaut*, yazılım dağıtımı ve otomasyon için esnek bir çerçeve yaratır. Bu, servislerin kendi çekirdek işlevlerine odaklanmasını, node'ların ise orkestrasyon ve dağıtımı yönetmesini sağlar; ortaya yeni gereksinimler belirdikçe uyum sağlayıp ölçeklenebilen bir sistem çıkar.

***Celaut*'un gerçek dünyadaki etkisi**

*Celaut*'un mimarisi, denetimli bir ortamda benzetim çalıştırmaya benzer biçimde daha hızlı yineleme ve deney yapmayı mümkün kılar. Bu da onu, yeni yöntemlerin hızla devreye alınıp sınanmasının kritik olduğu senaryolarda özellikle değerli kılar. Modern hesaplamanın sunduğu olanaklarla *Celaut*, bu ilkelerden yararlanarak karmaşık sistemleri daha önce hayal bile edilemeyecek biçimlerde benzetebilir ve çeşitli sektörlerde verimliliği ve başarımı artırmanın yeni yollarını açar.

Bu mimari, servislerin alttaki altyapıyı dert etmeden kendi işlevselliklerine odaklanmasını sağlar. Node'lar ise kendi paylarına, örneklerin ne işe yaradığını dert etmeden yürütmelerini verimli biçimde yönetebilir.

<br>


## Bir servis nasıl tanımlanır?

*Celaut*'ta bir servisin şartnamesi üç ana bileşenden oluşur:

### Konteyner | *BOX*
**BOX** bileşeni, servisin çalışacağı ortamı tanımlar ve servisin farklı node'larda tutarlı biçimde yürütülmesini güvence altına alır. Diğer konteynerleştirme yöntemlerinden farklı olarak *Celaut*'un BOX'ı dış imajlara ya da depolara dayanmaz; bunun yerine servisi çalıştırmak için gereken tüm dosya yapısını doğrudan belirtir. Şu ayrıntıları içerir:

- **Mimari**: servisin üzerinde çalışması öngörülen donanımın mikro mimarisini belirtir; böylece servis ile onu yürüten node arasındaki uyumu güvence altına alır.

- **Dosya sistemi**: dosya sistemi, servisin dosya yapısının kapsamlı bir tarifidir ve servisin çalışması için gereken tüm dosya ve dizinleri barındırır. Buna ikili dosyalar, kütüphaneler, yapılandırma dosyaları ve gerekli diğer tüm kaynaklar dahildir.
    - **Item Branches**, dosya sisteminin yapısını tanımlar; her dal bir dosyayı, bir sembolik bağı ya da iç içe geçmiş bir dizin yapısını temsil eder.
    - Bu yaklaşım, ortamın tamamının kendi kendine yeter olmasını sağlar; üçüncü taraf depolara bağımlılığı azaltır ve **determinizmi** korur, çünkü servisin yürütme ortamı ev sahibi node ne olursa olsun aynı kalır.

- **Ortam değişkenleri**: servisin çalışma sırasında erişebileceği anahtar-değer çiftlerini belirtir; böylece çekirdek dosya yapısını değiştirmeden dinamik yapılandırma yapılabilir.

- **Giriş noktası**: yürütüldüğünde servisin ana sürecini başlatan betiği ya da komutu tanımlar. Bu, node'un servisi düzgün biçimde nasıl başlatacağını bilmesini sağlar.

- **Config**: node'un servisi başlatırken yüklemesi gereken yapılandırma yollarını ve biçimlerini içerir. Başlangıç kaynak tahsisleri veya belirli çalışma zamanı parametreleri gibi gerekli bilgileri sağlar.

- **Beklenen ağ geçidi**: servisin *Celaut* node'uyla nasıl iletişim kurduğunu tarif eder ve node'dan beklediği protokolleri ve yöntemleri (ağ geçidi uygulama protokolünü) belirtir. Bu bileşen, servis ile onu barındıran ortam arasındaki iletişimin pürüzsüz olmasını sağlar ve node'u, sistem düzeyinde etkileşimler sunan bir işletim sistemi gibi ele alır.

BOX şartnamesi, *Celaut* servislerinin taşınabilir, yeniden üretilebilir ve üçüncü taraf bağımlılıklarından uzak olmasını sağlar; bu da **sadelik** ve **determinizm** ilkeleriyle örtüşür.

### Arayüz | *API*
Celaut'ta *API* (Application Programming Interface), istemcilerin ve diğer servislerin ekosistem içindeki bir servisle nasıl etkileşebileceğini tanımlayan kurallar ve şartnameler bütünüdür. Başlıca amacı, farklı yazılım bileşenlerinin birbiriyle iletişim kurması için açık ve tutarlı bir yöntem oluşturmak ve servislerin öngörülebilir biçimde erişilebilir ve kullanılabilir olmasını güvence altına almaktır.

*API* aracılığıyla, bir servisin istek alıp işlemesi için iletişim protokolleri ve uç noktalar tanımlanır. Bu, ister bir kullanıcı ister başka bir servis olsun, herhangi bir dış varlığın servisin iç işleyişini anlamaya gerek kalmadan, standartlaştırılmış bir yönerge kümesini izleyerek onunla bütünleşebilmesini sağlar.

Celaut'ta *API*'nin temel bir yönü, merkeziyetsizlikteki rolüdür. İyi tanımlanmış bir arayüz sunulduğunda, servisler etkileşimleri yöneten merkezî bir denetleyiciye bağlı olmadan özerk biçimde işleyebilir. Bu da sistemi daha ölçeklenebilir ve daha dayanıklı kılar, çünkü her servis ekosistemin diğer bileşenleriyle iletişim kurma ve işbirliği yapma yeteneğinde kendi kendine yeter.

*API* şartnamesi, servislerin istemcilerce kolayca erişilip kullanılmasını sağlarken tutarlı bir etkileşim yöntemini korur. Servislerin protokol pazarlığı için merkezî bir denetleyiciye yaslanmadan iletişimde kendi kendine yeter olmasına imkân vererek *Celaut*'un **merkeziyetsizlik** ilkesini destekler.

### Ağ | *NET*
**NET** bileşeni, bir servisin isteyebileceği ve etkileşebileceği dış ağ erişiminin kapsamını tanımlar. Varsayılan olarak bir servis dış ağlardan yalıtılmıştır; yalnızca ebeveyn servisiyle (onu yaratan istemciyle), çocuk servisleriyle ve onu yürüten *Celaut* node'uyla iletişim kurabilir. Bu yalıtım, **determinizmi** güvence altına alır ve yetkisiz veri sızıntılarını ya da etkileşimleri engelleyerek **güvenliği** güçlendirir.

Bununla birlikte, bazı servisler işlevleri için dış ağlara erişmek zorundadır. Örneğin, bir Bitcoin node'u olarak çalışan bir servisin daha geniş Bitcoin ağıyla etkileşmesi gerekir. Bunu güvenlikten ödün vermeden mümkün kılmak için *Celaut* şunlara izin verir:

- **Denetimli dış erişim**: servis, dış IP adreslerine ya da node'lara doğrudan erişmez. Bunun yerine kendi *Celaut* node'una bir istek gönderir ve belirli bir ağa (örneğin "bitcoin-mainnet") erişme ihtiyacını belirtir. *Celaut* node'u ardından bunu doğrular ve servisin etkileşebileceği güvenilir eş node'ların bir listesini sağlar.

- **Servisin ağ eşleri istemesi**: Bitcoin node'u gibi bir servis, kendi *Celaut* node'uyla iletişerek ek kaynaklar ya da ağ eşleri isteyebilir. Örneğin, "'bitcoin-mainnet'ten eşlere ihtiyacım var" diye bir istekte bulunabilir. Node bu isteği değerlendirir ve doğrulanmış örneklerin bir listesini döndürür (bunlar *Celaut* ağında servis olarak çalışan başka Bitcoin node'ları olabilir).

- **Node'un farkındalığı ve yönlendirmesi**: servis isteğini alan *Celaut* node'u uygun eşler bulamayacağını biliyorsa (örneğin ağında başka Bitcoin node'u yoksa), bu gereksinimi karşılayabilecek bir *Celaut* eş node'u arar. Bu da, ilk *Celaut* node'u sınırlı olsa bile servislerin gerekli ağ bağlantılarını her zaman bulabilmesini sağlar.

**NET** bileşeni, *Celaut*'un dış bağlanabilirlik ihtiyacını **güvenlik** ve **determinizm** temel değerleriyle dengelemesine imkân verir ve daha geniş ağlara erişimlerine açıkça izin verilmedikçe servislerin yalıtılmış kalmasını güvence altına alır.

<br><br>

Bir servisin şartnamesi *Celaut* mimarisinin kilit bir parçasıdır, çünkü servislerin tutarlı ve öngörülebilir biçimde devreye alınıp yürütülmesini sağlar.

<br>

Node, servisi ikili dosyadan yükleyecek ve çalışması için ihtiyaç duyduğu kaynakları ona sağlayacaktır.

Bir servisi tanımlamanın tek bir yolu yoktur.
Örneğin, [Proto3 uygulaması](https://github.com/*Celaut*-project/service-lib/blob/master/node-driver/src/node_driver/gateway/protos/*Celaut*.proto#L66) olası birçok varyasyondan biridir.

<br>

Tüm node'lar bir servis şartnamesinin olası tüm varyasyonlarını kabul etmeyecektir.

>Örneğin, node A belirli bir proto3 şartnamesini ve JSON'daki bir şartnameyi anlıyor. Başka bir node B ise JSON şartnamesini ve JSON+zip dosya sistemi biçimindeki bir diğerini anlıyor. Her iki node da ortak sahip oldukları şartnameyle — bu durumda JSON ile — servis aktarabilir.

<br>

## Sistemdeki farklı kullanıcı rolü türleri

Kullanıcılar olarak üç tür rol üstlenebiliriz:

- Node işletmecisi (bir blok zincirinde madenci işleten birine benzer).
- Servis geliştiricisi. Bu servisler herkes tarafından herhangi bir node'da (mimari vb. bakımından uyumlu herhangi bir node'da) çalıştırılabilir.
- Node'larda servis başlatan kullanıcılar.

Dolayısıyla bir node işleten kişi (1. tip kullanıcı), PoW madenciliği mi yapıldığıyla, bir alım satım botunun mu çalıştığıyla, bir DNA dizisinin mi çözümlendiğiyle ya da çalıştırdığı servislerin başka ne yaptığıyla ilgilenmez. Yalnızca 3. tip kullanıcıların istediği servisleri, bir ödeme kanıtı karşılığında (bir blok zincirinde ya da kabul edilen herhangi bir ödeme yöntemiyle) yürütür. Geliştiricinin (2. tip kullanıcı) tek yapması gereken, servisi bir ya da birkaç node'a göndermektir; o node'lar servisi diğerleri arasında dağıtmayı ve/veya bir itibar sistemine yüklemeyi üstlenir; böylece kullanıcılar (ya da diğer servisler) onu kullanıp kullanmayacaklarını, ne zaman ve neden kullanacaklarını bilir.

>Bu, sisteme dair yalın bir bakıştır; daha fazla karmaşıklık eklendikçe olası kullanıcı rollerinin sayısı da artabilir.

<br>


## Dijital ekosistemlerde doğanın izinden gitmek

*Celaut*'u, doğadaki biyolojik bir ekosistemin dinamiklerini yansıtan dijital bir ekosistem olarak düşün. Bu benzetmede:

1. Organizmalar olarak node'lar: *Celaut* içindeki node'lar, doğal bir ekosistemdeki organizmalara benzetilebilir. Her node, çevrede farklı nişleri işgal eden ayrı türler gibi, kendi yetenekleri ve işlevleri olan ayrı bir varlığı temsil eder. Bu node'lar birbiriyle etkileşerek, ekosistemlerdeki iç içe geçmiş yaşam ağına benzeyen bir ağ oluşturur.

2. Biyolojik işlevler olarak servisler: *Celaut* içindeki servisler, organizmalarda görülen biyolojik işlevlere ya da süreçlere karşılık gelir. Her servis belirli bir görevi yerine getirir; tıpkı canlı organizmalardaki organların özelleşmiş işlevleri üstlenmesi gibi. Organların yaşamı sürdürmek için uyum içinde çalışması gibi, servisler de çeşitli hesaplama ihtiyaçlarını karşılamak için node'lar içinde işbirliği yapar.

3. Çeşitlilik olarak merkeziyetsizlik: *Celaut*'un merkeziyetsizlik ilkesi, doğal ekosistemlerdeki biyoçeşitlilikle eşdeğer sayılabilir. Doğada biyoçeşitlilik dayanıklılık ve uyum yeteneği sağlar; çeşitli türler ekosistemin istikrarına ve işlevine katkı verir. Benzer biçimde *Celaut*'ta merkeziyetsizlik, tek arıza noktalarıyla ilişkili riskleri azaltır ve sistemin değişen koşullara uyum sağlama yeteneğini güçlendirir.

4. Enerji optimizasyonu olarak verimlilik: *Celaut*'taki verimlilik, doğal sistemlerde gözlenen enerji optimizasyonunu yansıtır. Biyolojik ekosistemlerde enerji besin ağları boyunca akar ve organizmalar hayatta kalmayı ve üremeyi en üst düzeye çıkarmak için enerji harcamasını optimize eder. Aynı şekilde *Celaut* da hesaplama kaynaklarını optimize eder ve gecikmeyi ile kaynak israfını en aza indirmek için görevleri node'lar arasında dağıtır.

5. Doğa yasaları olarak sadelik ve determinizm: *Celaut*'taki sadelik ve determinizm ilkeleri, doğal sistemleri yöneten temel yasalarla yankılanır. Fiziksel yasaların evrende maddenin ve enerjinin davranışını belirlemesi gibi, *Celaut*'un basit kuralları da node'lar ile servisler arasındaki etkileşimleri yönetir. Bu deterministik çerçeve tutarlılığı ve öngörülebilirliği güvence altına alır; tıpkı temel yasalara tabi doğal olayların öngörülebilirliği gibi.

<br>


## Güven sistemleri

*Celaut*'ta sistemin farklı parçaları, node'lar ve servisler, birbirine güvenmez; dolayısıyla bu güvensiz (trustless) bir sistemdir. Bu yüzden bir node'un servisleri bedava çalıştırması ya da bir servisin, bir sözleşmede ödeme yapılmadan ve bunun kanıtı alınmadan çalışması pek olası değildir (elbette isterlerse bunu yapabilirler; servisler söz konusu olduğunda marjinal maliyetleri sıfır olduğu için bu iktisaden mümkündür).
<br>Ancak bu parçaların aralarında güven olmadan etkileşebilmesi için sözleşmelere — (node'lar ve servislerden oluşan bir toplumda) toplumsal sözleşmelere — ihtiyaç vardır; böylece değer aktarılır ve her tarafa itibar atfedilir. Dolayısıyla (görece soyut bir bakış açısıyla) iki tür sistemimiz olur: ödeme sistemleri ve itibar sistemleri.

> Bir node için olası bir strateji, itibarını artırmak amacıyla başlangıçta değer alışverişi olmadan servis yürütmesi sunmak ve başkalarından itibar kazandığında maliyetini yükseltmeye başlamaktır.

> Node'ların aksine, servislerin doğası marjinal maliyetinin sıfır olmasıdır; bu da eşzamanlı yürütülen birim sayısında bir sınır olmadığı anlamına gelir (çünkü onları çalıştırmanın maliyeti node'lara düşer). Bu yüzden pek çok servisin itibar kazanmak için sıfır maliyetle başlaması, itibarı olduğunda ve rekabetçi kaldığında bir bedel istemesi, rekabetçi olmaktan çıktığında ise yeniden sıfır maliyete dönmesi oldukça olasıdır.


### Ödeme sistemleri

Ödeme sistemleri, *Celaut* içindeki varlıklar arasında değer aktarımına imkân verir. Olası bazı türler şunlardır:

#### Lisans akıllı sözleşmeleri

Servisler ve node'lar için kullanım lisansları çıkarılmasına imkân veren bir sözleşme sistemi; burada Ledger, üzerinde doğrunun uzlaşıldığı ağdır. Böylece A, B'nin bir metodunu çalıştırmak isterse onun sözleşmesini kontrol eder, tanımlı komutu çalıştırır (Ledger'a bağlanarak) ve Ledger'ın sözleşmesi bir lisans çıkarır; A bu lisansı B'ye gönderir ve B'nin istenen metodu çalıştırmasını mümkün kılar.

İki farklı sınıflandırmaya dayanan dört ayrı lisans türü vardır. Bir yanda lisansın esnek mi yoksa durağan mı olduğu, diğer yanda ise etkileşimli mi yoksa etkileşimsiz mi olduğu.

- **Esnek lisanslar**, kullanımlarının belirli parametrelere göre (istek sayısı, süre, metotlar, ortam değişkenleri vb.) kısıtlanmasına imkân veren lisanslardır.

- **Durağan lisanslar**, kullanımı kısıtlamayan lisanslardır. B lisans anahtarlarını bilir ve sözleşme, kullanımını sınırlayamadan lisansı sağlar.

- **Etkileşimli lisanslar**, sunulan lisansın geçerliliğini doğrulamak için B'nin Ledger'a bağlanmasını gerektirir.

- **Etkileşimsiz** lisanslar, sunulan lisansın geçerliliğini doğrulamak için B'nin Ledger'a bağlanmasını gerektirmez.

<br>

Bundan dört lisans türü doğar:

- Etkileşimli durağan (çok yalın — pek kullanışlı değil)
- Etkileşimsiz durağan (servisler için daha uygun)
- Etkileşimli esnek (node'lar için daha uygun)
- Etkileşimsiz esnek (oldukça karmaşık — çok yönlü)

<br>

> Ledger'lar Bitcoin ya da Ergo gibi açık ve izinsiz ağlar olabileceği gibi, Stripe gibi özel ve kapalı platformlar da olabilir. Tek koşul, tüm katılımcıların onları desteklemesidir.

<br>


### İtibar sistemleri

İtibar sistemleri; kullanıcıların, node'ların ve servislerin, kararlarını üzerine kuracakları toplumsal bir ekosistem yaratmasına imkân verir. Node'lar için, servis yürütmesi isteyecekleri eşlerden hangilerine güvenebileceklerini bilmek gerekir.
Servis çalıştıran kullanıcılar içinse, yapmak istedikleri iş için hangi servisin en iyi başarımı göstereceğini belirlemeye yardımcı olur.

*Celaut*'ta itibar, bir görüşü temsil eden Ledger kayıtları olarak gösterilir.

Servisler söz konusu olduğunda, deterministik doğaları itibarlarına node'lardan farklı bir açıdan bakmayı sağlar.
Bir süre önce yayımlanmış bir itibar kanıtı (bir kayıt), bir servis bakımından bugünkü kadar değerli olabilir (bu, servis ağlarla etkileşmediğinde doğrudur; bir servisin varsayılan hâli de budur: tümüyle yalıtılmış).
Eğer herhangi bir ağla etkileşiyorsa, itibarı bağlandığı ağların itibarına bağlı olabilir; onların ise bu deterministik özelliği yoktur, çünkü zamanla değişebilirler. Bunun nedeni servisin kendisinin değişmemiş olmasıdır.

Buna karşılık bir node'un itibarı ne kadar yeniyse o kadar değerlidir, çünkü davranışı zaman içinde değişebilir.
Node'lar birbirine tanıtıldığında itibarlarına dair kanıtlar gösterirler ve diğerleri, uzlaşıya gerek olmaksızın, onların ne ölçüde güvenilir olduğu konusunda görüş belirtebilir.

Bir itibar sistemindeki her node, servis veya başka tür etmen, çeşitli kaynaklara farklı derecelerde güvenir; o kaynaklar da kendi paylarına farklı kaynaklara, node'lara, servislere veya başka varlıklara farklı derecelerde güvenir. Böylece belirli bir etmen bilinmeyen bir varlıkla karşılaştığında, güvendiği kaynakların görüşlerine bakar.

Bir itibar sisteminin nasıl çalıştığını daha somut anlamak için şunu okuyabilirsin: [Sigma Reputation Panel Belgeleri](https://github.com/reputation-systems/sigma-reputation-panel/blob/master/README.md)

<br>


## Bu neden gerekli

*Celaut*'un çözmeyi amaçladığı şey tam olarak "*bir problemin nasıl çözüleceği*" ile "*onu nerede ve kimin çözeceği*" arasındaki ayrımdır.

Örnek olarak bir alım satım botunu ele al.

>Alım satım botları, önceden tanımlanmış algoritmalara dayanarak finansal piyasalarda alış ve satış emirleri yürüten otomatik yazılım programlarıdır. 7/24 çalışabilmeleri, piyasa değişimlerine hızla tepki verebilmeleri ve duygusal önyargıları ortadan kaldırmaları bakımından önemlidirler; bu da işlem stratejilerinde verimliliği ve tutarlılığı artırır.


<br>

Bu bağlamda, şu anda bir alım satım botu kullanmak istersen internete girer ve şunları yapabilirsin:

1. Varlık portföyünü yönetecek bir web servisi ararsın; bunun:
    1. Avantajları:
        1. Altyapıyı kendin çalıştırmana gerek yoktur.
        2. Hiçbir şey yapılandırman gerekmez.
    2. Dezavantajları:
        1. Ona itibar atfedemezsin, çünkü web servisinin geliştiricisi
        sistemin değişmediğini kanıtlayamaz (örneğin,
        bir bot çok sayıda kullanıcı kazandığında, seni daha yenisini
        kullanmaya yöneltmek için başarımını düşürebilirler).
        2. Web servisinin geliştiricileri, isteklerinden gelen verileri
        (bu durumda portföyünün hareketlerini) kötüye
        kullanmadıklarını sana güvence altına alamaz.
2. Kendi bilgisayarında (ya da bulutta) kendi başına çalıştırabileceğin bir kaynak kod ararsın (GitHub vb. üzerinde).
    1. Avantajları:
        1. Deterministiktir; şu anlamda ki (internete bağlanamıyorsa)
        davranışının ve/veya başarımının gelecekte değişmeyeceğinden emin olursun, çünkü geliştirici senin daha önce indirdiğin kaynağı değiştiremez.
        2. Servisin geliştiricisinin, isteklerinin verileri üzerinde hiçbir denetimi yoktur.
    2. Dezavantajları:
        1. Kodu çalıştırabilecek bir donanıma (altyapıya) sahip olman gerekir.
        2. Sistem yapılandırma sorunlarıyla uğraşmak zorunda kalırsın (ki bunlar çoğu zaman
        ortalama bir kullanıcının web servisini seçmesine yol açacak kadar ciddidir).

Bu iki seçeneğin karşısında *Celaut*, önceki iki çözümün avantajlarını dezavantajları olmadan almana imkân verir. Nedeni şu:



- Altyapı yönetimi gereksizdir, çünkü onu node'lar üstlenir. Bir bulut sağlayıcı aramaya gerek yoktur.

- Hiçbir yapılandırma gerekmez. Servis şartnamesi konteynerin nasıl kurulduğunu, mimarisini, ağ gereksinimlerini ve arayüzünü kapsar. Kullanıcıların bunların hiçbiriyle ilgilenmesi gerekmez.

- Servis geliştiricileri servisi denetleyemez, değiştiremez ya da içinden veri çekemez. Onu dağıtan ve çalıştıran node'ları denetlemiyorlar. Yine de onu yaratmak için teşvik edilmiş olabilirler.

<br>


## Sistem davranışı

Bu bölüm, mimarinin doğasını daha berrak biçimde göstermek amacıyla,
sistemin parçaları arasındaki etkileşimleri de kapsayan sistem davranışını anlatır.

- [Bir servisin yürütülmesi](execution_of_a_service.md)
- [Servis yük dengeleme](service_balancer.md)
- [Node el sıkışması]()
