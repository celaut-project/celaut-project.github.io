[*<-- Quay lại trang chính*](README.md#system-behavior)


### Sơ đồ tuần tự của việc thực thi một thực thể service

![Sơ đồ ca sử dụng](assets/e29d99_service_execution_diagram.excalidraw.svg)*__Hình e29__: sơ đồ tuần tự của việc thực thi một thực thể service*

<br>

Các bên tham gia trong sơ đồ tuần tự ở trên (Hình e29) như sau:

- Service chính: đây là thực thể service yêu cầu tạo một thực thể của service khác trên node của nó.

- Node: đây là node mà service chính yêu cầu tạo thực thể mới.

- Phụ thuộc: đây là thực thể mới mà service chính muốn dùng.

<br>

Trong quá trình tuần tự, những tương tác sau đây diễn ra:

1. Thực thể của service chính gửi đặc tả của một service khác tới node của nó bằng phương thức *StartService()*. Điều này giả định rằng node sẽ lo việc thực thi một thực thể của service đó và sẽ trả về địa chỉ của thực thể mới cùng token tương ứng.

2. Sau khi nhận yêu cầu từ service chính, node lưu lại toàn bộ đặc tả hoặc, nếu đã lưu từ trước, dừng luồng yêu cầu lại (để chỉ lấy hash của service được yêu cầu).

3. Node tạo thực thể của service được yêu cầu, nạp cấu hình (tệp *__config__* ở thư mục gốc của nó) và chạy entrypoint của nó.

4. Phụ thuộc bắt đầu chạy theo đúng phần thực thi được mô tả trong entrypoint thuộc đặc tả của nó.

5. Node lấy địa chỉ của thực thể container và tính token tương ứng; token là định danh bí mật của thực thể service mới và phụ thuộc vào cách node được hiện thực. ~~Node lưu thực thể này vào sổ đăng ký như một thực thể nội bộ, và service đã yêu cầu nó làm cha của nó.~~ Cuối cùng, node trả địa chỉ và token của thực thể về cho service chính.

6. Service chính, tức bên đã yêu cầu thực thể, sử dụng phụ thuộc đó qua địa chỉ mà node đã cung cấp cho nó.

7. Service chính quyết định dừng phụ thuộc, nên nó gọi phương thức *StopService()* của node và gửi kèm token của phụ thuộc.

8. Node dừng container của phụ thuộc và gỡ nó khỏi sổ đăng ký.

>Các phương thức *StartService()* và *StopService()* là phương thức tham chiếu, nhưng có thể khác nhau giữa các bản hiện thực node. Giao diện node — thứ mà client và các service cục bộ (những service chạy node) dùng để gửi yêu cầu cũng như điều khiển tài nguyên và phụ thuộc — do node cung cấp cho các client hoặc service cục bộ mới.

>Tệp *__config__* cho biết cấu hình của mỗi service (biến môi trường, giao diện node, v.v.), vốn khác nhau tuỳ từng service vì lược đồ của nó được nêu ngay trong đặc tả của từng service. Node có thể có khả năng ghi theo một hoặc nhiều lược đồ; nếu không tương thích, nó có thể quyết định không tạo thực thể của service đó hoặc dùng một service phiên dịch.
