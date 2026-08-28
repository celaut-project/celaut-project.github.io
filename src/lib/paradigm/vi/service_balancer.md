[*<-- Quay lại trang chính*](README.md#system-behavior)

### Sơ đồ tuần tự của quy trình cân bằng service

Khi một node nhận yêu cầu tạo thực thể của một service, chính node đó quyết định thực thể ấy nên được tạo trên node nào trong mạng — tại chỗ hay trên một node khác. Để làm việc này, nó so sánh chi phí chạy thực thể trên từng node ngang hàng của mình với chi phí chạy tại chỗ, rồi chọn phương án mà nó cho là tốt nhất (chẳng hạn phương án rẻ hơn).

Khi các client (những node ngang hàng khác) hỏi nó về chi phí chạy một service, nó sẽ đưa ra chi phí chạy service đó tại chỗ hoặc trên một trong các node ngang hàng của nó.

<br>

Trong sơ đồ tuần tự sau đây (Hình 4c0), quy trình cân bằng tải để chạy các thực thể service mới được trình bày. Giả định rằng một service đã nhận được yêu cầu chạy thực thể của một service.

![Sơ đồ cân bằng service](assets/4c0f64_service_balance_diagram.excalidraw.svg) *Hình 4c0: sơ đồ cân bằng service*

<br>

Các bên tham gia trong sơ đồ tuần tự ở trên (Hình 4c0) như sau:

- Node A là node hỏi chi phí và yêu cầu tạo thực thể mới của một service.
- Node B là một node khác trong mạng.

Trong quá trình tuần tự, những tương tác sau đây diễn ra:

1. Node A hỏi từng node ngang hàng của mình trong mạng về chi phí chạy một thực thể của service. Nó dùng phương thức lấy chi phí theo đúng giao diện của từng node ngang hàng.

2. Node B tính chi phí chạy service đó tại chỗ.

3. Node A tính chi phí chạy service đó tại chỗ và so sánh với các mức chi phí đã nhận được. Trong trường hợp này, nó quyết định rằng chi phí thấp nhất là của Node B.

4. Node A yêu cầu Node B chạy một thực thể của service, gửi đặc tả của service đó cho Node B và chờ Node B trả về địa chỉ cùng token.

5. Node B chạy thực thể service mà Node A giao cho, lưu thực thể ấy vào sổ đăng ký của mình với Node A là cha, rồi trả về địa chỉ và token của nó.

6. Node A nhận địa chỉ và token từ Node B, lưu thực thể đó vào sổ đăng ký như một thực thể bên ngoài.
