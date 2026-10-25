/**
 * 《紫微斗数全书》— 核心精选
 *
 * 公版（明代罗洪先编）
 * 是紫微斗数最系统的古籍，强调宫位关系与四化，全本约 10 万字。
 */

import type { Book } from '../types';

export const ziWeiQuanShu: Book = {
  title: 'Tử Vi Đẩu Số Toàn Thư',
  slug: 'quanshu',
  dynasty: 'Đời Minh',
  author: 'La Hồng Tiên biên soạn',
  intro: 'Cổ thư hệ thống nhất của Tử Vi Đẩu Số, nhấn mạnh mối quan hệ giữa mười hai cung và Tứ Hóa. Từ đời Thanh về sau, đây là giáo trình chính của người học Tử Vi.',
  wordCount: 100000,
  chapters: [
    {
      title: 'Luận mười hai cung · Cung Mệnh',
      subtitle: 'Gốc rễ của việc xem mệnh',
      paragraphs: [
        {
          id: 'qs-1-1',
          idx: 1,
          text: 'Cung Mệnh là gốc rễ của cả một đời người, là then chốt của vạn sự. Cung Mệnh đã định thì cách cục cả đời đã định. Xem cung Mệnh, trước hết xem chính tinh, kế đến xem phụ tinh và sát tinh, rồi xem Tứ Hóa cùng sự chiếu hội của tam phương tứ chính.',
        },
        {
          id: 'qs-1-2',
          idx: 2,
          text: 'Chính tinh cung Mệnh Miếu Vượng thì chủ về lợi thế bẩm sinh, làm việc nhẹ công nhiều quả; rơi vào Hãm thì chủ về bất lợi bẩm sinh, nhưng lại có thể thành đại sự. Người Hãm có hai chữ “không cam” thúc đẩy, thường bùng nổ được những bước lội ngược dòng mà mệnh cách Miếu Vượng không làm nổi.',
        },
        {
          id: 'qs-1-3',
          idx: 3,
          text: 'Cung Mệnh gặp Lục Cát tinh (Tả Phù, Hữu Bật, Văn Xương, Văn Khúc, Thiên Khôi, Thiên Việt) thì cả đời quý nhân không dứt; gặp Lục Sát tinh (Kình Dương, Đà La, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp) thì nhiều trắc trở mài giũa, nhưng nếu chịu đựng vượt qua thì lại thành người lớn.',
        },
      ],
    },
    {
      title: 'Luận mười hai cung · Cung Tài Bạch',
      subtitle: 'Nơi nguồn tiền tụ lại',
      paragraphs: [
        {
          id: 'qs-2-1',
          idx: 1,
          text: 'Cung Tài Bạch chủ về nguồn tiền, thu nhập và cách quản lý tiền của cả đời. Chính tinh cung Tài Bạch khác nhau thì cách kiếm tiền khác nhau: Tử Vi tại Tài chủ về tiền quan lộc, Vũ Khúc tại Tài chủ về tiền buôn bán, Thái Âm tại Tài chủ về tiền nhà đất, Cự Môn tại Tài chủ về tiền tài ăn nói.',
        },
        {
          id: 'qs-2-2',
          idx: 2,
          text: 'Cung Tài Bạch Hóa Lộc nhập Mệnh thì nguồn tiền rộng mở; cung Tài Bạch Hóa Kỵ thì tiền đến rồi đi; cung Tài Bạch gặp Lộc Tồn thì tích lũy ổn định; cung Tài Bạch gặp Không Kiếp thì hao tài, chỉ còn hư danh.',
        },
      ],
    },
    {
      title: 'Luận mười hai cung · Cung Quan Lộc',
      subtitle: 'Gốc của sự nghiệp',
      paragraphs: [
        {
          id: 'qs-3-1',
          idx: 1,
          text: 'Cung Quan Lộc chủ về sự nghiệp, địa vị và thành tựu xã hội. Chính tinh cung Quan Lộc khác nhau thì hướng sự nghiệp khác nhau: Tử Vi tại Quan hợp nền tảng lớn, vị trí cao; Thái Dương tại Quan hợp công chức, danh tiếng; Vũ Khúc tại Quan hợp tài chính, thực nghiệp; Liêm Trinh tại Quan hợp người văn võ song toàn.',
        },
        {
          id: 'qs-3-2',
          idx: 2,
          text: 'Cung Quan Lộc Hóa Quyền nhập Mệnh thì tự đảm đương được một phương; Hóa Lộc nhập Quan thì tiền đến từ nghề nghiệp; Hóa Kỵ nhập Quan thì chốn công sở nhiều trắc trở.',
        },
      ],
    },
    {
      title: 'Luận mười hai cung · Cung Phu Thê',
      subtitle: 'Khí chất của người phối ngẫu',
      paragraphs: [
        {
          id: 'qs-4-1',
          idx: 1,
          text: 'Cung Phu Thê chủ về khí chất của người phối ngẫu và tình trạng hôn nhân. Cung Phu Thê có Tử Vi thì người phối ngẫu đoan trang có uy quyền, nên lập gia đình muộn; cung Phu Thê có Tham Lang thì người phối ngẫu đa tình, đào hoa nặng; cung Phu Thê có Thiên Lương thì người phối ngẫu chín chắn điềm đạm, lớn tuổi hơn.',
        },
        {
          id: 'qs-4-2',
          idx: 2,
          text: 'Cung Phu Thê Hóa Kỵ xung Mệnh thì hôn nhân nhiều trắc trở. Cung Phu Thê gặp Lục Sát thì cần đặc biệt lưu ý sự mài giũa trong tình cảm. Cung Phu Thê gặp Lục Cát thì người phối ngẫu là quý nhân.',
        },
      ],
    },
    {
      title: 'Luận Tứ Hóa',
      subtitle: 'Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ',
      paragraphs: [
        {
          id: 'qs-5-1',
          idx: 1,
          text: 'Tứ Hóa là tinh hoa của lá số: Hóa Lộc chủ tiền tài, Hóa Quyền chủ thế lực, Hóa Khoa chủ danh tiếng, Hóa Kỵ chủ bệnh tật. Cung vị nơi Tứ Hóa đóng quyết định các nút thắt của những sự kiện lớn trong đời.',
        },
        {
          id: 'qs-5-2',
          idx: 2,
          text: 'Tứ Hóa sinh niên là Tứ Hóa bản mệnh, mãi mãi cố định; thầy Nghê nhấn mạnh Tứ Hóa tinh không động, chỉ xem Đại hạn, Lưu niên đi đến đâu. Các phép tự hóa, can cung phi hóa, lai nhân cung của phái Phi Tinh phương Bắc, thầy Nghê không chủ trương dùng.',
        },
        {
          id: 'qs-5-3',
          idx: 3,
          text: 'Hóa Lộc nhập tam phương tứ chính cung Mệnh: nguồn tiền ổn định, duyên rộng, năng lực đổi ra được tiền. Hóa Lộc nhập Phu Thê: hôn nhân ngọt ngào. Hóa Lộc nhập Quan Lộc: sự nghiệp và nguồn tiền tương ứng nhau.',
        },
        {
          id: 'qs-5-4',
          idx: 4,
          text: 'Hóa Kỵ nhập tam phương tứ chính cung Mệnh: cả đời có bài học sâu sắc, nên đối diện chứ đừng trốn tránh. Hóa Kỵ nhập Phu Thê: hôn nhân nhiều mài giũa. Hóa Kỵ nhập Quan Lộc: sự nghiệp nhiều trắc trở, nhưng rèn luyện xong lại thành nhân tài chuyên môn.',
        },
      ],
    },
    {
      title: 'Cách Cơ Nguyệt Đồng Lương',
      subtitle: 'Mệnh tích lũy ổn định',
      paragraphs: [
        {
          id: 'qs-6-1',
          idx: 1,
          text: 'Bốn sao Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương cùng vào tam phương tứ chính cung Mệnh thì gọi là cách Cơ Nguyệt Đồng Lương. Người này nho nhã, thông minh, giỏi mưu tính, hợp nhất với các nghề cần tích lũy ổn định như công chức, học thuật, văn nghệ, y tế, dịch vụ.',
        },
        {
          id: 'qs-6-2',
          idx: 2,
          text: 'Cơ Nguyệt Đồng Lương làm lại nhân — cổ nhân nói cách này hợp làm công chức, hành chính văn thư, an ổn cả đời. Lại gặp Xương Khúc, Hóa Khoa thì danh tiếng vang xa. Kỵ nhất sát tinh quá nhiều, khi ấy ngược lại nhiều biến động khó yên.',
        },
      ],
    },
    {
      title: 'Cách Song Lộc triều viên',
      subtitle: 'Giàu sánh Đào Chu',
      paragraphs: [
        {
          id: 'qs-7-1',
          idx: 1,
          text: 'Hóa Lộc và Lộc Tồn cùng hội vào tam phương tứ chính cung Mệnh thì gọi là cách Song Lộc triều viên. Cổ nhân nói “Song Lộc triều viên, giàu sánh Đào Chu”, chủ về cả đời không lo tiền bạc, thường được cả chính tài lẫn hoạnh tài.',
        },
        {
          id: 'qs-7-2',
          idx: 2,
          text: 'Song Lộc triều viên kỵ nhất Không Kiếp — Không Kiếp xung vào thì Song Lộc chỉ còn hư danh. Cần thấy Tả Phù, Hữu Bật hoặc Văn Xương, Văn Khúc mới thành chính cách.',
        },
      ],
    },
  ],
};
