/**
 * Cơ sở tri thức hợp bàn Tử Vi Đẩu Số
 * Dựa trên hệ thống 《Thiên Kỷ》 của Nghê Hải Hạ + các câu đoán cổ điển trong 《Tử Vi Đẩu Số Toàn Thư》 + tư liệu chuyên môn tổng hợp
 * Dùng cho phân tích hợp bàn bằng AI
 */

// ─── Đoán ngữ đầy đủ của 14 chính tinh tại cung Phu Thê ──────────────────────────

export const STAR_IN_FUQI_GU: Record<string, {
  summary: string;       // Tóm tắt cốt lõi trong một câu
  good: string;          // Điều kiện/biểu hiện cát
  bad: string;           // Biểu hiện hung / điều cần lưu ý
  spouse_traits: string; // Ngoại hình, tính cách của bạn đời
  timing: string;        // Gợi ý thời điểm kết hôn
  ni_quote?: string;     // Lời nguyên văn của Nghê Hải Hạ
}> = {
  '紫微': {
    summary: 'Bạn đời kiêu hãnh, giỏi giang, nên kết hôn muộn; tình cảm lấy sự tôn trọng làm nền',
    good: 'Tam phương có Phù Bật giáp: bạn đời hiền tài, sau hôn nhân được quý nhân giúp; tam hợp gặp Lộc thì tài lộc song toàn',
    bad: 'Cô quân không có phụ tá: bạn đời mạnh thế, khó trao đổi; ở cung Thìn, Tuất thì tình nghĩa vợ chồng nhạt; hội Phá Quân: trước hôn nhân nhiều trở ngại',
    spouse_traits: 'Bạn đời khí chất kiêu hãnh, có chính kiến, tự tôn mạnh, năng lực giỏi nhưng không dễ bộc lộ tình cảm',
    timing: 'Nên kết hôn muộn (nam trên 30, nữ trên 27), kết hôn sớm nhiều trắc trở',
    ni_quote: 'Tử Vi ở cung Phu Thê thì cô khắc, nên kết hôn muộn; tình cảm tốt nhưng chi phí giao tiếp cao',
  },
  '天机': {
    summary: 'Hôn nhân nhiều thay đổi, nên chọn bạn đời chênh lệch tuổi khá lớn',
    good: 'Gặp Lộc Tồn hoặc Hóa Lộc: tình cảm còn giữ được; hội Thái Âm: thêm phần tinh tế dịu dàng',
    bad: 'Hóa Kỵ hoặc hội Sát tinh: tình cảm biến động lớn, dễ chia ly; Thiên Cơ hay thay đổi, bạn đời do dự về tình cảm',
    spouse_traits: 'Bạn đời thông minh hay thay đổi, tâm tư tinh tế, có duyên với tôn giáo triết học, hơi thần kinh',
    timing: 'Nên chênh lệch tuổi khá lớn (trên 6 tuổi), giúp giảm xung đột do thay đổi của hai bên',
    ni_quote: 'Thiên Cơ hay thay đổi, không nên độc tọa, hôn nhân đầy biến động',
  },
  '太阳': {
    summary: 'Nam mệnh giúp vợ, nữ mệnh vượng phu; hãm địa hóa Kỵ thì chủ hình khắc',
    good: 'Miếu Vượng (cung Mão đến Thân): bạn đời giỏi giang, nam mệnh có nội trợ hiền; nữ mệnh lấy chồng vượng phu, hôn nhân mỹ mãn',
    bad: 'Hãm địa (cung Dậu đến Dần): nam mệnh bạn đời ốm yếu, nữ mệnh lấy chồng kém cỏi; Hóa Kỵ: nữ mệnh “trên không thấy cha, dưới không thấy con, giữa không thấy chồng”, mười năm đó chồng gặp tai họa lớn',
    spouse_traits: 'Bạn đời cởi mở phóng khoáng, có ý thức về hình ảnh công chúng, hào phóng nhưng đôi khi quá áp đặt',
    timing: 'Tình cảm diễn biến nóng trước lạnh sau, nên giữ khoảng cách vừa phải để duy trì sự mới mẻ',
    ni_quote: 'Thái Dương Hóa Kỵ, trên không thấy cha, dưới không thấy con, giữa không thấy chồng — nữ mệnh mười năm đó chồng ắt gặp tai họa lớn',
  },
  '武曲': {
    summary: 'Sao Quả Tú, hôn nhân hình khắc, nhất loạt nên kết hôn muộn',
    good: 'Vũ Khúc Hóa Lộc: bạn đời có năng lực kiếm tiền, nhưng nam mệnh lại chê vợ quá giỏi; gặp Lộc Tồn giáp Phù Bật: hôn nhân vững chắc có của',
    bad: 'Hóa Kỵ: cô quả, khó lấy vợ lấy chồng, hoặc bạn đời có tật; Vũ Khúc Thất Sát (cung Mão, Dậu): điềm hôn nhân xấu; gặp bất kỳ Tứ Sát nào: chủ ly hôn; Vũ Khúc Phá Quân: gặp Sát Kỵ Hình tinh thì hôn nhân ắt bất lợi',
    spouse_traits: 'Bạn đời cương liệt độc lập, nói thẳng, không giỏi bày tỏ tình cảm, kinh tế vững nhưng tính cách khá cô khắc',
    timing: 'Hệ Vũ Khúc nhất loạt nên kết hôn sau 30 tuổi, kết hôn sớm thì chia tay sớm',
    ni_quote: 'Vũ Khúc Hóa Kỵ là sao hình tù, hệ Vũ Khúc hôn nhân nên muộn',
  },
  '天同': {
    summary: 'Bạn đời ôn hòa thích hưởng thụ, nên chênh lệch tuổi lớn, kết hôn muộn là cát',
    good: 'Gặp Lộc Tồn hoặc Hóa Lộc: bạn đời ôn hòa có của, gia đình yên ổn; đồng cung Thái Âm: tình cảm dịu dàng ngọt ngào',
    bad: 'Hóa Kỵ: lúc đầu tình cảm còn ổn, dần nhạt đi, vì phối hợp kém sinh oán trách; gặp nhiều Sát: lười biếng thành gánh nặng',
    spouse_traits: 'Bạn đời ôn hòa hiền lành, lạc quan dễ tính, nhưng có thể lười biếng, thiên về hưởng thụ',
    timing: 'Nam cưới người nhỏ tuổi hơn, nữ gả người lớn tuổi hơn, chênh lệch từ 8 tuổi trở lên là tốt nhất',
  },
  '廉贞': {
    summary: 'Chính tinh bất ổn nhất ở cung Phu Thê, nguy cơ sinh ly tử biệt cao',
    good: 'Liêm Trinh Thiên Phủ (Tý, Ngọ): bạn đời ôn hòa thanh tú, tình cảm tạm ổn, bạn đời phần nhiều làm công ăn lương',
    bad: 'Liêm Trinh Tham Lang: không sinh ly thì tử biệt; Liêm Trinh Phá Quân: xây mồ giữa nước; Liêm Trinh Thất Sát: chôn xác giữa đường; Hóa Kỵ: tình cảm quấy nhiễu không dứt, hòa rồi vỡ lặp đi lặp lại; đồng cung Hỏa Tinh: dù có cát tinh cũng phải ở riêng',
    spouse_traits: 'Bạn đời ngoại hình nổi bật, khéo giao tiếp, giá trị cảm xúc cao nhưng không ổn định; có thể xa nhiều gần ít',
    timing: 'Nam mệnh nên cưới vợ trẻ hơn (6-12 tuổi), nữ mệnh nên lấy chồng lớn tuổi hơn',
    ni_quote: 'Liêm Trinh Tham Lang / Liêm Trinh Phá Quân ở cung Phu Thê, nam mệnh hay nữ mệnh đều không sinh ly thì tử biệt; Liêm Trinh Thất Sát — chôn xác giữa đường; Liêm Trinh Phá Quân — xây mồ giữa nước; Liêm Trinh Tham Lang — chết yểu',
  },
  '天府': {
    summary: 'Cát tinh, chủ sinh ly chứ không tử biệt, tình cảm bình ổn nhưng nhạt',
    good: 'Gặp Lộc Tồn hoặc Hóa Lộc: tài lộc song toàn, tình cảm ổn định; tam phương không có Sát: vợ chồng yên hòa',
    bad: 'Phù Bật chỉ có một sao: dễ có hôn nhân lần hai; gặp Tứ Sát: tình cảm thờ ơ, khả năng sinh ly tăng',
    spouse_traits: 'Bạn đời nho nhã, sở thích rộng, giữ của có nguyên tắc, năng lực làm việc mạnh nhưng thiên về bảo thủ',
    timing: 'Nam mệnh bạn đời lớn tuổi hơn, nữ mệnh bạn đời nhỏ tuổi hơn; tình cảm ổn định nhưng cần chủ động vun đắp',
  },
  '太阴': {
    summary: 'Thích bạn đời thanh tú dịu dàng; hãm địa gặp Sát thì tình cảm hay thay đổi',
    good: 'Miếu Vượng (Tý đến Ngọ) gặp cát: bạn đời thanh tú có thành tựu, nam mệnh vợ đẹp; nữ mệnh: bản thân xinh đẹp có khí chất',
    bad: 'Hãm địa (Mùi đến Hợi): tình cảm dễ đổi, sức khỏe bạn đời kém; Hóa Kỵ (nam mệnh càng kỵ): mẹ chồng nàng dâu bất hòa, vợ và mẹ ắt xung đột; gặp Hỏa Linh: tình cảm biến cố lớn',
    spouse_traits: 'Bạn đời dịu dàng thanh tú, tinh tế nhạy cảm, trọng tình cảm, nhưng đôi khi thất thường',
    timing: 'Không ràng buộc đặc biệt, nhưng khi hãm địa nên kết hôn muộn',
    ni_quote: 'Mệnh đàn ông, sợ nhất Thái Âm Hóa Kỵ, mẹ chồng nàng dâu bất hòa, vợ với mẹ nhất định không hợp nhau',
  },
  '贪狼': {
    summary: 'Đào hoa vượng nhất, hôn nhân bất ổn, nguy cơ ngoại tình cao',
    good: 'Hóa Lộc: bạn đời tài nghệ giỏi, phong tình vạn chủng, tình cảm ngọt ngào (nhưng nguy cơ ngoại tình không giảm); gặp Hóa Khoa: giảm ngoại tình',
    bad: 'Hóa Kỵ: nhiều hôn nhân lần hai; Tử Vi Tham Lang (Mão, Dậu): bạn đời hay đi xa, có điềm ngoại tình; gặp Tứ Sát: ắt sinh ly; Tham Lang ở cung Ngọ (sao võ quan): ngược lại chủ bạn đời làm nghề võ, tương đối ổn định',
    spouse_traits: 'Bạn đời tài nghệ hơn người, giao tế mạnh, được lòng người khác giới, nhưng dục vọng vượng, khó ràng buộc',
    timing: 'Kết hôn sớm tình cảm nhiều biến động, nên kết hôn muộn; trước hôn nhân nhất định phải tìm hiểu quan hệ khác giới của đối phương',
    ni_quote: 'Tham Lang ngoài chỉ sao đào hoa, còn chỉ tửu sắc tài khí đổ bác, tất cả đều nằm trong Tham Lang; Tham Lang ở cung Ngọ là sao võ quan, đừng tùy tiện luận là đào hoa',
  },
  '巨门': {
    summary: 'Khẩu thiệt thị phi nhiều, vợ chồng dễ cãi vã, cần Thái Dương hóa giải',
    good: 'Thái Dương Miếu Vượng tương hội: ngược lại hôn nhân hòa mỹ, tài ăn nói thành công cụ giao tiếp; Hóa Lộc: vợ hiền giỏi, đường tài nhờ vợ mà mở',
    bad: 'Hóa Kỵ: bạn đời hay càu nhàu, thị phi không dứt; đồng độ Đà La: vợ chồng tự chuốc phiền; độc thủ không cát: tình cảm bị đè nén, mâu thuẫn sâu nhiều',
    spouse_traits: 'Bạn đời ăn nói khéo, hay ghen, coi trọng thể diện, đôi khi quá xét nét, nhưng trong lòng sâu nặng tình cảm',
    timing: 'Không ràng buộc đặc biệt, nhưng cần chuẩn bị tâm lý cho việc trao đổi, rèn hợp lâu dài',
  },
  '天相': {
    summary: 'Lương duyên “thân càng thêm thân”, chồng xướng vợ tùy, hôn nhân kiểu hợp tác',
    good: 'Gặp Phù Bật đủ cả đôi: tình cảm trung thành, hôn nhân vững; bạn đời ngay thẳng thật thà; Thiên Tướng tam hợp gặp Lộc: tài lộc đáng mong',
    bad: 'Phù Bật chỉ có một sao: có thể báo hiệu tái hôn; gặp nhiều Sát: trong tình cảm bị đè nén ấm ức, không giỏi bày tỏ',
    spouse_traits: 'Bạn đời ngay thẳng thật thà, giữ chữ tín, không thích xung đột, khéo điều hòa, là bạn đồng hành tuyệt vời',
    timing: 'Phần nhiều phát triển từ quan hệ quen biết như bạn học, đồng nghiệp, hàng xóm; nên vợ chồng hợp tác làm việc chung',
  },
  '天梁': {
    summary: 'Thích bạn đời có tinh thần trách nhiệm cao hoặc lớn tuổi hơn, trước hôn nhân nhiều trắc trở',
    good: 'Gặp Lộc: bạn đời có phúc đức, tình cảm vững chắc; tam hợp có cát: vun đắp tình cảm vững vàng lý trí',
    bad: 'Hóa Kỵ hoặc gặp Sát: hay càu nhàu, áp đặt thuyết phục, tình cảm xa cách; Thiên Lương phối Thiên Mã: vợ chồng vì hoàn cảnh mà phân tán; trước hôn nhân dễ thất bại mối tình đầu',
    spouse_traits: 'Bạn đời trách nhiệm cao, điềm đạm già dặn, giỏi nói đạo lý, nhưng thỉnh thoảng có khuynh hướng giảng giải',
    timing: 'Trước hôn nhân nhiều trắc trở là chuyện thường, một khi kết hôn lại vững chắc; không có Sát thì tình duyên sau hôn nhân càng sâu',
  },
  '七杀': {
    summary: '“Uyên khâm bán lãnh” — ít gặp nhiều xa, nên kết hôn muộn sau 30 tuổi',
    good: 'Miếu Vượng (cung Dần, Thân): bạn đời tuy cương cường nhưng trung thành, một khi đã dốc lòng thì hết mình; Hóa Lộc tương trợ: giảm cô khắc',
    bad: 'Gặp Sát: bề ngoài tình cảm hòa thuận trong lòng bất mãn, nam mệnh chủ cưới hai lần; nữ mệnh nên làm vợ lẽ hoặc kế thất; cung Mão, Dậu (Vũ Khúc Thất Sát): vận hôn nhân kém nhất',
    spouse_traits: 'Bạn đời cương cường cô độc, tiếng sét ái tình nhanh, rời đi cũng nhanh, yêu đương nóng lạnh đều nhanh',
    timing: 'Nhất loạt nên kết hôn muộn, sau 30 tuổi hôn nhân vững hơn; kết hôn sớm nhiều hình khắc',
    ni_quote: 'Thất Sát cư phu thê mà uyên khâm bán lãnh (cổ phú); nếu bạn cưới người vợ có Thất Sát nhập Mệnh, thì coi như hỏng một nửa rồi, rất mệt, cỏ cây đều là địch',
  },
  '破军': {
    summary: 'Sao phá hao của hôn nhân, không ai hơn được, theo đuổi tình cảm không ràng buộc',
    good: 'Hóa Lộc: phá rồi mới lập, tình cảm trải qua trắc trở ngược lại đi được đến cuối; Anh tinh nhập miếu: bạn đời anh tuấn có cá tính',
    bad: 'Hóa Kỵ: phá hoại hết sạch, nhiều một lần hôn nhân hoặc không kết hôn; Tử Vi Phá Quân (Sửu, Mùi): không thêm Sát cũng khắc, thêm Sát ắt ly; với Liêm Trinh: xây mồ giữa nước; sau trung niên có tượng ngủ riêng ở riêng',
    spouse_traits: 'Bạn đời theo đuổi tự do, không thích ràng buộc, dám đột phá, nhưng quan niệm hôn nhân mỏng, cả đời nhiều biến động',
    timing: 'Trước hôn nhân dễ tiếng sét ái tình hoặc kết hôn vội vàng, nên kéo dài thời gian tìm hiểu rồi mới quyết định',
    ni_quote: 'Liêm Trinh Phá Quân ở cung Phu Thê, xây mồ giữa nước; Phá Quân là sao có sức phá hoại hôn nhân mạnh nhất',
  },
};

// ─── Đoán ngữ đầy đủ của Tứ Hóa tại cung Phu Thê ──────────────────────────────

export const SIHUA_IN_FUQI_GU = {
  '化禄': 'Có duyên trời định với bạn đời, bạn đời tính lạc quan, sau hôn nhân tình cảm càng tốt, bạn đời ngày càng biết kiếm tiền, duyên phận sâu đậm; Tự hóa Lộc thì tiền đến tiền đi, tình cảm có nhưng khó giữ',
  '化权': 'Hôn nhân phần nhiều do chủ động giành lấy, bạn đời nắm quyền quyết định, phần lớn việc bạn đời tự quyết, cần học cách buông tay; hôn nhân kiểu giành giật, càng cưỡng cầu càng khó được',
  '化科': 'Xem như tiểu Lộc, hòa thuận với bạn đời, có duyên quý nhân, lợi cho yêu đương kết hôn; Khoa ở cung Phu Thê chủ bạn đời có danh tiếng hoặc kỹ năng chuyên môn',
  '化忌': 'Nợ nần hôn nhân, kết hôn sớm ly dị sớm, nên kết hôn muộn hoặc không kết hôn; bạn đời có oán trách với bản thân; Hóa Kỵ xung cung Phu Thê càng hung — điềm sinh ly tử biệt',
};

// ─── Phương pháp luận cốt lõi của hợp bàn ─────────────────────────────────────────

export const HEMING_METHODOLOGY = `
## Khung phân tích hợp bàn cốt lõi (hệ thống Nghê Hải Hạ + tổng hợp 《Tử Vi Đẩu Số Toàn Thư》)

### Một. Nguyên tắc song cung tham chiếu (cách đoán hôn nhân quan trọng nhất của Nghê Hải Hạ)

**Khẩu quyết cốt lõi: “Xem hôn nhân, chỉ xem cung Phu Thê là sai lầm lớn, nhất định phải xem đồng thời cung Phúc Đức.”**

- **Cung Phu Thê**: xem tính chất sao, ngoại hình, tính cách, kiểu tương tác của bạn đời
- **Cung Phúc Đức**: đại diện tình cảm sâu xa của vợ chồng, hôn nhân có bền lâu hay không
- **Ví dụ của thầy Nghê**: “Có người cung Phu Thê rất tốt, cung Phúc Đức rất tệ, tan! Vợ chồng sẽ tan.”

**Vì vậy khi hợp bàn phải phân tích đồng thời của cả hai bên: cung Mệnh + cung Phu Thê + cung Phúc Đức**

---

### Hai. Tiêu chuẩn phán đoán “thiên tác chi hợp”

**Cấp cao nhất (thiên tác chi hợp)**:
- Chính tinh cung Phu Thê của bên A = chính tinh cung Mệnh của bên B
- Chính tinh cung Phu Thê của bên B = chính tinh cung Mệnh của bên A
- Hai bên tương ứng lẫn nhau, là cặp trời định

**Lương duyên cấp kế**:
- Chính tinh cung Phu Thê của một bên = chính tinh cung Mệnh của đối phương (tương ứng một chiều)
- Ngũ hành tính sao cung Mệnh hai bên tương sinh (như Mộc mệnh phối Thổ mệnh, Thổ mệnh phối Thủy mệnh)
- Đại hạn hai bên cùng đi vận vượng

**Tổ hợp điềm hung**:
- Hai bên Hóa Kỵ xung cung Mệnh của nhau (oan gia)
- Một bên Hóa Kỵ phi nhập cung Phu Thê của bên kia (gây tổn hại hôn nhân cho đối phương)
- Cung Phu Thê hai bên đều có nặng Sát mà không có cát tinh

---

### Ba. Năm bước hợp bàn đầy đủ

**Bước 1: Đánh giá nền tảng mệnh cách hai bên**
- Cách cục cung Mệnh hai bên có tương xứng không (cùng loại hay bổ sung nhau)
- Trọng điểm: sự phối hợp tính sao của cung Mệnh + cung Thân + cung Phúc Đức
- Cảnh báo: hai bên đều là cách Sát Phá Lang (hai hổ tranh nhau); hoặc một mạnh một yếu chênh lệch quá lớn

**Bước 2: Tham chiếu cung Phu Thê**
- Chính tinh cung Phu Thê của A → có tương ứng với cung Mệnh / sao tam hợp của B không?
- Chính tinh cung Phu Thê của B → có tương ứng với cung Mệnh / sao tam hợp của A không?
- Trạng thái Tứ Hóa của cung Phu Thê mỗi bên (Hóa Lộc / Hóa Kỵ ảnh hưởng lớn nhất)

**Bước 3: Phân tích tinh tượng Thái Dương Thái Âm**
- Nữ mệnh: Thái Dương đại diện chồng; Thái Dương Miếu Vượng = vượng phu, hãm địa Hóa Kỵ = khắc phu
- Nam mệnh: Thái Âm đại diện vợ; Thái Âm Miếu Vượng = vợ đẹp hiền, Hóa Kỵ = mẹ chồng nàng dâu bất hòa
- Trạng thái hai sao này trong lá số hai bên ảnh hưởng trực tiếp đến chất lượng hôn nhân

**Bước 4: Phi hóa tham chiếu Tứ Hóa (kỹ thuật cao cấp)**
- Can năm sinh của A → tìm các sao Tứ Hóa → các sao này rơi vào cung nào trong lá số của B
  - Hóa Lộc phi nhập cung Mệnh / cung Tài Bạch của B: có lợi tích cực cho B
  - Hóa Kỵ phi nhập cung Phu Thê của B: gây tổn hại hôn nhân cho B
  - Hóa Kỵ phi nhập cung Mệnh của B: bản thân gây áp lực cho đối phương
- Can năm sinh của B → phân tích ngược chiều phi hóa cho A
- Hình thành “phi hóa tham chiếu”, phán đoán “loại duyên” hai chiều

**Bước 5: Phân tích đồng bộ Đại hạn**
- Đại hạn hiện tại của hai bên có cùng đi vận vượng không: cùng vượng = thời cơ tốt nhất, cùng suy = cùng thử thách
- Một bên vượng một bên suy: cần chủ động cân bằng trạng thái hai bên
- Tam hợp lưu niên tụ sao đào hoa: năm đó là thời cơ kết hôn tốt

---

### Bốn. Phán đoán loại duyên

| Loại hóa duyên | Đặc trưng |
|---------|------|
| Hóa Lộc dẫn động | Chính duyên, tình yêu thật, tình cảm ngọt ngào thuận lợi |
| Hóa Quyền dẫn động | Tình cảm do chủ động giành lấy, có sức căng, có bên làm chủ |
| Hóa Khoa dẫn động | Duyên hòa thuận, tôn trọng lẫn nhau, kiểu bạc đầu giai lão |
| Hóa Kỵ dẫn động | Nghịch duyên / oan gia, hành hạ nhau nhưng khó rời, cần tu hành mới hóa giải được |
| Hai bên Hóa Kỵ lẫn nhau | Kiểu “oan gia ngõ hẹp”, tình cảm mãnh liệt nhưng đau khổ song hành, kiểu nợ tiền kiếp |

---

### Năm. Ba tầng phán đoán thời điểm kết hôn

**Tầng 1: Cách cục bản mệnh**
- Cung Phu Thê không có Sát: nên kết hôn sớm
- Cung Phu Thê có Sát không có cát: nên kết hôn muộn (nam trên 30, nữ trên 27)
- Vũ Khúc, Liêm Trinh, Thất Sát, Phá Quân ở cung Phu Thê: nhất loạt khuyên kết hôn muộn

**Tầng 2: Đại hạn**
- Cung Phu Thê của đại hạn nhiều cát tinh: mười năm đó có cơ hội kết hôn
- Cung Phu Thê của đại hạn Hóa Kỵ: mười năm đó tình cảm bị cản trở

**Tầng 3: Lưu niên**
- Hồng Loan, Thiên Hỉ nhập cung Mệnh hoặc cung Phu Thê: năm đó tình duyên có động
- Cung lưu niên rơi vào cung Phu Thê: năm đó hôn nhân là trọng điểm
- Tam hợp lưu niên tụ sao đào hoa: năm đó nhiều cơ hội tình cảm

---

### Sáu. Tình huống kết hôn theo từng cung

| Cung lưu niên | Tình huống kết hôn |
|---------|---------|
| Cung Phu Thê | Tình cảm phát triển bình thường rồi kết hôn |
| Cung Mệnh | Tự mình chủ động ra tay rồi kết hôn |
| Cung Tử Nữ | Cưới vì có con (lên xe trước mua vé sau) |
| Cung Điền Trạch | Kết hôn vì lý do gia đình, nhà đất |
| Cung Phụ Mẫu | Theo lệnh cha mẹ, do bề trên giới thiệu |

---

### Bảy. Dấu hiệu cụ thể của khắc phu / khắc thê

**Định nghĩa của thầy Nghê về mệnh khắc phu (không theo nghĩa truyền thống)**:
> “Cô gái khắc phu, là người vợ đi phía trước, ông chồng đi phía sau mồ hôi đầm đìa xách túi lớn túi nhỏ trả tiền, khó khăn lắm đợi được xe, chồng còn phải mở cửa cho vợ. Thế gọi là khắc phu.”
> “Vượng phu, là người vợ khiến chồng hoàn toàn không phải lo lắng gì phía sau.”

**Dấu hiệu cụ thể**:
- Cung Phu Thê có Liêm Trinh + Tham Lang / Phá Quân / Thất Sát (tổ hợp tam hung)
- Thái Dương hãm địa Hóa Kỵ (nữ mệnh)
- Thái Âm Hóa Kỵ (nam mệnh)
- Cung Phu Thê Tứ Sát tụ đủ không có cát tinh
- Quả Tú, Cô Thần nhập cung Mệnh hoặc cung Phu Thê
- Cung Phúc Đức Phá Quân hãm + Liêm Trinh bình (cách xây mồ giữa nước)

---

### Tám. Phán đoán hợp bàn hợp tác sự nghiệp

**Các cung tham chiếu chính**:
- Cung Quan Lộc: tính sao cung sự nghiệp hai bên có tương hợp không
- Cung Huynh Đệ (cung Nô Bộc): đại diện quan hệ hùn hạp
- Cung Phúc Đức: có thể đồng cam cộng khổ không

**Điềm cát của hợp tác sự nghiệp**:
- Cung Mệnh hai bên bổ sung nhau (một người mưu một người làm)
- Cung Quan Lộc của một bên Hóa Lộc phi nhập cung Quan Lộc của bên kia
- Cung Huynh Đệ có Lộc Tồn không bị Hóa Kỵ xung

**Điềm hung của hợp tác sự nghiệp**:
- Hai bên Hóa Kỵ xung nhau tại cung Quan Lộc
- Hóa Kỵ cung Mệnh đối phương phi nhập cung Tài Bạch của mình (đối phương tiêu hao tiền của mình)
- Cự Môn ở cung Huynh Đệ / Nô Bộc: thầy Nghê: “Cự Môn ở cung bạn bè, nghĩa là hùn hạp với bạn bè thì bạn thành thù”

---

### Chín. Các loại tương quan tình cảm (phán nhanh độ hợp của mệnh cách)

| Tổ hợp hai bên | Độ hợp | Giải thích |
|---------|-------|------|
| Tử Vi + Thiên Phủ | ★★★★★ | Đế tinh gặp tài khố, thành toàn cho nhau, ổn định nhất |
| Thiên Tướng + bất kỳ sao nào | ★★★★ | Ấn tinh phụ tài, Thiên Tướng thích ứng mạnh |
| Thiên Lương + Thiên Đồng | ★★★★ | Già dặn và ôn hòa bổ sung nhau, kiểu bạc đầu giai lão |
| Thái Dương + Thái Âm | ★★★★ | Nhật nguyệt tịnh minh, bổ sung kinh điển, âm dương điều hòa |
| Thất Sát + Thất Sát | ★★ | Hai hổ tranh nhau, tia lửa lớn, mâu thuẫn nhiều |
| Phá Quân + Phá Quân | ★★ | Song phá, phá hoại lẫn nhau, hôn nhân bất ổn |
| Liêm Trinh + Thất Sát / Phá Quân | ★ | Hai trong tổ hợp tam hung, nguy cơ sinh ly tử biệt cao nhất |
| Sát Phá Lang + Cơ Nguyệt Đồng Lương | ★★★ | Động tĩnh bổ sung, nhưng cần rèn hợp, một bên khai phá một bên thủ thành |
| Tử Phá + Liêm Phủ | ★★★★ | Cách cục tương đương, hút nhau |
| Vũ Khúc + Thiên Đồng | ★★★ | Cương nhu tương tế, Vũ Khúc thu liễm gặp Thiên Đồng ôn hòa, bổ sung được |

---

### Mười. Tổng hợp những lời tâm đắc cốt lõi của Nghê Hải Hạ về hợp bàn

1. **“Xem hôn nhân, chỉ xem cung Phu Thê là sai lầm lớn, nhất định phải xem đồng thời cung Phúc Đức.”**
2. **“Liêm Trinh Tham Lang / Liêm Trinh Phá Quân ở cung Phu Thê, nam mệnh hay nữ mệnh đều không sinh ly thì tử biệt.”**
3. **“Liêm Trinh Thất Sát — chôn xác giữa đường; Liêm Trinh Phá Quân — xây mồ giữa nước; Liêm Trinh Tham Lang — chết yểu.”**
4. **“Thái Dương Hóa Kỵ, trên không thấy cha, dưới không thấy con, giữa không thấy chồng.” (nữ mệnh mười năm đó bạn đời có tai họa lớn)**
5. **“Mệnh đàn ông, sợ nhất Thái Âm Hóa Kỵ, mẹ chồng nàng dâu bất hòa, vợ với mẹ nhất định không hợp nhau.”**
6. **“Vượng phu, là người vợ khiến chồng hoàn toàn không phải lo lắng gì phía sau; khắc phu là tình cảm quá tốt, hoàn toàn lấy đối phương làm chính.”**
7. **“Cự Môn ở cung bạn bè, hùn hạp với bạn bè thì bạn thành thù.”**
8. **“Nếu bạn cưới người vợ có Thất Sát nhập Mệnh, thì gần như hỏng một nửa rồi, rất mệt, cỏ cây đều là địch.”**
`;

// ─── Bảng hỗ trợ phán đoán hôn nhân ─────────────────────────────────────────────

export const MARRIAGE_STARS_BRIEF: Record<string, string> = {
  '红鸾': 'Chính duyên tình yêu hôn nhân, nhập cung Mệnh / Thân thì chủ động kết hôn; lưu niên gặp Hồng Loan thì năm đó tình duyên có động',
  '天喜': 'Hôn hỉ, cùng Hồng Loan dẫn động lẫn nhau, chủ chuyện vui đến',
  '天姚': 'Đào hoa tài nghệ, cơ hội tình cảm; trong tình yêu hôn nhân gặp Thiên Diêu dễ có cuộc gặp gỡ lãng mạn',
  '咸池': 'Đào hoa mạnh, chú ý rắc rối tình cảm; gặp Tham Lang thì đào hoa vượng nhất',
  '孤辰': 'Sao cô khắc, nam mệnh nhập cung Mệnh chủ độc lập tốt, nhưng nhập cung Phu Thê chủ duyên mỏng',
  '寡宿': 'Sao cô khắc, nữ mệnh nhập cung Mệnh hoặc cung Phu Thê, chủ hôn nhân không thuận, ít gặp nhiều xa',
  '天哭': 'Cô khắc hình thương, nhập cung Phu Thê chủ bạn đời gặp tai họa lớn',
  '天虚': 'Sao hao hụt trống rỗng, nhập cung Phu Thê chủ tình cảm hao hụt hư không',
  '天巫': 'Kết hôn muộn, di sản, tôn giáo; nhập cung Phu Thê chủ kết hôn muộn là cát, kết hôn sớm nhiều trắc trở',
};

export const HEMING_SCORE_CRITERIA = {
  '五星': 'Cung Phu Thê hai bên chiếu nhau thành thiên tác chi hợp, Tứ Hóa bổ ích lẫn nhau, Đại hạn cùng đi vận vượng, cung Phúc Đức hai bên đều cát',
  '四星': 'Cung Phu Thê của một bên tương ứng cung Mệnh của bên kia, Tứ Hóa chủ yếu là Lộc Khoa, nền tảng tình cảm vững chắc',
  '三星': 'Mệnh cách tương xứng nhưng mỗi bên có góc cạnh, cần rèn hợp, về lâu dài ổn định',
  '二星': 'Cung Phu Thê mỗi bên có Sát tinh, Hóa Kỵ có xung, tình cảm thăng trầm lớn, hai bên cần chủ động vun đắp',
  '一星': 'Hung tinh tụ ở cung Phu Thê, hoặc tổ hợp tam hung của Liêm Trinh, nguy cơ sinh ly tử biệt cao',
};
