"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/context/I18nContext";
import { X, ZoomIn } from "lucide-react";

type Product = {
  key: string;
  img: string;
  vi: string;
  en: string;
  modalDescKey: string;
  modalImages: string[];
};

const products: Product[] = [
  { 
    key: "carton", img: "/images/products/carton.webp", vi: "Bao Bì Carton", en: "Carton Packaging",
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
    key: "nylon", img: "/images/products/nylon.jpg", vi: "Bao Bì Nylon PE", en: "Nylon PE Bags",
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
    key: "bulong", img: "/images/products/bulong.jpg", vi: "Bulong Ốc Vít", en: "Bolts & Nuts",
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
    key: "pallet", img: "/images/products/pallet.jpg", vi: "Pallet & Bao Bì Gỗ", en: "Pallets & Wood Packaging",
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
    key: "chimay", img: "/images/products/chimay.webp", vi: "Chỉ May Công Nghiệp", en: "Industrial Sewing Thread",
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
    key: "daydai", img: "/images/products/daydai.jpg", vi: "Dây Đai Nhựa PP", en: "PP Strapping Band",
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
    key: "bangdinh", img: "/images/products/bangdinh.webp", vi: "Băng Dính Công Nghiệp", en: "Industrial Tape",
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
    key: "plywood", img: "/images/products/modal/plywood/van ep Plywood_1.jpg", vi: "Ván Ép Plywood", en: "Plywood",
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

export default function Gallery() {
  const { t, language } = useI18n();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  
  // Auto-scroll carousel
  useEffect(() => {
    if (!selectedProduct) return;
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % selectedProduct.modalImages.length);
    }, 3000);
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
    <section id="gallery" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0047AB]/3 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-[#4DA6FF] font-semibold tracking-widest mb-4">{t("gal_badge")}</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">{t("gal_title")}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t("gal_desc")}</p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${i === 0 || i === 5 ? "row-span-2" : ""}`}
              onClick={() => {
                setSelectedProduct(p);
                setCurrentImgIndex(0);
              }}
            >
              <img src={p.img} alt={language === "en" ? p.en : p.vi} className="w-full h-full object-cover min-h-[180px] md:min-h-[220px] group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-sm text-white font-medium">{language === "en" ? p.en : p.vi}</span>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={16} className="text-white" />
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button onClick={handleNext} className="absolute right-4 p-2 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
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
