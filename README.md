<div align="center">

# Tử Vi Đẩu Số · Bộ máy lập lá số mã nguồn mở

### Thuật toán là trí tuệ truyền thống công khai, không nên bị nhốt sau bức tường

[![CI](https://github.com/Renhuai123/ziwei-doushu/actions/workflows/ci.yml/badge.svg)](https://github.com/Renhuai123/ziwei-doushu/actions/workflows/ci.yml)
[![Giấy phép: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](./LICENSE)
[![Bộ dữ liệu: CC BY 4.0](https://img.shields.io/badge/dataset-CC%20BY%204.0-green.svg)](./DATASET-LICENSE)

**Tiếng Việt** · [中文](./README.zh.md) · [English](./README.en.md)

> Bản dịch tiếng Việt của [Renhuai123/ziwei-doushu](https://github.com/Renhuai123/ziwei-doushu), dịch bằng [md-translate](https://github.com/hiepnm93/md-translate) với [bảng thuật ngữ Tử Vi](./translate/glossary.json). Nếu có chỗ lệch, bản tiếng Trung là chuẩn.

</div>

**1. Tư tưởng dự án**: Tử Vi Đẩu Số là bảo vật của mệnh lý học truyền thống Trung Quốc, thầy Nghê Hải Hạ đã hệ thống hóa chính tông Tử Vi Đẩu Số trong «Thiên Kỷ». Chúng tôi mong muốn nhờ công nghệ mà nhiều người hơn có thể tiếp cận và học hỏi môn học này.

Mở mã nguồn cho thuật toán lập lá số và kho tri thức, bởi vì chúng tôi tin rằng: **thuật toán là trí tuệ truyền thống công khai, không nên bị nhốt sau bức tường**. Giá trị thật nằm ở chiều sâu giải đọc, sự tinh chỉnh trải nghiệm người dùng, và sự tích lũy từ vận hành liên tục.

**2. Thông tin dự án**: Hệ thống lập lá số Tử Vi Đẩu Số dựa trên<strong>hệ thống giảng dạy «Thiên Kỷ» của Nghê Hải Hạ</strong>, bao gồm thuật toán lập lá số đầy đủ, hệ thống Tứ Hóa, kho tri thức cách cục, dữ liệu nguyên văn cổ thư, cùng một bộ dữ liệu giải đọc Tử Vi Đẩu Số mở hoàn chỉnh: **bộ dữ liệu giải đọc v4.0 — 675 nghìn lá số × 13 chiều = 8,77 triệu đoạn giải đọc, khoảng 20,4 tỷ chữ, sau khi giải nén 56,6 GB** (phát hành ngày 2026-10-15).

| Bộ dữ liệu | Lá số | Số đoạn giải đọc | Sau khi giải nén | Khoảng năm | Số chữ giải đọc mỗi lá |
|---|---|---|---|---|---|
| **Bộ dữ liệu giải đọc v4.0** (2026-10-15) | **674.976** | **8.774.688** | **56,6 GB** | **1950–2026** (chỉ gồm ngày thật) | **khoảng 30 nghìn chữ** |
| Bộ dữ liệu mẫu v3.0 | 518.400 | 6.739.200 | 33,1 GB | 1924–1983 | khoảng 21 nghìn chữ |
| Thay đổi | +30% | +30% | **+71%** | +17 năm | +44% |

<sub>Số chữ giải đọc mỗi lá của v3.0 được ước tính bằng cách lấy mẫu 2.160 lá; các số còn lại là thống kê trên toàn bộ dữ liệu; cả hai phiên bản đều có 13 chiều cho mỗi lá.</sub>

Trải nghiệm trực tuyến: [metisziwei.com](https://metisziwei.com/?from=gh-readme), lập lá số, giải đọc bằng AI, lịch sử lá số đều mở hoàn toàn.

> **Lưu ý: về việc xét lục thân**
>
> Tử Vi Đẩu Số có giới hạn nhất định khi xét lục thân (cha mẹ, anh em, con cái...). Thầy Nghê trong «Thiên Kỷ» đã chỉ rõ: "Đẩu Số luận lục thân vốn có phần kém hơn một chút." ([buổi 2 (thượng) · 00:25:27](https://www.bilibili.com/video/BV1KJsLekEfA?p=3&t=1527)) Trong thuật số truyền thống, Thiết Bản Thần Số có ưu thế riêng khi đối chiếu lục thân ([buổi 2 (thượng) · 00:03:15](https://www.bilibili.com/video/BV1KJsLekEfA?p=3&t=195)); thầy Nghê vẫn lấy Tử Vi Đẩu Số làm cốt lõi, vì nó có thể kết hợp địa lý, môi trường và nhân sự để luận đoán tổng hợp, tạo nên hệ thống hoàn chỉnh "trên biết thiên văn, dưới biết địa lý, giữa hiểu nhân sự" ([buổi 2 (thượng) · 00:25:43](https://www.bilibili.com/video/BV1KJsLekEfA?p=3&t=1543)). Vì vậy, các phân tích liên quan đến lục thân chỉ mang tính tham khảo; trên [metisziwei.com](https://metisziwei.com/?from=gh-readme), ba chiều cha mẹ, anh em, con cái cũng đính kèm ghi chú tương tự.

---

## Mục lục

| | Chương | Tóm tắt một câu |
|---|------|--------|
| Một | [Cập nhật lần này](#1-cập-nhật-trong-đợt-này-2026-10-15) | Câu luận 13 chiều được đối chiếu từng câu với lời thầy Nghê và «Toàn Thư», phát hành bộ dữ liệu 675 nghìn lá số × 13 chiều giải đọc v4.0 |
| Hai · mới | [Bộ dữ liệu giải đọc 13 chiều v4.0](#iimới--bộ-dữ-liệu-giải-đọc-13-chiều-v40-2026-10-15) | Câu luận bản mới 2026-10-15, 675 nghìn lá số, tải theo từng năm |
| Hai | [Bộ dữ liệu mẫu 518 nghìn lá số](#2-bộ-dữ-liệu-mẫu-lá-số-518-vạn) | Thông số, tải về, công dụng, giấy phép |
| Ba | [Bắt đầu nhanh](#3-bắt-đầu-nhanh) | Clone về là chạy được ngay |
| Bốn | [Động cơ lập lá số](#4-cơ-chế-lập-lá-số) | Làm được gì, file chia thế nào, dữ liệu cổ thư |
| Năm | [Nguyên văn lời thầy Nghê trong «Thiên Kỷ · Tử Vi Đẩu Số»](#năm-lời-nguyên-văn-của-thầy-nghê-trong-thiên-kỷ--tử-vi-đẩu-số) | 14 buổi giảng + 2 đoạn bổ sung, 1.848 mục, xem đủ qua một hình, từng mục đều phát lại được |
| Sáu | [Giao diện là một bản Demo](#6-giao-diện-là-một-bản-demo) | Không phải bản đang chạy online, điểm khác nhau ghi rõ |
| Bảy | [Ranh giới mở nguồn](#7-ranh-giới-mã-nguồn-mở-những-gì-không-nằm-bên-trong) | Cái gì mở nguồn, cái gì không |
| Tám | [Nhịp bảo trì và đóng góp](#8-nhịp-độ-bảo-trì-và-đóng-góp) | Nhịp đồng bộ, quy ước issue / PR |
| Chín | [Giấy phép](#chín-giấy-phép) | Mã nguồn MIT / dữ liệu CC BY 4.0 / cổ thư public domain / lời thầy Nghê không dùng thương mại |
| Mười | [Giới thiệu và liên hệ](#10-giới-thiệu-và-liên-hệ) | Triết lý dự án, công nghệ sử dụng, thông tin liên hệ |

---

## 1. Cập nhật trong đợt này (2026-10-15)

Đợt này bám theo đợt phát hành ngày 2026-10-15 của website (phiên bản nội dung website `ca268829f7a9`):

![Tổng quan cập nhật đợt này](./docs/update-20261015.png)

**1. Phát hành bộ dữ liệu giải đọc 13 chiều v4.0** — 674.976 lá số (mỗi ngày dương lịch có thật giai đoạn 1950–2026 × 12 giờ × nam/nữ) × 13 chiều = **8.774.688 đoạn giải đọc**, phần chữ khoảng 20,4 tỷ chữ. Sau khi giải nén 56,6 GB (v3.0 là 33,1 GB, tăng 71%), nén lại chỉ còn 161 MB, chia theo năm thành 77 tệp, có thể chỉ tải các năm cần, hoặc tải một lần trọn gói cả các năm. Tải tại [Release v4.0-13d](https://github.com/Renhuai123/ziwei-doushu/releases/tag/v4.0-13d), thông số và các trường dữ liệu xem ở [phần hai · chương mới](#iimới--bộ-dữ-liệu-giải-đọc-13-chiều-v40-2026-10-15). Trước khi phát hành, 77 tệp được giải nén từng cái và so với dữ liệu gốc từng byte, kết quả trùng khớp hoàn toàn.

**2. Câu luận 13 chiều được sửa từng câu theo lời nguyên văn của thầy Nghê và nguyên văn «Toàn Thư»** (kho câu luận vẫn không mở mã nguồn, kết quả chỉnh sửa thể hiện trong bộ dữ liệu v4.0):

- Trích dẫn ghi là thầy Nghê hoặc «Toàn Thư» nhưng không tìm được nguồn thì xoá đi hoặc thay bằng lời nguyên văn tra cứu được từng chữ; lời nguyên văn của thầy Nghê ghi rõ «Thiên Kỷ» tập thứ mấy, ở phút giây nào
- Xoá các câu liên quan đến Tứ Hóa không thể xảy ra (như Thất Sát Hóa Quyền, Tử Vi Hóa Kỵ); câu luận chỉ đúng trong một điều kiện nào đó thì bổ sung điều kiện ấy
- Những câu nói hai đầu kiểu "sao có lực thì…, khi sa Hãm thì…" được sửa thành chỉ hiện đúng trường hợp thỏa mãn theo từng lá số
- Sức khỏe: tạng phủ nào cần lưu ý, đổi theo cách nhìn của thầy Nghê — lấy cung tập trung nhiều sao Sát nhất trên toàn bàn, suy ra tạng phủ theo Địa chi của cung ấy; không còn suy ra tạng phủ theo Ngũ hành của sao
- Mục "Dẫn chứng thư cổ" trong kho tri thức của website tăng từ 244 chỗ lên 405 chỗ, mỗi chỗ đều tìm thấy nguyên văn từng chữ trong «Tử Vi Đẩu Số Toàn Thư»

**3. Đồng bộ engine lập lá số** ([PR #39](https://github.com/Renhuai123/ziwei-doushu/pull/39)) — `dst-cn.ts` thêm `chinaDSTSpan(year)`, tra thời gian bắt đầu/kết thúc giờ mùa hè của Trung Quốc theo từng năm; `cities.ts` bổ sung kinh độ của các đơn vị cấp huyện trực thuộc tỉnh và các thành phố của Binh đoàn Tân Cương (Thần Nông Giá, các tỉnh thành Hải Nam, A Lạp Nhĩ v.v.), khi chọn những thành phố này làm nơi sinh thì hiệu chỉnh giờ mặt trời thực dùng được.

**4. Giấy phép** — [`DATASET-LICENSE`](./DATASET-LICENSE) thêm v4.0 vào phạm vi áp dụng; ghi rõ lời nguyên văn của thầy Nghê được trích trong phần giải đọc không nằm trong phạm vi cấp phép dữ liệu, thống nhất với CC BY-NC-SA 4.0 của lời thầy Nghê ở chương năm. Bộ dữ liệu mẫu v3.0 và các điều khoản của nó giữ nguyên.

> **Bổ sung 2026-10-24**: Chuyển phần triết lý dự án lên đầu trang — dưới tiêu đề có một dòng căn giữa "Thuật toán là trí tuệ truyền thống công khai, không nên bị nhốt sau tường rào", ngay sau là hai đoạn triết lý nguyên văn (mở đầu bằng nhãn "Triết lý dự án"), đoạn giới thiệu cũ đổi nhãn thành "Thông tin dự án"; mục "Triết lý dự án" ở chương mười đổi thành trỏ về đầu trang.

> **Bổ sung 2026-10-20**: Độ sáng sao mặc định đổi sang «Đẩu Số Toàn Thư», thống nhất với mặc định của các phần mềm lập lá số chủ lưu; mức mặc định trước đây "Hiệu chỉnh hiện đại v2" vẫn chọn được trong cài đặt phái. Bổ sung độ sáng của Thiên Diêu, Thiên Hình, Thiên Hỷ, Đại Hao, Giải Thần, Triệt Không, Phó Triệt, Tuần Không; Nguyệt Đức không còn ghi độ sáng. Đã dùng 5 lá số chuẩn đối chiếu từng cung, vị trí sao và độ sáng đều khớp toàn bộ. Lưu ý: bộ dữ liệu v4.0 (10-15) được tạo theo mức mặc định cũ "Hiệu chỉnh hiện đại v2", nên phần chữ ghi độ sáng và một số ít câu giải đọc thay đổi theo độ sáng sẽ khác so với mặc định mới.

> **Bổ sung 2026-10-06 ~ 10-07**: README thêm mục "Ghi chú: về phán đoán lục thân" (lời nguyên văn của thầy Nghê + link nguồn, hai bản tiếng Trung và tiếng Anh); link website thêm mã kênh `?from=`; đồng bộ bản đính chính ngữ liệu lời thầy Nghê (phân thuộc Nam Đẩu, Bắc Đẩu của các chính tinh).

### Cập nhật đợt trước (2026-09-21)

> **Bổ sung 2026-10-03**: 1848 câu lời nguyên văn của thầy Nghê trong «Thiên Kỷ · Tử Vi Đẩu Số» tách thành chương riêng (chương năm); hợp nhất đóng góp từ bên ngoài #29 (kiểm tra số thứ tự giờ); engine từ chối ngày dương lịch không tồn tại, bộ dữ liệu bổ sung quy ước trường dữ liệu và các vấn đề đã biết; commit package-lock.json; địa chỉ site đổi thành cấu hình được; demo ghép lá số chuyển sang dùng engine cục bộ để lập lá số, thông báo rõ ràng khi thiếu API AI; bổ sung hướng dẫn đóng góp, quy tắc ứng xử, mẫu issue và mẫu PR; thêm bản giới thiệu tiếng Anh [README.en.md](./README.en.md); bỏ hai bộ công cụ triển khai không dùng tới (vercel CLI, @cloudflare/next-on-pages), giảm dependency từ 483 xuống 185; sau đó nâng cấp lên Next.js 16 để vá lỗ hổng postcss, cảnh báo bảo mật trên GitHub từ 51 mục về 0.

![Tổng quan cập nhật đợt này](./docs/update-20260921.png)

Cách ba tháng, repo này hoàn tất một lần cập nhật đầy đủ ([PR #28](https://github.com/Renhuai123/ziwei-doushu/pull/28), 26 tệp, +2736 / −108 dòng):

**1. Đồng bộ engine lập lá số với quy ước bản online** — `algorithm.ts` từ 181 dòng lên 641 dòng, cùng lúc cập nhật sihua / types / constants / patterns / cities / famous; thêm 8 module mới (1367 dòng):

| Module | Chức năng |
|------|------|
| `true-solar-time.ts` | Hiệu chỉnh giờ mặt trời thực (chênh lệch kinh độ + phương trình thời gian) |
| `dst-cn.ts` | Giờ mùa hè Trung Quốc 1986–1991 |
| `lunar-solar.ts` | Chuyển đổi hai chiều âm lịch / dương lịch và clamp ranh giới tháng nhuận |
| `school-data.ts` / `school-tables.generated.ts` / `school-config.ts` | Dữ liệu độ sáng sao theo từng phái và bảng đối chiếu, cấu hình quy ước tháng nhuận và giờ Tý muộn |
| `shier-shen.ts` | Mười hai thần sát |
| `yunxian-context.ts` | Bối cảnh vận hạn (gồm Đồng hạn) |

**2. Bổ sung kiểm thử hồi quy và CI** — trước đây repo chưa có bất kỳ kiểm thử nào. Giờ đã có 5 bài kiểm thử hồi quy lập lá số, `npm test` chạy xong trong một lệnh, tự động chạy trên GitHub Actions mỗi lần push và PR.

**3. Sửa lỗi lệch chú thích giờ trong bộ mẫu** ([#26](https://github.com/Renhuai123/ziwei-doushu/issues/26)) — trong `famous.ts`, 11 mẫu người nổi tiếng thì có 7 mẫu chú thích giờ không khớp với chỉ mục trong `hour` (`hour` vốn là **chỉ mục Địa chi giờ 0–11**, không phải số giờ 0–23). Đã sửa và thêm kiểm thử hồi quy để ghim lại.

**4. Issue tồn đọng dọn từ 18 xuống còn 4**, những cái để lại đều đang được xử lý tiếp.

**5. Tài liệu và giấy phép** — thêm [`DATASET-LICENSE`](./DATASET-LICENSE); README bổ sung danh sách năng lực của engine, nhịp độ bảo trì, ranh giới của phần mã nguồn mở; sửa hai chỗ mô tả chưa đúng thực tế (bộ dữ liệu "quy ước trùng khớp hoàn toàn với bản online", giao diện "frontend Next.js 15 đầy đủ").

---

## II·Mới — Bộ dữ liệu giải đọc 13 chiều v4.0 (2026-10-15)

> **Vị trí tải về: bên phải kho lưu trữ này, mục [Releases → v4.0-13d](https://github.com/Renhuai123/ziwei-doushu/releases/tag/v4.0-13d)**

v4.0 được tạo lại bằng thư viện câu luận phiên bản website ngày 15-10-2026: câu luận của 13 chiều phân tích đã được đối chiếu, chỉnh từng câu với bản chép lời khóa «Thiên Kỷ» của Nghê Hải Hạ và nguyên văn «Tử Vi Đẩu Số Toàn Thư» — trích dẫn nào không tra ra nguồn thì bỏ đi hoặc thay bằng lời gốc tra được nguyên văn (lời thầy Nghê ghi rõ số buổi và mốc thời gian trong «Thiên Kỷ»), những câu liên quan Tứ Hóa không thể xảy ra thì bỏ, câu luận có điều kiện thì ghi rõ điều kiện.

### Thông số

| Hạng mục | Ghi chú |
|------|------|
| Số lá số | **674.976 lá** (dương lịch năm 1950–2026 × số ngày thật của từng tháng × 12 giờ × nam/nữ) |
| Số đoạn giải đọc | **8.774.688 đoạn** (mỗi lá số 13 chiều) |
| Chiều | Tổng quan mệnh cách, Tính cách, Tình cảm, Sự nghiệp, Tài vận, Sức khỏe, Huynh Đệ, Tử Nữ, Thiên Di, Nhân Tế, Điền Trạch, Phúc Đức, Phụ Mẫu |
| Dung lượng | Sau giải nén 56,6 GB; khi nén 161 MB (77 tệp theo năm, zstd; kèm một gói tổng hợp toàn bộ các năm `ziwei-interp-v4-all.tar`) |
| Nội dung chính | Khoảng 20,4 tỷ chữ, mỗi lá số khoảng 30.000 chữ |
| Cách tạo | Sinh tất định bằng engine lập lá số + thư viện câu luận, không qua AI, cùng một đầu vào luôn cho cùng một kết quả |
| Phiên bản nội dung | `ca268829f7a9` (ANALYSIS_CONTENT_VERSION cùng thời với website) |

**Mỗi dòng một lá số** (JSON Lines), các trường:

| Trường | Ý nghĩa |
|------|------|
| `k` | Khóa: `YYYY-MM-DD-<số thứ tự giờ>-<giới tính>`, ví dụ `1990-01-01-0-male` |
| `y` / `m` / `d` | Ngày sinh **dương lịch**; chỉ chứa ngày có thật (không còn kiểu như ngày 30 tháng 2) |
| `h` | **Số thứ tự giờ 0–11** (Tý = 0 …… Hợi = 11), không phải giờ đồng hồ; bảng đối chiếu xem mục trên |
| `g` | `male` / `female` |
| `ms` | Chính tinh đầu tiên ở cung Mệnh; nếu cung Mệnh không có chính tinh thì là `null` |
| `t` | Số chữ của từng chiều |
| `c` | Toàn văn giải đọc 13 chiều (Markdown), khóa là `overview` / `personality` / `love` / `career` / `wealth` / `health` / `family` / `children` / `move` / `friends` / `home` / `spirit` / `parents` |

**Lưu ý về phạm vi dữ liệu**
- Đây là bản giải đọc theo dạng lá số bản mệnh; những câu trên website được viết lại theo tuổi hiện tại của người đọc, đoạn quy tắc của thầy Nghê thêm ở cuối mỗi chiều, và phần giải đọc bằng AI đều không có trong bộ dữ liệu.
- Lập lá số trực tiếp theo số thứ tự giờ, chưa hiệu chỉnh giờ mặt trời thực theo nơi sinh.

### Tải về và giải nén

```bash
# Tải tất cả một lần: gh release download v4.0-13d --repo Renhuai123/ziwei-doushu -p "ziwei-interp-v4-all.tar"
# Chỉ cần vài năm thì chỉ tải những năm đó, ví dụ năm 1990
zstd -d --long=27 year-1990.jsonl.zst          # ra year-1990.jsonl
shasum -a 256 -c SHA256SUMS.txt --ignore-missing # kiểm tra checksum
```

`--long=27` bắt buộc phải có (khi nén đã dùng cửa sổ dài). Trên Windows có thể dùng zstd.exe trong [bản phát hành chính thức của zstd](https://github.com/facebook/zstd/releases), tham số giống hệt.

### Ghi chú về trích dẫn

Những lời gốc của Nghê Hải Hạ trong «Thiên Kỷ» được trích trong phần giải đọc **không thuộc phạm vi cấp phép của bộ dữ liệu này**: đó là những trích dẫn ngắn, ghi rõ số buổi và mốc thời gian để xác định nguồn gốc câu luận; bản quyền thuộc về người giữ quyền nguyên thủy. Nếu muốn dùng các lời gốc này riêng lẻ thành bộ, hãy xử lý theo giấy phép [CC BY-NC-SA 4.0](./docs/tianji-ziwei/LICENSE.md) áp dụng cho lời thầy Nghê ở chương 5. Nguyên văn «Tử Vi Đẩu Số Toàn Thư» thuộc tài sản công cộng.

### Giấy phép

Giống như v3.0: **CC BY 4.0, được phép thương mại tự do, yêu cầu duy nhất là giữ dòng ghi nguồn** (trừ lời thầy Nghê trong phần “Ghi chú về trích dẫn” ở trên), điều khoản đầy đủ xem [DATASET-LICENSE](./DATASET-LICENSE). Khi trích dẫn vui lòng ghi:

> Dự án này sử dụng **Bộ dữ liệu giải đọc mã nguồn mở Tử Vi Đẩu Số v4.0** (674.976 lá số × 13 chiều)
> Nguồn: https://github.com/Renhuai123/ziwei-doushu
> Tác giả: Vương Đa Ngư AI

---

## 2. Bộ dữ liệu mẫu lá số 51,8 vạn

> **Vị trí tải xuống: trang [Releases](https://github.com/Renhuai123/ziwei-doushu/releases/tag/v3.0-samples) ở bên phải của kho này**

Chúng tôi mở nguồn một bộ dữ liệu mẫu lá số Tử Vi Đẩu Số hoàn chỉnh, bao phủ **51,8 vạn tổ hợp lập lá số** (năm 60 × tháng 12 × ngày 30 × giờ 12 × giới tính 2), mỗi mẫu gồm cấu trúc lá số đầy đủ cùng phần văn bản luận giải theo hệ thống Nghê Hải Hạ.

### 2.1 Thông số dữ liệu

| Hạng mục | Mô tả |
|------|------|
| Số lượng mẫu | **518.400 mẫu** |
| Dung lượng tổng | 5,5 GB sau nén (chia 3 phần), 33,1 GB sau khi giải nén |
| Hệ thống | Chính tông «Thiên Kỷ» của Nghê Hải Hạ (bản thuần Phi Tinh phái đã ngừng cung cấp) |
| Nội dung | Lá số JSON + văn bản luận giải 13 chủ đề (tổng quan mệnh cách, tài lộc, sự nghiệp, tình cảm, sức khỏe…) |
| Kiểm định | Luận giải phân biệt nam mệnh/nữ mệnh 100%, mục sức khỏe có Tý Ngọ Lưu Chú 100%, nữ mệnh có nội dung chăm sóc phụ khoa 100% |
| Tiêu chí | Do **engine lập lá số bản v3 + kho luận đoán hiện hành** tạo ra; engine trực tuyến vẫn liên tục cập nhật nên kết quả bản mới có thể khác với bộ dữ liệu này |

**Quy chuẩn các trường** (mỗi mẫu do `birthInfo` tạo ra, trường hay bị đọc nhầm là `hour`):

| Trường | Ý nghĩa |
|------|------|
| `birthInfo.year` / `month` / `day` | Ngày sinh **dương lịch**: các năm 1924–1983 (đủ một vòng Giáp Tý), mỗi tháng lấy ngày 1–30 |
| `birthInfo.hour` | **Số thứ tự canh giờ 0–11**, không phải giờ đồng hồ 0–23: Tý = 0, Sửu = 1 … Hợi = 11 |
| `birthInfo.gender` | `male` / `female` |
| `birthInfo.longitude` | Cố định 120 (kinh đông 120°, chưa hiệu chỉnh giờ mặt trời thực theo từng địa phương) |
| Tên file `YYYY-MM-DD-hHH-<giới tính>.json` | Trong đó `hHH` cũng là số thứ tự canh giờ, ví dụ `h11` là giờ Hợi, không phải 11 giờ sáng |

Bảng đối chiếu số thứ tự canh giờ với giờ đồng hồ:

| Số thứ tự | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Canh giờ | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
| Giờ đồng hồ | 23–1 | 1–3 | 3–5 | 5–7 | 7–9 | 9–11 | 11–13 | 13–15 | 15–17 | 17–19 | 19–21 | 21–23 |

Người sinh 23:00–23:59 (giờ Tý muộn) lập lá số theo ngày hôm sau, canh giờ lấy 0; người sinh 00:00–00:59 (giờ Tý sớm) lập lá số theo đúng ngày hôm đó, canh giờ cũng lấy 0.

**Vấn đề đã biết: khoảng 2.520 mẫu có ngày sinh không tồn tại.** Khi tạo dữ liệu, mỗi tháng đều lấy ngày 1–30, nên ngày 30 tháng 2 cũng như ngày 29 tháng 2 của năm không nhuận cũng có mẫu, tổng cộng 105 ngày × 12 canh giờ × 2 giới tính = 2.520 mẫu, chiếm 0,49%. Engine v3 gặp ngày kiểu này không báo lỗi mà tự động chuyển sang lập lá số ngày 1–2 tháng 3, nên nội dung các mẫu này trùng với mẫu ngày 1–2 tháng 3 tương ứng. Khi dùng hãy lọc bỏ: `month = 2` và `day = 30`, hoặc `month = 2` và `day = 29` và năm đó không nhuận. Từ 2026-10-03, engine sẽ từ chối thẳng ngày không tồn tại, phiên bản dữ liệu tiếp theo sẽ không còn loại mẫu này.

### 2.2 Cách tải xuống

Truy cập [Releases](https://github.com/Renhuai123/ziwei-doushu/releases/tag/v3.0-samples) để tải các file sau:

```
ziwei-samples-v3-part1.zip.001  (1.9 GB)
ziwei-samples-v3-part2.zip.002  (1.9 GB)
ziwei-samples-v3-part3.zip.003  (1.8 GB)
SHA256SUMS.txt                  (file checksum)
```

Sau khi tải về, gộp file lại và giải nén:

```bash
# macOS / Linux
cat ziwei-samples-v3-part*.zip.* > combined.zip
unzip combined.zip

# Windows (PowerShell)
Get-Content ziwei-samples-v3-part*.zip.* -Encoding Byte -ReadCount 0 | Set-Content combined.zip -Encoding Byte
Expand-Archive combined.zip
```

### 2.3 Mục đích sử dụng

- Ngữ liệu huấn luyện để fine-tune mô hình nhỏ (51,8 vạn cặp input-output)
- Nguồn truy xuất RAG cho hội thoại AI
- Sửa `patterns.ts` rồi chạy so sánh baseline A/B
- Nghiên cứu Tử Vi Đẩu Số và phân tích dữ liệu

### 2.4 Giấy phép dữ liệu và trích dẫn

📂 **Mở nguồn hoàn toàn · Tự do thương mại hóa** —— Bạn có thể dùng bộ dữ liệu này trong bất kỳ dự án nào, bao gồm nhưng không giới hạn ở:

- Sản phẩm thương mại / SaaS / ứng dụng trả phí
- Fine-tune mô hình AI (mô hình open source hay closed source đều được)
- Phát triển thứ cấp, phân phối lại, bộ dữ liệu phái sinh
- Nghiên cứu học thuật, blog kỹ thuật, khóa giảng dạy

Không cần trả phí, không cần xin phép, không cần thông báo trước.

**Yêu cầu duy nhất là giữ lại ghi chú nguồn dữ liệu (attribution)**:

> Dự án này sử dụng **Bộ dữ liệu mẫu mở nguồn Tử Vi Đẩu Số v3.0** (518.400 mẫu)
> Nguồn: https://github.com/Renhuai123/ziwei-doushu
> Tác giả: Vương Đa Ngư AI

Đặt ở đâu cũng được:

- **Trang web / sản phẩm**: trang About / Giới thiệu / Nguồn dữ liệu / chân trang, chỉ cần một dòng kèm liên kết
- **Mô hình AI**: trường "Training Data" trong model card hoặc dataset card
- **Bài báo học thuật**: mục tài liệu tham khảo hoặc lời cảm ơn
- **Bộ dữ liệu phát hành lại**: ghi rõ nguồn gốc trong README hoặc file metadata

Chỉ có đúng một điều đó, còn lại đều tự do. Toàn bộ điều khoản xem tại [DATASET-LICENSE](./DATASET-LICENSE). Hy vọng bộ dữ liệu này giúp bạn làm ra được thứ gì đó hay — làm ra rồi nhớ ghé Xiaohongshu / Douyin / Xianyu chào **@Vương Đa Ngư AI** một tiếng 👋

---

## 3. Bắt đầu nhanh

```bash
# Clone
git clone https://github.com/Renhuai123/ziwei-doushu.git
cd ziwei-doushu

# Cài thư viện
npm install

# Cấu hình biến môi trường (chỉ xem lá số thì bỏ qua được; cấu hình AI chỉ cần khi bạn tự viết các API /api/*)
cp .env.example .env.local

# Chạy server dev
npm run dev
```

Kiểm tra cục bộ:

```bash
npm run typecheck   # kiểm tra kiểu TypeScript toàn bộ
npm test            # test hồi quy động cơ lập lá số (768 lá số × quy tắc cứng an sao Tử Vi, giờ mùa hè, ranh giới Lập Xuân, Hồng Loan Thiên Hỷ, khớp giờ sinh mẫu, biên số thứ tự giờ, ngày hợp lệ, hai Tứ Hóa đồng cung)
```

Mỗi lần push hay PR đều chạy cùng một bộ trên GitHub Actions (xem [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)).

> **Lưu ý: bản mã nguồn mở không chứa route API backend.** Lập lá số, hiển thị lá số và khởi bàn hợp bàn đều chạy ngay trong trình duyệt bằng engine của repo này, **không cần bất kỳ API Key nào**. Phần diễn giải AI (`/api/interpret`) và phân tích AI hợp bàn (`/api/heming`) cần bạn tự viết API; trước khi bạn làm vậy, hai chỗ này sẽ báo thẳng “bản mã nguồn mở không có API này”, và có cấu hình API Key thì cũng không dùng được (#30 chính là vì lý do này).

---

## 4. Cơ chế lập lá số

Toàn bộ lõi lập lá số nằm ở `lib/ziwei/`.

### 4.1 Làm được gì (khác với các thư viện lập lá số thông thường)

| Khả năng | Giải thích |
|------|------|
| **Hiệu chỉnh giờ mặt trời thực** | Tính chênh lệch giờ theo kinh độ nơi sinh + phương trình thời gian, tránh lệch hẳn một canh giờ giữa vùng đông và tây |
| **Giờ mùa hè Trung Quốc** | Tự động trừ khoảng áp dụng giờ mùa hè các năm 1986–1991 |
| **Bốn cách tính tháng nhuận** | Tháng nhuận về tháng trước / về tháng sau / chia theo ngày / theo tháng hiện tại, có thể cấu hình, không cố định một trường phái |
| **Đổi ngày ở giờ Tý muộn** | 23:00–23:59 lập lá số theo ngày hôm sau, 00:00–00:59 theo ngày hiện tại; có thể chuyển đổi chiến lược đổi ngày |
| **Độ sáng sao 7 bậc** | Miếu / Vượng / Đắc / Lợi / Bình / Bất / Hãm, đồng thời giữ thêm 3 bậc phân loại thô để hạ cấp khi hiển thị |
| **Chuyển đổi trường phái độ sáng** | Các trường phái khác nhau (kể cả những phiên bản khác nhau của phần mềm lập lá số phổ biến) đánh giá độ sáng phụ tinh không thống nhất, nên làm thành công tắc thay vì cố định |
| **Tứ Hóa và phi tinh** | Tứ Hóa năm sinh, Tứ Hóa Đại hạn / Lưu niên, tự hóa phi tinh |
| **Thập nhị thần sát** | Tầng bản mệnh khởi theo Chi năm sinh, tầng Lưu niên khởi theo Chi Lưu niên |
| **Xác định cách cục** | Thư viện quy tắc hơn 1100 dòng (Tử Phủ đồng cung, Nhật Nguyệt tịnh minh, Thất Sát triều Đẩu…) |

### 4.2 Chia tệp như thế nào

| Tệp | Giải thích |
|------|------|
| `algorithm.ts` | Toàn bộ quy trình lập lá số: an cung Mệnh, định Ngũ hành cục, an mười bốn chính tinh, an phụ tinh, bố Đại hạn và Lưu niên |
| `constants.ts` | Hằng số Thiên can Địa chi, mười bốn chính tinh, phụ tinh |
| `sihua.ts` | Hệ Tứ Hóa phi tinh (Lộc Quyền Khoa Kỵ), gồm bảng đối chiếu Tứ Hóa của từng Thiên can |
| `patterns.ts` | **Kho tri thức cách cục hơn 1100 dòng**: quy tắc xác định các cách cục kinh điển như Tử Phủ đồng cung, Nhật Nguyệt tịnh minh, Thất Sát triều Đẩu… |
| `heming-knowledge.ts` | Phương pháp luận hợp bàn: logic so đối hai lá số theo hệ thống thầy Nghê |
| `types.ts` | Định nghĩa kiểu TypeScript |
| `cities.ts` | Kinh vĩ độ các thành phố Trung Quốc, dùng để hiệu chỉnh giờ mặt trời thực |
| `famous.ts` | Dữ liệu ví dụ lá số các danh nhân lịch sử |
| `school-data.ts` / `school-tables.generated.ts` / `school-config.ts` | Dữ liệu và bảng đối chiếu trường phái độ sáng sao, cấu hình cách tính tháng nhuận và giờ Tý muộn |
| `shier-shen.ts` | Thập nhị thần sát (bản mệnh khởi theo Chi năm sinh, tầng Lưu niên khởi theo Chi Lưu niên) |
| `true-solar-time.ts` | Hiệu chỉnh giờ mặt trời thực (chênh lệch kinh độ + phương trình thời gian) |
| `dst-cn.ts` | Năm và khoảng áp dụng giờ mùa hè Trung Quốc 1986–1991 |
| `yunxian-context.ts` | Ngữ cảnh vận hạn (gồm cả xử lý Đồng hạn) |
| `lunar-solar.ts` | Chuyển đổi qua lại âm lịch / dương lịch và clamp biên tháng nhuận |

### 4.3 Nguyên văn cổ thư (`lib/classics/`)

- **Cốt Tủy Phụ** (`gusuifu.ts`) — bài ca quyết lõi của Tử Vi Đẩu Số
- **Tử Vi Đẩu Số Toàn Tập** (`quanji.ts`) — bản cổ thời Thanh
- **Tử Vi Đẩu Số Toàn Thư** (`quanshu.ts`) — bản truyền của Trần Hy Di

### 4.4 Sơ đồ tri thức SEO (`lib/seo/`)

Dữ liệu tri thức có cấu trúc của 14 chính tinh × 12 cung, có thể dùng để sinh nội dung hoặc xây dựng kho tri thức.

---

## Năm. Lời nguyên văn của thầy Nghê trong «Thiên Kỷ · Tử Vi Đẩu Số»

![Nghê Hải Hạ «Thiên Kỷ · Tử Vi Đẩu Số» một ảnh xem toàn cảnh](./docs/tianji-ziwei/overview.png)

Nguyên văn phần Tử Vi Đẩu Số trong «Thiên Kỷ» của Nghê Hải Hạ gồm tất cả **1848 mục**: 14 buổi chính khóa (buổi 2–15, phần thượng) cộng với 2 đoạn bổ sung, chia theo từng buổi thành 16 tệp, đặt trong [`docs/tianji-ziwei/`](./docs/tianji-ziwei/vi/). Mỗi mục đều kèm mốc thời gian xuất xứ, chỉ cần bấm một cái là quay về đúng giây đó trong video gốc trên Bilibili.

- **Đọc thế nào**: trước hết tìm chủ đề muốn xem trong ảnh trên, rồi bấm vào buổi tương ứng, ví dụ [buổi 5 (thượng)](./docs/tianji-ziwei/vi/5%E4%B8%8A.md) (Tử Vi tại Tý), [buổi 13 (thượng)](./docs/tianji-ziwei/vi/13%E4%B8%8A.md) (Sát Phá Tham, tam hội Khoa Quyền Lộc).
- **Từ đâu ra**: lấy từ kho chị em [nihai-tianji-corpus](https://github.com/Renhuai123/nihai-tianji-corpus), lấy kho ngữ liệu làm chuẩn, sẽ đồng bộ theo kho ngữ liệu.
- **Có dùng thương mại được không**: **Không**. Nội dung chương này riêng áp dụng giấy phép CC BY-NC-SA 4.0, xem chi tiết tại [Chín. Giấy phép](#chín-giấy-phép).

---

## 6. Giao diện là một bản Demo

Mã giao diện nằm ở `app/` và `components/`. Giao diện trong kho mã là **một ví dụ tối giản có thể chạy được**, nhiệm vụ là khởi động engine lập lá số và vẽ ra lá số, để bạn tiện xây dựng sản phẩm riêng trên nền đó. **Giao diện của bản thương mại trực tuyến không nằm trong phạm vi mã nguồn mở**, khoảng cách giữa hai bản rất lớn:

| Trang / Thành phần | Kho này (Demo) | Bản thương mại trực tuyến |
|------|------|------|
| Trang lập lá số `app/chart/page.tsx` | 75 dòng | 1227 dòng |
| Bảng giải đoán `InsightPanel` | 467 dòng | 5088 dòng |
| Ô lá số `ChartBoard` | 285 dòng | 1334 dòng |
| Ô cung vị `PalaceCell` | 201 dòng | 1192 dòng |
| Trang hợp lá số `app/heming/page.tsx` | 368 dòng | 1937 dòng |

**Những gì Demo chạy được**: form thông tin ngày sinh, ô lá số và chi tiết cung vị, chuyển đổi Bản mệnh / Đại hạn / Lưu niên, trình đọc cổ thư (tìm kiếm toàn văn), bách khoa mệnh lý (14 chính tinh × 12 cung vị), giao diện sáng/tối, tương thích trên di động.

**Những gì Demo không có**: giao diện tương tác đã làm lại trên bản trực tuyến, giải đoán AI dạng streaming, đồ thị hợp lá số, thẻ chia sẻ, và **nội dung lời luận đoán** (`db-analysis.ts` chỉ là bản cài đặt giữ chỗ). Nói cách khác, Demo vẽ được lá số, nhưng không thể đưa ra bộ giải đoán như bản trực tuyến.

---

## 7. Ranh giới mã nguồn mở: những gì không nằm bên trong

| | Nội dung |
|---|---|
| ✅ **Mã nguồn mở** | Động cơ lập lá số (`lib/ziwei/`), nguyên văn cổ thư thuộc phạm vi công cộng (`lib/classics/`), đồ thị tri thức SEO (`lib/seo/`), giao diện Demo, bộ dữ liệu mẫu 518 nghìn, bộ dữ liệu diễn giải 13 chiều v4.0 |
| ❌ **Không mã nguồn mở** | Kho đoạn ngữ (`lib/ziwei/db-analysis.ts` chỉ là phần giữ chỗ, bản trực tuyến là hàng vạn dòng đoạn ngữ theo 13 chủ đề), prompt diễn giải AI, API backend (`/api/interpret` v.v.), hệ thống người dùng (đăng nhập / thành viên / thanh toán), bảo mật phía máy chủ (chữ ký, chống lạm dụng, watermark), cấu hình triển khai |

Nếu bạn cần khả năng diễn giải AI, có thể tham khảo kho tri thức trong `lib/ziwei/patterns.ts` và `heming-knowledge.ts`, kết hợp với bất kỳ LLM nào để tự xây dựng prompt.

---

## 8. Nhịp độ bảo trì và đóng góp

Repo này là **bản snapshot mở của engine lập lá số + bộ dữ liệu**, không phải một sản phẩm mã nguồn mở được bảo trì toàn thời gian, nói rõ để mọi người khỏi phải đoán:

- **Đồng bộ engine**: đồng bộ lớp engine của `lib/ziwei/` theo từng bản phát hành trực tuyến rồi đánh tag; thư viện câu phán, phần giải đoán AI và frontend trang web thương mại không nằm trong phạm vi đồng bộ.
- **Issue**: có đọc, nhưng có thể phản hồi không kịp thời; các issue có kèm bước tái hiện hoặc ví dụ lá số cụ thể (năm tháng ngày giờ + giới tính + mục nào sai) sẽ được xử lý trước.
- **PR**: hoan nghênh, đặc biệt là kiểm thử hồi quy, hiệu chỉnh tiêu chí, tài liệu. Với các thay đổi chạm tới tiêu chí lập lá số, vui lòng đính kèm căn cứ (văn bản gốc trong cổ thư hoặc bảng đối chiếu kiểm chứng được).

---

## Chín. Giấy phép

Kho lưu trữ này được cấp quyền theo bốn phần. Ba phần đầu là giấy phép mở, **dùng thương mại không giới hạn**; riêng thư mục nguyên văn lời thầy Nghê thì **không cho phép thương mại**:

| Nội dung | Giấy phép | Nói ngắn gọn |
|------|------|--------|
| **Mã nguồn** (`lib/`, `app/`, `components/`) | [MIT License](./LICENSE) | Lấy xài thoải mái, chỉ cần giữ nguyên tệp LICENSE |
| **Dữ liệu** (bộ dữ liệu 518 nghìn mẫu v3.0 và bộ dữ liệu diễn giải 13 chiều v4.0 trong Releases) | [CC BY 4.0](./DATASET-LICENSE) · yêu cầu ghi công | Dùng thương mại cũng được, **chỉ cần ghi rõ nguồn dữ liệu** |
| **Nguyên văn cổ thư** (Cốt Tủy Phú, Tử Vi Đẩu Số Toàn Tập / Toàn Thư…) | Public Domain | Sách cổ đều thuộc quyền công cộng, không tồn tại bản quyền |
| **Nguyên văn lời thầy Nghê** ([`docs/tianji-ziwei/`](./docs/tianji-ziwei/vi/)) | [CC BY-NC-SA 4.0](./docs/tianji-ziwei/LICENSE.md) | Được trích dẫn, đăng lại miễn ghi rõ nguồn; **không cho dùng thương mại**, nếu chỉnh biên thì dùng cùng giấy phép này |

**Một câu tóm lại**: mã nguồn và dữ liệu cứ lấy mà dùng, thương mại cũng được, chỉ cần kèm theo link nguồn; nguyên văn lời thầy Nghê chỉ dùng cho việc học tập, nghiên cứu phi thương mại (nguyên văn lời thầy Nghê được trích trong phần diễn giải bộ dữ liệu cũng không nằm trong phạm vi cấp quyền dữ liệu).

---

## 10. Giới thiệu và Liên hệ

### Triết lý dự án

Xem phần đầu trang này. Muốn tự dựng? Code đều ở đây, cứ lấy mà dùng. Ngại phiền? Vào [metisziwei.com](https://metisziwei.com/?from=gh-readme) dùng luôn.

### Công nghệ sử dụng

- **Framework**: Next.js 16 (App Router)
- **Ngôn ngữ**: TypeScript
- **Giao diện**: Tailwind CSS + hệ thống thiết kế CSS Variables
- **Lập lá số**: dựa trên [iztro](https://github.com/SylarLong/iztro) + lunar-javascript
- **Hiệu ứng động**: Framer Motion

### Liên hệ

- Nền tảng trực tuyến: [metisziwei.com](https://metisziwei.com/?from=gh-readme) (đã hoàn tất đăng ký ICP: ICP Trùng Khánh số 2026013379-1)
- Báo lỗi, gửi bản sửa: xem [CONTRIBUTING.md](./vi/CONTRIBUTING.md); trao đổi cách dùng vui lòng vào [Khu thảo luận](https://github.com/Renhuai123/ziwei-doushu/discussions)
- 💕 Bấm một cái cho phát tài: theo dõi **Vương Đa Ngư AI** trên Xiaohongshu / Douyin / Xianyu / X, xem ngay khi lên sóng + mở khóa thêm nhiều kiến thức Tử Vi bổ ích ~
