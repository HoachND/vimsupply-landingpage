"use client";
import { useState, useEffect } from "react";
import { Phone, MessageCircle, X, ChevronUp } from "lucide-react";

export default function Widgets() {
  const [showTop, setShowTop] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Floating Action Buttons - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
        {/* Messenger */}
        <a href="https://m.me/vimsupply" target="_blank" rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-110 transition-transform"
          title="Messenger">
          <MessageCircle size={24} className="text-white" />
        </a>
        {/* Zalo */}
        <a href="https://zalo.me/0974516670" target="_blank" rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-110 transition-transform"
          title="Zalo">
          <span className="text-white font-black text-xl">Z</span>
        </a>
      </div>

      {/* Phone Widget - Bottom Left */}
      <a href="tel:0974516670" className="fixed bottom-6 left-6 z-[90] flex items-center gap-3 group">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
            <Phone size={24} className="text-white animate-bounce" />
          </div>
          <div className="absolute inset-0 rounded-full bg-orange-500/40 pulse-ring" />
        </div>
        <span className="hidden sm:block bg-[#0a1628]/90 backdrop-blur-xl text-white text-sm font-bold px-4 py-2 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          0974.516.670
        </span>
      </a>

      {/* Scroll to Top */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-7 z-[80] w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all animate-in">
          <ChevronUp size={20} className="text-[#4DA6FF]" />
        </button>
      )}

      <style jsx>{`
        @keyframes animateIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: animateIn 0.3s ease-out; }
      `}</style>
    </>
  );
}
