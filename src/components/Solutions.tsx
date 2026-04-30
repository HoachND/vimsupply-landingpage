"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/context/I18nContext";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Product = {
  key: string;
  img: string;
  vi: string;
  en: string;
  dvi: string;
  den: string;
  modalDescKey: string;
  modalImages: string[];
};

const products: Product[] = [
  { 
    key: "carton", img: "/images/products/carton.webp", vi: "Bao Bì Carton", en: "Carton Packaging", dvi: "Thùng carton 3 lớp, 5 lớp, 7 lớp – đa dạng kích thước, in ấn logo theo yêu cầu.", den: "3-layer, 5-layer, 7-layer carton boxes — various sizes, custom logo printing.",
    modalDescKey: "modal_desc_1",
    modalImages: [
      "/images/products/modal/Bao bi carton/carton_2.jpg",
      "/images/products/modal/Bao bi carton/carton_3.jpg",
      "/images/products/modal/Bao bi carton/carton_4.jpg",
      "/images/products/modal/Bao bi carton/carton_5.jpg",
      "/images/products/modal/Bao bi carton/carton_10.jpg"
    ]
  },
  { 
    key: "nylon", img: "/images/products/nylon.jpg", vi: "Bao Bì Nylon PE", en: "Nylon PE Bags", dvi: "Bao PE, túi nylon các loại – chống thấm, bảo vệ hàng hóa an toàn.", den: "PE bags, nylon bags — waterproof, safe product protection.",
    modalDescKey: "modal_desc_2",
    modalImages: [
      "/images/products/modal/Bao bi nylon/bao nylon pe_1.jpg",
      "/images/products/modal/Bao bi nylon/bao nylon pe_2.png",
      "/images/products/modal/Bao bi nylon/bao nylon pe_3.jpg",
      "/images/products/modal/Bao bi nylon/bao nylon pe_4.jpg",
      "/images/products/modal/Bao bi nylon/bao nylon pe_5.jpg"
    ]
  },
  { 
    key: "bulong", img: "/images/products/bulong.jpg", vi: "Bulong Ốc Vít", en: "Bolts & Nuts", dvi: "Bu lông, đai ốc, ốc vít công nghiệp – chất liệu inox, thép mạ kẽm.", den: "Industrial bolts, nuts, screws — stainless steel, galvanized steel.",
    modalDescKey: "modal_desc_3",
    modalImages: [
      "/images/products/modal/Bulong/bulong_1.jpg",
      "/images/products/modal/Bulong/bulong_2.jpg",
      "/images/products/modal/Bulong/bulong_4.jpg",
      "/images/products/modal/Bulong/bulong_6.jpg",
      "/images/products/modal/Bulong/bulong_9.jpg"
    ]
  },
  { 
    key: "pallet", img: "/images/products/pallet.jpg", vi: "Pallet & Bao Bì Gỗ", en: "Pallets & Wood Packaging", dvi: "Pallet gỗ, hộp gỗ xuất khẩu – xử lý nhiệt theo tiêu chuẩn ISPM 15.", den: "Wooden pallets, export crates — heat treated per ISPM 15 standards.",
    modalDescKey: "modal_desc_4",
    modalImages: [
      "/images/products/modal/Pallet - Bao bi Go/Pallet - Bao bi Go_1.jpg",
      "/images/products/modal/Pallet - Bao bi Go/Pallet - Bao bi Go_5.jpg",
      "/images/products/modal/Pallet - Bao bi Go/Pallet - Bao bi Go_6.jpg",
      "/images/products/modal/Pallet - Bao bi Go/Pallet - Bao bi Go_7.jpg",
      "/images/products/modal/Pallet - Bao bi Go/Pallet - Bao bi Go_8.jpg"
    ]
  },
  { 
    key: "chimay", img: "/images/products/chimay.webp", vi: "Chỉ May Công Nghiệp", en: "Industrial Sewing Thread", dvi: "Chỉ may polyester, chỉ cotton – đa dạng chủng loại cho ngành may mặc.", den: "Polyester thread, cotton thread — wide range for garment industry.",
    modalDescKey: "modal_desc_5",
    modalImages: [
      "/images/products/modal/Chi may/chimay_2.jpg",
      "/images/products/modal/Chi may/chimay_3.jpg",
      "/images/products/modal/Chi may/chimay_4.jpg",
      "/images/products/modal/Chi may/chimay_8.jpg",
      "/images/products/modal/Chi may/chimay_13.jpg"
    ]
  },
  { 
    key: "daydai", img: "/images/products/daydai.jpg", vi: "Dây Đai Nhựa PP", en: "PP Strapping Band", dvi: "Dây đai PP, dây đai PET – chắc chắn, bền bỉ cho đóng kiện hàng.", den: "PP strapping, PET strapping — strong and durable for packaging.",
    modalDescKey: "modal_desc_6",
    modalImages: [
      "/images/products/modal/Day Dai Nhua/Day Dai Nhua_1.jpg",
      "/images/products/modal/Day Dai Nhua/Day Dai Nhua_2.jpg",
      "/images/products/modal/Day Dai Nhua/Day Dai Nhua_4.jpg",
      "/images/products/modal/Day Dai Nhua/Day Dai Nhua_6.jpg",
      "/images/products/modal/Day Dai Nhua/Day Dai Nhua_7.jpg"
    ]
  },
  { 
    key: "bangdinh", img: "/images/products/bangdinh.webp", vi: "Băng Dính Công Nghiệp", en: "Industrial Tape", dvi: "Băng dính OPP, băng keo giấy, băng dính 2 mặt – đa dạng công dụng.", den: "OPP tape, paper tape, double-sided tape — versatile applications.",
    modalDescKey: "modal_desc_7",
    modalImages: [
      "/images/products/modal/Bang Dinh/bangdinh_2.jpg",
      "/images/products/modal/Bang Dinh/bangdinh_3.jpg",
      "/images/products/modal/Bang Dinh/bangdinh_4.jpg",
      "/images/products/modal/Bang Dinh/bangdinh_5.jpg",
      "/images/products/modal/Bang Dinh/bangdinh_7.jpg"
    ]
  },
  { 
    key: "plywood", img: "/images/products/modal/plywood/van ep Plywood_1.jpg", vi: "Ván Ép Plywood", en: "Plywood", dvi: "Ván ép công nghiệp, chịu nước, độ bền cao dùng trong nội thất và xây dựng.", den: "Industrial plywood, water-resistant, highly durable for furniture and construction.",
    modalDescKey: "modal_desc_8",
    modalImages: [
      "/images/products/modal/plywood/van ep Plywood_2.jpg",
      "/images/products/modal/plywood/van ep Plywood_3.jpg",
      "/images/products/modal/plywood/van ep Plywood_4.jpg",
      "/images/products/modal/plywood/van ep Plywood_5.jpg",
      "/images/products/modal/plywood/van ep Plywood_6.jpg"
    ]
  },
];

export default function Solutions() {
  const { t, language } = useI18n();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Auto-scroll carousel
  useEffect(() => {
    if (!selectedProduct) return;
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % selectedProduct.modalImages.length);
    }, 3000); // Scroll every 3 seconds
    return () => clearInterval(timer);
  }, [selectedProduct]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedProduct]);

  const handleNext = () => {
    if (!selectedProduct) return;
    setCurrentImgIndex((prev) => (prev + 1) % selectedProduct.modalImages.length);
  };

  const handlePrev = () => {
    if (!selectedProduct) return;
    setCurrentImgIndex((prev) => (prev === 0 ? selectedProduct.modalImages.length - 1 : prev - 1));
  };

  return (
    <section id="solutions" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0047AB]/3 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-[#4DA6FF] font-semibold tracking-widest mb-4">{t("sol_badge")}</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">{t("sol_title")}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t("sol_desc")}</p>
        </motion.div>
        
        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <motion.div 
              key={p.key} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.08 }} 
              className="glass rounded-2xl overflow-hidden bento-hover group cursor-pointer"
              onClick={() => {
                setSelectedProduct(p);
                setCurrentImgIndex(0);
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={p.img} alt={language === "en" ? p.en : p.vi} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2">{language === "en" ? p.en : p.vi}</h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{language === "en" ? p.den : p.dvi}</p>
                <button className="text-[#4DA6FF] text-sm font-semibold hover:underline flex items-center gap-1">
                  {t("sol_consult")}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-5xl shadow-2xl relative flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 text-black rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              {/* Carousel Section */}
              <div className="w-full md:w-1/2 relative bg-gray-100 min-h-[300px] md:min-h-[500px] flex items-center justify-center group overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImgIndex}
                    src={selectedProduct.modalImages[currentImgIndex]}
                    alt="Product"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Carousel Controls */}
                <button onClick={handlePrev} className="absolute left-4 p-2 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={handleNext} className="absolute right-4 p-2 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10">
                  <ChevronRight size={24} />
                </button>
                
                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {selectedProduct.modalImages.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentImgIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentImgIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4 w-fit">
                  {t("sol_badge")}
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                  {language === "en" ? selectedProduct.en : selectedProduct.vi}
                </h3>
                <div className="text-gray-600 mb-8 leading-relaxed text-base text-justify">
                  {t(selectedProduct.modalDescKey)}
                </div>
                
                <a 
                  href="#contact" 
                  onClick={() => setSelectedProduct(null)}
                  className="bg-[#0047AB] hover:bg-[#003580] text-white px-8 py-4 rounded-xl font-bold text-center transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 w-full md:w-auto self-start"
                >
                  {t("form_submit")}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
