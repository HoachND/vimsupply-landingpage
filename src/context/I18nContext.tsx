"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const translations: Record<string, Record<string, string>> = {
  // Navbar
  nav_home: { vi: "Trang chủ", en: "Home" },
  nav_products: { vi: "Sản phẩm", en: "Products" },
  nav_benefits: { vi: "Lợi ích", en: "Benefits" },
  nav_about: { vi: "Về chúng tôi", en: "About Us" },
  nav_process: { vi: "Quy trình", en: "Process" },
  nav_quote: { vi: "Báo giá", en: "Get Quote" },
  nav_call: { vi: "Gọi ngay", en: "Call Now" },

  // Hero
  hero_badge: { vi: "🏭 CHUỖI CUNG ỨNG B2B VIMSUPPLY", en: "🏭 VIMSUPPLY B2B SUPPLY CHAIN" },
  hero_title_1: { vi: "Giải Pháp Vật Tư", en: "Industrial Supply" },
  hero_title_2: { vi: "Công Nghiệp", en: "Solutions" },
  hero_title_3: { vi: "Toàn Diện", en: "For All" },
  hero_desc: { vi: "VimSupply by VIMGROUP — Cung ứng bao bì carton, nylon PE, bulong ốc vít, pallet gỗ, chỉ may, dây đai nhựa, băng dính cho hàng trăm nhà máy & xưởng sản xuất toàn quốc. Giải pháp B2B tiết kiệm chi phí, giao hàng đúng hẹn.", en: "VimSupply by VIMGROUP — Supplying carton packaging, nylon PE bags, bolts & nuts, wooden pallets, sewing thread, PP strapping bands, industrial tape to hundreds of factories nationwide. Cost-effective B2B solutions with on-time delivery." },
  hero_cta: { vi: "Nhận Báo Giá Sỉ", en: "Get Wholesale Quote" },
  hero_cta2: { vi: "Xem Sản Phẩm", en: "View Products" },
  hero_stat1: { vi: "Khách hàng B2B", en: "B2B Clients" },
  hero_stat2: { vi: "Nhóm sản phẩm", en: "Product Categories" },
  hero_stat3: { vi: "Năm kinh nghiệm", en: "Years Experience" },
  hero_card1_title: { vi: "Giá Sỉ Cạnh Tranh", en: "Competitive Wholesale" },
  hero_card1_desc: { vi: "Giảm 20-40% chi phí vật tư so với bán lẻ truyền thống", en: "Save 20-40% on material costs vs. traditional retail" },
  hero_card2_title: { vi: "Giao Hàng Toàn Quốc", en: "Nationwide Delivery" },
  hero_card2_desc: { vi: "Đúng hẹn, đúng số lượng, đúng chất lượng cam kết", en: "On-time, correct quantity, guaranteed quality" },
  hero_card3_title: { vi: "Đa Dạng Chủng Loại", en: "Wide Product Range" },
  hero_card3_desc: { vi: "8 nhóm sản phẩm, hàng trăm SKU phục vụ mọi ngành", en: "8 product categories, hundreds of SKUs for all industries" },

  // Solutions
  sol_badge: { vi: "Sản Phẩm Của Chúng Tôi", en: "Our Products" },
  sol_title: { vi: "8 Nhóm Vật Tư Công Nghiệp VimSupply", en: "8 Industrial Supply Categories by VimSupply" },
  sol_desc: { vi: "Đa dạng vật tư bao bì & phụ trợ công nghiệp chất lượng cao, phục vụ mọi nhu cầu sản xuất từ nhỏ đến quy mô lớn.", en: "Wide range of high-quality industrial packaging & support materials for all production needs from small to large scale." },
  sol_consult: { vi: "Nhận báo giá →", en: "Get a quote →" },

  // Benefits
  ben_badge: { vi: "Tại Sao Chọn VimSupply?", en: "Why Choose VimSupply?" },
  ben_title: { vi: "Lợi Ích Vượt Trội Khi Hợp Tác B2B", en: "Outstanding B2B Partnership Benefits" },
  ben_desc: { vi: "VimSupply cam kết mang đến giải pháp cung ứng vật tư tối ưu nhất cho doanh nghiệp của bạn.", en: "VimSupply is committed to providing the most optimal supply solutions for your business." },
  ben_cta_text: { vi: "Tối ưu chi phí vật tư hôm nay, nâng cao năng lực cạnh tranh cho ngày mai.", en: "Optimize material costs today, enhance competitiveness for tomorrow." },
  ben_cta: { vi: "Liên Hệ Tư Vấn Ngay →", en: "Contact for Consultation →" },
  ben_1_t: { vi: "Giá Sỉ Cạnh Tranh", en: "Competitive Wholesale Price" },
  ben_1_d: { vi: "Giảm 20-40% chi phí vật tư so với mua lẻ nhờ nguồn cung trực tiếp từ nhà sản xuất.", en: "Save 20-40% on material costs through direct sourcing from manufacturers." },
  ben_1_s: { vi: "tiết kiệm chi phí", en: "cost savings" },
  ben_2_t: { vi: "Giao Hàng Toàn Quốc", en: "Nationwide Delivery" },
  ben_2_d: { vi: "Hệ thống logistics phủ khắp 34 tỉnh thành, giao hàng đúng hẹn, đúng số lượng.", en: "Logistics network covering 34 provinces, on-time delivery with correct quantities." },
  ben_2_s: { vi: "tỉnh thành", en: "provinces" },
  ben_3_t: { vi: "Đa Dạng Chủng Loại", en: "Wide Product Range" },
  ben_3_d: { vi: "8 nhóm sản phẩm chính với hàng trăm mã SKU, đáp ứng mọi nhu cầu ngành.", en: "8 main product categories with hundreds of SKUs, meeting all industry needs." },
  ben_3_s: { vi: "nhóm sản phẩm", en: "categories" },
  ben_4_t: { vi: "Chất Lượng Đảm Bảo", en: "Quality Guaranteed" },
  ben_4_d: { vi: "Kiểm định chất lượng nghiêm ngặt từ nguyên liệu đầu vào đến thành phẩm giao hàng.", en: "Strict quality control from raw materials to finished product delivery." },
  ben_4_s: { vi: "kiểm định chất lượng", en: "quality tested" },
  ben_5_t: { vi: "Hỗ Trợ Kỹ Thuật", en: "Technical Support" },
  ben_5_d: { vi: "Đội ngũ tư vấn giàu kinh nghiệm hỗ trợ chọn vật tư phù hợp với từng dây chuyền sản xuất.", en: "Experienced consultants help select materials suitable for each production line." },
  ben_5_s: { vi: "chuyên gia tư vấn", en: "expert consultants" },
  ben_6_t: { vi: "Thanh Toán Linh Hoạt", en: "Flexible Payment" },
  ben_6_d: { vi: "Hỗ trợ công nợ, chuyển khoản, COD — linh hoạt theo nhu cầu doanh nghiệp.", en: "Credit terms, bank transfer, COD — flexible payment options for businesses." },
  ben_6_s: { vi: "phương thức thanh toán", en: "payment methods" },

  // About
  about_badge: { vi: "Về VimSupply", en: "About VimSupply" },
  about_title: { vi: "Đối Tác Cung Ứng Vật Tư Công Nghiệp Hàng Đầu", en: "Leading Industrial Supply Partner" },
  about_desc: { vi: "VimSupply là thương hiệu thuộc Tập đoàn Đầu tư VIMGROUP, chuyên cung ứng bao bì và vật tư phụ trợ công nghiệp cho hàng trăm nhà máy, xưởng sản xuất trên toàn quốc. Với hệ thống kho hàng và logistics hiện đại, chúng tôi cam kết giao hàng đúng hẹn, đúng chất lượng với giá sỉ cạnh tranh nhất thị trường.", en: "VimSupply is a brand under VIMGROUP Investment Group, specializing in industrial packaging and support materials for hundreds of factories nationwide. With modern warehousing and logistics systems, we guarantee on-time delivery with the most competitive wholesale prices." },
  about_ceo: { vi: "Giám đốc VimSupply", en: "Director of VimSupply" },
  about_quote: { vi: '"Chất lượng tạo niềm tin, Uy tín tạo thương hiệu"', en: '"Quality builds trust, Prestige builds brand"' },
  about_ceo_name: { vi: "Ms Triệu Thúy", en: "Ms Trieu Thuy" },
  about_f1_t: { vi: "Cam Kết Chất Lượng", en: "Quality Commitment" },
  about_f1_d: { vi: "Kiểm định nghiêm ngặt từ đầu vào đến thành phẩm.", en: "Strict quality control from input to finished products." },
  about_f2_t: { vi: "Giao Hàng Đúng Hẹn", en: "On-Time Delivery" },
  about_f2_d: { vi: "Hệ thống logistics phủ khắp toàn quốc.", en: "Nationwide logistics network coverage." },
  about_f3_t: { vi: "Hậu Mãi Tận Tâm", en: "Dedicated After-Sales" },
  about_f3_d: { vi: "Đổi trả, bảo hành nhanh chóng cho mọi đơn hàng.", en: "Quick returns and warranty for all orders." },
  about_vimgroup: { vi: "VimSupply là thương hiệu chiến lược trực thuộc hệ sinh thái", en: "VimSupply is a strategic brand under the ecosystem of" },

  // Gallery
  gal_badge: { vi: "Hình Ảnh Thực Tế", en: "Real Images" },
  gal_title: { vi: "Sản Phẩm & Kho Hàng", en: "Products & Warehouse" },
  gal_desc: { vi: "Khám phá các sản phẩm chất lượng cao và hệ thống kho hàng hiện đại của VimSupply.", en: "Explore VimSupply's high-quality products and modern warehouse system." },

  // Process
  proc_badge: { vi: "Quy Trình Đặt Hàng", en: "Ordering Process" },
  proc_title: { vi: "Quy Trình Hợp Tác B2B Đơn Giản", en: "Simple B2B Cooperation Process" },
  proc_desc: { vi: "Chỉ 5 bước đơn giản để trở thành đối tác của VimSupply và nhận vật tư chất lượng cao.", en: "Just 5 simple steps to become a VimSupply partner and receive high-quality materials." },
  proc_cta: { vi: "Liên Hệ Ngay →", en: "Contact Now →" },
  proc_1_t: { vi: "Liên Hệ", en: "Contact" },
  proc_1_d: { vi: "Gọi hotline hoặc gửi form để được tư vấn miễn phí về nhu cầu vật tư.", en: "Call hotline or submit form for free material consultation." },
  proc_2_t: { vi: "Báo Giá", en: "Quotation" },
  proc_2_d: { vi: "Nhận báo giá sỉ chi tiết, minh bạch trong vòng 2 giờ làm việc.", en: "Receive detailed, transparent wholesale quote within 2 working hours." },
  proc_3_t: { vi: "Xác Nhận", en: "Confirm" },
  proc_3_d: { vi: "Thống nhất đơn hàng, số lượng, thời gian giao và phương thức thanh toán.", en: "Agree on order, quantity, delivery time and payment method." },
  proc_4_t: { vi: "Sản Xuất", en: "Production" },
  proc_4_d: { vi: "Đóng gói theo tiêu chuẩn, kiểm định chất lượng trước khi xuất kho.", en: "Standard packaging, quality inspection before shipping." },
  proc_5_t: { vi: "Giao Hàng", en: "Delivery" },
  proc_5_d: { vi: "Giao hàng tận nơi toàn quốc, đúng hẹn, đúng số lượng cam kết.", en: "Nationwide delivery, on-time, correct quantity as committed." },

  // Contact Form
  form_badge: { vi: "Liên Hệ Hợp Tác", en: "Contact for Cooperation" },
  form_title: { vi: "Nhận Báo Giá Sỉ & Tư Vấn", en: "Get Wholesale Quote & Consulting" },
  form_desc: { vi: "Để lại thông tin, đội ngũ VimSupply sẽ liên hệ báo giá nhanh chóng trong 2 giờ làm việc.", en: "Leave your information, VimSupply team will contact you with a quote within 2 working hours." },
  form_name: { vi: "Họ và Tên *", en: "Full Name *" },
  form_phone: { vi: "Số Điện Thoại *", en: "Phone Number *" },
  form_email: { vi: "Email", en: "Email" },
  form_type: { vi: "Sản Phẩm Quan Tâm", en: "Interested Product" },
  form_note: { vi: "Ghi chú (số lượng, kích thước...)", en: "Note (quantity, size...)" },
  form_submit: { vi: "NHẬN BÁO GIÁ NGAY 🏭", en: "GET QUOTE NOW 🏭" },
  form_sending: { vi: "ĐANG GỬI...", en: "SENDING..." },
  form_success_title: { vi: "Gửi Yêu Cầu Thành Công!", en: "Request Sent Successfully!" },
  form_success_desc: { vi: "Cảm ơn quý khách đã quan tâm. Đội ngũ VimSupply sẽ liên hệ trong thời gian sớm nhất.", en: "Thank you for your interest. VimSupply team will contact you shortly." },
  form_messenger: { vi: "💬 Chat Messenger Ngay", en: "💬 Chat on Messenger" },
  form_opt1: { vi: "Bao bì Carton", en: "Carton Packaging" },
  form_opt2: { vi: "Bao bì Nylon PE", en: "Nylon PE Bags" },
  form_opt3: { vi: "Bulong Ốc Vít", en: "Bolts & Nuts" },
  form_opt4: { vi: "Pallet & Bao bì Gỗ", en: "Pallets & Wood Packaging" },
  form_opt5: { vi: "Chỉ May Công Nghiệp", en: "Industrial Sewing Thread" },
  form_opt6: { vi: "Dây Đai Nhựa PP", en: "PP Strapping Band" },
  form_opt7: { vi: "Băng Dính Công Nghiệp", en: "Industrial Tape" },
  form_opt8: { vi: "Ván ép Plywood", en: "Plywood" },
  form_opt9: { vi: "Khác", en: "Other" },
  form_hotline: { vi: "Hotline 24/7", en: "Hotline 24/7" },
  form_office: { vi: "Văn phòng", en: "Office" },
  form_office_addr: { vi: "Văn Phòng: B88, Phố Trúc, Khu đô thị Ecopark, Phụng Công, Hưng Yên", en: "Office: B88, Truc Street, Ecopark Urban Area, Phung Cong, Hung Yen" },
  form_factory: { vi: "Nhà máy", en: "Factory" },
  form_factory_addr: { vi: "KCN Phố Nối A, Văn Lâm, Hưng Yên", en: "Pho Noi A IP, Van Lam, Hung Yen" },
  form_secure: { vi: "🔒 Thông tin của bạn được bảo mật tuyệt đối", en: "🔒 Your information is completely secured" },

  // Footer
  footer_desc: { vi: "VimSupply by VIMGROUP — Đơn vị cung ứng bao bì & vật tư phụ trợ công nghiệp hàng đầu Việt Nam. Đối tác tin cậy của hàng trăm nhà máy toàn quốc.", en: "VimSupply by VIMGROUP — Vietnam's leading industrial packaging & material supplier. Trusted partner of hundreds of factories nationwide." },
  footer_links: { vi: "Chuyên Mục", en: "Quick Links" },
  footer_contact: { vi: "Liên Hệ", en: "Contact" },
  footer_office: { vi: "Văn phòng", en: "Office" },
  footer_factory: { vi: "Nhà máy", en: "Factory" },
  footer_credit: { vi: "Sáng tạo bởi VimAI — Thương hiệu công nghệ VIMGROUP", en: "Created by VimAI — VIMGROUP technology brand" },
  
  // Modal Descriptions
  modal_desc_1: {
    vi: "Thùng Carton VimSupply là giải pháp đóng gói chuyên nghiệp, bảo vệ tối đa sản phẩm của bạn trong quá trình vận chuyển. Chúng tôi cung cấp đa dạng các loại thùng từ 3 lớp, 5 lớp đến 7 lớp, đáp ứng tiêu chuẩn xuất khẩu khắt khe nhất. Đặc biệt, sản phẩm có khả năng chịu lực nén cực tốt, chống va đập và thân thiện với môi trường nhờ khả năng tái chế 100%. VimSupply còn hỗ trợ in ấn logo, thương hiệu sắc nét bằng công nghệ in Flexo và Offset hiện đại, giúp doanh nghiệp nâng tầm hình ảnh ngay từ lớp vỏ bao bì ngoài cùng. Dù bạn cần kích thước tiêu chuẩn hay thiết kế tùy chỉnh theo yêu cầu, chúng tôi đều sẵn sàng đáp ứng với tiến độ sản xuất nhanh chóng, số lượng lớn và giá cả tận xưởng cực kỳ cạnh tranh.",
    en: "VimSupply Carton Boxes provide professional packaging solutions, maximizing product protection during transit. We offer a wide range of 3-layer, 5-layer, and 7-layer cartons meeting the strictest export standards. Notably, our products boast excellent compressive strength, impact resistance, and are eco-friendly with 100% recyclability. VimSupply also supports crisp logo and brand printing using modern Flexo and Offset technologies, helping businesses elevate their image right from the outer packaging. Whether you need standard sizes or custom designs, we are ready to deliver with rapid production timelines, bulk quantities, and highly competitive factory-direct prices."
  },
  modal_desc_2: {
    vi: "Bao bì Nylon PE của VimSupply được sản xuất từ hạt nhựa nguyên sinh cao cấp, mang lại độ dẻo dai, trong suốt và khả năng chống thấm nước tuyệt đối. Đây là lựa chọn hoàn hảo để bảo quản hàng hóa khỏi bụi bẩn, độ ẩm và các tác nhân từ môi trường bên ngoài. Chúng tôi cung cấp đầy đủ các định dạng như túi nilon đục lỗ, màng PE quấn pallet, túi cuộn xé, đáp ứng linh hoạt cho mọi ngành nghề từ thực phẩm, may mặc đến linh kiện điện tử. Mọi sản phẩm đều được kiểm tra kỹ lưỡng về độ giãn dài và lực kéo đứt. VimSupply cam kết năng lực cung ứng hàng chục tấn mỗi ngày, giao hàng tận kho giúp doanh nghiệp tối ưu hóa quy trình sản xuất và vận hành.",
    en: "VimSupply's PE Nylon Packaging is manufactured from premium virgin plastic resins, offering exceptional flexibility, clarity, and absolute waterproofing. This is the perfect choice for protecting goods from dust, moisture, and environmental factors. We provide a full range of formats such as punched nylon bags, PE stretch film for pallets, and perforated roll bags, catering flexibly to all industries from food and garments to electronic components. Every product undergoes rigorous testing for elongation and tensile strength. VimSupply commits to a supply capacity of tens of tons daily, with door-to-door delivery helping businesses optimize their production and operations."
  },
  modal_desc_3: {
    vi: "Bulong, ốc vít công nghiệp VimSupply là các linh kiện liên kết cơ khí đạt chuẩn quốc tế (DIN, JIS, ASTM), đảm bảo độ chính xác hoàn hảo cho từng chi tiết máy. Chúng tôi cung cấp các loại bulong neo, bulong móng, đai ốc, vòng đệm từ các chất liệu thép hợp kim, Inox 304/316 và thép mạ kẽm nhúng nóng. Sản phẩm có khả năng chống ăn mòn hóa học, chịu tải trọng lớn và siêu bền bỉ trong môi trường khắc nghiệt. Phục vụ đắc lực cho các công trình xây dựng, lắp ráp kết cấu thép và chế tạo máy móc. Với hệ thống kho trữ lượng lớn, VimSupply luôn sẵn sàng đáp ứng nhanh chóng các đơn hàng dự án quy mô, kèm theo đầy đủ chứng chỉ chất lượng CO, CQ minh bạch.",
    en: "VimSupply's industrial bolts and nuts are mechanical fasteners meeting international standards (DIN, JIS, ASTM), ensuring perfect precision for every machine detail. We supply anchor bolts, foundation bolts, nuts, and washers made from alloy steel, Stainless Steel 304/316, and hot-dip galvanized steel. The products feature excellent chemical corrosion resistance, high load-bearing capacity, and extreme durability in harsh environments. They are vital for construction projects, steel structure assembly, and machinery manufacturing. With high-capacity warehousing, VimSupply is always ready to promptly fulfill large-scale project orders, accompanied by full and transparent CO, CQ quality certificates."
  },
  modal_desc_4: {
    vi: "Pallet và bao bì gỗ VimSupply mang đến sự vững chắc tuyệt đối cho khâu lưu kho và vận chuyển hàng hóa nặng. Sử dụng nguồn gỗ tràm, thông, cao su đạt chuẩn, các sản phẩm pallet của chúng tôi chịu được tải trọng động và tĩnh lên đến hàng tấn. Đặc biệt, 100% pallet và thùng gỗ xuất khẩu đều được xử lý nhiệt, khử trùng theo tiêu chuẩn quốc tế ISPM 15, chống mối mọt và nấm mốc triệt để. Thiết kế linh hoạt 2 chiều, 4 chiều nâng giúp tối ưu hoạt động của xe nâng trong kho bãi. Chúng tôi nhận đóng pallet và thùng kiện gỗ theo kích thước yêu cầu riêng biệt của từng loại máy móc, thiết bị, đảm bảo an toàn tuyệt đối trong các chuyến hàng xuyên lục địa.",
    en: "VimSupply's wooden pallets and packaging bring absolute solidity to warehousing and heavy cargo transportation. Using standard acacia, pine, and rubber wood, our pallet products can withstand dynamic and static loads up to several tons. Notably, 100% of our export pallets and wooden crates are heat-treated and fumigated according to the international ISPM 15 standard, thoroughly preventing termites and mold. Flexible 2-way and 4-way entry designs optimize forklift operations in warehouses. We custom-build pallets and wooden crates based on the specific dimensions of individual machinery and equipment, ensuring absolute safety during transcontinental shipments."
  },
  modal_desc_5: {
    vi: "Chỉ may công nghiệp VimSupply là giải pháp phụ liệu may mặc hoàn hảo, được dệt từ các sợi Polyester, Cotton và Nylon cường lực. Sản phẩm có đặc tính chịu lực kéo dứt điểm cao, độ bền màu tuyệt đối và không bị tưa xơ khi máy may chạy ở tốc độ cao (overlock, chần bông). Bảng màu đa dạng với hàng ngàn sắc độ, nhuộm bằng công nghệ hiện đại, thân thiện với sức khỏe và đạt chuẩn Oeko-Tex. Cuộn chỉ được quấn chặt, đều, trọng lượng tiêu chuẩn, giúp giảm thiểu tối đa hao hụt và thời gian thay chỉ cho dây chuyền may. VimSupply tự hào là nguồn cung ổn định cho các xưởng may gia công xuất khẩu quy mô lớn trên toàn quốc.",
    en: "VimSupply's industrial sewing thread is the perfect garment accessory solution, spun from high-strength Polyester, Cotton, and Nylon fibers. The products feature high tensile breaking strength, absolute colorfastness, and no fraying when sewing machines run at high speeds (overlock, quilting). The diverse color palette with thousands of shades is dyed using modern, health-friendly technology meeting Oeko-Tex standards. The thread spools are tightly and evenly wound to standard weights, minimizing waste and thread-changing time for sewing lines. VimSupply takes pride in being a stable supply source for large-scale export garment processing factories nationwide."
  },
  modal_desc_6: {
    vi: "Dây đai nhựa PP/PET của VimSupply là lựa chọn hàng đầu cho khâu đóng gói, đai kiện hàng hóa tự động và bán tự động. Sản phẩm có độ dai siêu việt, lực siết chặt mà không làm móp méo thùng hàng, an toàn hơn nhiều so với dây đai thép truyền thống. Dây đai thẳng đều, hạn chế tối đa cong vênh, giúp máy đóng đai vận hành trơn tru, không kẹt ríp. Chúng tôi cung cấp đa dạng màu sắc (vàng, đỏ, xanh, trắng) và có hỗ trợ in chữ, logo lên dây đai để tăng cường nhận diện thương hiệu cũng như chống hàng giả. Giải pháp đai kiện của VimSupply giúp cố định gạch ngói, giấy bãi bằng, gỗ nội thất một cách chắn chắn nhất.",
    en: "VimSupply's PP/PET plastic strapping bands are the top choice for packaging and securing goods automatically and semi-automatically. The products possess superior toughness and high tensioning force without denting cartons, making them much safer than traditional steel strapping. The bands are straight and uniform, minimizing warping, helping strapping machines run smoothly without jamming. We offer a variety of colors (yellow, red, blue, white) and support text/logo printing on the bands to enhance brand recognition and prevent counterfeiting. VimSupply's strapping solutions help secure tiles, paper rolls, and wooden furniture in the most robust manner."
  },
  modal_desc_7: {
    vi: "Băng dính công nghiệp VimSupply đáp ứng tiêu chuẩn bám dính vượt trội, ứng dụng rộng rãi trong niêm phong thùng hàng, che chắn sơn và cách điện. Lớp keo Acrylic siêu dính kết hợp màng phim dẻo dai giúp băng dính không bị đứt ngang khi kéo, chịu được nhiệt độ và môi trường ẩm ướt tốt. Các dòng sản phẩm chủ lực bao gồm: băng dính trong/đục đóng thùng OPP, băng dính giấy, băng dính xốp hai mặt và băng dính cảnh báo an toàn. Chiều dài và khổ rộng đa dạng từ 100 yard đến cuộn jumbo lớn, cắt linh hoạt theo yêu cầu. Sản phẩm của chúng tôi mang lại độ hoàn thiện và an toàn tuyệt đối cho các kiện hàng trước khi xuất xưởng.",
    en: "VimSupply's industrial tapes meet superior adhesion standards, widely applied in carton sealing, paint masking, and electrical insulation. The super-adhesive Acrylic glue layer combined with a tough film prevents the tape from snapping when pulled, withstanding temperature and humid environments well. Key product lines include: clear/brown OPP carton sealing tape, masking tape, double-sided foam tape, and safety warning tape. Diverse lengths and widths range from 100 yards to large jumbo rolls, flexibly slit to order. Our products bring absolute finish and safety to packages before leaving the factory."
  },
  modal_desc_8: {
    vi: "Ván ép Plywood VimSupply là vật liệu gỗ công nghiệp cao cấp, được cấu tạo từ nhiều lớp ván lạng mỏng dán ép chéo góc dưới nhiệt độ và áp suất cao. Sản phẩm có kết cấu cực kỳ vững chắc, chống cong vênh, co ngót và khả năng chịu nước ưu việt. Bề mặt ván được chà nhám phẳng mịn, có thể phủ phim, phủ veneer hoặc melamine tùy mục đích sử dụng. VimSupply cung cấp các dòng Plywood cốt bạch đàn, keo, cao su chuyên dụng cho sản xuất nội thất, lót sàn, làm cốp pha xây dựng và thùng kiện xuất khẩu cao cấp. Mọi tấm ván đều đạt chuẩn nồng độ Formaldehyde an toàn (E0, E1), mang lại giải pháp thay thế gỗ tự nhiên hoàn hảo và kinh tế.",
    en: "VimSupply's Plywood is a premium industrial wood material, composed of multiple thin wood veneers cross-glued under high temperature and pressure. The product has an extremely solid structure, resisting warping and shrinking, with superior water resistance. The board surface is sanded smooth, capable of being film-faced, veneer-faced, or melamine-faced depending on usage. VimSupply provides eucalyptus, acacia, and rubber core Plywood specialized for furniture manufacturing, flooring, construction formwork, and premium export packaging crates. Every board meets safe Formaldehyde emission standards (E0, E1), providing a perfect and economical alternative to natural wood."
  }
};

type I18nCtx = { t: (key: string) => string; language: string; setLanguage: (l: string) => void };
const I18nContext = createContext<I18nCtx>({ t: (k) => k, language: "vi", setLanguage: () => {} });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("vi");
  const t = (key: string) => translations[key]?.[language] || key;
  return <I18nContext.Provider value={{ t, language, setLanguage }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
