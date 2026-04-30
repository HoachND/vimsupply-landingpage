"use client";
import { motion } from "framer-motion";
import { useI18n } from "@/context/I18nContext";
import { DollarSign, Truck, Layers, ShieldCheck, Headphones, CreditCard } from "lucide-react";

export default function Benefits() {
  const { t } = useI18n();
  const items = [
    { icon: DollarSign, t: t("ben_1_t"), d: t("ben_1_d"), s: "20-40%", sl: t("ben_1_s"), c: "#0047AB" },
    { icon: Truck, t: t("ben_2_t"), d: t("ben_2_d"), s: "34", sl: t("ben_2_s"), c: "#4DA6FF" },
    { icon: Layers, t: t("ben_3_t"), d: t("ben_3_d"), s: "8", sl: t("ben_3_s"), c: "#F59E0B" },
    { icon: ShieldCheck, t: t("ben_4_t"), d: t("ben_4_d"), s: "100%", sl: t("ben_4_s"), c: "#10B981" },
    { icon: Headphones, t: t("ben_5_t"), d: t("ben_5_d"), s: "24/7", sl: t("ben_5_s"), c: "#8B5CF6" },
    { icon: CreditCard, t: t("ben_6_t"), d: t("ben_6_d"), s: "3+", sl: t("ben_6_s"), c: "#EC4899" },
  ];
  return (
    <section id="benefits" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0047AB]/5 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-[#4DA6FF] font-semibold tracking-widest mb-4">{t("ben_badge")}</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">{t("ben_title")}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t("ben_desc")}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {items.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 bento-hover">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: b.c + "20" }}>
                <b.icon size={24} style={{ color: b.c }} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{b.t}</h3>
              <p className="text-sm text-gray-400 mb-4">{b.d}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black" style={{ color: b.c }}>{b.s}</span>
                <span className="text-xs text-gray-500">{b.sl}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-8 text-center bg-gradient-to-r from-[#0047AB]/10 to-[#4DA6FF]/10">
          <p className="text-lg text-gray-300 mb-4">{t("ben_cta_text")}</p>
          <a href="#contact" className="inline-block bg-gradient-to-r from-[#0047AB] to-[#4DA6FF] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all">{t("ben_cta")}</a>
        </motion.div>
      </div>
    </section>
  );
}
