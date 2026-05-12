"use client";
import { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { Globe, Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const { t, language, setLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#hero", label: t("nav_home") },
    { href: "#solutions", label: t("nav_products") },
    { href: "#benefits", label: t("nav_benefits") },
    { href: "#about", label: t("nav_about") },
    { href: "#process", label: t("nav_process") },
    { href: "/blog", label: "Blog" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-20 lg:h-28">
        <a href="#hero" className="flex items-center gap-2">
          <img src="/images/logo-vimsupply.png" alt="VimSupply" className="h-[80px] lg:h-[120px] w-auto" />
        </a>
        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-base font-semibold text-gray-900 hover:text-[#0047AB] transition-colors">{l.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {/* Call Now mobile */}
          <a href="tel:0974516670" className="lg:hidden flex items-center gap-1 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold animate-pulse">
            <Phone size={14} /> {t("nav_call")}
          </a>
          {/* Language */}
          <button onClick={() => setLanguage(language === "vi" ? "en" : "vi")} className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-base font-medium text-gray-800 transition-colors">
            <Globe size={14} /> {language === "vi" ? "EN" : "VI"}
          </button>
          {/* CTA desktop */}
          <a href="#contact" className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-[#0047AB] to-[#4DA6FF] text-white px-5 py-2 rounded-full text-base font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all">
            {t("nav_quote")}
          </a>
          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg bg-gray-100 text-[#0047AB]">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-t border-gray-200 pb-4 shadow-xl">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-6 py-4 font-semibold text-gray-900 hover:text-[#0047AB] hover:bg-gray-50">{l.label}</a>
          ))}
          <div className="px-6 pt-2">
            <a href="#contact" onClick={() => setOpen(false)} className="block text-center bg-gradient-to-r from-[#0047AB] to-[#4DA6FF] text-white py-3 rounded-xl font-bold">{t("nav_quote")}</a>
          </div>
        </div>
      )}
    </nav>
  );
}
