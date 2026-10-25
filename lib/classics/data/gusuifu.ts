/**
 * 《骨髓赋》— 紫微斗数核心口诀
 *
 * 公版（明代刊本）。是紫微斗数最权威、最浓缩的口诀，长约 1500 字。
 * 倪师在《天纪》中多次援引此赋。
 */

import type { Book } from '../types';

export const guSuiFu: Book = {
  title: 'Cốt Tủy Phú',
  slug: 'gusuifu',
  dynasty: 'Đời Minh',
  author: 'Cổ thư Tử Vi lưu truyền (không rõ tác giả)',
  intro: 'Khẩu quyết cô đọng nhất của Tử Vi Đẩu Số, toàn văn khoảng 1500 chữ. Nghê Hải Hạ nhiều lần dẫn bài phú này trong «Thiên Kỷ»; đây là kinh điển người học Tử Vi phải đọc.',
  wordCount: 1500,
  chapters: [
    {
      title: 'Tổng luận',
      subtitle: 'Lập luận cơ bản của Tử Vi Đẩu Số',
      paragraphs: [
        {
          id: 'gsf-1-1',
          idx: 1,
          text: 'Thái Cực tinh diệu là chủ của các sao. Tử Vi là đế tọa, tôn quý nhất trong các sao. Thiên Phủ là lệnh tinh, Nam Bắc Đẩu hóa Lộc, hóa Quyền, hóa Lệnh; Tả Phù, Hữu Bật là sao chủ việc tế tự.',
        },
        {
          id: 'gsf-1-2',
          idx: 2,
          text: 'Tử Vi là vua, lấy Tả Phù, Hữu Bật làm tướng. Thiên Phủ là bề tôi, lấy Lộc Tồn làm kho phủ. Thiên Cơ là thiện, Thiên Lương là ấm đức, gặp thì cát; Liêm Trinh là tù, Phá Quân là hao, gặp thì hung.',
        },
        {
          id: 'gsf-1-3',
          idx: 3,
          text: 'Cốt yếu của việc xem mệnh là trước hết xem cung Mệnh. Chính tinh cung Mệnh định cách cục, tam phương tứ chính định chỗ dụng võ. Kế đến xem cung Thân: cung Thân định cảnh tuổi già và nơi nương tựa. Rồi xem Đại hạn, Lưu niên để định nhịp tiến lui cả đời.',
        },
      ],
    },
    {
      title: 'Luận sao Tử Vi',
      subtitle: 'Đế tọa tôn quý, được phụ tá thì quý',
      paragraphs: [
        {
          id: 'gsf-2-1',
          idx: 1,
          text: 'Tử Vi là sao đế tọa: được Tả Hữu thì quý, được Xương Khúc thì tú, được Khôi Việt thì có quý nhân nâng đỡ. Tử Vi đứng một mình không phụ tá thì dù quý cũng không lâu; được cát tinh của tam phương tứ chính chiếu hội mới là đại cách chính tông.',
        },
        {
          id: 'gsf-2-2',
          idx: 2,
          text: 'Tử Vi tại Tý, Ngọ là cái quý của “ngồi hướng nam, quay lưng về bắc”, chủ đại phú đại quý; Tử Vi tại Sửu, Mùi đồng cung với Phá Quân, chủ cương nghị quyết đoán; Tử Vi tại Dần, Thân đồng cung với Thiên Phủ, gọi là cách “Tử Phủ đồng cung”, chủ phẩm hạnh ngay thẳng, cơm áo đầy đủ.',
        },
        {
          id: 'gsf-2-3',
          idx: 3,
          text: 'Tử Vi ở cung Quan Lộc, không bị sát xung phá, ắt làm quan cao; Tử Vi ở cung Điền Trạch, chủ có tổ nghiệp, lại tự tạo thêm được; Tử Vi ở cung Phu Thê, chủ người phối ngẫu đoan trang, khí chất bất phàm, nhưng nên kết hôn muộn, không nên sớm.',
        },
        {
          id: 'gsf-2-4',
          idx: 4,
          text: 'Tử Vi kỵ Không Kiếp, chủ có ngôi mà không có lộc. Tử Vi kỵ vua cô độc không phụ tá, chủ đỉnh núi lẻ loi, khó thành việc lớn. Tử Vi hóa Quyền chủ độc đoán, Tử Vi hóa Khoa chủ danh tiếng, Tử Vi hóa Kỵ chủ bị người chế ngự.',
        },
      ],
    },
    {
      title: 'Luận sao Thất Sát',
      subtitle: 'Tướng tinh cô độc, hợp võ nghiệp',
      paragraphs: [
        {
          id: 'gsf-3-1',
          idx: 1,
          text: 'Thất Sát là tướng tinh, tính cương nghị quyết đoán. Thất Sát thủ Mệnh không thích đồng cung với các cát tinh, đi con đường riêng mới là bản cách. Thất Sát gặp Không Kiếp, chủ cô độc phiêu bạt, sự nghiệp khó thành.',
        },
        {
          id: 'gsf-3-2',
          idx: 2,
          text: 'Cách Thất Sát triều Đẩu: Thất Sát ở Tý, Ngọ hoặc Dần, Thân, cung đối có Tử Vi, Thiên Phủ chiếu, chủ tước lộc hưng vượng. Hợp nhất với quân đội, cảnh sát, võ nghiệp, mở mang bờ cõi. Khí quý cả đời khó cản, nhưng phải qua rèn luyện mới thành đại khí.',
        },
        {
          id: 'gsf-3-3',
          idx: 3,
          text: 'Thất Sát gặp Dương Đà, chủ hình thương huyết quang; Thất Sát gặp Hỏa Linh, chủ uy vũ cương liệt; Thất Sát gặp Hóa Lộc, chủ cả đời võ quý; Thất Sát gặp Hóa Kỵ, ngược lại chủ tiêu trầm, sự nghiệp nhiều thất bại.',
        },
      ],
    },
    {
      title: 'Cách Sát Phá Tham',
      subtitle: 'Mệnh khai sáng, xông pha, nhiều biến động',
      paragraphs: [
        {
          id: 'gsf-4-1',
          idx: 1,
          text: 'Ba sao Thất Sát, Phá Quân, Tham Lang hội ở Mệnh, Thiên Di, Tài Bạch, Quan Lộc thì gọi là “cách Sát Phá Tham”. Chủ cả đời nhiều biến động, không cam bình thường, hợp khởi nghiệp, quân đội, cảnh sát, kinh doanh bán hàng. Thời trẻ dễ bốc đồng thất lợi, sau trung niên mới ổn định giữ thành.',
        },
        {
          id: 'gsf-4-2',
          idx: 2,
          text: 'Tam phương của Sát Phá Tham có Hóa Lộc hoặc Hóa Quyền, chủ động mà có lực, có thể thành đại sự; nếu tam phương sát tinh quá nặng (Dương Đà Hỏa Linh cùng chiếu), chủ động mà không thành, nên tĩnh thủ.',
        },
      ],
    },
    {
      title: 'Cơ Nguyệt Đồng Lương',
      subtitle: 'Tích lũy ổn định, hợp công chức',
      paragraphs: [
        {
          id: 'gsf-5-1',
          idx: 1,
          text: 'Bốn sao Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương cùng vào Mệnh, Thiên Di, Tài Bạch, Quan Lộc thì gọi là “cách Cơ Nguyệt Đồng Lương”. Chủ nho nhã, thông minh, giỏi mưu tính. Hợp nhất với các nghề cần tích lũy ổn định như công chức, học thuật, văn nghệ, y tế, dịch vụ; không nên mạo hiểm lớn, đầu cơ lớn.',
        },
        {
          id: 'gsf-5-2',
          idx: 2,
          text: 'Cơ Nguyệt Đồng Lương làm lại nhân — cổ nhân nói cách này hợp làm công chức, hành chính văn thư, an ổn cả đời. Lại gặp Xương Khúc, Hóa Khoa thì danh tiếng vang xa. Kỵ nhất sát tinh quá nhiều, khi ấy ngược lại nhiều biến động khó yên.',
        },
      ],
    },
    {
      title: 'Luận Tứ Hóa tinh',
      subtitle: 'Cát hung của Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ',
      paragraphs: [
        {
          id: 'gsf-6-1',
          idx: 1,
          text: 'Hóa Lộc chủ tiền tài, chủ duyên, chủ năng lực đổi ra được tiền; Hóa Quyền chủ quyền, chủ quyết đoán, chủ tự đảm đương một phương; Hóa Khoa chủ danh, chủ quý nhân, chủ văn thư; Hóa Kỵ chủ bệnh, chủ sát, chủ bài học sâu sắc.',
        },
        {
          id: 'gsf-6-2',
          idx: 2,
          text: 'Hóa Lộc nhập Mệnh, nguồn tiền rộng mở; Hóa Quyền nhập Mệnh, gánh được trọng trách; Hóa Khoa nhập Mệnh, danh tiếng vang xa; Hóa Kỵ nhập Mệnh, phải qua rèn luyện mới thành người có ích.',
        },
        {
          id: 'gsf-6-3',
          idx: 3,
          text: 'Hóa Kỵ nhập Tài, chủ tiền đến rồi đi; Hóa Kỵ nhập Quan, chủ sự nghiệp bị cản trở; Hóa Kỵ nhập Phu Thê, chủ hôn nhân nhiều trắc trở; Hóa Kỵ nhập Tử Tức, chủ duyên con cái mỏng hoặc cha mẹ con cái va chạm.',
        },
        {
          id: 'gsf-6-4',
          idx: 4,
          text: 'Lộc Tồn và Hóa Lộc cùng hội ở tam phương cung Mệnh thì gọi là “Song Lộc triều viên”, chủ giàu sánh Đào Chu; Hóa Khoa và Hóa Quyền cùng hội thì gọi là “Khoa Quyền song hội”, chủ danh và quyền đều đẹp.',
        },
      ],
    },
    {
      title: 'Luận Phụ Bật Khôi Việt',
      subtitle: 'Cái quý của Lục Cát tinh',
      paragraphs: [
        {
          id: 'gsf-7-1',
          idx: 1,
          text: 'Tả Phù, Hữu Bật là “tướng tinh”, chủ trợ lực, quý nhân; Văn Xương, Văn Khúc là “văn tinh”, chủ thông minh tuấn tú; Thiên Khôi, Thiên Việt là “quý nhân tinh”, chủ lúc then chốt có người nâng đỡ.',
        },
        {
          id: 'gsf-7-2',
          idx: 2,
          text: 'Lục Cát tinh cùng hội ở tam phương tứ chính cung Mệnh, chủ cả đời quý nhân không dứt, nhân duyên cực tốt. Dù mệnh cách bình thường cũng có thể nhờ sức Lục Cát mà đạt nghiệp phi phàm.',
        },
        {
          id: 'gsf-7-3',
          idx: 3,
          text: 'Phụ Bật giáp Mệnh: Tả Phù, Hữu Bật kẹp hai cung trước sau cung Mệnh, chủ cả đời được quý nhân nâng đỡ, gặp khó có người giúp. Hợp nhất là đồng cung với Tử Vi, gọi là cách “Quân thần khánh hội”.',
        },
      ],
    },
    {
      title: 'Luận Lục Sát tinh',
      subtitle: 'Cái hung của Dương Đà Hỏa Linh Không Kiếp',
      paragraphs: [
        {
          id: 'gsf-8-1',
          idx: 1,
          text: 'Kình Dương, Đà La là “sát tinh”, chủ huyết quang, thị phi, trở ngại; Hỏa Tinh, Linh Tinh là “táo tinh”, chủ bốc đồng, nóng nảy, thương tai; Địa Không, Địa Kiếp là “không vong”, chủ hao tài, hư danh, không thực.',
        },
        {
          id: 'gsf-8-2',
          idx: 2,
          text: 'Sát tinh không phải toàn hung — sát tinh như đá mài dao, có thể luyện ra sức phá cục mà người thường không có. Thời trẻ dễ bốc đồng hại thân, sau trung niên mới hóa được sát thành quyền.',
        },
        {
          id: 'gsf-8-3',
          idx: 3,
          text: 'Dương Đà giáp Kỵ: Kình Dương, Đà La kẹp cung có sao Hóa Kỵ, chủ đại hung. Năm đó, đại hạn đó phải đặc biệt cảnh giác huyết quang, quan phi, biến cố lớn.',
        },
        {
          id: 'gsf-8-4',
          idx: 4,
          text: 'Không Kiếp giáp Mệnh: Địa Không, Địa Kiếp kẹp hai cung trước sau cung Mệnh, chủ cả đời nên làm việc hư không làm việc thực, hợp các nghề “phi thực” như văn nghệ, tôn giáo, huyền học, không nên kinh doanh đầu tư.',
        },
      ],
    },
    {
      title: 'Luận mười hai cung',
      subtitle: 'Chủ tượng và cát hung của từng cung',
      paragraphs: [
        {
          id: 'gsf-9-1',
          idx: 1,
          text: 'Cung Mệnh là gốc, tam phương là dụng: Tài Bạch chủ nguồn tiền, Quan Lộc chủ sự nghiệp, Thiên Di chủ duyên bên ngoài. Cát tinh của tam phương tứ chính chiếu hội thì mệnh cách mới phát huy trọn vẹn.',
        },
        {
          id: 'gsf-9-2',
          idx: 2,
          text: 'Cung Phu Thê xem khí chất người phối ngẫu, cung Tử Tức xem duyên con cái, cung Tật Ách xem chỗ yếu của thân thể, cung Thiên Di xem vận khi ra ngoài. Chính tinh và Tứ Hóa của mỗi cung quyết định cát hung tiến lui của lĩnh vực đó.',
        },
        {
          id: 'gsf-9-3',
          idx: 3,
          text: 'Cung Điền Trạch là kho tiền của lá số, chính tài giữ được hay không xem ở cung này; cung Phúc Đức là hưởng thụ tinh thần, tâm có yên hay không xem ở cung này; cung Phụ Mẫu là quan hệ với bậc trên, cũng chủ văn thư khế ước.',
        },
        {
          id: 'gsf-9-4',
          idx: 4,
          text: 'Cung trống mượn cung đối để luận — cung nào không có chính tinh thì mượn chính tinh cung đối để luận việc của cung ấy. Như cung Mệnh vô chính diệu, mượn chính tinh cung Thiên Di để định mệnh cách.',
        },
      ],
    },
  ],
};
