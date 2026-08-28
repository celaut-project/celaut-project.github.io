[*<-- Ana sayfaya dön*](README.md#system-behavior)


### Bir servis örneğinin yürütülmesine ait sıra diyagramı

![Kullanım senaryosu diyagramı](assets/e29d99_service_execution_diagram.excalidraw.svg)*__Şekil e29__: bir servis örneğinin yürütülmesine ait sıra diyagramı*

<br>

Yukarıdaki sıra diyagramında (Şekil e29) yer alan taraflar şunlardır:

- Ana servis: kendi node'una başka bir servisin örneklenmesini isteyen servis örneğidir.

- Node: ana servisin yeni örneğin oluşturulmasını istediği node'dur.

- Bağımlılık: ana servisin kullanmak istediği yeni örnektir.

<br>

Sıra boyunca şu etkileşimler gerçekleşir:

1. Ana servisin örneği, *StartService()* metodunu kullanarak başka bir servisin şartnamesini kendi node'una gönderir. Burada node'un bu servisin bir örneğini çalıştırmayı üstleneceği ve yeni örneğin adresini, ayrıca ilgili jetonu döndüreceği varsayılır.

2. Node, ana servisten gelen isteği aldıktan sonra şartnamenin tamamını saklar ya da zaten saklıysa istek akışını durdurur (yalnızca istenen servisin hash'ini almak için).

3. Node istenen servisi örnekler, yapılandırmasını (kök dizinindeki *__config__* dosyasını) yükler ve giriş noktasını çalıştırır.

4. Bağımlılık, kendi şartnamesindeki giriş noktasında tarif edilen yürütmeyle başlar.

5. Node, konteyner örneğinin adresini alır ve buna karşılık gelen jetonu hesaplar; jeton, yeni servis örneğinin gizli bir tanımlayıcısıdır ve node'un uygulanışına bağlıdır. ~~Node, örneği kayıt defterine dahili bir örnek olarak, onu isteyen servisi de ebeveyni olarak kaydeder.~~ Son olarak örneğin adresini ve jetonunu ana servise döndürür.

6. Örneği isteyen taraf olan ana servis, node'un kendisine sağladığı adres üzerinden bağımlılığı kullanır.

7. Ana servis bağımlılığı durdurmaya karar verir ve bunun için node'un *StopService()* metodunu, bağımlılığın jetonunu göndererek çalıştırır.

8. Node, bağımlılığın konteynerini durdurur ve onu kayıt defterinden kaldırır.

>*StartService()* ve *StopService()* metotları referans metotlardır, ancak node uygulamaları arasında farklılık gösterebilir. İstemcilerin ve yerel servislerin (node'u çalıştıran servislerin) istek göndermek, kaynakları ve bağımlılıkları denetlemek için kullandığı node arayüzü, node tarafından yeni istemcilere ya da yerel servislere sağlanır.

>*__config__* dosyası her servisin yapılandırmasını (ortam değişkenleri, node arayüzü vb.) belirtir; bu, servisten servise değişir, çünkü şeması her birinin kendi şartnamesinde bildirilir. Node bir ya da birden çok şemayla yazma yeteneğine sahip olabilir; uyumlu değilse ya servisi örneklememeye karar verebilir ya da bir çeviri servisi kullanabilir.
