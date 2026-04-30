"use client";
import { motion } from "framer-motion";
import { useI18n } from "@/context/I18nContext";
import { Package, Truck, Layers } from "lucide-react";

export default function Hero() {
  const { t } = useI18n();
  const stats = [
    { num: "500+", label: t("hero_stat1") },
    { num: "8", label: t("hero_stat2") },
    { num: "10+", label: t("hero_stat3") },
  ];
  const cards = [
    { icon: Package, title: t("hero_card1_title"), desc: t("hero_card1_desc"), color: "from-[#0047AB]/20 to-[#0047AB]/5" },
    { icon: Truck, title: t("hero_card2_title"), desc: t("hero_card2_desc"), color: "from-[#4DA6FF]/20 to-[#4DA6FF]/5" },
    { icon: Layers, title: t("hero_card3_title"), desc: t("hero_card3_desc"), color: "from-amber-500/20 to-amber-500/5" },
  ];
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050a14] via-[#0a1628] to-[#050a14]" />
      <div className="absolute top-[-30%] right-[-15%] w-[700px] h-[700px] rounded-full bg-[#0047AB]/8 blur-3xl sun-ray" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#4DA6FF]/6 blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20 w-full">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs md:text-sm text-[#4DA6FF] font-semibold tracking-widest">{t("hero_badge")}</span>
        </motion.div>
        {/* Title */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
          {t("hero_title_1")} <br className="hidden md:block" />
          <span className="gradient-text-supply">{t("hero_title_2")}</span>{" "}
          {t("hero_title_3")}
        </motion.h1>
        {/* Desc */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-base md:text-lg text-gray-400 max-w-2xl mb-8 leading-relaxed">{t("hero_desc")}</motion.p>
        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap gap-4 mb-12">
          <a href="#contact" className="bg-gradient-to-r from-[#0047AB] to-[#4DA6FF] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all hover:scale-105">{t("hero_cta")}</a>
          <a href="#solutions" className="glass text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all">{t("hero_cta2")} →</a>
        </motion.div>
        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="flex flex-wrap gap-8 mb-12">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black gradient-text-supply">{s.num}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 + i * 0.15 }} className={`glass rounded-2xl p-6 bento-hover bg-gradient-to-br ${c.color}`}>
              <c.icon size={28} className="text-[#4DA6FF] mb-3" />
              <h3 className="font-bold text-white mb-2">{c.title}</h3>
              <p className="text-sm text-gray-400">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
