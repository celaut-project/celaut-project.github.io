/*
 * Bản tiếng Việt. Cấu trúc khoá giống hệt en.js — khoá nào thiếu ở đây
 * sẽ tự động rơi về tiếng Anh, nên trang không bao giờ bị trống.
 *
 * Nguyên tắc dịch
 * ---------------
 * • Xưng hô "bạn", đúng văn phong các trang kỹ thuật tiếng Việt.
 * • Thuật ngữ riêng của mô hình (BOX, API, NET, node, service, microVM,
 *   DePIN, nodo, Ergo) giữ nguyên: đó là từ vựng của dự án, không phải
 *   từ cần dịch.
 * • Giữ nguyên HTML nội dòng (<strong>, <em>) và dấu câu kiểu chữ của
 *   bản gốc.
 */

export default {
	common: {
		scroll: 'Cuộn',
		toTop: '↑ Lên đầu',
		backToTop: 'Về đầu trang',
		gains: 'Được',
		costs: 'Mất',
		visit: 'Ghé thăm →',
		readMore: 'Đọc thêm →',
		viewOnGitHub: 'Xem trên GitHub →',
		languageLabel: 'Ngôn ngữ',
		switchLanguage: 'Đổi ngôn ngữ',
		toc: {
			nav: 'Điều hướng các phần',
			title: 'Trên trang này',
			open: 'Mở menu các phần',
			close: 'Đóng menu các phần'
		}
	},
	theme: {
		toLight: 'Chuyển sang giao diện sáng',
		toDark: 'Chuyển sang giao diện tối',
		toggle: 'Đổi giao diện'
	},
	topbar: {
		nav: 'Các phần của Celaut',
		links: {
			depin: {
				label: 'Cho thuê PC',
				short: 'Thuê PC'
			},
			developers: {
				label: 'Lập trình viên',
				short: 'Dev'
			},
			users: {
				label: 'Người dùng',
				short: 'Người dùng'
			},
			paradigm: {
				label: 'Mô hình',
				short: 'Mô hình'
			}
		}
	},
	home: {
		hero: {
			tagline: 'Kiến trúc ngang hàng cho việc thiết kế và phân phối phần mềm',
			primary: 'Bắt đầu dùng',
			secondary: 'Tìm hiểu thêm',
			facts: [
				'Lấy cảm hứng từ automata tế bào — hành vi toàn cục bền bỉ nảy sinh từ những quy tắc cục bộ đơn giản.',
				'Tất định ngay từ thiết kế: đầu vào giống nhau luôn cho ra đầu ra giống nhau và kiểm chứng được.',
				'Không có sổ đăng ký trung tâm. Service lan truyền ngang hàng giữa các node độc lập.',
				'Mỗi service được định danh bằng nội dung — hash chính là tên của nó, nên không gì có thể bị tráo đổi âm thầm.',
				'Node chạy mỗi service niêm phong trong môi trường vi mô cách ly riêng của nó.',
				'Danh tiếng nằm on-chain: niềm tin được kiếm và chứng minh được, không do ai đó ban phát.',
				'Ba nguyên tắc, xuyên suốt: phi tập trung, đơn giản và tất định.'
			]
		},
		atoms: {
			eyebrow: 'Hai thành tố cơ bản',
			note: 'Hai nguyên tử. Đặc tả, thực thi, thanh toán và danh tiếng chỉ là cách hai thứ đó tương tác với nhau.',
			items: [
				{
					title: 'Một node',
					body: 'Một <strong>máy tính hoặc thiết bị</strong> trò chuyện với các node ngang hàng và quản lý việc thực thi service. Nó cung cấp phần cứng, quyết định chạy công việc tại chỗ hay chuyển đi nơi khác, và không bao giờ cần hiểu phần mềm đó làm gì.'
				},
				{
					title: 'Một service',
					body: 'Một <strong>container phần mềm tất định</strong> được dựng để làm đúng một việc. Nó được niêm phong khỏi node đang chạy nó: node không soi vào chương trình, và chương trình không biết mình đáp xuống máy nào.'
				}
			]
		},
		index: {
			sections: {
				foundations: 'Nguồn gốc',
				atoms: 'Node & service',
				nodes: 'Mạng lưới',
				services: 'Service',
				'service-spec': 'Đặc tả',
				execution: 'Thực thi',
				determinism: 'Tính tất định',
				coordination: 'Phối hợp',
				'core-principles': 'Nguyên tắc',
				'what-is-not': 'Những gì không phải',
				implementations: 'Triển khai',
				applications: 'Ứng dụng',
				'user-roles': 'Bạn thuộc nhóm nào?'
			}
		},
		scenes: {
			foundations: {
				label: 'Nó đến từ đâu',
				beats: [
					{
						h: 'Mọi thứ bắt đầu từ một nhúm quy tắc.',
						p: 'Thập niên 1940, <strong>John von Neumann</strong> và <strong>Stanislaw Ulam</strong> giới thiệu automata tế bào: những mô hình cho thấy hành vi phức tạp có thể nảy sinh từ những hành vi đơn giản.'
					},
					{
						h: 'Chẳng ai điều khiển chuyện này cả.',
						p: 'Năm 1970, <strong>&ldquo;Game of Life&rdquo; của John Horton Conway</strong> trở thành ví dụ kinh điển: một lưới ô mà mỗi ô chỉ nhìn vào hàng xóm của nó, vậy mà tổng thể lại sinh ra những cấu trúc tinh vi, không ngừng tiến hoá.'
					},
					{
						h: 'Đó chính là toàn bộ triết lý thiết kế.',
						p: 'Những ý tưởng này hé lộ cách các hệ thống phi tập trung có thể <strong>đạt tới độ phức tạp mà không cần điều khiển trung tâm</strong> — triết lý dẫn đường của Celaut. Quy tắc đơn giản ở tầng node và service, một hệ thống thích nghi ở phía trên.',
						note: 'Phi tập trung · Đơn giản · Tất định'
					}
				]
			},
			nodes: {
				label: 'Mạng lưới',
				beats: [
					{
						h: 'Có node không phải là điểm khác biệt.',
						p: 'Hầu hết mạng phi tập trung đều có node, và phần lớn vẫn phụ thuộc vào một thứ đầy quyền lực: <strong>giao thức mà ai cũng phải chạy</strong>. Quy tắc mới là trung tâm, ngay cả khi máy móc thì không.'
					},
					{
						h: 'Celaut không có giao thức nào phải đồng thuận.',
						p: 'Các node không phải thống nhất trước một giao thức giao tiếp — chúng <strong>khai báo các giao diện chúng hỗ trợ và các phương thức thanh toán chúng chấp nhận ngay khi tiếp xúc</strong>. Hai node nói chuyện về bất cứ điểm chung nào chúng tình cờ có; chỗ nào không giao nhau thì đơn giản là không nói.'
					},
					{
						h: 'Nên bạn thay đổi node của mình, không phải mạng lưới.',
						p: 'Một chính sách giá mới, một phương thức thanh toán khác, một định dạng đặc tả chưa ai đọc được — bạn <strong>hiện thực nó ngay trong node của mình</strong> và nó hoạt động với bất kỳ ai đã hỗ trợ. Không ai bỏ phiếu, không có gì phải di trú, và <strong>không có hard fork nào phải sống sót qua</strong>.',
						note: 'Không giao thức chung. Không phiên bản chung. Không cần xin phép.'
					}
				]
			},
			services: {
				label: 'Thứ chạy trên đó',
				beats: [
					{
						h: 'Service là một container niêm phong.',
						p: 'Service trong Celaut là <strong>các container phần mềm tất định</strong> được thiết kế để làm một nhiệm vụ cụ thể. Không có gì cầu kỳ hơn thế.'
					},
					{
						h: 'Theo nguyên tắc hộp đen.',
						p: 'Chúng vận hành <strong>độc lập với các node thực thi chúng</strong>, chỉ tập trung vào chức năng của mình. Node không cần hiểu service, và service không cần biết gì về node.'
					},
					{
						h: 'Cách ly, mọi lần, không ngoại lệ.',
						p: 'Mỗi yêu cầu chạy như một <strong>tiến trình cách ly</strong> — trong <strong>máy ảo</strong> của riêng nó, với nhân riêng và một ranh giới do phần cứng áp đặt — che đi hoàn toàn môi trường thực thi và giữ nguyên vẹn ranh giới bảo mật.',
						note: 'Cái gì vào, cái gì ra. Đó là toàn bộ giao diện.'
					}
				]
			},
			'service-spec': {
				label: 'Cách một service được đặc tả',
				explore: 'Khám phá {what}',
				exploreClose: 'Quay lại toàn bộ service',
				beats: [
					{
						h: '<strong>BOX</strong> — môi trường.',
						p: 'Kiến trúc, hệ thống tệp, biến môi trường, entrypoint, cấu hình và tài nguyên. Nó mô tả trực tiếp toàn bộ cấu trúc tệp thay vì dựa vào image hay repository bên ngoài, và chính điều đó khiến việc thực thi tái lập được trên bất kỳ node nào.'
					},
					{
						h: '<strong>API</strong> — giao diện.',
						p: 'Cách giao tiếp với service, các hệ thống thanh toán nó chấp nhận và chi phí đi kèm. Nó cho phép dùng service mà không cần một bộ điều khiển trung tâm nào đứng ra thương lượng giao thức thay cho nó.'
					},
					{
						h: '<strong>NET</strong> — phạm vi mạng.',
						p: 'Mặc định một service <strong>bị cách ly</strong>: nó chỉ nói chuyện được với service cha, các service con và node đang chạy nó. Nếu cần ra thế giới bên ngoài, <strong>những mạng nó sẽ chạm tới được nêu tên ngay trong đặc tả của chính nó</strong> — node cấp quyền đó, vì nó muốn chạy service cho đúng, còn bạn có được bảo đảm rằng service không bao giờ vươn tới nơi nào khác.'
					},
					{
						h: 'Ba thành phần. Một service di động.',
						p: 'Kết hợp lại, chúng tạo ra <strong>những service di động, tái lập được</strong>, triển khai nhất quán trên khắp mạng lưới trong khi vẫn giữ được bảo mật và tính tất định.',
						note: 'Không phụ thuộc bên thứ ba. Không gì bị bỏ ngỏ.'
					}
				]
			},
			execution: {
				label: 'Ai quyết định điều gì',
				beats: [
					{
						h: 'Một service xin chạy các service con của nó.',
						p: 'Một service có thể yêu cầu thực thi <strong>các service con</strong> thông qua node của nó. Nó nêu rõ <strong>tài nguyên mà mỗi service con cần</strong> và giao cho chúng một ngân sách để tiêu. Không phải một cỗ máy, không phải một khu vực — mà là tài nguyên.'
					},
					{
						h: 'Node quyết định chúng chạy ở đâu.',
						p: 'Nó so sánh <strong>chi phí chạy phiên bản đó tại chỗ với mức giá từng node ngang hàng chào ra</strong> rồi chọn phương án nó cho là tốt nhất. Một service con ở lại đây; một cái khác đáp xuống node bạn.'
					},
					{
						h: 'Service cha không bao giờ biết được.',
						p: 'Nó không biết một service con rốt cuộc nằm trên máy này hay ở đâu khác, và cũng chẳng cần biết. Thứ duy nhất nó theo dõi là <strong>các service con tiêu thụ những gì và tiêu nhanh đến đâu</strong>, để có thể cân đối.'
					},
					{
						h: 'Chính sự phân tách đó là toàn bộ bí quyết.',
						p: 'Người vận hành node lo phần vật lý: phần cứng, năng lực, giá cả, chỗ đặt. Lập trình viên service <strong>khai báo tài nguyên họ cần và không nói gì về hạ tầng</strong>. Không ai phải làm việc của người kia — và đó chính là thứ giữ cho cả hai nửa đều đơn giản.',
						note: 'Hai mối bận tâm. Một lằn ranh sạch sẽ ở giữa.'
					}
				]
			},
			determinism: {
				label: 'Vì sao nó đứng vững',
				beats: [
					{
						h: 'Cùng đầu vào. Cùng đầu ra.',
						p: 'Service được đặc tả đầy đủ để hướng tới <strong>kết quả tái lập được</strong> qua thời gian và qua các node. Với cùng đầu vào, cùng một bản đặc tả lẽ ra phải cho ra cùng đầu ra, bất kể chạy ở đâu hay khi nào.'
					},
					{
						h: 'Không phải là bảo đảm trong mọi trường hợp.',
						p: 'Một service có vươn ra mạng thì không thể tái lập hoàn hảo — mạng trả lời mỗi lúc một khác. Nhưng một <strong>bản đặc tả mang theo nhiều hơn hẳn một định nghĩa Docker</strong>: kiến trúc, toàn bộ hệ thống tệp, entrypoint, cấu hình. Nên chuyện này gần với chạy một chương trình bình thường hơn nhiều so với kéo một image về rồi hy vọng.'
					},
					{
						h: 'Điều đó khiến niềm tin đo được.',
						p: 'Vì phần mềm không thể trôi dạt, <strong>một bằng chứng danh tiếng ghi lại từ lâu vẫn nói lên điều đúng ở hiện tại</strong> — miễn là service không vươn ra mạng nào, vốn là trạng thái mặc định của nó.'
					},
					{
						h: 'Và nó đi theo bạn.',
						p: 'Vì không phần nào của môi trường bị phó mặc cho máy chủ, cùng một đặc tả sẽ cho cùng một hành vi trên <strong>một chiếc laptop, một máy chủ nhàn rỗi hay một node bạn chưa từng nghe tên</strong>. Nó chạy ở đâu không còn là một phần của câu trả lời.',
						note: 'Đặc tả đầy đủ, nên chẳng còn gì phó mặc cho cỗ máy.'
					}
				]
			},
			coordination: {
				label: 'Người lạ hợp tác thế nào',
				more: 'Mô hình tin cậy đầy đủ →',
				beats: [
					{
						h: 'Danh tiếng đến trước.',
						p: '<strong>Không bao giờ mặc định có sự tin cậy giữa các bên.</strong> Node không tin node khác; bạn không mặc nhiên tin một service hay node đang chạy nó; node cũng không nhất thiết phải tin service mà nó thực thi. Chiều duy nhất đứng vững là chiều ngược lại: một service có thể tin node của mình, vì bên quyết định chạy nó đã chọn chính node đó. Nên chẳng có gì bắt đầu bằng một cái bắt tay; nó bắt đầu bằng một lần tra cứu: danh tiếng là <strong>các bản ghi trên ledger</strong>, là ý kiến chứ không phải phán quyết, được mỗi bên cân nhắc theo những nguồn mình vốn đã tin.'
					},
					{
						h: 'Rồi bạn trả tiền cho một lời hứa về tài nguyên.',
						p: 'Chỉ khi bản ghi kiểm tra xong thì mọi thứ mới nhúc nhích. Bên yêu cầu trả tiền <strong>trước</strong>, và thứ họ mua là một lời hứa: <strong>ngần này năng lực tính toán, trong ngần này thời gian</strong>. Cơ chế thanh toán nằm <strong>ngoài kiến trúc lõi</strong>, nên không ledger cụ thể nào bị đóng cứng vào trong.'
					},
					{
						h: 'Bảo chứng của node chính là danh tiếng của nó.',
						p: 'Chẳng có gì ép nó phải giữ lời hứa đó. Thứ giữ nó lại là <strong>kết quả sẽ được ghi ngược lại vào ledger</strong> — và một node mà hồ sơ nói rằng nó đã nhận tiền rồi giao thiếu sẽ thôi được chọn. Mỗi bên đều có lợi ích lâu dài trong việc khiến người lạ tiếp theo hài lòng với những gì họ đọc được.',
						note: 'Kiểm tra · trả tiền · giao hàng · ghi nhận. Rồi lại một vòng.'
					}
				]
			},
			'core-principles': {
				label: 'Những quy tắc nó giữ',
				beats: [
					{
						h: 'Chẳng có gì trong đó là một danh sách tính năng.',
						p: 'Một mạng lưới không có giao thức nào phải thống nhất, các dịch vụ được niêm phong khỏi những cỗ máy chạy chúng, các mạng được khai báo trước, thanh toán trước khi thực thi — mỗi thứ đều là một <strong>hệ quả</strong>. Ba cam kết sinh ra chúng, và ba cam kết ấy nâng đỡ lẫn nhau.'
					},
					{
						h: 'Phi tập trung.',
						p: 'Không có <strong>điểm kiểm soát hay điểm hỏng đơn lẻ</strong> nào. Các node giao tiếp và phối hợp một cách động, không có ai ở giữa để phải xin phép — đó chính là lý do ngay từ đầu đã chẳng có giao thức nào phải thống nhất.'
					},
					{
						h: 'Đơn giản.',
						p: '<strong>Những quy tắc tối giản</strong> làm giảm độ phức tạp, nhờ đó mỗi thành phần vẫn đủ nhỏ để hiểu và bảo trì riêng lẻ. Một dịch vụ là một container, một giao diện và một phạm vi mạng — chỉ có vậy.'
					},
					{
						h: 'Tất định.',
						p: 'Dịch vụ được đặc tả đủ đầy để <strong>tái lập kết quả của chính nó</strong> qua thời gian và qua các máy khác nhau. Cùng đầu vào thì cùng đầu ra, chạy ở đâu và khi nào cũng vậy — đó là điều khiến một uy tín được ghi lại từ một năm trước hôm nay vẫn đáng đọc.',
						note: 'Bỏ đi bất kỳ cái nào trong ba, hai cái còn lại gần như hết giá trị.'
					}
				]
			}
		},
		roles: {
			eyebrow: 'Chọn lối vào của bạn',
			heading: 'Bạn thuộc nhóm nào?',
			intro: 'Là người dùng, chúng ta có thể đóng ba loại vai trò trong hệ sinh thái này. Mỗi vai có lối vào riêng.',
			items: [
				{
					eyebrow: 'Vai trò 01',
					title: 'Người vận hành node',
					lede: 'Tương tự thợ đào trong các hệ thống blockchain, người vận hành node cung cấp tài nguyên tính toán cho mạng lưới. Họ thực thi các service mà người dùng yêu cầu để đổi lấy thù lao, mà không cần hiểu chức năng cụ thể của những service đó.',
					points: [
						'Cung cấp tài nguyên phần cứng',
						'Thực thi service khi được yêu cầu',
						'Nhận thù lao cho tài nguyên'
					],
					primary: 'Cho thuê PC',
					secondary: 'Chạy một node'
				},
				{
					eyebrow: 'Vai trò 02',
					title: 'Lập trình viên service',
					lede: 'Lập trình viên tạo ra các service có thể chạy trên bất kỳ node tương thích nào trong mạng. Họ tập trung xây dựng chức năng mà không phải bận tâm tới chi tiết hạ tầng bên dưới.',
					points: [
						'Thiết kế đặc tả service',
						'Xây dựng ứng dụng tất định',
						'Phân phối service tới các node'
					],
					primary: 'Xây trên Celaut',
					secondary: 'Khám phá Skills'
				},
				{
					eyebrow: 'Vai trò 03',
					title: 'Người dùng service',
					lede: 'Người dùng cuối khởi chạy service trên các node và trả tiền cho tài nguyên tính toán đã dùng.',
					points: [
						'Yêu cầu thực thi service',
						'Trả tiền cho tài nguyên tính toán',
						'Sử dụng kết quả của service'
					],
					primary: 'Dùng mạng lưới',
					secondary: 'Khám phá Skills'
				}
			]
		},
		principles: {
			items: [
				{
					title: 'Phi tập trung'
				},
				{
					title: 'Đơn giản'
				},
				{
					title: 'Tất định'
				}
			]
		},
		whatIsNot: {
			eyebrow: 'Những hiểu lầm thường gặp',
			heading: 'Celaut không phải là gì',
			intro: 'Kiến trúc này nằm đủ gần vài thứ quen thuộc để bị nhầm với chúng. Cũng đáng để nói cho rõ về những khác biệt.',
			items: [
				{
					title: 'Không phải một mạng lưới duy nhất',
					body: 'Celaut định nghĩa một <strong>kiến trúc linh hoạt</strong>, không phải một mạng lưới định sẵn. Có thể sẽ xuất hiện những mạng chiếm ưu thế, nhưng hệ thống hỗ trợ nhiều cấu trúc ngang hàng khác nhau thay vì áp đặt một cấu trúc duy nhất.'
				},
				{
					title: 'Không phải một ngăn xếp giao thức hoàn chỉnh',
					body: 'Nó cung cấp <strong>các nguyên tắc cốt lõi</strong> để dựng các ngăn xếp phân phối tính toán, chứ không phải một ngăn xếp đầy đủ và áp đặt. Các bản triển khai hiện tại dựa vào những thành phần như gRPC hay Docker, và đó là những lựa chọn có thể thay thế.'
				},
				{
					title: 'Không phải một dự án blockchain',
					body: 'Celaut <strong>không có tiền mã hoá riêng</strong> và không có DAO. Nó có dùng công nghệ blockchain ở những chỗ chúng thực sự xứng đáng — ghi nhận danh tiếng, thanh toán giữa những người lạ — mà không ôm lấy cả hệ sinh thái xung quanh.'
				}
			]
		},
		implementations: {
			eyebrow: 'Phần mềm',
			heading: 'Hôm nay có gì',
			intro: 'Kiến trúc này là một đặc tả, và ai cũng có thể hiện thực một node theo nó. Một hiện thực đang thực sự vận hành mạng lưới; cái thứ hai là một hướng đi đã công bố, và được ghi rõ như vậy.',
			items: [
				{
					name: 'Nodo',
					stage: 'Đang chạy',
					body: 'Hiện thực tham chiếu, viết bằng Python3 và Rust. Nó thực thi dịch vụ, thương lượng chi phí với các peer, cấp địa chỉ và token, và giải quyết phụ thuộc dù chúng chạy ở đâu. Cài trên Linux bằng một lệnh, và trên Windows 11 qua một trình cài đặt có chữ ký, tự dựng môi trường Linux cách ly riêng.'
				},
				{
					name: 'Chatui',
					stage: 'Ý tưởng',
					body: 'Một dự định đã tuyên bố: xây một node Android tiếp cận dịch vụ qua giao diện trò chuyện đơn giản, không cần tin tưởng bất kỳ node nào khác. Kho mã hiện chỉ chứa mô tả đó và không có gì hơn — chưa có mã nào để chạy.'
				}
			],
			note: 'Ở đây không có gì đứng thế chỗ cho một thứ đã chạy được ở nơi khác. Cái gì chạy thì chạy; cái gì chưa, thì nói rõ.'
		},
		applications: {
			eyebrow: 'Nơi nó đã đang chạy',
			heading: 'Tác động và ứng dụng thực tế',
			intro: 'Kiến trúc này không phải một thí nghiệm tư duy. Nó đang được dùng ở hai khoảng cách khác nhau — với tư cách chính lớp đó, và với tư cách nền móng bên dưới một thứ có lý do tồn tại riêng.',
			layerHeading: 'Kiến trúc, khi được bật lên',
			layerTag: 'Chính lớp đó',
			layerIntro: 'Cả hai đều không phải ứng dụng dựng trên Celaut. Chúng <strong>chính là</strong> Celaut, một khi các node thực sự chạy.',
			layer: [
				{
					name: 'DePIN',
					body: 'Ai cũng có thể chạy một node Celaut và trở thành một phần của mạng hạ tầng vật lý phi tập trung. Mỗi node tìm peer, thực thi và điều phối dịch vụ, quản lý phụ thuộc của chúng — biến những máy tính bình thường thành năng lực tính toán dùng chung, kháng kiểm duyệt. Đây là mạng lưới, không phải một sản phẩm đặt trên nó.'
				},
				{
					name: 'Unstoppable Skills',
					body: 'Một sổ đăng ký hoàn toàn on-chain, không máy chủ, nơi các bài toán mới là nhân vật chính. Thay vì lùng tìm dịch vụ, các tác nhân tìm một kỹ năng và khám phá những dịch vụ bao phủ nó, kèm benchmark thật và xếp hạng dựa trên uy tín. Đó là cách lớp uy tín của mô hình thực sự chạm tới được — trên Ergo, với phần thiệt hơn thật sự: không ai spam mà không đánh cược uy tín của mình.'
				}
			],
			builtOnHeading: 'Dựng bên trên nó',
			builtOnTag: 'Dự án độc lập',
			builtOnIntro: 'Xa thêm một bước: một sản phẩm có mục đích riêng và người dùng riêng, tình cờ được lắp ráp từ các dịch vụ Celaut. Nó vẫn có lý nếu được dựng lại trên một nền khác — và chính điều đó khiến nó trở thành bằng chứng.',
			builtOn: {
				name: 'Game of Prompts',
				body: [
					'Một nền tảng thi đấu nơi người sáng tạo thiết kế <strong>game-service</strong> để chấm điểm những con robot chơi chúng, còn người chơi viết <strong>solver-service</strong> nhằm tối đa hoá điểm số.',
					'Các service tuân theo mô hình Celaut, và toàn hệ thống dùng blockchain Ergo để ghi kết quả và chuyển giải thưởng.'
				]
			},
			ergoDocs: 'Tài liệu Ergo',
			formalPaper: 'Bài báo chính thức'
		}
	},
	depin: {
		meta: {
			title: 'Cho thuê PC — Celaut DePIN',
			description: 'Bán tài nguyên máy tính của bạn những lúc bạn không dùng đến. Tầng DePIN của Celaut hoàn toàn ngang hàng, cho phép bạn định giá năng lực tính toán quanh chi phí điện, và cách ly mọi tải công việc bên trong một microVM.'
		},
		topbarTitle: 'Cho thuê PC',
		index: {
			sections: {
				rent: 'Ý tưởng',
				p2p: 'Ngang hàng',
				electricity: 'Hóa đơn điện',
				isolation: 'Cách ly',
				payoff: 'Bạn được gì',
				responsibilities: 'Node làm gì',
				steps: 'Từ cài đặt đến thu nhập',
				roles: 'Phía bên kia',
				cta: 'Bắt đầu'
			}
		},
		hero: {
			eyebrow: 'Celaut DePIN',
			title: 'Cho thuê chiếc PC của bạn.',
			tagline: 'Bán tài nguyên máy tính của bạn những lúc bạn không dùng đến.',
			lede: 'Cỗ máy của bạn nhàn rỗi gần như suốt ngày. Celaut biến phần năng lực bỏ không đó thành thứ người ta trả tiền để dùng — trực tiếp, theo điều kiện của bạn, với mọi tải công việc được niêm phong tách khỏi hệ thống của bạn.',
			actions: [
				'Bắt đầu cho thuê PC',
				'Xem cách hoạt động'
			],
			stats: [
				{
					value: '100%',
					label: 'ngang hàng — không công ty nào đứng giữa'
				},
				{
					value: 'Bạn',
					label: 'đặt giá, có tính cả hoá đơn tiền điện'
				},
				{
					value: 'microVM',
					label: 'cách ly cho mọi tải công việc bạn nhận'
				}
			]
		},
		scenes: {
			rent: {
				label: 'Ý tưởng',
				beats: [
					{
						h: 'Chiếc PC của bạn đang nhàn rỗi ngay lúc này.',
						p: 'Phần lớn máy cá nhân nằm không suốt phần lớn thời gian trong ngày. Đó là phần cứng thật — nhân xử lý, bộ nhớ, ổ đĩa — chẳng làm gì cả.'
					},
					{
						h: 'Bán phần bạn không dùng.',
						p: 'Celaut cắt cỗ máy của bạn thành <strong>phần năng lực bạn có thể cho thuê</strong>. Bạn quyết định bao nhiêu phần đi ra mạng lưới và bao nhiêu vẫn là của mình — phần còn lại của máy vẫn chạy y như trước.'
					},
					{
						h: 'Được trả tiền cho công việc nó làm.',
						p: 'Những bên cần năng lực tính toán tìm thấy node của bạn, thoả thuận giá trực tiếp với nó, và trả tiền theo từng lần thực thi. <strong>Thanh toán tất toán trên Ergo</strong> mỗi khi một công việc kết thúc.',
						note: 'Không trung tâm dữ liệu. Không trung gian. Không chờ kỳ chi trả hàng tháng.'
					}
				]
			},
			p2p: {
				label: 'Lợi ích 01',
				beats: [
					{
						h: 'Hoàn toàn ngang hàng.',
						p: 'Mọi nền tảng &ldquo;cho thuê phần cứng&rdquo; khác đều đặt một công ty ở giữa. Nó nắm cái chợ, ăn phần trăm, đặt luật chơi, và có thể loại bạn khỏi mạng của nó bất cứ lúc nào.'
					},
					{
						h: 'Chẳng có ai ở giữa cả.',
						p: 'Celaut <strong>không có quỹ, cũng không có công ty</strong> ngồi giữa hai bên. Node của bạn và bên cần năng lực tính toán nói chuyện <strong>trực tiếp</strong> với nhau — tìm thấy nhau, thương lượng, thực thi, tất toán.'
					},
					{
						h: 'Nghĩa là không ai có thể ngắt bạn.',
						p: 'Không có tài khoản để đình chỉ, không có điều khoản đổi ngầm dưới chân bạn, không có phí nào lặng lẽ phình lên. Tương tác là <strong>hoàn toàn ngang hàng</strong>, nên thứ duy nhất mỗi bên phụ thuộc vào là bên còn lại.',
						note: 'Không có gì để đăng ký. Không có chỗ nào để bị cấm cửa.'
					}
				]
			},
			electricity: {
				label: 'Lợi ích 02',
				beats: [
					{
						h: 'Năng lực tính toán không phải thứ cho không.',
						p: 'Chạy máy thì tốn điện, và chi phí đó không phẳng — nó thay đổi trong ngày và khác nhau tuỳ nơi bạn sống.'
					},
					{
						h: 'Hãy tính nó vào giá.',
						p: 'Celaut cho phép bạn <strong>tuỳ chọn tính chi phí điện</strong> vào mức giá bạn đặt cho năng lực tính toán của mình. Node của bạn định giá công việc với hoá đơn tiền điện nằm trong phương trình, nên cho thuê năng lực không bao giờ âm thầm làm bạn lỗ.'
					},
					{
						h: 'Và quyết định khi nào bạn mở cửa.',
						p: '<strong>Thời gian sẵn sàng và thời lượng chạy cũng do bạn đặt.</strong> Chỉ cho thuê máy vào ban đêm lúc điện rẻ nhất, giới hạn một công việc được chạy bao lâu, hoặc tắt hẳn — mạng lưới đơn giản là định tuyến sang chỗ khác.',
						note: 'Giá của bạn. Giờ của bạn. Biên lợi nhuận của bạn.'
					}
				]
			},
			isolation: {
				label: 'Lợi ích 03',
				beats: [
					{
						h: 'Mã của ai đang chạy trên PC của tôi?',
						p: 'Đó là câu hỏi đầu tiên của bất kỳ ai tỉnh táo. Cho thuê máy không thể có nghĩa là trao chìa khoá cho người lạ.'
					},
					{
						h: 'Cách ly thực thi triệt để.',
						p: 'Mọi tải công việc chạy niêm phong trong <strong>microVM</strong> riêng của nó — một máy ảo thực thụ với nhân riêng và ranh giới do phần cứng cưỡng chế, chứ không phải một container dùng chung nhân. Nó không thể thấy tệp của bạn, mạng của bạn, hay bất kỳ tải công việc nào khác trên máy.'
					},
					{
						h: 'Chính công nghệ mà các đám mây lớn đang chạy.',
						p: 'microVM là thứ <strong>các nhà cung cấp đám mây lớn</strong> dùng để chạy mã không đáng tin từ hàng triệu người lạ trên phần cứng dùng chung. Celaut đặt đúng mô hình cách ly ấy lên bàn làm việc của bạn — bảo đảm ở đây không phải một lời hứa, mà là kiến trúc.',
						note: 'Công việc xong, VM bị huỷ. Không gì còn sót lại.'
					}
				]
			}
		},
		payoff: {
			heading: 'Thứ bạn thực sự nhận được',
			items: [
				{
					title: 'Phần cứng nhàn rỗi, bắt đầu làm việc',
					body: 'Dàn máy chơi game ngủ lúc 3 giờ sáng, máy trạm nằm không suốt cuối tuần, một thùng máy dự phòng trong tủ. Nếu chạy được nodo, nó có thể kiếm tiền.'
				},
				{
					title: 'Bạn đặt điều kiện',
					body: 'Giá mỗi đơn vị tính toán, những khung giờ bạn sẵn sàng, bao nhiêu phần máy bạn chịu nhường ra. Tất cả đều do bạn thay đổi.'
				},
				{
					title: 'Được trả trước',
					body: 'Một node được trả tiền trước cho một lời hứa về tài nguyên — trên Ergo (ERG), không hoá đơn, không lịch chi trả của nền tảng, không ngưỡng tối thiểu. Danh tiếng là bảo chứng rằng nó sẽ giao hàng.'
				},
				{
					title: 'Không cần tin ai cả',
					body: 'Service được định danh bằng nội dung: bên yêu cầu nhận đúng phần mềm họ đã hỏi tới, còn bạn chạy nó mà không phải soi xét hay bảo lãnh cho nó.'
				},
				{
					title: 'Tệp của bạn vẫn là của bạn',
					body: 'Một tải công việc sống trong microVM riêng với nhân riêng. Nó không bao giờ thấy ổ đĩa của bạn, mạng của bạn, hay bất cứ thứ gì khác trên máy.'
				},
				{
					title: 'Rời đi lúc nào cũng được',
					body: 'Dừng node lại và mạng lưới sẽ đi vòng qua bạn. Không hợp đồng, không ràng buộc, và không có ai để phải xin phép.'
				}
			]
		},
		responsibilities: {
			heading: 'Node trên máy bạn thực sự làm gì',
			intro: 'Node là một <strong>máy tính hoặc thiết bị</strong> giao tiếp với các peer và quản lý việc thực thi dịch vụ. Mô hình giao cho nó bốn việc, và không đặt bất kỳ bộ điều phối nào bên trên.',
			items: [
				{
					title: 'Thực thi service',
					body: 'Nó thương lượng chi phí thực thi với các node ngang hàng và quyết định chạy service tại chỗ hay uỷ thác đi, để tài nguyên chảy về nơi rẻ nhất.'
				},
				{
					title: 'Giao tiếp',
					body: 'Nó khai báo các giao diện nó hỗ trợ và các phương thức thanh toán nó chấp nhận ngay khi tiếp xúc, và chính điều đó cho phép giao thức tiến hoá mà không cần thoả thuận trước.'
				},
				{
					title: 'Bảo mật',
					body: 'Nó cấp phát và quản lý các địa chỉ cùng token xác thực dùng để định danh mọi tương tác service.'
				},
				{
					title: 'Phụ thuộc',
					body: 'Nó bảo đảm một service chạm được tới thứ nó cần, dù phụ thuộc đó tình cờ đang chạy ở đâu trong mạng lưới.'
				}
			],
			note: 'Không việc nào trong đó đòi hỏi phải biết phần mềm nó chạy dùng để làm gì.'
		},
		steps: {
			heading: 'Từ lúc cài đến lúc có thu nhập',
			items: [
				{
					title: 'Cài nodo',
					body: 'Một câu lệnh trên Linux, một trình cài đặt trên Windows. Máy của bạn gia nhập mạng lưới và bắt đầu tìm các node ngang hàng.'
				},
				{
					title: 'Đặt giá và giờ của bạn',
					body: 'Nói cho node biết năng lực tính toán của bạn giá bao nhiêu — kể cả tiền điện nếu bạn muốn tính vào — và khi nào thì nó sẵn sàng.'
				},
				{
					title: 'Nhận việc',
					body: 'Các node ngang hàng thương lượng trực tiếp với node của bạn. Tải công việc được nhận sẽ chạy niêm phong trong một microVM, cách ly khỏi mọi thứ khác.'
				},
				{
					title: 'Nhận tiền',
					body: 'Tiền được thu trước trên Ergo; danh tiếng được ghi lại khi công việc được hoàn thành đúng cam kết. Đóng góp được thưởng; kết quả vẫn kiểm toán được.'
				}
			]
		},
		roles: {
			heading: 'Nửa còn lại của cuộc trao đổi',
			intro: 'Cho thuê PC là một nửa của mạng lưới. Nửa kia là có thể <em>dùng</em> nó — và chính những đặc tính bảo vệ bạn với tư cách chủ máy cũng là thứ khiến mạng lưới đáng để mua từ đó.',
			items: [
				{
					title: 'Lập trình viên',
					body: 'Đóng gói chương trình một lần thành service niêm phong, định danh bằng nội dung, rồi để mạng lưới lưu trữ, khám phá và mở rộng nó. Tính tái lập đến từ thiết kế, không phải từ SLA của nhà cung cấp.',
					link: 'Dành cho lập trình viên →'
				},
				{
					title: 'Agent &amp; người dùng',
					body: 'Yêu cầu service theo bài toán mà nó giải và trả tiền theo từng lần thực thi. Không tài khoản đám mây, không ràng buộc — và con dấu niêm phong chứng minh bạn nhận đúng phần mềm đã hỏi tới.',
					link: 'Dành cho người dùng cuối →'
				},
				{
					title: 'Chủ máy',
					body: 'Chính là bạn. Góp bất cứ phần cứng nào bạn có; tầng ảo hoá của node nghĩa là tải công việc vẫn đáp xuống nơi vừa vặn với chúng, kể cả khi khác kiến trúc CPU.'
				}
			]
		},
		cta: {
			heading: 'Bật cỗ máy nhàn rỗi của bạn lên.',
			body: 'Cài một node chỉ tốn một câu lệnh. Đó là cách nhanh nhất để thấy phần cứng của bạn đáng giá bao nhiêu khi nó chẳng làm gì khác.',
			actions: [
				'Chạy một node',
				'Đọc mô hình'
			]
		}
	},
	developers: {
		meta: {
			title: 'Dành cho lập trình viên — Viết một lần, chạy mọi nơi | Celaut',
			description: 'Xây service Celaut: đặc tả một BOX, một API và phạm vi NET, trao cho một node, rồi để mạng lưới phân phối và thực thi nó. Không hạ tầng, không cấu hình, không nền tảng nào ở giữa.'
		},
		topbarTitle: 'Dành cho lập trình viên',
		index: {
			sections: {
				spec: 'Ý tưởng',
				agnostic: 'Chạy ở đâu cũng được',
				distribute: 'Phân phối',
				compose: 'Kết hợp',
				payoff: 'Bạn được gì',
				distribution: 'Cách nó lan ra',
				steps: 'Từ mã đến mạng lưới',
				tradeoffs: 'Cái bạn đánh đổi',
				roles: 'Những người còn lại',
				cta: 'Bắt đầu'
			}
		},
		hero: {
			eyebrow: 'Lập trình viên service',
			title: 'Viết nó một lần.',
			tagline: 'Rồi thôi nghĩ về chuyện nó chạy ở đâu.',
			lede: 'Một service Celaut không phải một lần triển khai — nó là một bản đặc tả. Mô tả môi trường, giao diện và phạm vi mạng, trao cho một node duy nhất, và mạng lưới lo phần còn lại.',
			actions: [
				'Khám phá Skills',
				'Xem cách hoạt động'
			],
			stats: [
				{
					value: 'BOX · API · NET',
					label: 'ba thành phần — đó là toàn bộ bản đặc tả'
				},
				{
					value: 'Không DevOps',
					label: 'node lo việc thực thi; chẳng có tài khoản đám mây nào phải mở'
				},
				{
					value: 'Tất định',
					label: 'cùng đầu vào, cùng đầu ra, trên bất kỳ node nào, vào bất kỳ lúc nào'
				}
			]
		},
		scenes: {
			spec: {
				label: 'Ý tưởng',
				beats: [
					{
						h: 'Bạn không triển khai. Bạn đặc tả.',
						p: 'Không có máy chủ nào phải dựng, không image nào phải đẩy lên, không pipeline nào phải giữ cho xanh. Một service trong Celaut là bản mô tả thành văn về những gì nó cần để chạy.'
					},
					{
						h: 'Ba thành phần. Chỉ có vậy.',
						p: '<strong>BOX</strong> mô tả môi trường thực thi — kiến trúc, hệ thống tệp, biến môi trường, entrypoint, cấu hình. Nó nêu trực tiếp toàn bộ cấu trúc tệp, thay vì trỏ tới một image bên ngoài, và chính điều đó giữ cho việc thực thi tái lập được.'
					},
					{
						h: 'Và cách thế giới chạm tới nó.',
						p: '<strong>API</strong> định nghĩa cách client và các service khác nói chuyện với nó, cùng các phương thức thanh toán được chấp nhận và chi phí. <strong>NET</strong> nêu tên những mạng bên ngoài nó sẽ chạm tới — mặc định một service bị cách ly, và mọi phạm vi rộng hơn đều được khai báo ngay trong bản đặc tả, để người dùng biết trước nó có thể đi tới đâu.',
						note: 'Di động, tái lập được, không phụ thuộc bên thứ ba.'
					}
				]
			},
			agnostic: {
				label: 'Lợi ích 01',
				beats: [
					{
						h: 'Bạn viết bằng gì cũng đóng gói y như nhau.',
						p: 'Celaut không bắt bạn theo một framework, một runtime hay một SDK nào. Nó chỉ hỏi một hệ thống tệp và một entrypoint.'
					},
					{
						h: 'Node cũng chẳng bận tâm.',
						p: 'Service tuân theo <strong>nguyên tắc hộp đen</strong>: chúng vận hành độc lập với chi tiết của các node thực thi chúng, và node chạy chúng mà không cần hiểu chúng làm gì.'
					},
					{
						h: 'Nên bất kỳ node tương thích nào cũng sẽ nhận nó.',
						p: 'BOX khai báo vi kiến trúc mà nó nhắm tới, để các node biết mình có hợp hay không. Ngoài ra, <strong>service của bạn có thể được bất kỳ ai chạy trên bất kỳ node tương thích nào</strong> — đó là toàn bộ giao kèo.',
						note: 'Không ràng buộc, vì chẳng có gì để mà bị ràng vào.'
					}
				]
			},
			distribute: {
				label: 'Lợi ích 02',
				beats: [
					{
						h: 'Trao nó cho một node.',
						p: 'Bạn không đăng lên cửa hàng nào và cũng không chờ ai duyệt. Lập trình viên chỉ cần <strong>gửi service tới một hoặc vài node</strong>.'
					},
					{
						h: 'Mạng lưới mang nó đi tiếp từ đó.',
						p: 'Những node đó lo việc <strong>phân phối service tới các node khác</strong>. Không có sổ đăng ký service trung tâm — service lan ngang hàng, nên không có điểm hỏng duy nhất và không có người gác cổng quyết định bạn có được vào hay không.'
					},
					{
						h: 'Có thể tìm thấy, nếu bạn muốn thế.',
						p: 'Các node cũng có thể <strong>đưa service lên một hệ thống danh tiếng</strong>, để người dùng và các service khác cân nhắc có nên dùng hay không, và dùng khi nào. Service có thể được khai báo trên một sổ đăng ký blockchain — như <strong>Sigma Reputation System</strong> trên Ergo — để tăng khả năng hiển thị và độ tin cậy.',
						note: 'Không có gì để đăng ký. Không ai ăn phần trăm.'
					}
				]
			},
			compose: {
				label: 'Lợi ích 03',
				beats: [
					{
						h: 'Service gọi service.',
						p: 'Một service có thể yêu cầu thực thi các service khác — <strong>các service con</strong> của nó — thông qua node đang chạy nó. Các luồng công việc phức tạp được dựng bằng cách kết hợp, chứ không bằng cấu hình điều phối.'
					},
					{
						h: 'Node quyết định chúng đáp xuống đâu.',
						p: 'Node quản lý các phiên bản service và quyết định chạy chúng tại chỗ hay trải tải sang các node ngang hàng. Phụ thuộc là bài toán của node — nó bảo đảm service chạm được tới thứ chúng cần trên khắp mạng lưới.'
					},
					{
						h: 'Và bạn không bao giờ biết ở đâu.',
						p: '<strong>Service cha không biết các phụ thuộc của nó được thực thi ở đâu.</strong> Mỗi service con chỉ đơn giản nêu tài nguyên nó cần. Bạn viết phần kết hợp; mạng lưới giải bài toán chỗ đặt.',
						note: 'Không có bộ lập lịch nào phải cấu hình. Không có topology nào phải bảo trì.'
					}
				]
			}
		},
		payoff: {
			heading: 'Kiến trúc này cho bạn những gì',
			items: [
				{
					title: 'Hãy đặc tả, đừng triển khai',
					body: 'Một service là một BOX (kiến trúc, hệ thống tệp, môi trường, entrypoint, cấu hình), một API và một phạm vi NET. Viết ra chừng đó là xong — không có bước triển khai nào để bạn phải gánh.'
				},
				{
					title: 'Tự chứa ngay từ cách dựng',
					body: 'BOX mô tả toàn bộ cấu trúc tệp mà service cần, thay vì trỏ tới image hay repository bên ngoài. Không sổ đăng ký bên thứ ba nào có thể biến mất dưới chân bạn.'
				},
				{
					title: 'Một hộp đen, và là cố ý',
					body: 'Service vận hành độc lập với các node thực thi chúng. Bạn không bao giờ viết mã bám vào môi trường của một node, vì bạn chẳng bao giờ được cho biết môi trường đó là gì.'
				},
				{
					title: 'Tái lập được, không phải &ldquo;cố hết sức&rdquo;',
					body: 'Với cùng đầu vào, một service luôn cho ra cùng đầu ra, bất kể chạy ở đâu hay khi nào. Ở đây tính tất định là thuộc tính kiến trúc, không phải lời hứa của nhà cung cấp.'
				},
				{
					title: 'Kết hợp mà không cần điều phối',
					body: 'Một service có thể yêu cầu thực thi các service con thông qua node của nó. Service cha không biết chúng chạy ở đâu; mỗi cái chỉ nêu tài nguyên nó cần.'
				},
				{
					title: 'Danh tiếng có thể tích luỹ',
					body: 'Vì một service là tất định và mặc định bị cách ly, một bằng chứng danh tiếng ghi từ lâu vẫn nói lên điều đúng về nó ở hiện tại.'
				}
			]
		},
		steps: {
			heading: 'Từ dòng mã tới lúc chạy trên mạng lưới',
			items: [
				{
					title: 'Viết service',
					body: 'Ngôn ngữ nào cũng được, ngăn xếp nào cũng được. Điều quan trọng là hệ thống tệp nó cần và câu lệnh khởi chạy nó — không phải framework bạn chọn.'
				},
				{
					title: 'Đặc tả BOX, API và NET',
					body: 'Khai báo môi trường, cách bên gọi nói chuyện với service, và quyền truy cập mạng bên ngoài (nếu có) mà nó được phép yêu cầu.'
				},
				{
					title: 'Gửi tới một node',
					body: 'Một node là đủ. Nó phân phối service tới các node khác và có thể đăng lên một hệ thống danh tiếng để người dùng và các service khác tìm thấy.'
				},
				{
					title: 'Để mạng lưới chạy nó',
					body: 'Các node thương lượng chi phí và quyết định mỗi phiên bản chạy ở đâu. Bạn không nằm trong vòng lặp đó, và cũng chẳng có hạ tầng nào phải nuôi sống.'
				}
			]
		},
		distribution: {
			heading: 'Một dịch vụ thực sự lan ra thế nào',
			intro: 'Không có cửa hàng nào để đăng và không có vòng duyệt nào để chờ. Dịch vụ được trao cho một node, và mạng lưới mang nó đi từ đó — mặc định là ngoài chuỗi, và tùy chọn là trên chuỗi.',
			items: [
				{
					title: 'Mặc định là ngang hàng',
					body: 'Celaut <strong>không có sổ đăng ký service trung tâm</strong>. Service lan giữa các node theo kiểu ngang hàng, nên có thể tìm thấy trực tiếp — và không có người gác cổng nào quyết định bạn có được vào hay không.'
				},
				{
					title: 'Lên sổ đăng ký, nếu xứng đáng',
					body: 'Service cũng có thể được khai báo trên một blockchain có triển khai sổ đăng ký — như <strong>Sigma Reputation System</strong> trên Ergo — khi khả năng hiển thị và một dấu vết kiểm toán được đáng giá hơn việc hoàn toàn ở ngoài chuỗi.'
				}
			]
		},
		tradeoffs: {
			heading: 'Cuộc đánh đổi bạn thực sự đang làm',
			intro: 'Ngày nay, đưa phần mềm ra ngoài nghĩa là chọn giữa tự lưu trữ nó hoặc bảo người ta tự chạy lấy. Cả hai đều có cái giá. Tuyên bố của Celaut hẹp và cụ thể: nó lấy ưu điểm của cả hai mà không kèm nhược điểm — đổi lại bằng quyền kiểm soát của bạn với service đang chạy.',
			items: [
				{
					label: 'Một dịch vụ web tự lưu trữ',
					good: 'Người dùng không cần hạ tầng và không cần cấu hình.',
					bad: 'Bạn không thể chứng minh hệ thống chưa bị thay đổi, và người dùng phải tin lời bạn rằng dữ liệu yêu cầu của họ không bị lạm dụng.'
				},
				{
					label: 'Mã nguồn để họ tự chạy',
					good: 'Tất định — tải về rồi thì bạn không thể đổi nó dưới chân họ — và dữ liệu yêu cầu của họ không bao giờ đến tay bạn.',
					bad: 'Họ cần phần cứng đủ mạnh và phải sống sót qua khâu cấu hình, và đó là chỗ phần lớn người ta bỏ cuộc.'
				},
				{
					label: 'Một service Celaut',
					good: 'Không hạ tầng để quản lý và không gì để cấu hình, vì bản đặc tả đã bao gồm container, kiến trúc, nhu cầu mạng và giao diện.',
					bad: 'Bạn từ bỏ quyền kiểm soát: khi service đã ra ngoài, bạn không thể sửa, bóp băng thông hay rút dữ liệu từ nó. Đó chính là điểm mấu chốt.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Phần còn lại của mạng lưới',
			intro: 'Service của bạn cần một nơi để chạy và một ai đó để phục vụ. Cả hai cũng là con người.',
			items: [
				{
					title: 'Người vận hành node',
					body: 'Họ cung cấp phần cứng và thực thi bất cứ thứ gì được yêu cầu, mà không cần hiểu service của bạn làm gì, để đổi lấy thù lao.',
					link: 'Cho thuê PC →'
				},
				{
					title: 'Người dùng cuối',
					body: 'Họ khởi chạy service trên các node và trả tiền cho tài nguyên tính toán đã dùng — và có thể kiểm chứng rằng thứ đã chạy đúng là thứ bản đặc tả mô tả.',
					link: 'Dành cho người dùng cuối →'
				},
				{
					title: 'Mô hình',
					body: 'Toàn bộ kiến trúc: node, service, đặc tả, phối hợp qua hệ thống danh tiếng và thanh toán, và vì sao tất cả những thứ đó là cần thiết.',
					link: 'Đọc bài báo →'
				}
			]
		},
		cta: {
			heading: 'Hãy bắt đầu từ các bài toán.',
			body: 'Unstoppable Skills là một sổ đăng ký nơi chính các bài toán là nhân vật chính: tìm một skill, rồi thấy những service bao phủ nó, benchmark và danh tiếng của chúng. Đó là con đường ngắn nhất từ &ldquo;mình nên xây gì&rdquo; tới &ldquo;ai cần nó&rdquo;.',
			actions: [
				'Khám phá Skills',
				'Đọc mô hình'
			]
		}
	},
	users: {
		meta: {
			title: 'Dành cho người dùng cuối — Chạy nó, trả tiền phần đã dùng | Celaut',
			description: 'Khởi chạy service trên các node Celaut và chỉ trả tiền cho tài nguyên tính toán đã dùng. Không tài khoản, không thuê bao, không nền tảng ở giữa — service chạy cách ly và tất định, nên bạn nhận đúng thứ bản đặc tả mô tả.'
		},
		topbarTitle: 'Dành cho người dùng cuối',
		index: {
			sections: {
				ask: 'Ý tưởng',
				proof: 'Bạn nhận lại gì',
				sealed: 'Niêm phong',
				pay: 'Bạn trả gì',
				payoff: 'Bạn được gì',
				steps: 'Từ yêu cầu đến kết quả',
				tradeoffs: 'Cái bạn đánh đổi',
				roles: 'Những người còn lại',
				cta: 'Bắt đầu'
			}
		},
		hero: {
			eyebrow: 'Người dùng service',
			title: 'Chạy nó.',
			tagline: 'Trả tiền phần đã dùng. Không gì khác.',
			lede: 'Khởi chạy một service trên một node, nhận kết quả, trả tiền cho phần tính toán nó đã tiêu. Không có tài khoản nào phải tạo, không có thuê bao nào phải huỷ, và không có công ty nào ngồi giữa bạn và cỗ máy đã làm việc đó.',
			actions: [
				'Khám phá Skills',
				'Xem cách hoạt động'
			],
			stats: [
				{
					value: 'Không tài khoản',
					label: 'chẳng có gì để đăng ký, chẳng có gì để bị khoá ngoài'
				},
				{
					value: 'Theo lần chạy',
					label: 'bạn trả tiền cho tài nguyên tính toán thực sự được dùng'
				},
				{
					value: 'Cách ly',
					label: 'service chạy niêm phong, và không thấy thứ gì không được trao cho nó'
				}
			]
		},
		scenes: {
			ask: {
				label: 'Ý tưởng',
				beats: [
					{
						h: 'Hỏi mạng lưới, đừng hỏi một công ty.',
						p: 'Bạn muốn một việc được làm — chạy một mô hình, phân tích một chuỗi, cho bot giao dịch, xử lý một tệp. Ngày nay điều đó nghĩa là chọn một nhà cung cấp và mở tài khoản ở đó.'
					},
					{
						h: 'Các node trả lời trực tiếp.',
						p: 'Celaut <strong>không có sổ đăng ký service trung tâm</strong>. Service được phân tán qua các node theo kiểu ngang hàng, và các node khai báo giao diện chúng hỗ trợ cùng <strong>các phương thức thanh toán chúng chấp nhận ngay khi tiếp xúc</strong> — nên chẳng có gì phải thoả thuận trước với ai.'
					},
					{
						h: 'Bạn làm việc thẳng với cỗ máy làm việc đó.',
						p: 'Node của bạn thương lượng chi phí thực thi với một node ngang hàng, và công việc diễn ra. Không có <strong>nền tảng nào ở giữa</strong> ăn phần trăm, đặt luật, hay có thể loại bạn khỏi một mạng lưới bạn chưa từng gia nhập.',
						note: 'Không đăng ký. Không thuê bao. Không trung gian.'
					}
				]
			},
			proof: {
				label: 'Lợi ích 01',
				beats: [
					{
						h: 'Làm sao bạn biết thứ gì thực sự đã chạy?',
						p: 'Với một dịch vụ được lưu trữ sẵn, bạn không thể biết. Bên vận hành không thể chứng minh hệ thống chưa đổi — nên khi một công cụ trở nên phổ biến, chẳng gì ngăn hiệu năng của nó lặng lẽ tụt xuống để tiết kiệm chi phí.'
					},
					{
						h: 'Ở đây, service <em>chính là</em> bản đặc tả của nó.',
						p: 'Một service đặc tả toàn bộ môi trường của nó — kiến trúc, hệ thống tệp, entrypoint, cấu hình. Đổi bất cứ thứ gì trong đó và nó thành <strong>một service khác</strong>, chứ không phải một bản cập nhật âm thầm của cái bạn đang dùng.'
					},
					{
						h: 'Nên kết quả tái lập được.',
						p: 'Với cùng đầu vào, một service <strong>luôn cho ra cùng đầu ra</strong>, bất kể node nào thực thi nó hay vào lúc nào. Đó là lý do một bản ghi danh tiếng từ nhiều tháng trước hôm nay vẫn còn giá trị.',
						note: 'Tính tất định là bảo đảm. Không phải lời hứa — mà là thiết kế.'
					}
				]
			},
			sealed: {
				label: 'Lợi ích 02',
				beats: [
					{
						h: 'Yêu cầu của bạn không phải chuyện của ai khác.',
						p: 'Khi bạn gửi một tải công việc đi đâu đó, câu hỏi thành thật là còn ai được nhìn thấy nó dọc đường.'
					},
					{
						h: 'Mọi lần thực thi đều cách ly.',
						p: 'Node chạy service như một <strong>phiên bản cách ly</strong> — máy ảo của riêng nó. Mặc định, service bị cắt hoàn toàn khỏi mạng bên ngoài, chỉ nói chuyện được với service cha, các service con và node đang chạy nó.'
					},
					{
						h: 'Và lập trình viên không ngồi ở đầu bên kia.',
						p: '<strong>Lập trình viên service không thể điều khiển, sửa đổi hay rút dữ liệu từ một service</strong>, vì họ không kiểm soát các node phân phối và chạy nó. Mọi quyền truy cập mạng rộng hơn đều phải được khai báo trong bản đặc tả, công khai, trước khi bạn chạy nó.',
						note: 'Cách ly theo mặc định. Quyền truy cập phải xin, không bao giờ mặc nhiên.'
					}
				]
			},
			pay: {
				label: 'Lợi ích 03',
				beats: [
					{
						h: 'Bạn trả tiền trước khi nó chạy. Chấm hết.',
						p: 'Người dùng khởi chạy service trên các node và <strong>trả trước cho một lời hứa về tài nguyên</strong>. Đó là toàn bộ quan hệ thương mại.'
					},
					{
						h: 'Không có gì dồn lên khi bạn ngồi không.',
						p: 'Không có chỗ ngồi, không có hạng, không có mức sàn hàng tháng. Tiền được thu <strong>trước</strong> để đổi lấy tài nguyên sẽ được tiêu thụ; bằng chứng thanh toán mở cửa truy cập. Bảo chứng của node là danh tiếng của nó, không phải một hoá đơn ở cuối.'
					},
					{
						h: 'Giá do thị trường, không do một trang bảng giá.',
						p: 'Các node tự đặt chi phí và cạnh tranh nhau ở đó, và <strong>service có chi phí biên bằng không</strong> — chi phí chạy một phiên bản rơi vào node — nên nhiều service bắt đầu miễn phí để xây danh tiếng. Hệ thống thanh toán nằm ngoài kiến trúc lõi, nên ledger nào tất toán cũng không bị cố định.',
						note: 'Trả theo lần chạy. Rời đi lúc nào cũng được. Chẳng có gì để huỷ.'
					}
				]
			}
		},
		payoff: {
			heading: 'Thứ bạn thực sự nhận được',
			items: [
				{
					title: 'Không hạ tầng để quản lý',
					body: 'Các node lo việc đó. Không có nhà cung cấp đám mây nào phải chọn, không có máy nào phải nuôi sống, và không có gì phải chạy giữa những lần dùng.'
				},
				{
					title: 'Không cần cấu hình',
					body: 'Bản đặc tả service đã bao gồm cách container được dựng, kiến trúc nó cần, yêu cầu mạng và giao diện của nó. Không phần nào trong đó là việc của bạn.'
				},
				{
					title: 'Lập trình viên không với tới được',
					body: 'Lập trình viên service không thể điều khiển, sửa đổi hay rút dữ liệu từ một service — họ không kiểm soát các node phân phối và chạy nó.'
				},
				{
					title: 'Nó không thể đổi dưới chân bạn',
					body: 'Một service là tất định: cùng đầu vào cho cùng đầu ra, bất kể khi nào và ở đâu nó chạy. Không ai có thể âm thầm làm nó kém đi để tiết kiệm chi phí.'
				},
				{
					title: 'Đánh giá bằng danh tiếng, không bằng bảng xếp hạng',
					body: 'Danh tiếng tồn tại dưới dạng bản ghi trên ledger, và mỗi bên tham gia tự cân nhắc những nguồn mình tin. Không có trang chủ biên tập nào quyết định bạn nhìn thấy gì.'
				},
				{
					title: 'Không có chỗ nào để bị loại ra',
					body: 'Việc khám phá diễn ra ngang hàng, không sổ đăng ký trung tâm, nên không có tài khoản nào để đình chỉ và không có mục nào để gỡ xuống.'
				}
			]
		},
		steps: {
			heading: 'Từ “tôi cần làm việc này” tới một kết quả',
			items: [
				{
					title: 'Tìm service',
					body: 'Tìm theo bài toán bạn muốn giải. Các node khám phá service theo kiểu ngang hàng, và những sổ đăng ký như Unstoppable Skills ánh xạ bài toán tới các service bao phủ chúng.'
				},
				{
					title: 'Yêu cầu một lần thực thi',
					body: 'Node của bạn nói chuyện thẳng với một node ngang hàng có thể chạy nó. Giao diện và phương thức thanh toán được khai báo ngay khi tiếp xúc, nên chẳng có gì phải thoả thuận trước.'
				},
				{
					title: 'Nó chạy, niêm phong',
					body: 'Node thực thi service như một phiên bản cách ly — máy ảo của riêng nó — không có quyền truy cập nào vượt quá thứ bản đặc tả đã xin.'
				},
				{
					title: 'Trả trước',
					body: 'Một node được trả tiền trước cho một lời hứa về tài nguyên, với bằng chứng thanh toán mở cửa truy cập. Danh tiếng là bảo chứng. Không thuê bao, không mức tối thiểu, không hoá đơn kéo dài.'
				}
			]
		},
		tradeoffs: {
			heading: 'So với hai lựa chọn bạn có hôm nay',
			intro: 'Lấy một bot giao dịch làm ví dụ. Hiện tại bạn hoặc giao danh mục của mình cho một dịch vụ web, hoặc tìm mã nguồn và tự chạy. Mỗi lựa chọn cho bạn một thứ và lấy đi một thứ khác.',
			items: [
				{
					label: 'Dùng một dịch vụ web',
					good: 'Bạn không phải vận hành hạ tầng và chẳng phải cấu hình gì.',
					bad: 'Bạn không thể gán danh tiếng cho nó, vì bên vận hành không chứng minh được hệ thống chưa đổi — và cũng không bảo đảm được rằng dữ liệu yêu cầu của bạn không bị lạm dụng.'
				},
				{
					label: 'Tự chạy mã nguồn',
					good: 'Nó tất định, và lập trình viên không có quyền gì với dữ liệu yêu cầu của bạn.',
					bad: 'Bạn cần phần cứng đủ sức chạy nó, và phải vật lộn với khâu cấu hình — chỗ mà người ta thường bỏ cuộc rồi quay về lựa chọn một.'
				},
				{
					label: 'Dùng một service Celaut',
					good: 'Không hạ tầng, không cấu hình, và lập trình viên vẫn không thể điều khiển, sửa đổi hay rút dữ liệu từ service đó.',
					bad: 'Bạn trả theo từng lần chạy, và bạn phụ thuộc vào việc mạng lưới có một node chịu chạy nó ở mức giá bạn chấp nhận.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Những người khác trong mạng lưới',
			intro: 'Ai đó đã viết service và máy của ai đó chạy nó. Cả hai vai trò ấy cũng đang mở cho bạn.',
			items: [
				{
					title: 'Người vận hành node',
					body: 'Họ cung cấp phần cứng để thực thi thứ bạn yêu cầu, đổi lấy thù lao — mà không cần biết service đó làm gì.',
					link: 'Có phần cứng rảnh? →'
				},
				{
					title: 'Lập trình viên service',
					body: 'Họ viết những service mà bất kỳ node tương thích nào cũng chạy được, rồi trao cho mạng lưới thay vì tự lưu trữ.',
					link: 'Dành cho lập trình viên →'
				},
				{
					title: 'Mô hình',
					body: 'Node, service, đặc tả, cùng các hệ thống danh tiếng và thanh toán giúp những bên không tin nhau vẫn hợp tác được.',
					link: 'Đọc bài báo →'
				}
			]
		},
		cta: {
			heading: 'Hãy bắt đầu từ bài toán bạn đang có.',
			body: 'Unstoppable Skills là một sổ đăng ký hoàn toàn on-chain, không máy chủ, nơi chính các bài toán là nhân vật chính. Tìm một skill rồi thấy những service bao phủ nó, các benchmark so sánh thật, thảo luận, và xếp hạng dựa trên danh tiếng.',
			actions: [
				'Khám phá Skills',
				'Hay là cho thuê PC'
			]
		}
	},
	install: {
		meta: {
			title: 'Cài Nodo — Celaut',
			description: 'Cài một node Celaut (nodo) trên Linux, Windows hoặc macOS.'
		},
		topbarTitle: 'Cài nodo',
		heading: 'Chạy một node Celaut',
		subtitle: 'Cài <strong>nodo</strong> và gia nhập mạng lưới phi tập trung — tìm các node ngang hàng, thực thi và điều phối service, và biến cỗ máy của bạn thành năng lực tính toán chung, chống kiểm duyệt.',
		tabs: {
			linux: 'Linux',
			windows: 'Windows',
			mac: 'macOS'
		},
		copy: 'Sao chép',
		copied: 'Đã sao chép ✓',
		linux: {
			heading: 'Linux',
			intro: 'Cài đặt cơ bản — chạy lệnh này trong terminal của bạn:',
			notes: [
				'Script cần <code>sudo</code> để thiết lập ở tầng hệ thống. Các runtime Python, Java và <code>yq</code> được cài cục bộ trong thư mục chính của node.',
				'Thích cài thủ công, không cần sudo? Hãy theo {link}.'
			],
			manualLink: 'hướng dẫn thủ công'
		},
		windows: {
			heading: 'Windows 11',
			intro: 'Tải và chạy trình cài đặt chính thức:',
			download: 'Tải Nodo-Setup.exe',
			notes: [
				'Trình cài đặt tự tạo một bản phân phối Linux cách ly dành riêng cho Nodo, nên node chạy tách khỏi phần còn lại của hệ thống.',
				'Không cần tự thiết lập môi trường Linux nào.'
			]
		},
		mac: {
			heading: 'macOS',
			intro: 'Trình cài đặt macOS gốc <strong>vẫn chưa có</strong>.',
			notes: [
				'Hỗ trợ macOS đang được lên kế hoạch. Trong lúc chờ, bạn có thể chạy node trên một máy Linux hoặc một máy ảo Linux.',
				'Theo dõi {link} để biết cập nhật.'
			],
			repoLink: 'kho mã nodo'
		}
	},
	paradigm: {
		meta: {
			title: 'Celaut — Bài báo chính thức',
			description: 'Celaut: kiến trúc ngang hàng cho việc thiết kế và phân phối phần mềm — bài báo chính thức.'
		},
		topbarTitle: 'Bài báo chính thức',
		toc: 'Mục lục',
		tocNav: 'Bảng mục lục',
		systemBehaviorHeading: 'Hành vi hệ thống',
		executionHeading: 'Thực thi một service',
		balancerHeading: 'Cân bằng tải service'
	},
	viz: {
		home: {
			generation: 'thế hệ {n}',
			lifeRule: '2 hoặc 3 hàng xóm: sống · đúng 3: sinh ra',
			oneProtocol: 'một giao thức mà ai cũng phải chạy',
			networkSplits: 'đổi luật là mạng lưới tách đôi',
			whereOverlap: 'chúng nói chuyện ở chỗ chúng giao nhau',
			noVote: 'không bỏ phiếu · không di trú · không fork',
			blackBox: 'hộp đen',
			input: 'đầu vào',
			output: 'đầu ra',
			box: 'BOX',
			environment: 'môi trường',
			api: 'API',
			interface: 'giao diện',
			nets: [
				'bitcoin-mainnet',
				'ipfs',
				'nostr',
				'google.com',
				'family-photos.lan',
				'api.weather.gov',
				'pg-cluster-a'
			],
			netsCompact: [
				'bitcoin',
				'ipfs',
				'google.com',
				'family-photos',
				'nostr',
				'weather-api'
			],
			zoom: {
				source: 'celaut.proto · message Service',
				box: {
					title: 'BOX · Container',
					rows: [
						'architecture — CPU và môi trường mà nó cần',
						'filesystem — từng tệp một, nằm ngay trong đó, không phải tên image',
						'init — entrypoint và cách nó khởi động',
						'config_declaration — những tệp nào là cấu hình',
						'resources — at_init và at_most',
						'environment_variables — khai báo sẵn, kèm định dạng'
					]
				},
				api: {
					title: 'API · Giao diện',
					rows: [
						'slot — một cổng, kèm lớp vận chuyển nó dùng',
						'protocol_stack — các giao thức trên slot đó',
						'mu_per_call — giá của mỗi phương thức',
						'payment_contracts — những ledger nó chấp nhận',
						'một chi phí cố định để khởi động, rồi tính theo mức dùng'
					]
				},
				net: {
					title: 'NET · Network',
					rows: [
						'mỗi miền liên lạc nó có thể chạm tới là một mục',
						'tags / prose / formal — cách gọi tên miền đó',
						'protocol_stack — những peer kia phải nói giao thức gì',
						'environment_variable — peer nào được tính là của nó',
						'không khai báo gì ở đây nghĩa là không hề ra ngoài được'
					]
				}
			},
			net: 'NET',
			netDeclared: 'NET · khai báo trong đặc tả',
			nowhereElse: 'và không đâu khác',
			itsNodeItsParent: 'node của nó · cha của nó',
			aService: 'một service',
			children: 'các service con',
			whatTheySpend: 'chúng tiêu gì, không phải chúng ở đâu',
			developersShort: 'lập trình viên · nó cần gì',
			developersLong: 'lập trình viên · nó cần gì, nó tiêu gì',
			operatorsShort: 'người vận hành · nó chạy ở đâu',
			operatorsLong: 'người vận hành · nó chạy ở đâu, tốn bao nhiêu',
			thisNode: 'node này',
			aPeer: 'một node ngang hàng',
			cost: 'chi phí {value}',
			oneInput: 'một đầu vào',
			when: [
				'bây giờ',
				'một năm nữa',
				'trên phần cứng khác'
			],
			identicalEveryTime: 'giống hệt, mọi lần',
			reputationLedger: 'danh tiếng · bản ghi trên ledger',
			sourcesYouTrust: 'những nguồn bạn tin',
			principles: {
				consequences: [
					'→ không có giao thức phải thống nhất',
					'→ một container, một giao diện, một phạm vi',
					'→ uy tín giữ nguyên ý nghĩa'
				],
				derivedFrom: 'mọi thứ còn lại suy ra từ đây'
			},
			firstWhatSources: 'trước hết: nguồn của tôi nói gì về nó?',
			rightShort: '2 vCPU · 30 phút',
			rightLong: 'quyền dùng 2 vCPU · 30 phút',
			paymentRights: 'thanh toán ⇄ quyền dùng tài nguyên',
			outcomeRecorded: 'kết quả đi vào hồ sơ của nó',
			nextStranger: 'và đó là thứ người lạ tiếp theo đọc được',
			requester: 'bên yêu cầu',
			node: 'node'
		},
		developers: {
			box: 'BOX',
			api: 'API',
			net: 'NET',
			service: 'service',
			anyCompatibleNode: 'bất kỳ node tương thích nào',
			optionalRegistry: 'sổ đăng ký danh tiếng tuỳ chọn',
			yourService: 'service của bạn',
			itsNode: 'node của nó',
			neverFindOut: 'bạn không bao giờ biết ở đâu'
		},
		users: {
			you: 'bạn',
			noAccount: 'không tài khoản',
			eachPeerItsUnit: 'mỗi peer báo giá bằng thứ nó nhận',
			whatYouAsked: 'thứ bạn đã yêu cầu',
			whatNodeRuns: 'thứ node chạy',
			identicalItRuns: 'giống hệt — nó chạy',
			microvm: 'microVM',
			destroyed: 'bị huỷ',
			theDeveloper: 'lập trình viên',
			theHostMachine: 'cỗ máy chủ',
			computeUsed: 'phần tính toán bạn thực sự dùng',
			whatYouPay: 'thứ bạn trả',
			chargingStops: 'việc xong — ngừng tính tiền',
			subscription: 'một thuê bao, cứ tính tiền bất kể'
		},
		depin: {
			electricityCost: 'chi phí điện của bạn',
			priceYouSet: 'mức giá bạn đặt',
			availableWindow: 'sẵn sàng 22:00 – 07:00',
			marginCovered: 'đã đủ bù biên'
		}
	}
};
