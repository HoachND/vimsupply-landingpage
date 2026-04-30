"use client";
import { motion } from "framer-motion";
import { useI18n } from "@/context/I18nContext";
import { ShieldCheck, Truck, HeartHandshake } from "lucide-react";

export default function About() {
  const { t } = useI18n();
  const features = [
    { icon: ShieldCheck, t: t("about_f1_t"), d: t("about_f1_d"), c: "#0047AB" },
    { icon: Truck, t: t("about_f2_t"), d: t("about_f2_d"), c: "#4DA6FF" },
    { icon: HeartHandshake, t: t("about_f3_t"), d: t("about_f3_d"), c: "#10B981" },
  ];
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0047AB]/5 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-[#4DA6FF] font-semibold tracking-widest mb-4">{t("about_badge")}</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">{t("about_title")}</h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">{t("about_desc")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          {/* CEO Card */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-8 bg-gradient-to-br from-[#0047AB]/10 to-[#4DA6FF]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#0047AB]/10 rounded-full blur-3xl" />
            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              <div className="relative shrink-0">
                <div className="rounded-2xl border-2 border-[#4DA6FF]/30 shadow-xl bg-white/5 p-1">
                  <img src="/images/ceo-thuy.png" alt="CEO VimSupply" className="w-[240px] md:w-[320px] h-auto object-contain rounded-xl" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-r from-[#0047AB] to-[#4DA6FF] rounded-lg flex items-center justify-center shadow-lg border border-white/20">
                  <span className="text-white text-xs font-black">CEO</span>
                </div>
              </div>
              <div className="text-center sm:text-left flex-1">
                <p className="text-lg md:text-xl text-gray-300 italic mb-3 leading-relaxed">{t("about_quote")}</p>
                <div className="h-px bg-gradient-to-r from-[#0047AB] to-transparent mb-3" />
                <p className="font-bold text-white text-lg">{t("about_ceo_name")}</p>
                <p className="text-sm text-[#4DA6FF]">{t("about_ceo")}</p>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass rounded-2xl p-5 flex items-start gap-4 bento-hover">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: f.c + "20" }}>
                  <f.icon size={22} style={{ color: f.c }} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{f.t}</h3>
                  <p className="text-sm text-gray-400">{f.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* VIMGROUP Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-8 flex flex-col md:flex-row items-center justify-center gap-6 bg-gradient-to-r from-white/5 to-white/[0.02]">
          <p className="text-gray-400 text-sm md:text-base text-center md:text-left max-w-sm">{t("about_vimgroup")}</p>
          <img src="/images/logo-vimgroup.png" alt="VIMGROUP" className="h-[120px] w-auto opacity-80 hover:opacity-100 transition-opacity" />
        </motion.div>
      </div>
    </section>
  );
}
