# Đóng góp

Chào mừng bạn gửi câu hỏi, báo lỗi và góp ý. Nói rõ trước hai điểm sau để đỡ phải đi lại nhiều lần:

- Repo này là **bản snapshot mã nguồn mở** của engine lập lá số trên [metisziwei.com](https://metisziwei.com/?from=gh-contrib), được đồng bộ định kỳ từ bản online (tần suất xem README「Nhịp độ bảo trì và đóng góp」).
- Bản mã nguồn mở **không bao gồm** thư viện câu luận, prompt giải đoán AI và bất kỳ API backend `/api/*` nào (xem README「Ranh giới mã nguồn mở」). Giải đoán AI và phân tích hợp mệnh trả về 404 trong bản mã nguồn mở là hành vi như mong đợi, bạn cần tự triển khai phần này.

## Đặt câu hỏi

- **Cách dùng, muốn trao đổi**: sang [khu thảo luận](https://github.com/Renhuai123/ziwei-doushu/discussions).
- **Nghĩ lá số lập ra không đúng**: dùng mẫu «Thắc mắc kết quả lập lá số», kèm ngày sinh dương lịch, giờ sinh chính xác đến phút, nơi sinh hoặc kinh độ, giới tính, kết quả của dự án này, cùng kết quả bạn mang ra đối chiếu. Chỉ ghi "không chính xác" thì chúng tôi không có cách nào kiểm tra.
  - Độ sáng của phụ tinh, tháng nhuận thuộc tháng nào, giờ Tý muộn có đổi ngày hay không — các phái vốn đã khác nhau, trong engine đã làm thành các chuẩn có thể chuyển đổi; loại khác biệt này không tính là bug, nhưng rất hoan nghênh bạn chỉ ra.
- **Chương trình báo lỗi, trang hiển thị bất thường**: dùng mẫu «Vấn đề chương trình», ghi rõ các bước tái hiện và nội dung báo lỗi.
- **Vấn đề của trang chính thức (metisziwei.com)**: dùng mẫu «Vấn đề trang chính thức».

Vui lòng đừng đăng số điện thoại, mã xác nhận, hay thông tin ngày sinh của người khác khi chưa được chính người đó đồng ý vào issue.

## Nộp mã nguồn

```bash
npm ci               # cài theo package-lock.json
npm run typecheck    # kiểm tra kiểu
npm test             # test hồi quy lập lá số
```

- Mỗi PR chỉ làm một việc, trong phần mô tả ghi rõ đã sửa gì và vì sao sửa.
- **Các PR làm thay đổi kết quả lập lá số**: phải kèm bằng chứng đối chiếu (nguồn trích dẫn, hoặc ảnh chụp từ phần mềm lập lá số khác), đồng thời thêm kiểm thử hồi quy vào `scripts/regression/` và đăng ký vào script `test` của `package.json`. Những thay đổi về cách giải không có nguồn trích dẫn thường không được nhận.
- CI sẽ chạy cùng một bộ kiểm tra ở mỗi lần push và mỗi PR.

## Giấy phép

Việc gửi đóng góp có nghĩa là bạn đồng ý phát hành nội dung đóng góp theo giấy phép tương ứng:

- Mã nguồn: [MIT](./LICENSE)
- Tập dữ liệu mẫu: [CC BY 4.0](./DATASET-LICENSE)
- Thư mục lời nói nguyên văn của thầy Nghê `docs/tianji-ziwei/`: [CC BY-NC-SA 4.0](./docs/tianji-ziwei/LICENSE.md), không được dùng cho mục đích thương mại

---

**Tiếng Anh.** Rất hoan nghênh issue và PR. Repo này là bản snapshot mở của bộ máy lập lá số đứng sau metisziwei.com; cơ sở dữ liệu luận giải, các prompt AI và toàn bộ route backend `/api/*` đều không được kèm theo, nên các tính năng AI trả về lỗi 404 là do thiết kế. Nếu bạn cho rằng một lá số nào đó bị sai, hãy dùng mẫu “Chart result question” kèm đầy đủ dữ liệu sinh và một kết quả tham chiếu. Trước khi mở PR, hãy chạy `npm ci`, `npm run typecheck` và `npm test`; những thay đổi ảnh hưởng đến kết quả lá số cần có bằng chứng và một bài kiểm thử hồi quy.
