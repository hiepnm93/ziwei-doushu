'use client';
import { motion, AnimatePresence } from 'framer-motion';
import type { Star } from '@/lib/ziwei/types';
import { STAR_DESCRIPTIONS } from '@/lib/ziwei/constants';
import { viTerm } from '@/lib/i18n/vi';

interface StarDetailPanelProps {
  star: Star | null;
  /** 宫名（中文键，如「命宫」），显示时经 viTerm 转越南语 */
  palaceName?: string;
  onClose: () => void;
}

// Lời giải chi tiết từng chính tinh theo hệ thống thầy Nghê Hải Hạ
// (tham khảo «Phi Tinh Tử Vi Đẩu Số Toàn Thư» của Cố Tường Hoằng và «Tử Vi Đẩu Số Toàn Thư» bản Nam Bắc Sơn Nhân)
const STAR_DETAIL: Record<string, {
  niHaixia: string;
  classical: string;
  bestPalace: string;
  worstPalace: string;
  career: string;
  relationship: string;
  wealth: string;
  health: string;
}> = {
  '紫微': {
    niHaixia: 'Thầy Nghê cho rằng Tử Vi là sao hoàng đế, người Tử Vi thủ Mệnh có khí cô ngạo, thích ở một mình, không thích bị người khác quản. Tử Vi cần Tả Phù, Hữu Bật giáp mới phát huy được khí chất đế vương, nếu không chỉ là «cô quân», giàu mà không sang. Tử Vi ở Thìn, Tuất là đẹp nhất, cùng Thiên Phủ thành cách song tinh, tài quan song mỹ, có thể ra làm tướng vào làm tướng quốc. Tử Vi sợ nhất Hỏa Tinh, Linh Tinh, Kình Dương, Đà La đồng cung; gặp sát thì cô quý, có quyền mà không có tiền.',
    classical: 'Cổ quyết: «Tử Vi đế tọa lâm Mệnh, chủ tôn quý, thống lĩnh chúng tinh, người thủ Mệnh chủ quyền uy hiển đạt.» Nam Bắc Sơn Nhân chú: «Tử Vi thủ Mệnh tại Thìn, tài quan song mỹ, xuất tướng nhập tướng, vị chí tam công; an Mệnh tại Tý thì phú quý không bền, về sau không đẹp.»',
    bestPalace: 'cung Mệnh (Thìn, Tuất), cung Quan Lộc',
    worstPalace: 'cung Tật Ách, cung Phu Thê',
    career: 'Chính trường, cấp quản lý, tự khởi nghiệp; khí chất đế vương bẩm sinh, hợp vị trí lãnh đạo tự gánh vác một phương',
    relationship: 'Tình cảm bị động, lòng tự trọng cao, cần đối phương chủ động; có khuynh hướng cô độc, kết hôn muộn thì tốt',
    wealth: 'Tài vận ổn định, giữ của giỏi hơn tiến thủ; ở Thìn, Tuất tài quan song mỹ, hợp nhất với đầu tư tích lũy',
    health: 'Hành Thổ, chú ý tỳ vị, hệ tiêu hóa. Kỵ làm việc quá sức, nên giữ nếp sinh hoạt điều độ',
  },
  '天机': {
    niHaixia: 'Thầy Nghê nói Thiên Cơ là sao quân sư, sao thông minh nhất, nhưng thông minh lộ ra ngoài thì hại thân. Thiên Cơ Hóa Kỵ phiền nhất, nghĩa là «khôn quá hóa dại». Thiên Cơ hành Mộc, linh động hay biến; người thủ Mệnh tư duy nhanh nhạy nhưng thường nhiều mưu ít quyết, phải rời quê đi xa mới phát triển; ứng biến tùy cơ là đặc điểm lớn nhất.',
    classical: 'Cổ quyết: «Người tinh khôn lanh lợi, thích tự kinh doanh; Thiên Cơ hành Mộc, buôn bán nhiều cơ mưu, xa tông tộc, xa người thân.» Nam Bắc Sơn Nhân chú: «Thiên Cơ ở đất Miếu Vượng, chủ người tinh minh, giỏi hoạch định; ở đất Hãm thì u tối, phần nhiều làm nghề buôn bán.»',
    bestPalace: 'cung Mệnh (Mão), cung Quan Lộc',
    worstPalace: 'cung Phu Thê',
    career: 'Chuyên gia kỹ thuật, mưu sĩ, nhà nghiên cứu, CNTT, hoạch định; dùng đầu óc hơn dùng tay chân, hợp rời quê lập nghiệp',
    relationship: 'Tình cảm hay thay đổi, suy nghĩ quá nhiều, khó chuyên nhất; nên kết hôn muộn, sau khi cưới cần học cách buông bớt lo nghĩ',
    wealth: 'Kiếm tiền bằng trí tuệ và kỹ năng, không giỏi giữ của; lấy chuyên môn kỹ thuật làm nghề thì tài vận ổn định',
    health: 'Hành Mộc, chú ý gan mật, hệ thần kinh. Tâm tư nặng dễ mất ngủ, nên tập tĩnh tâm, thiền định',
  },
  '太阳': {
    niHaixia: 'Thầy Nghê cho rằng Thái Dương là sao «đại nam nhân», từ Mão đến Ngọ thì nhập Miếu, quang minh chính đại; sau Ngọ dần lạc Hãm. Người Thái Dương thủ Mệnh hào phóng, trọng thể diện; mệnh nam thì hợp, mệnh nữ thì quá mạnh mẽ. Thái Dương đại diện cho cha và bề trên; ở cung Mệnh chủ người hướng ngoại, cởi mở, thích được mọi người chú ý, hợp nhất với công chức hoặc việc công chúng. Lạc Hãm thì trước siêng sau lười, cô quả lao lực.',
    classical: 'Cổ quyết: «Thái Dương cư Ngọ là nhập Miếu, ánh sáng rực rỡ, chủ quý hiển, mệnh nam tốt nhất; lạc Hãm thì cô quả lao lực, trước siêng sau lười.» Nam Bắc Sơn Nhân chú: «Thái Dương thủ Mệnh tại Ngọ, tài quan song mỹ, xuất tướng nhập tướng; an Mệnh tại Thìn, trung niên tài quan chuyển đẹp, người sinh năm Ất gặp hung cũng đại lợi.»',
    bestPalace: 'cung Mệnh (Mão đến Ngọ), cung Quan Lộc',
    worstPalace: 'cung Phu Thê (mệnh nữ), cung Tật Ách',
    career: 'Công chức, chính trường, quản lý, quan hệ công chúng, giáo dục, truyền thông; thích đứng trước đám đông, hợp việc công chúng',
    relationship: 'Mệnh nam có duyên nhưng đa tình; mệnh nữ độc lập mạnh mẽ, hôn nhân cần mài giũa, nên tìm người dịu dàng chu đáo',
    wealth: 'Tài vận nhờ nỗ lực, hào phóng hay cho, không giỏi tích lũy; nhập Miếu tài vận vượng, lạc Hãm tài vận lên xuống',
    health: 'Hành Hỏa, chú ý tim, mắt. Ở vị trí lạc Hãm dễ quá sức, cần nghỉ ngơi đầy đủ',
  },
  '武曲': {
    niHaixia: 'Thầy Nghê xem Vũ Khúc là chủ tinh Tài Bạch, cứng rắn không chịu khuất, sợ nhất cô khắc. Người Vũ Khúc thủ Mệnh ý chí kiên định, hợp tài chính, quản lý tiền, nhưng trong tình cảm quá thẳng, dễ làm tổn thương người khác. Vũ Khúc Hóa Kỵ phải cẩn thận tai nạn đổ máu. Vũ Khúc ở Thìn, Tuất, Sửu, Mùi được đất vượng; cùng Thất Sát đồng cung có thể thành cách «tướng tài», là cách cục giàu có rất tốt.',
    classical: 'Cổ quyết: «Vũ Khúc hành Kim, tính cương cường, cả đời nhiều hình khắc; thủ Mệnh ở đất vượng, xuất tướng nhập tướng.» Nam Bắc Sơn Nhân chú: «Vũ Khúc thủ Mệnh, tam phương tứ chính đều cát, tài quan song mỹ; võ chức thêm Phụ Bật, Xương Khúc cũng chủ đại quý; cùng Thất Sát đồng cung là cách tướng tài, chủ đại phú.»',
    bestPalace: 'cung Mệnh (Thìn, Tuất, Sửu, Mùi), cung Tài Bạch, cung Quan Lộc',
    worstPalace: 'cung Phu Thê',
    career: 'Tài chính, quân đội, công an, kế toán, kỹ thuật; năng lực thực thi cực mạnh, hợp lĩnh vực cần quyết đoán và bản lĩnh',
    relationship: 'Tình cảm thẳng thắn, thiếu lãng mạn, cần người bạn đời dịu dàng bổ sung; kỵ tình cảm cô khắc',
    wealth: 'Bản mệnh là tài tinh, tài vận rất mạnh, năng lực quản lý tiền vượt trội; ở Thìn, Tuất tài quan song mỹ',
    health: 'Hành Kim, chú ý phổi, hệ hô hấp, răng. Khi Hóa Kỵ cần phòng tai nạn đổ máu',
  },
  '天同': {
    niHaixia: 'Thầy Nghê nói Thiên Đồng là phúc tinh, cũng là sao lười nhất. Người Thiên Đồng thủ Mệnh thích hưởng phúc, không thích cạnh tranh, hợp công việc ổn định. Thiên Đồng cùng Thiên Lương đồng cung là tốt nhất, vừa hưởng phúc vừa có bảo đảm. Thiên Đồng Hóa Lộc là Hóa Lộc đẹp nhất, chủ cả đời cơm áo không lo, vui vẻ thong dong. Thiên Đồng kỵ lạc Hãm, lạc Hãm thì phúc giảm, cần cát tinh hóa giải hung tinh.',
    classical: 'Cổ quyết: «Thiên Đồng là sao phúc đức, người thủ Mệnh hưởng phúc có thừa, chủ cả đời tiêu dao tự tại, không phải lao khổ.» Nam Bắc Sơn Nhân chú: «Thiên Đồng thủ Mệnh, tam phương không sát, cả đời vui vẻ, cơm áo đầy đủ; thêm cát tinh thì phú quý song toàn, tính ôn hòa, nhiều nhân duyên.»',
    bestPalace: 'cung Mệnh, cung Phúc Đức',
    worstPalace: 'cung Quan Lộc',
    career: 'Dịch vụ, giải trí, ẩm thực, văn nghệ; hợp nhất với môi trường nhẹ nhàng vui vẻ, kỵ cạnh tranh áp lực cao',
    relationship: 'Tình cảm ôn hòa, không chủ động, dễ bị động đón nhận; hôn nhân khá ổn định, tính tình dễ gần',
    wealth: 'Tài vận không nổi bật, dựa vào lương ổn định, không giỏi đầu cơ; cơm áo không lo nhưng khó đại phú',
    health: 'Hành Thủy, chú ý thận, bàng quang. Thể chất hơi yếu, nên vận động vừa phải, giữ tâm thái thoải mái',
  },
  '廉贞': {
    niHaixia: 'Thầy Nghê cho rằng Liêm Trinh là thứ đào hoa, tài hoa xuất chúng nhưng tình cảm phức tạp. Liêm Trinh Hóa Kỵ rất hung, chủ kiện tụng, tù tội, tai nạn. Liêm Trinh cùng Thiên Tướng đồng cung thì hóa hung thành cát, thành cách «hành chính ấn thụ». Liêm Trinh hành Hỏa, tính cương liệt, cả đời nhiều thăng trầm, tài nghệ xuất chúng; nếu giữ được chính đạo thì có thể thành đại khí.',
    classical: 'Cổ quyết: «Liêm Trinh là thứ đào hoa, tài hoa xuất chúng, tình cảm nhiều trắc trở; Liêm Tướng đồng cung, hóa hung thành cát, thành cách hành chính ấn thụ, có thể nắm quyền bính.» Nam Bắc Sơn Nhân chú: «Liêm Trinh thủ Mệnh, gặp cát tinh thì tài hoa xuất chúng; Hóa Kỵ thì kiện tụng quấn thân, chủ tai họa đổ máu, phải phòng.»',
    bestPalace: 'cung Quan Lộc (đi cùng Thiên Tướng), cung Mệnh (khi Hóa Lộc)',
    worstPalace: 'cung Mệnh (khi Hóa Kỵ), cung Phu Thê',
    career: 'Nghệ thuật, giải trí, pháp luật, công chức (đi cùng Thiên Tướng); tài nghệ xuất chúng, nên giữ nghề chính đáng mới lâu bền',
    relationship: 'Đào hoa nhiều, tình cảm phức tạp, dễ vướng tranh chấp tình cảm; nên kết hôn muộn, chọn người bạn đời chín chắn',
    wealth: 'Tài vận lên xuống, kiếm tiền bằng tài nghệ; khi Hóa Kỵ phòng tranh chấp tài chính và rủi ro pháp lý',
    health: 'Hành Hỏa, chú ý tim, máu, gan. Khi Hóa Kỵ phòng tai nạn và phẫu thuật, lưu ý đổ máu',
  },
  '天府': {
    niHaixia: 'Thầy Nghê nói Thiên Phủ là sao kho tài, sao giữ của; không chủ động phát tài nhưng giữ được của cải. Người Thiên Phủ thủ Mệnh chín chắn bảo thủ; mệnh nữ tốt nhất, vượng phu hưng gia. Thiên Phủ thích nhất Tử Vi đồng cung hoặc đối chiếu, thành cách song tinh, tài quan song mỹ. Thiên Phủ sợ Không Kiếp giáp, gặp Không Kiếp thì kho tài cạn đáy, không giữ được tiền.',
    classical: 'Cổ quyết: «Thiên Phủ là sao kho tài, người thủ Mệnh chín chắn bảo thủ, chủ tích của vượng nhà; mệnh nữ gặp được thì vượng phu ích tử, gia đạo hưng thịnh.» Nam Bắc Sơn Nhân chú: «Thiên Phủ thủ Mệnh, tam phương cát tụ, tài quan song mỹ, phú quý an khang; gặp Không Kiếp thì kho tài thủng, khó tích của.»',
    bestPalace: 'cung Mệnh, cung Tài Bạch, cung Điền Trạch',
    worstPalace: 'cung Thiên Di',
    career: 'Quản lý hành chính, tài vụ, bảo hiểm, bất động sản; cầu ổn không mạo hiểm, hợp nghề kiểu giữ nghiệp',
    relationship: 'Tình cảm ổn định, chăm lo gia đình, là người bạn đời tốt; coi trọng cảm giác an toàn và bảo đảm kinh tế',
    wealth: 'Tài vận rất tốt, giỏi giữ của; hợp nhất với đầu tư tích lũy và mua bất động sản',
    health: 'Hành Thổ, chú ý tỳ vị, tiêu hóa. Thể chất vững, nên ăn uống và sinh hoạt điều độ',
  },
  '太阴': {
    niHaixia: 'Thầy Nghê cho rằng Thái Âm là tài tinh, lợi cho mệnh nữ, cũng là sao đại diện cho mẹ và vợ của mệnh nam. Thái Âm nhập Miếu thì tài vận rất tốt, đất Hãm thì tài vận bị cản. Thái Âm Hóa Kỵ cần chú ý chuyện người thân nữ giới. Thái Âm ở Hợi, Tý nhập Miếu, ánh sáng chiếu trọn, chủ thanh nhã tinh tế, tình cảm phong phú, coi trọng thế giới nội tâm và đời sống tinh thần.',
    classical: 'Cổ quyết: «Thái Âm là tài tinh, lợi mệnh nữ; ở Hợi, Tý nhập Miếu, ánh sáng chiếu trọn, tài vận rất vượng; ở Ngọ lạc Hãm, u sầu đa tình, tài vận bình thường.» Nam Bắc Sơn Nhân chú: «Thái Âm thủ Mệnh, nhập Miếu thì giàu có dư dả, mệnh nữ càng đẹp; lạc Hãm thì phải nỗ lực mới giàu, tình cảm tinh tế.»',
    bestPalace: 'cung Mệnh (Hợi, Tý), cung Tài Bạch',
    worstPalace: 'cung Mệnh (đất Hãm ở Ngọ)',
    career: 'Tài vụ, tài chính, bất động sản, nghệ thuật, giáo dục; tinh tế kiên nhẫn, hợp nghề cần thẩm mỹ và sự dịu dàng',
    relationship: 'Tình cảm dịu dàng tinh tế, coi trọng cảm xúc bên trong, cần mối quan hệ ổn định có cảm giác an toàn',
    wealth: 'Nhập Miếu tài vận rất vượng, lạc Hãm thì cần nỗ lực; quản lý tiền cẩn thận, giỏi tích lũy, không giỏi mạo hiểm',
    health: 'Hành Thủy, chú ý thận, tử cung (mệnh nữ). Cảm xúc dao động ảnh hưởng sức khỏe, nên giữ tâm trạng thoải mái',
  },
  '贪狼': {
    niHaixia: 'Thầy Nghê nói Tham Lang là sao đa tài đa nghệ nhất, đào hoa nặng nhất. Tham Lang Hóa Lộc nhập Mệnh thì sức hút tỏa khắp, ai gặp cũng mến. Tham Lang là sao phát muộn, trung niên trở đi mới thật sự phát đạt. Tham Lang ở Dần, Thân nhập Miếu là đẹp nhất, đào hoa vượng, tài nghệ vượt trội; Hóa Lộc thì tài vận đại phát, nhưng nếu gặp Không Kiếp thì cả đời nhiều trắc trở, khó tụ tài.',
    classical: 'Cổ quyết: «Tham Lang phát phúc hanh thông, đa tài đa nghệ, đào hoa nặng nhất; nhưng khó qua tuổi ba mươi, người phát muộn nhiều. Lạc Hãm gặp sát lại thành cát, đó là lý của Tham Lang lạc Hãm.» Nam Bắc Sơn Nhân chú: «Tham Lang thủ Mệnh, gặp cát thì phúc lộc thọ nhiều, phát phúc hanh thông; nhưng lâu dài khó được thiện chung, nên tu thân dưỡng đức mới có kết cục tốt.»',
    bestPalace: 'cung Mệnh (khi Hóa Lộc), cung Phúc Đức, cung Thiên Di',
    worstPalace: 'cung Tật Ách',
    career: 'Nghệ thuật, giải trí, quan hệ công chúng, bán hàng, ngũ thuật phong thủy; dựa vào quan hệ và tài nghệ, kiểu người đa tài',
    relationship: 'Đào hoa rất vượng, tình cảm nhiều chiều; nên kết hôn muộn, sau khi cưới cần tiết chế đào hoa mới bạc đầu',
    wealth: 'Kiếm tiền nhờ quan hệ và tài nghệ, tài vận trung vãn niên mới ổn; Hóa Lộc thì nguồn tiền rộng mở, thời trẻ nên giữ vững',
    health: 'Hành Mộc (kiêm Thủy), chú ý gan, thận. Đào hoa quá vượng dễ hao tổn tinh lực, nên tiết chế điều dưỡng',
  },
  '巨门': {
    niHaixia: 'Thầy Nghê cho rằng Cự Môn là sao khẩu thiệt thị phi, nhưng Hóa Lộc, Hóa Quyền thì chuyển cát, thành cách cục kiếm tiền bằng tài ăn nói. Người Cự Môn thủ Mệnh đa nghi, giỏi biện luận, hợp làm luật sư, giáo viên, bán hàng. Cự Môn kỵ nhất Hóa Kỵ, chủ khẩu thiệt thị phi không dứt, thậm chí dẫn tới kiện tụng. Cự Môn ở Tý, Ngọ khá tốt, ăn nói giỏi, chủ lập thân bằng lời nói.',
    classical: 'Cổ quyết: «Cự Môn là ám diệu, chủ khẩu thiệt thị phi; Hóa Lộc, Quyền thì chuyển thành mưu sinh bằng tài ăn nói, chủ phú quý.» Nam Bắc Sơn Nhân chú: «Cự Môn thủ Mệnh, gặp Hóa Lộc, Quyền, người lấy lời nói làm nghề thì đại cát; Hóa Kỵ thì khẩu thiệt liên lụy, kiện tụng quấn thân, phải cẩn trọng lời nói.»',
    bestPalace: 'cung Quan Lộc (Hóa Lộc, Quyền), cung Mệnh (Tý, Ngọ)',
    worstPalace: 'cung Phu Thê, cung Tật Ách (khi Hóa Kỵ)',
    career: 'Luật sư, giáo viên, bán hàng, dẫn chương trình, chuyên gia đàm phán; tài ăn nói là năng lực cạnh tranh cốt lõi',
    relationship: 'Đa nghi đa lự, dễ nghĩ quá nhiều; giao tiếp là chìa khóa của hôn nhân, cần chọn người bạn đời kiên nhẫn',
    wealth: 'Kiếm tiền bằng tài ăn nói và kỹ năng chuyên môn; Hóa Lộc thì tài vận khá, Hóa Kỵ phòng tranh chấp tiền bạc, khẩu thiệt liên lụy',
    health: 'Hành Thủy, chú ý thận, tai, khoang miệng. Lo nghĩ nhiều dễ hại thân, nên học cách thư giãn giảm áp lực',
  },
  '天相': {
    niHaixia: 'Thầy Nghê nói Thiên Tướng là ấn tinh, lo việc hành chính sự vụ. Người Thiên Tướng thủ Mệnh khuôn phép đứng đắn, hợp công chức hành chính. Thiên Tướng cần có sao mạnh phối hợp mới phát huy, một mình thủ Mệnh thì khá bình thường. Thiên Tướng thích nhất Liêm Trinh đi cùng, thành cách Liêm Tướng, có thể nắm quyền hành chính lớn; sợ nhất gặp Kình Dương và Hóa Kỵ giáp, thành cách «Hình Kỵ giáp ấn», chủ hung hiểm.',
    classical: 'Cổ quyết: «Thiên Tướng là sao ấn thụ, chủ hành chính sự vụ; Liêm Tướng đồng cung, hóa hung thành cát, nắm quyền hành chính lớn.» Nam Bắc Sơn Nhân chú: «Thiên Tướng thủ Mệnh, khuôn phép đứng đắn, hợp công chức; được Liêm Trinh phối hợp, có thể thành rường cột quốc gia; Phá Quân cùng thủ thì khó tránh hình khắc.»',
    bestPalace: 'cung Quan Lộc, cung Mệnh (đi cùng Liêm Trinh)',
    worstPalace: 'cung Tài Bạch, cung Mệnh (gặp cách Hình Kỵ giáp ấn)',
    career: 'Công chức, quản lý hành chính, thư ký, trợ lý; giỏi vai trò hỗ trợ phò tá, cần sao mạnh dẫn đường',
    relationship: 'Tình cảm ổn định, trung hậu thật thà, là người bạn đời tốt, nhưng cần đối phương định hướng',
    wealth: 'Tài vận bình ổn, tích lũy nhờ lương, không hợp đầu tư mạo hiểm, hợp nhất với quản lý tiền kiểu giữ của',
    health: 'Hành Thủy, chú ý thận, hệ bạch huyết. Thể chất trung bình, nên giữ thói quen sinh hoạt điều độ',
  },
  '天梁': {
    niHaixia: 'Thầy Nghê cho rằng Thiên Lương là ấm tinh, che chở được người khác, cũng đại diện cho y dược, tôn giáo. Người Thiên Lương thủ Mệnh có duyên với bề trên, thời trẻ nhiều gian truân, về già hưởng phúc. Thiên Lương sợ nhất Hóa Kỵ, chủ bề trên hoặc sức khỏe có vấn đề. Thiên Lương cùng Thái Dương đồng cung là tốt nhất, quý nhân che chở, cả đời có quý nhân giúp đỡ, cuối cùng được bình an.',
    classical: 'Cổ quyết: «Thiên Lương là ấm tinh, chủ che chở bảo hộ; người thủ Mệnh có duyên bề trên, thời trẻ chịu rèn luyện, về già hưởng thanh phúc.» Nam Bắc Sơn Nhân chú: «Thiên Lương thủ Mệnh, phải gặp cát tinh mới phát đạt; gặp Thái Dương đồng cung, chủ quý hiển, cả đời nhiều quý nhân giúp đỡ.»',
    bestPalace: 'cung Mệnh, cung Phụ Mẫu, cung Phúc Đức',
    worstPalace: 'cung Mệnh (khi Hóa Kỵ), cung Tài Bạch',
    career: 'Y tế, tôn giáo, pháp luật, công tác xã hội, từ thiện; thích giúp người, có lòng che chở mọi người',
    relationship: 'Tình cảm hay gắn với người chênh lệch tuổi khá nhiều, hoặc duyên đến muộn; cần kiên nhẫn chờ mới gặp lương duyên',
    wealth: 'Tài vận nhờ quý nhân giúp; thời trẻ tài vận chưa tốt, về già mới vững, nên giữ hơn là xông pha',
    health: 'Hành Thổ, chú ý tỳ vị, xương cốt. Cần coi trọng chăm sóc sức khỏe tuổi già, nên phòng ngừa điều dưỡng sớm',
  },
  '七杀': {
    niHaixia: 'Thầy Nghê nói Thất Sát là sao tướng quân, quả quyết xông pha, nhưng có tính cô khắc. Thất Sát thủ Mệnh phải có phụ tinh hóa giải tính cô, nếu không lục thân duyên mỏng. Thất Sát cùng Vũ Khúc đồng cung là cách tướng tài, rất tốt. Thất Sát sợ nhất Kình Dương, Đà La, Hỏa Tinh, Linh Tinh cùng chiếu, chủ đại hung, phải phòng tai nạn. Thất Sát Hóa Lộc lại thành cát, có thể thành đại tướng chi tài.',
    classical: 'Cổ quyết: «Thất Sát là sao tướng quân, quả quyết xông pha; người thủ Mệnh tính cô khắc nặng, lục thân duyên mỏng.» Nam Bắc Sơn Nhân chú: «Thất Sát thủ Mệnh, tam hợp cát tụ thì đại quý; gặp Dương Đà Hỏa Linh cùng chiếu, chủ đại hung, phòng tai nạn bất ngờ, phòng hình khắc.»',
    bestPalace: 'cung Mệnh (có phụ tinh), cung Quan Lộc',
    worstPalace: 'cung Phu Thê, cung Phụ Mẫu',
    career: 'Quân đội, công an, khởi nghiệp, giao dịch tài chính, lĩnh vực tự gánh vác một mình; cần quyết đoán nhanh và bản lĩnh',
    relationship: 'Tình cảm cô khắc, khó tìm người hợp; cần đối tượng bao dung được cá tính mạnh, nên kết hôn muộn',
    wealth: 'Tài vận dao động lớn, có cơ hội đại phú nhưng cũng lên voi xuống chó; cùng Vũ Khúc đồng cung thành cách tướng tài đại quý',
    health: 'Hành Kim, chú ý phổi, đại tràng. Tính nóng nảy dễ hại thân, nên học cách kiểm soát cảm xúc và tu thân',
  },
  '破军': {
    niHaixia: 'Thầy Nghê nói Phá Quân là sao giỏi phá cũ lập mới nhất, cũng là một trong những sao cô khắc nhất. Phá Quân Hóa Lộc mới chuyển tốt, nghĩa là phá rồi mới lập được. Người Phá Quân thủ Mệnh lục thân duyên mỏng, nhưng năng lực khai sáng cực mạnh. Phá Quân hợp nhất với cải cách, sáng tạo; khi Hóa Lộc tài vận chuyển vượng, một phá một lập, cuối cùng thành tựu sự nghiệp.',
    classical: 'Cổ quyết: «Phá Quân là sao giỏi phá cũ lập mới nhất, người thủ Mệnh cô khắc, lục thân duyên mỏng, nhưng năng lực khai sáng vượt trội; Hóa Lộc thì phá rồi lập, có thể thành đại nghiệp.» Nam Bắc Sơn Nhân chú: «Phá Quân thủ Mệnh, cả đời nhiều trắc trở; Hóa Lộc thì sau khi hao tài mới gây dựng lại được, tài vận cuối cùng chuyển tốt, chủ thành tựu lúc về già.»',
    bestPalace: 'cung Quan Lộc (khi Hóa Lộc), cung Thiên Di',
    worstPalace: 'cung Phu Thê, cung Phụ Mẫu',
    career: 'Sự nghiệp khai sáng, quân đội, công an, cải cách, quản lý thay đổi; hợp công việc tiên phong không ngừng mở lĩnh vực mới',
    relationship: 'Tình cảm nhiều trắc trở, hợp tan bất định, lục thân duyên mỏng; cần chọn người bạn đời độc lập và bao dung',
    wealth: 'Tài vận lên xuống lớn, Hóa Lộc thì chuyển tốt; chỉ giữ thì tài lui, phải không ngừng mở cục diện mới mới tích được của',
    health: 'Hành Thủy, chú ý thận, bàng quang, hệ sinh sản. Thể chất thất thường, nên giữ thói quen vận động đều đặn',
  },
};

// Phụ tinh / sát tinh: một đoạn ngắn kèm cổ quyết
const MINOR_DETAIL: Record<string, string> = {
  '文昌': 'Văn Xương vào cung, chủ học hành thi cử thuận lợi, giấy tờ ấn tín có lợi, hợp nghề liên quan chữ nghĩa. Cổ quyết: «Văn Xương khoa giáp, chủ văn chương hiển đạt, thi là đỗ.»',
  '文曲': 'Văn Khúc vào cung, chủ tài nghệ xuất chúng, ăn nói giỏi, giỏi biểu đạt, năng khiếu nghệ thuật mạnh. Cổ quyết: «Văn Khúc là sao tài nghệ, văn võ đều được, tài ăn nói hơn người.»',
  '左辅': 'Tả Phù vào cung, chủ quý nhân giúp đỡ, có người nâng đỡ, việc của cung đó được ủng hộ thiện ý. Cổ quyết: «Tả Phù là sao trợ lực, thủ Mệnh thì nhiều quý nhân, gặp hung hóa cát.»',
  '右弼': 'Hữu Bật vào cung, chủ quý nhân giúp đỡ, phần nhiều là quý nhân nữ, việc của cung đó có người hỗ trợ. Cổ quyết: «Hữu Bật là sao âm trợ, nhiều quý nhân nữ, hóa hiểm thành an.»',
  '天魁': 'Thiên Khôi vào cung, chủ quý nhân dương (ban ngày), nhiều quý nhân nam, có sức gặp hung hóa cát. Cổ quyết: «Thiên Khôi là Thiên Ất quý nhân, gặp ắt có quý nhân nâng đỡ.»',
  '天钺': 'Thiên Việt vào cung, chủ quý nhân âm (ban đêm), nhiều quý nhân nữ, thêm khí cát tường. Cổ quyết: «Thiên Việt là Ngọc Đường quý nhân, chủ âm trợ, nhiều quý nhân nữ.»',
  '禄存': 'Lộc Tồn vào cung, chủ tài lộc giữ được, cung đó có tài khí nhưng là tài vận kiểu bảo thủ. Cổ quyết: «Lộc Tồn là sao tài lộc, chủ giữ của có dư, tiến tài vững vàng.»',
  '天马': 'Thiên Mã vào cung, chủ bôn ba dịch chuyển, động mới có tiền, nên chủ động ra tay, không nên ôm cây đợi thỏ. Cổ quyết: «Thiên Mã chủ động, gặp Lộc thì tài lộc song toàn, động mà sinh tài.»',
  '地空': 'Địa Không vào cung, chủ việc của cung đó có cảm giác hụt hẫng, tinh thần hao tán, nên chú ý sức khỏe tâm lý. Cổ quyết: «Địa Không chủ hư hao, nhập cung Mệnh phần nhiều tinh thần mơ hồ, phải phòng mộng tưởng viển vông.»',
  '地劫': 'Địa Kiếp vào cung, chủ việc của cung đó có tổn thất bất ngờ, tiền bạc phải thận trọng, phòng tiểu nhân. Cổ quyết: «Địa Kiếp chủ kiếp tài, nhập cung Mệnh thì tài vận bị tổn, phòng mất mát bất ngờ.»',
  '火星': 'Hỏa Tinh vào cung, chủ việc của cung đó nóng vội bốc đồng, cảm xúc dao động; nhưng gặp Tham Lang lại thành cát. Cổ quyết: «Hỏa Tinh chủ nóng nảy, nhưng gặp Tham Lang đồng cung lại thành cách Hỏa Tham, chủ bạo phát.»',
  '铃星': 'Linh Tinh vào cung, chủ việc của cung đó có cản trở ngầm, phòng tiểu nhân sau lưng, mọi việc nên kín đáo. Cổ quyết: «Linh Tinh chủ ám sát, nhập Mệnh phần nhiều bị địch ngầm, phải phòng thị phi sau lưng.»',
  '擎羊': 'Kình Dương vào cung, chủ hình khắc, việc của cung đó nhiều trắc trở, có tai họa đổ máu hoặc tai nạn. Cổ quyết: «Kình Dương là sao hình khắc, nhập cung Mệnh phần nhiều hình khắc, phải phòng tai nạn đổ máu.»',
  '陀罗': 'Đà La vào cung, chủ thị phi quấn thân, việc của cung đó dây dưa không dứt, mọi việc nên chuẩn bị sớm. Cổ quyết: «Đà La chủ thị phi trì trệ, nhập cung Mệnh làm việc chậm chạp, phải phòng dây dưa không rõ.»',
};

const levelConfig = {
  major: { label: 'Chính tinh', color: 'text-amber-500 border-amber-500/30 bg-amber-500/10' },
  lucky: { label: 'Cát tinh', color: 'text-sky-500 border-sky-500/30 bg-sky-500/10' },
  sha:   { label: 'Sát tinh', color: 'text-red-500 border-red-500/30 bg-red-500/10' },
  minor: { label: 'Tạp tinh', color: 'text-slate-400 border-slate-500/25 bg-slate-500/10' },
};

const siHuaColors: Record<string, string> = {
  '禄': 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
  '权': 'text-blue-500 bg-blue-500/10 border-blue-500/30',
  '科': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
  '忌': 'text-red-500 bg-red-500/10 border-red-500/30',
};

function brightnessLabel(star: Star): string | null {
  if (star.brightnessRaw) return viTerm(star.brightnessRaw);
  if (star.brightness) return star.brightness === 'bright' ? 'Miếu Vượng' : star.brightness === 'dim' ? 'Hãm' : 'Bình';
  return null;
}

export default function StarDetailPanel({ star, palaceName, onClose }: StarDetailPanelProps) {
  const desc = star ? STAR_DESCRIPTIONS[star.name] : null;
  const detail = star ? STAR_DETAIL[star.name] : null;
  const minor = star ? MINOR_DETAIL[star.name] : null;
  const typeConfig = star ? levelConfig[star.type] : null;
  const bright = star ? brightnessLabel(star) : null;
  const isDim = star?.brightness === 'dim';
  const isBright = star?.brightness === 'bright';

  return (
    <AnimatePresence>
      {star && (
        <motion.div
          key={star.name + (palaceName ?? '')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="card-glass rounded-xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--t-border)' }}>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl font-bold" style={{ color: 'var(--t-gold)' }}>{viTerm(star.name)}</span>
              {typeConfig && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${typeConfig.color}`}>{typeConfig.label}</span>
              )}
              {star.siHua && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${siHuaColors[star.siHua] || ''}`}>
                  Hóa {viTerm(star.siHua)}
                </span>
              )}
            </div>
            <button onClick={onClose} aria-label="Đóng" className="transition-colors text-lg leading-none px-1" style={{ color: 'var(--t-faint)' }}>×</button>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto max-h-[560px]">
            <div className="flex flex-wrap gap-1.5">
              {[
                ...(desc ? [`Ngũ hành · ${desc.element}`, `Tính chất · ${desc.nature}`] : []),
                ...(palaceName ? [`Vị trí · ${viTerm(palaceName)}`] : []),
              ].map(tag => (
                <div key={tag} className="text-[10px] px-2 py-1 rounded-full"
                  style={{ border: '1px solid var(--t-border)', color: 'var(--t-text2)' }}>
                  {tag}
                </div>
              ))}
              {bright && (
                <div className="text-[10px] px-2 py-1 rounded-full"
                  style={{ border: '1px solid var(--t-border)', color: isBright ? '#eab308' : isDim ? '#ef4444' : 'var(--t-text2)' }}>
                  Độ sáng · {bright}
                </div>
              )}
            </div>

            {desc && (
              <div>
                <div className="text-[10px] tracking-widest mb-1.5" style={{ color: 'var(--t-faint)' }}>Đặc tính của sao</div>
                <div className="flex flex-wrap gap-1.5">
                  {desc.keywords.split('·').map(k => (
                    <span key={k} className="text-[11px] px-2 py-0.5 rounded-full"
                      style={{ color: 'var(--t-gold)', border: '1px solid var(--ac-bdr)', background: 'var(--ac-bg)' }}>
                      {k.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {detail && (
              <>
                <div className="rounded-xl p-3" style={{ background: 'var(--ac-bg)', border: '1px solid var(--ac-bdr)' }}>
                  <div className="text-[10px] tracking-widest mb-1.5" style={{ color: 'var(--t-gold)', opacity: 0.8 }}>Cổ thư</div>
                  <p className="text-[11px] leading-relaxed italic" style={{ color: 'var(--t-gold)' }}>{detail.classical}</p>
                </div>

                <div>
                  <div className="text-[10px] tracking-widest mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--t-faint)' }}>
                    <span className="w-3 h-px inline-block" style={{ background: 'var(--t-border-acc)' }} />
                    Lời giảng của thầy Nghê Hải Hạ
                    <span className="w-3 h-px inline-block" style={{ background: 'var(--t-border-acc)' }} />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t-text2)' }}>{detail.niHaixia}</p>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: 'Hướng sự nghiệp', value: detail.career, icon: '◈' },
                    { label: 'Tình cảm', value: detail.relationship, icon: '♡' },
                    { label: 'Tài vận', value: detail.wealth, icon: '◆' },
                    { label: 'Sức khỏe', value: detail.health, icon: '☯' },
                  ].map(item => (
                    <div key={item.label} className="card-inner rounded-lg p-3">
                      <div className="text-[10px] mb-1 flex items-center gap-1" style={{ color: 'var(--t-faint)' }}>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--t-text2)' }}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="text-[10px] p-2.5 rounded-lg" style={{ border: '1px solid rgba(74,222,128,0.2)', background: 'rgba(74,222,128,0.05)' }}>
                    <div className="text-emerald-500 mb-0.5 font-medium">Cung tốt nhất</div>
                    <div className="text-emerald-600/80">{detail.bestPalace}</div>
                  </div>
                  <div className="text-[10px] p-2.5 rounded-lg" style={{ border: '1px solid rgba(248,113,113,0.2)', background: 'rgba(248,113,113,0.05)' }}>
                    <div className="text-red-500 mb-0.5 font-medium">Cung cần lưu ý</div>
                    <div className="text-red-600/80">{detail.worstPalace}</div>
                  </div>
                </div>
              </>
            )}

            {!detail && (
              <p className="text-xs leading-relaxed" style={{ color: 'var(--t-text2)' }}>
                {minor ?? 'Chưa có lời giải chi tiết cho sao này. Hãy xem cùng chính tinh trong cung để luận.'}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
