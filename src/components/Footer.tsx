"use client";
import { useI18n } from "@/context/I18nContext";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const { t, language } = useI18n();
  const links = [
    { href: "/#hero", label: language === "vi" ? "Trang chủ" : "Home" },
    { href: "/#solutions", label: language === "vi" ? "Sản phẩm" : "Products" },
    { href: "/#benefits", label: language === "vi" ? "Lợi ích" : "Benefits" },
    { href: "/#about", label: language === "vi" ? "Về chúng tôi" : "About Us" },
    { href: "/#process", label: language === "vi" ? "Quy trình" : "Process" },
    { href: "/#contact", label: language === "vi" ? "Liên hệ" : "Contact" },
  ];
  return (
    <footer className="relative border-t border-gray-200 bg-white">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img src="/images/logo-vimsupply.png" alt="VimSupply" className="h-24 md:h-28 w-auto mb-6" />
            <p className="text-sm text-gray-600 leading-relaxed mb-5">{t("footer_desc")}</p>
            <div className="flex gap-3">
              <a href="https://zalo.me/0974516670" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 flex items-center justify-center transition-colors">
                <span className="text-blue-400 font-black text-sm">Z</span>
              </a>
              <a href="https://m.me/vimsupply" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#0047AB]/10 hover:bg-[#0047AB]/20 flex items-center justify-center transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.36 2 2 6.13 2 11.7C2 14.61 3.31 17.09 5.4 18.72V22L8.73 20.27C9.77 20.55 10.86 20.7 12 20.7C17.64 20.7 22 16.57 22 11C22 6.13 17.64 2 12 2Z" fill="#4DA6FF"/><path d="M13.12 14.24L10.72 11.72L6.07 14.24L11.2 8.82L13.6 11.34L18.25 8.82L13.12 14.24Z" fill="white"/></svg>
              </a>
              <a href="tel:0974516670" className="w-10 h-10 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 flex items-center justify-center transition-colors">
                <Phone size={16} className="text-orange-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 text-lg">{t("footer_links")}</h3>
            <div className="space-y-2.5">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="block text-sm font-medium text-gray-600 hover:text-[#0047AB] transition-colors">{l.label}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 text-lg">{t("footer_contact")}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#0047AB] shrink-0" />
                <a href="tel:0974516670" className="text-sm font-medium text-gray-600 hover:text-[#0047AB] transition-colors">0974.516.670</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#0047AB] shrink-0" />
                <a href="mailto:b2b.vimgroup@gmail.com" className="text-sm font-medium text-gray-600 hover:text-[#0047AB] transition-colors">b2b.vimgroup@gmail.com</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#0047AB] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-600 leading-snug">{t("footer_office")}: {t("form_office_addr")}</p>
                  <p className="text-sm font-medium text-gray-600 mt-2 leading-snug">{t("footer_factory")}: {t("form_factory_addr")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-gray-500">© {new Date().getFullYear()} VimSupply — VIMGROUP. All rights reserved.</p>
          <a href="https://vimai.vimgroup.vn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group cursor-pointer">
            <span className="text-sm font-bold text-gray-600 group-hover:text-[#0047AB] group-hover:drop-shadow-[0_0_8px_rgba(0,71,171,0.5)] transition-all duration-300">{t("footer_credit")}</span>
            <img src="/images/logo-vimgroup.png" alt="VIMGROUP" className="h-10 w-auto opacity-70 group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(0,71,171,0.4)] transition-all duration-300" />
          </a>
        </div>
      </div>
    </footer>
  );
}
