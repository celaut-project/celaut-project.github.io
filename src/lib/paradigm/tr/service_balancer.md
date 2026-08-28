[*<-- Ana sayfaya dön*](README.md#system-behavior)

### Bir servis dengeleme sürecinin sıra diyagramı

Bir node, bir servisin örneklenmesi için istek aldığında, bunun ağdaki hangi node'da — yerelde mi yoksa başka bir node'da mı — örnekleneceğine node'un kendisi karar verir. Bunun için örneği her bir eşinde çalıştırmanın maliyetiyle yerelde çalıştırmanın maliyetini karşılaştırır ve en iyi bulduğunu (örneğin daha düşük olanı) seçer.

İstemciler (diğer eşler) bir servisi çalıştırma maliyetini sorduğunda, onlara servisi yerelde ya da eşlerinden birinde çalıştırma maliyetini verir.

<br>

Aşağıdaki sıra diyagramında (Şekil 4c0) yeni servis örnekleri çalıştırmak için yük dengeleme süreci gösterilmektedir. Bir servisin, bir servis örneğini çalıştırma isteğini almış olduğu varsayılır.

![Servis dengeleyici diyagramı](assets/4c0f64_service_balance_diagram.excalidraw.svg) *Şekil 4c0: servis dengeleme diyagramı*

<br>

Yukarıdaki sıra diyagramında (Şekil 4c0) yer alan taraflar şunlardır:

- Node A, bir servisin yeni örneğinin maliyetini ve oluşturulmasını isteyen node'dur.
- Node B, ağdaki başka bir node'dur.

Sıra boyunca şu etkileşimler gerçekleşir:

1. Node A, ağdaki eşlerinin her birinden servisin bir örneğini çalıştırma maliyetini ister. Bunu yaparken her eşin arayüzüne uygun maliyet sorgulama metodunu kullanır.

2. Node B, servisi yerelde çalıştırmanın maliyetini hesaplar.

3. Node A, servisi yerelde çalıştırmanın maliyetini hesaplar ve aldığı maliyetlerle karşılaştırır. Bu durumda en düşük maliyetin Node B'ye ait olduğuna karar verir.

4. Node A, Node B'den servisin bir örneğini çalıştırmasını ister, servisin şartnamesini ona gönderir ve adres ile jetonu döndürmesini bekler.

5. Node B, Node A'nın kendisine ilettiği servis örneğini çalıştırır, örneği ebeveyninin Node A olduğunu kabul ederek kendi kayıt defterine kaydeder ve adresi ile jetonunu döndürür.

6. Node A, adresi ve jetonu Node B'den alır ve örneği kayıt defterine harici bir örnek olarak kaydeder.
