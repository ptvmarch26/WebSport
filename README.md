# [IE213.P21] - ĐỒ ÁN XÂY DỰNG WEBSITE BÁN ĐỒ THỂ THAO PHẦN FRONT_END DÀNH CHO USER VÀ ADMIN

* Trường Đại học Công nghệ Thông tin, Đại học Quốc gia Thành phố Hồ Chí Minh (ĐHQG-HCM)
* Khoa: Khoa học và Kỹ thuật Thông tin (KH&KTTT)
* GVHD: ThS. Võ Tấn Khoa

## Danh sách thành viên
|STT | Họ tên | MSSV|Chức vụ|
|:---:|:-------------:|:-----:|:-----:|
|1. 	| Châu Đức Mạnh | 22520846 | Nhóm trưởng |
|2. 	| Võ Văn Phi Thông		| 22521435 | Thành viên |
|3. 	| Dương Anh Vũ		|	22521688 | Thành viên |
|4. 	| Phạm Quang Vũ | 22521696 | Thành viên |

## Giới thiệu
Trong bối cảnh công nghệ số ngày càng phát triển, việc mua sắm trực tuyến đã và đang trở thành một xu hướng phổ biến nhờ sự tiện lợi và đa dạng sản phẩm mà nó mang lại. Đặc biệt, nhu cầu rèn luyện sức khỏe, nâng cao thể chất của con người ngày càng tăng cao, kéo theo sự phát triển mạnh mẽ của thị trường đồ thể thao. Người tiêu dùng không chỉ tìm kiếm những sản phẩm thể thao chất lượng, phù hợp với từng bộ môn mà còn quan tâm đến yếu tố thời trang, độ bền và sự tiện dụng trong từng sản phẩm.

Nhằm đáp ứng xu hướng này, nhóm quyết định thực hiện đề tài "Xây dựng website bán đồ thể thao WTMSport" với mục tiêu tạo ra một nền tảng mua sắm tiện lợi, hiện đại và thân thiện với người dùng.

## Tính năng
|ID	|Tên tác nhân |	Mô tả tác nhân|
|:---:|:-------------:|:-----:|
|AC1	|Unauthenticated User (Người dùng chưa đăng nhập) |	Người sử dụng trang web không có tài khoản hoặc có tài khoản mà chưa đăng nhập, chỉ được thực hiện một số chức năng như xem sản phẩm, chi tiết thông tin sản phẩm, xem đánh giá của các sản phẩm, xem thông tin cửa hàng, thực hiện đặt hàng ngay với từng sản phẩm, thanh toán bằng mã qr, xem chi tiết đơn hàng vừa đặt.|
|AC2	|Authenticated User (Người dùng đã đăng nhập) |	Ngoài các chức năng của khách vãng lai, người sử dụng trang web với tài khoản đã đăng ký để đăng nhập còn có thể sử dụng them một số chức năng khác như quản lý giỏ hàng, quản lý sản phẩm yêu thích, sử dụng mã giảm giá, quản lý đơn hàng, quản lý thông báo, quản lý thông tin cá nhân.|
|AC3 |Administrator (Quản trị viên) | Là người dùng có quyền hạn cao nhất trong hệ thống. Quản trị viên có thể quản lý người dùng, quản lý đơn hàng, quản lý thông tin cửa hàng, quản lý sản phẩm,…Quản trị viên đảm bảo hoạt động chung của hệ thống, bảo mật.|

| Mã chức năng | Tên chức năng | Tác nhân | Hoàn thành |
|:---:|:-------------:|:-----:|:-----:|
|| UC1. Quản lý bán hàng ||||
| UC1.01 | Quản lý sản phẩm | AC3 | 100% |
| UC1.02 | Tìm kiếm sản phẩm | AC1, AC2 | 100% |
| UC1.03 | Lọc sản phẩm | AC1, AC2 | 100% |
| UC1.04 | Xem chi tiết sản phẩm | AC1, AC2 | 100% |
| UC1.05 | Thêm vào giỏ hàng | AC2 | 100% |
| UC1.06 | Xem giỏ hàng | AC2 | 100% |
| UC1.07 | Thêm sản phẩm vào yêu thích | AC2 | 100% |
| UC1.08 | Xem sản phẩm yêu thích | AC2 | 100% |
| UC1.09 | Mua ngay sản phẩm | AC1, AC2 | 100% |
| UC1.10 | Mua hàng | AC1, AC2 | 100% |
| UC1.11 | Thanh toán | AC1, AC2 | 100% |
| UC1.12 | Đánh giá sản phẩm | AC2 | 100% |
| UC1.13 | Quản lý đánh giá | AC3 | 100% |
|| UC2. Quản lý kho ||||
| UC2.01 | Thêm sản phẩm | AC3 | 100% |
| UC2.02 | Chỉnh sửa sản phẩm | AC3 | 100% |
| UC2.03 | Kiểm tra tồn kho | AC3 | 100% |
| UC2.04 | Xóa hàng khỏi kho | AC3 | 100% |
| UC2.05 | Thêm danh mục sản phẩm | AC3 | 100% |
| UC2.06 | Thêm danh mục con sản phẩm | AC3 | 100% |
|| UC3. Quản lý khách hàng ||||
| UC3.01 | Đăng ký | AC1 | 100% |
| UC3.02 | Đăng nhập | AC1, AC3 | 100% |
| UC3.03 | Đổi mật khẩu | AC2 | 100% |
| UC3.04 | Chỉnh sửa thông tin | AC2 | 100% |
| UC3.05 | Xem thông tin | AC2 | 100% |
| UC3.06 | Xóa tài khoản vi phạm | AC3 | 100% |
| UC3.07 | Quên mật khẩu | AC1 | 100% |
|| UC4. Quản lý đơn hàng ||||
| UC4.01 | Xác nhận đơn hàng | AC3 | 100% |
| UC4.02 | Hủy đơn hàng | AC2, AC3 | 100% |
| UC4.03 | Yêu cầu hoàn hàng | AC2 | 0% |
| UC4.04 | Xử lý hoàn hàng | AC3 | 100% |
| UC4.05 | Xem trạng thái đơn hàng | AC2, AC3 | 100% |
| UC4.06 | Cập nhật trạng thái đơn hàng | AC3 | 100% |
|| UC5. Quản lý doanh thu ||||
| UC5.01 | Xem doanh thu | AC3 | 100% |
| UC5.02 | Xem lịch sử giao dịch | AC3 | 100% |
|| UC6. Quản lý cửa hàng ||||
| UC6.01 | Cập nhật thông tin cửa hàng | AC3 | 100% |
| UC6.02 | Xem lịch sử đăng nhập, chỉnh sửa trạng thái đơn hàng | AC3 | 100% |

## Công nghệ sử dụng
* [Node.js] - Xử lý API, Back-end
* [Express] - Framework nằm trên chức năng máy chủ web của NodeJS
* [React.js] - Front-end
* [MongoDB Compass] - Cung cấp giao diện xem cơ sở dữ liệu MongoDB
* [MongoDB] - Hệ quản trị cơ sở dữ liệu phi quan hệ sử dụng để lưu trữ dữ liệu cho trang web
* [HTML-CSS-JS] - Bộ ba công nghệ web, hiện thức hóa giao diện
* [Tailwid CSS] - Framework CSS giúp thiết kế giao diện nhanh chóng
* [PayOS] - Giải pháp thanh toán trực tuyến, hỗ trợ xử lý giao dịch cho website thương mại điện tử
* [ChatGPT 4.0] - Công cụ AI hỗ trợ cải thiện trải nghiệm người dùng qua xử lý ngôn ngữ tự nhiên
* [Docker] - Đóng gói ứng dụng và môi trường triển khai dưới dạng container
* [AWS] - Nền tảng điện toán đám mây dùng để triển khai và vận hành hệ thống
* [Jenkins] - Công cụ CI/CD hỗ trợ tự động hóa build, test và deploy
  
## Tổng hợp link các github
* [FE_USER VÀ FE_ADMIN](https://github.com/ptvmarch26/WebSport)
* [BE](https://github.com/ChauManh/SportEcommerceServices)
