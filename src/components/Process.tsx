"use client";
import { motion } from "framer-motion";
import { useI18n } from "@/context/I18nContext";
import { Phone, FileText, CheckCircle, Factory, Truck } from "lucide-react";

export default function Process() {
  const { t } = useI18n();
  const steps = [
    { icon: Phone, t: t("proc_1_t"), d: t("proc_1_d"), num: "01", c: "#0047AB" },
    { icon: FileText, t: t("proc_2_t"), d: t("proc_2_d"), num: "02", c: "#4DA6FF" },
    { icon: CheckCircle, t: t("proc_3_t"), d: t("proc_3_d"), num: "03", c: "#10B981" },
    { icon: Factory, t: t("proc_4_t"), d: t("proc_4_d"), num: "04", c: "#F59E0B" },
    { icon: Truck, t: t("proc_5_t"), d: t("proc_5_d"), num: "05", c: "#8B5CF6" },
  ];
  return (
    <section id="process" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0047AB]/5 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-[#4DA6FF] font-semibold tracking-widest mb-4">{t("proc_badge")}</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">{t("proc_title")}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t("proc_desc")}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0047AB]/50 via-[#4DA6FF]/50 to-[#0047AB]/50" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`relative md:flex items-center md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:mb-12`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                  <div className={`glass rounded-2xl p-6 bento-hover inline-block w-full`}>
                    <div className={`flex items-start gap-4 ${i % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""}`}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: s.c + "15" }}>
                        <s.icon size={24} style={{ color: s.c }} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold mb-1" style={{ color: s.c }}>STEP {s.num}</div>
                        <h3 className="text-lg font-bold text-white mb-2">{s.t}</h3>
                        <p className="text-sm text-gray-400">{s.d}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Circle - Center */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full items-center justify-center z-10 border-2 shadow-lg" style={{ borderColor: s.c, backgroundColor: "#050a14", boxShadow: `0 0 20px ${s.c}40` }}>
                  <span className="text-sm font-black" style={{ color: s.c }}>{s.num}</span>
                </div>

                {/* Empty side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
          <a href="#contact" className="inline-block bg-gradient-to-r from-[#0047AB] to-[#4DA6FF] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all hover:scale-105">{t("proc_cta")}</a>
        </motion.div>
      </div>
    </section>
  );
}
