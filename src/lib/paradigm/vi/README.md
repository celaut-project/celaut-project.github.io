# *Celaut*: một kiến trúc ngang hàng cho việc thiết kế và phân phối phần mềm

<br>

**Bối cảnh**

Vào những năm 1940, nhà toán học John von Neumann, cùng với Stanislaw Ulam, đã giới thiệu khái niệm automata tế bào, tạo ra những mô hình cho thấy các hành vi phức tạp có thể nảy sinh từ những quy tắc đơn giản. Dựa trên nền tảng đó, năm 1970 John Horton Conway giới thiệu "Game of Life", một automaton tế bào đã trở thành ví dụ kinh điển về việc một hệ thống có thể tiến hoá thành những mẫu hình tinh vi từ các tương tác cơ bản. Những ý tưởng này mang lại hiểu biết quý giá về cách các hệ thống phi tập trung có thể đạt tới độ phức tạp mà không cần điều khiển trung tâm, và đó chính là triết lý dẫn đường cho thiết kế của *Celaut*.

**Định nghĩa**

*Celaut* là một tập hợp các quy tắc đơn giản cho việc thiết kế và phân phối phần mềm, nhằm tạo ra một hệ thống bền bỉ, có thể mở rộng và thích nghi, thông qua các nguyên tắc **phi tập trung**, **đơn giản** và **tất định**.

**Nguyên tắc**

1. **Phi tập trung**: không có điểm kiểm soát hay điểm hỏng duy nhất, cho phép các node giao tiếp và phối hợp một cách linh hoạt.
2. **Đơn giản**: các quy tắc tối giản giúp giảm độ phức tạp, bảo đảm mỗi thành phần đều có thể được hiểu và bảo trì dễ dàng.
3. **Tất định**: service hành xử một cách có thể dự đoán, tuân theo những quy tắc đã định nhằm bảo đảm kết quả tái lập được trên các node khác nhau.

**Kiến trúc của *Celaut*: node và service**

Kiến trúc của *Celaut* được xây quanh hai yếu tố cốt lõi: **node** và **service**. Cùng nhau, chúng tạo nên một mạng phân tán trong đó mỗi phần đều đóng góp vào chức năng tổng thể, giống như các tác nhân trong một automaton tế bào.

- **Node**:
    Một node đại diện cho một máy tính hoặc thiết bị trong mạng *Celaut*, có thể giao tiếp với các node khác và quản lý việc thực thi các service. Bản chất phi tập trung của *Celaut* thể hiện ở cách các node tương tác, bảo đảm không có điểm hỏng duy nhất hay quyền điều khiển tập trung. Những trách nhiệm chính của một node gồm:

    1. **Thực thi service**: node quản lý các thực thể service, quyết định chạy chúng tại chỗ hay trải tải sang các node ngang hàng. Điều này bảo đảm việc sử dụng tài nguyên và hiệu năng ở mức tối ưu, tương tự cách các tế bào trong một automaton tế bào tương tác với hàng xóm để giữ cân bằng hệ thống.

    2. **Giao diện giao tiếp**: một giao diện vững chắc bảo đảm việc trao đổi dữ liệu giữa node và service diễn ra mượt mà, cho phép phối hợp hiệu quả. Đáng chú ý, các node không cần thống nhất trước về một giao thức giao tiếp cụ thể, vì giao diện đã che đi những chi tiết đó, tạo sự linh hoạt trong tương tác. Đặc điểm này được giải thích chi tiết hơn ở dưới.

    3. **Cấp phát địa chỉ và token**: node tạo điều kiện cho các tương tác an toàn bằng cách quản lý địa chỉ giao tiếp và token xác thực, giúp service dễ dàng tiếp cận được mà vẫn giữ được tính an toàn.

    4. **Quản lý phụ thuộc**: node bảo đảm các service có quyền truy cập tới những phụ thuộc mà chúng cần. Những phụ thuộc này, thường được gọi là "service con", có thể chạy trên cùng node hoặc trên node khác. Đặc điểm này cho phép một service cha truy cập và phối hợp với các service con của nó, bảo đảm một hệ sinh thái service trơn tru và hiệu quả, ngay cả khi các service được phân tán khắp mạng lưới.

    Một ví dụ hiện thực node bằng Python3 và Rust là **Nodo** [tại đây](https://github.com/*Celaut*-project/nodo).

- **Service**:
    Một service trong *Celaut* là một container phần mềm tất định được thiết kế để thực hiện một nhiệm vụ cụ thể. Theo nguyên tắc **hộp đen**, các service hoạt động độc lập với chi tiết của những node thực thi chúng, chỉ tập trung vào chức năng của mình. Các khía cạnh chính của service gồm:

    - **Thực thi như những thực thể cách ly**: khi người dùng yêu cầu một service, nó được gửi tới một node, và node chạy nó như một tiến trình cách ly — trong container hoặc trong máy ảo, tuỳ vào kiến trúc của node. Sự trừu tượng hoá này phù hợp với nguyên tắc **đơn giản**, vì service không cần biết gì về môi trường thực thi.

    - **Hành vi tất định**: service tuân theo những quy tắc đã định trước để bảo đảm kết quả nhất quán. Điều này phù hợp với sự nhấn mạnh của *Celaut* vào **tính tất định**: với cùng đầu vào, một service sẽ luôn cho ra cùng đầu ra, bất kể node nào thực thi nó.

    - **Thực thi phân cấp**: một đặc điểm riêng của service trong *Celaut* là khả năng yêu cầu thực thi các service khác (service con) thông qua node, qua đó cho phép những luồng công việc phức tạp. Điều này phản chiếu các hành vi nổi lên trong automata tế bào, nơi những tương tác đơn giản có thể dẫn tới những mẫu hình tinh vi hơn.

**Phối hợp động lực: danh tiếng và thanh toán**

Trong những hệ thống phi tập trung như *Celaut*, sự phối hợp không chỉ là chuyện tương tác kỹ thuật — nó còn bao gồm việc căn chỉnh động lực của tất cả các bên tham gia để hệ thống vận hành hiệu quả. *Celaut* dùng hai cơ chế then chốt để đạt được sự căn chỉnh đó:

- **Hệ thống danh tiếng**:
    Mỗi node và service đều có thể xây dựng danh tiếng dựa trên lịch sử tương tác của mình. Node và service có động lực duy trì tiêu chuẩn cao về độ tin cậy và chất lượng để giữ gìn danh tiếng. Một danh tiếng vững chắc khiến các node và người dùng khác tin tưởng và tương tác với họ, tạo ra động lực tự nhiên để hành xử công bằng và cung cấp service chất lượng. Cơ chế danh tiếng này tạo ra một dạng tự điều tiết trong mạng lưới, nơi các bên tham gia có lợi ích thiết thân trong việc giữ gìn uy tín của mình.

- **Cơ chế thanh toán**:
    Ngoài danh tiếng, sự hợp tác giữa node và service còn được hỗ trợ bởi các hệ thống thanh toán. Khi một node thực thi một service, hoặc khi các service tương tác với nhau, một khoản đền bù có thể được trao đổi cho tài nguyên đã dùng hoặc công việc đã hoàn thành. Những khoản thanh toán này tạo động lực trực tiếp để node đóng góp tài nguyên và để service mang lại giá trị, khuyến khích sự hợp tác và những trao đổi công bằng khắp mạng lưới. Cơ chế thanh toán bảo đảm việc phân bổ tài nguyên diễn ra hiệu quả, cho phép node và service hoạt động dựa trên thế mạnh và năng lực của mình.

Những cơ chế này được mô tả chi tiết hơn ở phần sau, tạo nên khung kinh tế bảo đảm tính khả thi cho cách tiếp cận phi tập trung của *Celaut*. Tương tự như cách hai node giao tiếp mà không cần thống nhất một giao thức cụ thể, các hệ thống này vận hành độc lập với kiến trúc lõi. Lý do đằng sau sự tách biệt ấy, và cách nó cho phép linh hoạt và thích nghi trong tương tác, được giải thích thêm ở dưới.

**Bắc cầu giữa khái niệm và thực hành**

Thiết kế của *Celaut* phản ánh những nguyên tắc nền tảng của automata tế bào: các quy tắc đơn giản ở tầng node và service dẫn tới một hệ thống phức tạp, thích nghi. Bằng cách phi tập trung hoá quyền kiểm soát, đơn giản hoá tương tác và bảo đảm hành vi tất định, *Celaut* tạo ra một khung linh hoạt cho việc phân phối và tự động hoá phần mềm. Điều này cho phép service tập trung vào chức năng cốt lõi trong khi node lo việc điều phối và phân phối, dẫn tới một hệ thống có thể thích nghi và mở rộng khi những yêu cầu mới xuất hiện.

**Tác động thực tế của *Celaut***

Kiến trúc của *Celaut* cho phép lặp và thử nghiệm nhanh hơn, giống như chạy mô phỏng trong một môi trường được kiểm soát. Điều này khiến nó đặc biệt giá trị trong những tình huống mà việc triển khai và kiểm thử phương pháp mới một cách nhanh chóng là thiết yếu. Với năng lực của điện toán hiện đại, *Celaut* có thể vận dụng những nguyên tắc này để mô phỏng các hệ thống phức tạp theo những cách trước đây không thể hình dung, mở ra hướng mới để cải thiện hiệu quả và hiệu năng trong nhiều ngành.

Kiến trúc này cho phép service tập trung vào chức năng của mình mà không phải bận tâm tới hạ tầng bên dưới. Về phần mình, node có thể quản lý việc thực thi các thực thể một cách hiệu quả mà không phải bận tâm tới tính hữu ích của chúng.

<br>


## Một service được đặc tả như thế nào?

Đặc tả của một service trong *Celaut* gồm ba thành phần chính:

### Container | *BOX*
Thành phần **BOX** định nghĩa môi trường mà service sẽ chạy trong đó, bảo đảm tính nhất quán trong cách service được thực thi trên các node khác nhau. Không giống các phương pháp đóng gói container khác, BOX của *Celaut* không dựa vào image hay repository bên ngoài; thay vào đó, nó nêu trực tiếp toàn bộ cấu trúc tệp cần thiết để chạy service. Nó bao gồm những chi tiết sau:

- **Kiến trúc**: nêu vi kiến trúc của phần cứng mà service dự định chạy trên đó, bảo đảm sự tương thích giữa service và node thực thi.

- **Hệ thống tệp**: hệ thống tệp là bản mô tả toàn diện cấu trúc tệp của service, bao gồm mọi tệp và thư mục cần thiết để service hoạt động. Nó gồm các tệp nhị phân, thư viện, tệp cấu hình và mọi tài nguyên cần thiết khác.
    - **Item Branches** định nghĩa cấu trúc của hệ thống tệp, mỗi nhánh đại diện cho một tệp, một liên kết tượng trưng, hoặc một cấu trúc thư mục lồng nhau.
    - Cách tiếp cận này khiến toàn bộ môi trường trở nên tự chứa, giảm sự phụ thuộc vào repository bên thứ ba và giữ được **tính tất định**, vì môi trường thực thi của service vẫn như nhau bất kể node chủ là ai.

- **Biến môi trường**: nêu các cặp khoá-giá trị mà service có thể truy cập lúc chạy, cho phép cấu hình động mà không phải thay đổi cấu trúc tệp cốt lõi.

- **Entrypoint**: định nghĩa script hoặc lệnh khởi động tiến trình chính của service khi được thực thi. Điều này bảo đảm node biết cách khởi động service cho đúng.

- **Config**: bao gồm các đường dẫn và định dạng cấu hình mà node cần nạp khi khởi động service. Nó cung cấp những thông tin cần thiết như phân bổ tài nguyên ban đầu hoặc các tham số runtime cụ thể.

- **Gateway kỳ vọng**: mô tả cách service giao tiếp với node *Celaut*, nêu rõ các giao thức và phương thức (giao thức ứng dụng gateway) mà nó kỳ vọng từ node. Thành phần này bảo đảm việc giao tiếp diễn ra mượt mà giữa service và môi trường chủ của nó, coi node như một hệ điều hành cung cấp các tương tác ở mức hệ thống.

Đặc tả BOX giúp service của *Celaut* trở nên di động, tái lập được và không phụ thuộc bên thứ ba, phù hợp với các nguyên tắc **đơn giản** và **tất định**.

### Giao diện | *API*
*API* (Application Programming Interface) trong Celaut là tập hợp các quy tắc và đặc tả xác định cách client và các service khác có thể tương tác với một service trong hệ sinh thái. Mục đích chính của nó là thiết lập một phương thức rõ ràng và nhất quán để các thành phần phần mềm khác nhau giao tiếp với nhau, bảo đảm rằng các service có thể tiếp cận và sử dụng được theo cách có thể dự đoán.

Thông qua *API*, các giao thức giao tiếp và điểm cuối được định nghĩa để một service tiếp nhận và xử lý yêu cầu. Điều này bảo đảm bất kỳ thực thể bên ngoài nào — dù là người dùng hay một service khác — đều có thể tích hợp với service đó bằng cách tuân theo một bộ chỉ dẫn chuẩn hoá, mà không cần hiểu cách vận hành bên trong của nó.

Một khía cạnh nền tảng của *API* trong Celaut là vai trò của nó đối với sự phi tập trung. Bằng việc cung cấp một giao diện được định nghĩa rõ ràng, các service có thể hoạt động tự chủ mà không cần dựa vào một bộ điều khiển tập trung để quản lý các tương tác. Điều này khiến hệ thống dễ mở rộng và bền bỉ hơn, vì mỗi service tự nó đủ khả năng giao tiếp và cộng tác với các thành phần khác của hệ sinh thái.

Đặc tả *API* cho phép client dễ dàng truy cập và sử dụng các service trong khi vẫn giữ được một cách thức tương tác nhất quán. Nó hỗ trợ nguyên tắc **phi tập trung** của *Celaut* bằng cách để các service tự chủ trong giao tiếp mà không cần dựa vào một bộ điều khiển tập trung để thương lượng giao thức.

### Mạng | *NET*
Thành phần **NET** định nghĩa phạm vi truy cập mạng bên ngoài mà một service có thể yêu cầu và tương tác. Mặc định, một service bị cách ly khỏi các mạng bên ngoài, chỉ có thể giao tiếp với service cha (client đã tạo ra nó), các service con của nó, và node *Celaut* đang thực thi nó. Sự cách ly này bảo đảm **tính tất định** và tăng cường **an toàn** bằng cách ngăn rò rỉ dữ liệu hay tương tác trái phép.

Tuy nhiên, một số service cần truy cập mạng bên ngoài để hoạt động. Chẳng hạn, một service đóng vai trò node Bitcoin cần tương tác với mạng Bitcoin rộng hơn. Để cho phép điều đó mà không làm tổn hại an toàn, *Celaut* cho phép những cơ chế sau:

- **Truy cập bên ngoài có kiểm soát**: service không truy cập trực tiếp vào các địa chỉ IP hay node bên ngoài. Thay vào đó, nó gửi một yêu cầu tới node *Celaut* của mình, nêu rõ nhu cầu truy cập một mạng cụ thể (ví dụ "bitcoin-mainnet"). Node *Celaut* sau đó kiểm chứng và cung cấp danh sách các node ngang hàng đáng tin cậy mà service có thể tương tác.

- **Service yêu cầu các node ngang hàng của mạng**: một service như node Bitcoin có thể yêu cầu thêm tài nguyên hoặc node ngang hàng bằng cách trao đổi với node *Celaut* của nó. Chẳng hạn, nó có thể yêu cầu: "Tôi cần các node ngang hàng từ 'bitcoin-mainnet'." Node đánh giá yêu cầu này và trả về danh sách các thực thể đã được kiểm chứng (có thể là những node Bitcoin khác đang chạy như service trên mạng *Celaut*).

- **Nhận biết và chuyển tiếp của node**: nếu node *Celaut* nhận yêu cầu biết rằng mình không tìm được node ngang hàng phù hợp (ví dụ trong mạng của nó không có node Bitcoin nào khác), nó sẽ tìm một node *Celaut* ngang hàng có thể đáp ứng yêu cầu đó. Điều này bảo đảm các service luôn tìm được những kết nối mạng cần thiết, ngay cả khi node *Celaut* ban đầu bị hạn chế.

Thành phần **NET** cho phép *Celaut* cân bằng giữa nhu cầu kết nối bên ngoài với các giá trị cốt lõi là **an toàn** và **tất định**, bảo đảm các service vẫn cách ly trừ khi được cho phép rõ ràng để truy cập những mạng rộng hơn.

<br><br>

Đặc tả của một service là phần then chốt của kiến trúc *Celaut*, bởi nó cho phép các service được triển khai và thực thi theo cách nhất quán và có thể dự đoán.

<br>

Node sẽ nạp service từ tệp nhị phân và cung cấp cho nó những tài nguyên cần thiết để chạy.

Không có một cách duy nhất để định nghĩa một service.
Chẳng hạn, [bản hiện thực Proto3](https://github.com/*Celaut*-project/service-lib/blob/master/node-driver/src/node_driver/gateway/protos/*Celaut*.proto#L66) là một trong nhiều biến thể khả dĩ.

<br>

Không phải mọi node đều chấp nhận mọi biến thể khả dĩ của một đặc tả service.

>Ví dụ, node A hiểu một đặc tả proto3 cụ thể và một đặc tả bằng JSON. Node B khác hiểu đặc tả JSON và một đặc tả khác bằng JSON+hệ thống tệp nén zip. Cả hai node đều có thể truyền các service theo đặc tả mà chúng cùng có, trong trường hợp này là JSON.

<br>

## Các loại vai trò người dùng trong hệ thống

Là người dùng, chúng ta có thể đóng ba loại vai trò:

- Người vận hành node (tương tự người vận hành một máy đào trong blockchain).
- Người phát triển service. Những service này có thể được bất kỳ ai chạy trên bất kỳ node nào (bất kỳ node tương thích nào, xét về kiến trúc, v.v.).
- Người dùng khởi chạy service trên các node.

Vì thế, người vận hành một node (người dùng loại 1) không bận tâm liệu đó là đào PoW, chạy một bot trading, phân tích một chuỗi DNA, hay bất kỳ việc gì mà các service của họ đang làm. Họ chỉ đơn giản thực thi những service mà người dùng loại 3 yêu cầu, đổi lấy bằng chứng thanh toán (trên một blockchain hoặc bất kỳ phương thức thanh toán nào được chấp nhận). Người phát triển (người dùng loại 2) chỉ cần gửi service tới một hoặc nhiều node, và những node đó sẽ lo việc phân phối service tới các node khác và/hoặc đưa nó lên một hệ thống danh tiếng, để người dùng (hoặc các service khác) biết có nên dùng nó không, dùng khi nào và vì sao.

>Đây là một cách nhìn đơn giản về hệ thống; nếu đưa thêm độ phức tạp vào, số vai trò người dùng khả dĩ cũng có thể tăng lên.

<br>


## Theo dấu chân tự nhiên trong các hệ sinh thái số

Hãy hình dung *Celaut* như một hệ sinh thái số, phản chiếu động thái của một hệ sinh thái sinh học ngoài tự nhiên. Trong phép so sánh này:

1. Node như những sinh vật: các node trong *Celaut* có thể ví như những sinh vật trong một hệ sinh thái tự nhiên. Mỗi node đại diện cho một thực thể riêng biệt với năng lực và chức năng của mình, giống như các loài khác nhau chiếm giữ những ổ sinh thái khác nhau. Những node này tương tác với nhau, tạo thành một mạng lưới tựa như mạng lưới sự sống liên kết chằng chịt trong các hệ sinh thái.

2. Service như những chức năng sinh học: các service trong *Celaut* tương tự các chức năng hay quá trình sinh học trong sinh vật. Mỗi service thực hiện một nhiệm vụ cụ thể, giống như các cơ quan trong cơ thể sống đảm nhiệm những chức năng chuyên biệt. Cũng như các cơ quan phối hợp nhịp nhàng để duy trì sự sống, các service cộng tác bên trong node để đáp ứng những nhu cầu tính toán đa dạng.

3. Phi tập trung như sự đa dạng: nguyên tắc phi tập trung của *Celaut* có thể ví với đa dạng sinh học trong các hệ sinh thái tự nhiên. Ngoài tự nhiên, đa dạng sinh học bảo đảm sự bền bỉ và khả năng thích nghi, khi các loài khác nhau góp phần vào sự ổn định và chức năng của hệ sinh thái. Tương tự, sự phi tập trung trong *Celaut* giảm nhẹ rủi ro gắn với điểm hỏng duy nhất và nâng cao khả năng thích nghi của hệ thống trước những điều kiện đổi thay.

4. Hiệu quả như tối ưu hoá năng lượng: hiệu quả trong *Celaut* phản chiếu sự tối ưu hoá năng lượng quan sát được ở các hệ tự nhiên. Trong hệ sinh thái sinh học, năng lượng chảy qua các lưới thức ăn, với việc sinh vật tối ưu hoá tiêu hao năng lượng để tối đa hoá sự sống sót và sinh sản. Tương tự, *Celaut* tối ưu hoá tài nguyên tính toán, phân bổ nhiệm vụ giữa các node để giảm thiểu độ trễ và lãng phí tài nguyên.

5. Đơn giản và tất định như những quy luật tự nhiên: các nguyên tắc đơn giản và tất định trong *Celaut* cộng hưởng với những quy luật nền tảng chi phối các hệ tự nhiên. Cũng như các định luật vật lý quy định hành vi của vật chất và năng lượng trong vũ trụ, những quy tắc đơn giản của *Celaut* chi phối tương tác giữa node và service. Khung tất định này bảo đảm sự nhất quán và khả năng dự đoán, tương tự tính dự đoán được của các hiện tượng tự nhiên tuân theo những định luật cơ bản.

<br>


## Các hệ thống tin cậy

Trong *Celaut*, các bộ phận khác nhau của hệ thống — node và service — không tin nhau, do đó đây là một hệ thống trustless. Chính vì thế, khó có chuyện một node thực thi service miễn phí, hay một service hoạt động mà không có khoản thanh toán trong một hợp đồng cùng bằng chứng nhận được (dĩ nhiên họ vẫn có thể làm vậy nếu muốn; với service điều đó khả thi về kinh tế vì chúng có chi phí biên bằng không).
<br>Tuy nhiên, để các bộ phận này tương tác được với nhau mà không cần tin nhau, cần có hợp đồng — những khế ước xã hội (trong một xã hội gồm node và service) — nhằm chuyển giao giá trị và gán danh tiếng cho từng bên. Vì vậy, chúng ta có hai loại hệ thống (từ một góc nhìn tương đối trừu tượng): hệ thống thanh toán và hệ thống danh tiếng.

> Một chiến lược khả dĩ cho một node là ban đầu cung cấp việc thực thi service mà không trao đổi giá trị, để nâng danh tiếng của mình, rồi khi đã có danh tiếng từ những bên khác thì bắt đầu tăng chi phí.

> Khác với node, bản chất của service là có chi phí biên bằng không; nghĩa là không có giới hạn về số đơn vị được thực thi đồng thời (vì chi phí chạy chúng rơi vào node). Do đó khá nhiều khả năng nhiều service sẽ khởi đầu với chi phí bằng không để gây dựng danh tiếng, thu phí khi đã có danh tiếng và vẫn giữ được sức cạnh tranh, rồi quay lại chi phí bằng không khi không còn cạnh tranh nổi.


### Hệ thống thanh toán

Hệ thống thanh toán cho phép chuyển giao giá trị giữa các thực thể trong *Celaut*. Dưới đây là một số loại khả dĩ:

#### Hợp đồng thông minh cấp phép

Một hệ thống hợp đồng cho phép phát hành giấy phép sử dụng cho service và node, trong đó Ledger là mạng lưới nơi sự thật được thống nhất. Như vậy, nếu A muốn thực thi một phương thức của B, nó sẽ kiểm tra hợp đồng của B, chạy lệnh đã định (bằng cách kết nối tới Ledger), và hợp đồng trên Ledger sẽ phát hành một giấy phép; A gửi giấy phép đó cho B để B cho phép thực thi phương thức mong muốn.

Có bốn loại giấy phép khác nhau dựa trên hai cách phân loại. Một mặt là giấy phép co giãn hay tĩnh; mặt khác là có tương tác hay không tương tác.

- **Giấy phép co giãn** là loại cho phép hạn chế việc sử dụng dựa trên những tham số nhất định (số lượng yêu cầu, thời gian, phương thức, biến môi trường, v.v.).

- **Giấy phép tĩnh** là loại không hạn chế việc sử dụng. B biết các khoá giấy phép, và hợp đồng cấp giấy phép mà không thể giới hạn cách dùng nó.

- **Giấy phép có tương tác** đòi hỏi B phải kết nối tới Ledger để kiểm chứng tính hợp lệ của giấy phép được cung cấp.

- Giấy phép **không tương tác** không đòi hỏi B kết nối tới Ledger để kiểm chứng tính hợp lệ của giấy phép được cung cấp.

<br>

Từ đó có bốn loại giấy phép:

- Tĩnh có tương tác (rất đơn giản — không mấy hữu dụng)
- Tĩnh không tương tác (hợp hơn với service)
- Co giãn có tương tác (hợp hơn với node)
- Co giãn không tương tác (khá phức tạp — linh hoạt)

<br>

> Ledger có thể là mạng công khai, không cần cấp phép như Bitcoin hay Ergo, hoặc nền tảng tư nhân khép kín như Stripe. Yêu cầu duy nhất là tất cả các bên tham gia đều phải hỗ trợ nó.

<br>


### Hệ thống danh tiếng

Hệ thống danh tiếng cho phép người dùng, node và service tạo nên một hệ sinh thái xã hội làm cơ sở để ra quyết định. Với node, chúng cần biết có thể tin cậy những node ngang hàng nào để nhờ thực thi service.
Với người dùng — những người chạy service — nó giúp họ xác định service nào sẽ làm tốt nhất công việc họ muốn tiến hành.

Trong *Celaut*, danh tiếng được biểu diễn dưới dạng những bản ghi trên Ledger, thể hiện một ý kiến.

Với service, bản chất tất định của chúng mang lại một góc nhìn về danh tiếng khác so với node.
Một bằng chứng danh tiếng (một bản ghi) được công bố cách đây một thời gian có thể có giá trị ngang với bằng chứng hiện tại đối với một service (điều này đúng khi service không tương tác với các mạng, vốn là dạng mặc định của một service: hoàn toàn cách ly).
Nếu nó có tương tác với một mạng nào đó, danh tiếng của nó có thể phụ thuộc vào danh tiếng của những mạng mà nó kết nối tới, và điều đó không có tính tất định ấy, bởi nó có thể đổi thay theo thời gian. Lý do là bản thân service thì không hề thay đổi.

Ngược lại, danh tiếng của một node càng gần đây thì càng có giá trị, bởi hành vi của nó có thể thay đổi theo thời gian.
Khi các node giới thiệu mình với nhau, chúng đưa ra các bằng chứng về danh tiếng của mình, và những bên khác có thể nêu ý kiến — không cần đồng thuận — về việc chúng đáng tin cậy nhiều hay ít.

Mỗi node, service, hay loại tác nhân khác trong một hệ thống danh tiếng đều tin cậy nhiều nguồn khác nhau ở những mức độ khác nhau, và đến lượt mình, các nguồn ấy lại tin cậy những nguồn, node, service hay thực thể khác ở những mức độ khác nhau. Vì thế, khi một tác nhân nào đó đối diện với một thực thể xa lạ, họ sẽ xem ý kiến của những nguồn mà mình tin cậy.

Để hiểu cụ thể hơn cách một hệ thống danh tiếng vận hành, bạn có thể đọc: [Tài liệu Sigma Reputation Panel](https://github.com/reputation-systems/sigma-reputation-panel/blob/master/README.md)

<br>


## Vì sao điều này là cần thiết

Điều mà *Celaut* muốn giải quyết chính là sự tách bạch giữa "*giải quyết một vấn đề như thế nào*" và "*ai và ở đâu giải quyết nó*".

Hãy lấy ví dụ một bot giao dịch.

>Bot giao dịch là những chương trình phần mềm tự động thực hiện lệnh mua và bán trên thị trường tài chính dựa trên các thuật toán đã định sẵn. Chúng quan trọng vì có thể hoạt động 24/7, phản ứng nhanh với biến động thị trường và loại bỏ thiên kiến cảm xúc, qua đó tăng hiệu quả và tính nhất quán của các chiến lược giao dịch.


<br>

Trong bối cảnh đó, nếu bạn muốn dùng một bot giao dịch ngay bây giờ, bạn sẽ lên mạng và có thể:

1. Tìm một dịch vụ web quản lý danh mục tài sản của bạn, với:
    1. Ưu điểm:
        1. Bạn không phải tự vận hành hạ tầng.
        2. Bạn không phải cấu hình gì cả.
    2. Nhược điểm:
        1. Bạn không thể gán danh tiếng cho nó, vì người phát triển dịch vụ web
        không thể chứng minh rằng hệ thống chưa hề thay đổi (chẳng hạn,
        khi một bot đã có đông người dùng, họ có thể giảm
        hiệu năng của nó để đẩy bạn sang một bot mới hơn).
        2. Những người phát triển dịch vụ web không thể bảo đảm với bạn rằng họ không
        lạm dụng dữ liệu từ các yêu cầu của bạn (trong trường hợp này là
        các biến động trong danh mục của bạn).
2. Tìm mã nguồn (trên GitHub, v.v.) để tự chạy trên PC của bạn (hoặc trên cloud).
    1. Ưu điểm:
        1. Nó tất định, theo nghĩa (nếu nó không kết nối được
        internet) bạn sẽ chắc chắn rằng hành vi và/hoặc hiệu năng của nó sẽ không đổi trong tương lai, bởi người phát triển không thể sửa mã nguồn mà bạn đã tải về trước đó.
        2. Người phát triển service không có quyền gì với dữ liệu trong các yêu cầu của bạn.
    2. Nhược điểm:
        1. Bạn cần có thiết bị (hạ tầng) đủ sức chạy mã nguồn đó.
        2. Bạn phải xoay xở với những vấn đề cấu hình hệ thống (mà thường
        đủ nặng để một người dùng phổ thông chọn dịch vụ web cho xong).

Đối lập với hai lựa chọn đó, *Celaut* cho phép lấy ưu điểm của cả hai giải pháp trên mà không kèm nhược điểm của chúng. Lý do là:



- Không cần quản lý hạ tầng, vì các node lo việc đó. Không cần đi tìm nhà cung cấp cloud.

- Không cần cấu hình gì. Đặc tả service đã bao gồm cách container được dựng, kiến trúc của nó, yêu cầu mạng và giao diện của nó. Người dùng không phải bận tâm bất cứ điều nào trong số đó.

- Người phát triển service không thể điều khiển, sửa đổi hay rút dữ liệu từ service. Họ không kiểm soát các node phân phối và chạy nó. Tuy vậy, họ vẫn có thể có động lực để tạo ra nó.

<br>


## Hành vi hệ thống

Phần này mô tả hành vi của hệ thống, bao gồm các tương tác giữa những bộ phận của nó,
nhằm cho thấy bản chất của kiến trúc một cách rõ ràng hơn.

- [Thực thi một service](execution_of_a_service.md)
- [Cân bằng tải service](service_balancer.md)
- [Bắt tay giữa các node]()
