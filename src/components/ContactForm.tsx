"use client";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/context/I18nContext";
import { Phone, MapPin, Warehouse, Send, CheckCircle2, MessageCircle } from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactForm() {
  const { t, language } = useI18n();
  const [form, setForm] = useState({ name: "", phone: "", email: "", productType: "", note: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const productOptions = [
    t("form_opt1"), t("form_opt2"), t("form_opt3"), t("form_opt4"),
    t("form_opt5"), t("form_opt6"), t("form_opt7"), t("form_opt8"),
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, language }),
      });
      setSuccess(true);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#0047AB", "#4DA6FF", "#ffffff"] });
    } catch {
      setSuccess(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0047AB]/8 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-[#4DA6FF] font-semibold tracking-widest mb-4">{t("form_badge")}</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">{t("form_title")}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t("form_desc")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
            <div className="glass rounded-3xl p-6 md:p-8">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">{t("form_name")}</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4DA6FF]/50 focus:ring-1 focus:ring-[#4DA6FF]/30 transition-all" placeholder={language === "en" ? "Enter your name" : "Nhập họ tên"} />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">{t("form_phone")}</label>
                        <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4DA6FF]/50 focus:ring-1 focus:ring-[#4DA6FF]/30 transition-all" placeholder="0974 516 670" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">{t("form_email")}</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4DA6FF]/50 focus:ring-1 focus:ring-[#4DA6FF]/30 transition-all" placeholder="email@company.com" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">{t("form_type")}</label>
                        <select value={form.productType} onChange={(e) => setForm({ ...form, productType: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#4DA6FF]/50 focus:ring-1 focus:ring-[#4DA6FF]/30 transition-all appearance-none cursor-pointer">
                          <option value="" className="bg-[#0a1628]">{language === "en" ? "-- Select product --" : "-- Chọn sản phẩm --"}</option>
                          {productOptions.map((o, i) => (
                            <option key={i} value={o} className="bg-[#0a1628]">{o}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">{t("form_note")}</label>
                      <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#4DA6FF]/50 focus:ring-1 focus:ring-[#4DA6FF]/30 transition-all resize-none" placeholder={language === "en" ? "Quantity, size, specifications..." : "Số lượng, kích thước, quy cách..."} />
                    </div>
                    <button type="submit" disabled={sending} className="w-full bg-gradient-to-r from-[#0047AB] to-[#4DA6FF] text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {sending ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t("form_sending")}</> : <><Send size={20} /> {t("form_submit")}</>}
                    </button>
                    <p className="text-center text-xs text-gray-500">{t("form_secure")}</p>
                  </motion.form>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} className="text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{t("form_success_title")}</h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">{t("form_success_desc")}</p>
                    <a href="https://m.me/vimsupply" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                      <MessageCircle size={20} /> {t("form_messenger")}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-5">
            {/* Hotline Card */}
            <div className="glass rounded-2xl p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 bento-hover">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                    <Phone size={24} className="text-orange-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full pulse-ring" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{t("form_hotline")}</p>
                  <a href="tel:0974516670" className="text-2xl font-black text-orange-400 hover:text-orange-300 transition-colors">0974.516.670</a>
                </div>
              </div>
            </div>

            {/* Office */}
            <div className="glass rounded-2xl p-6 bento-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0047AB]/20 flex items-center justify-center shrink-0">
                  <MapPin size={22} className="text-[#4DA6FF]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{t("form_office")}</p>
                  <p className="text-white font-medium text-sm">{t("form_office_addr")}</p>
                </div>
              </div>
            </div>

            {/* Warehouse */}
            <div className="glass rounded-2xl p-6 bento-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Warehouse size={22} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{t("form_factory")}</p>
                  <p className="text-white font-medium text-sm">{t("form_factory_addr")}</p>
                </div>
              </div>
            </div>

            {/* Zalo CTA */}
            <a href="https://zalo.me/0974516670" target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-5 flex items-center gap-4 bento-hover bg-gradient-to-r from-blue-600/10 to-blue-500/5 block">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
                <span className="text-white font-black text-lg">Z</span>
              </div>
              <div>
                <p className="text-white font-bold">Chat Zalo</p>
                <p className="text-sm text-gray-400">{language === "en" ? "Quick response via Zalo" : "Phản hồi nhanh qua Zalo"}</p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
