"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone } from "lucide-react";

type Message = { id: string; text: string; sender: "bot" | "user"; };

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Chào Sếp! Em là trợ lý AI của VimSupply. Sếp cần báo giá vật tư công nghiệp hay tìm hiểu về quy trình cung ứng B2B ạ?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    setTimeout(() => {
      let botReply = "Dạ bộ phận kinh doanh VimSupply đã nhận thông tin. Sếp vui lòng để lại SĐT hoặc gọi Hotline 0974 516 670 để nhận báo giá sỉ tốt nhất ạ!";
      if (text.includes("bao bì")) botReply = "VimSupply cung cấp bao bì carton, nylon PE, túi PP đa kích thước cho nhà máy & xưởng sản xuất. Sếp cần số lượng bao nhiêu và kích thước nào ạ?";
      if (text.includes("bulong")) botReply = "Dạ VimSupply có đầy đủ bulong ốc vít, chỉ may, dây đai nhựa, pallet gỗ. Giao hàng toàn quốc, chiết khấu theo số lượng. Sếp cần bảng giá chi tiết không ạ?";
      if (text.includes("quy trình")) botReply = "Quy trình đặt hàng VimSupply: Báo giá → Xác nhận đơn → Sản xuất/Xuất kho → Giao hàng (2-5 ngày). Miễn phí vận chuyển đơn từ 10 triệu. Sếp muốn nhận báo giá sỉ không ạ?";
      if (text.includes("thanh toán")) botReply = "VimSupply hỗ trợ nhiều hình thức: chuyển khoản, công nợ 15-30 ngày (cho khách hàng thường xuyên), COD. Sếp cần tư vấn thêm về chính sách thanh toán không?";
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: botReply, sender: "bot" };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const suggestions = [
    { q: "Báo giá bao bì carton?", a: "bao bì" },
    { q: "Bulong ốc vít giá sỉ?", a: "bulong" },
    { q: "Quy trình đặt hàng?", a: "quy trình" },
    { q: "Chính sách thanh toán?", a: "thanh toán" }
  ];

  return (
    <div className="fixed bottom-32 left-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[320px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col origin-bottom-left" style={{ height: "500px" }}>
            <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">VS</div>
                <div><h3 className="font-bold text-sm">VimSupply Assistant</h3><p className="text-[10px] text-white/80">⚡ Đang trực tuyến</p></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg"><X size={20} /></button>
            </div>
            <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender === "user" ? "bg-blue-700 text-white rounded-tr-none" : "bg-white text-slate-700 rounded-tl-none border border-gray-100"}`}>{msg.text}</div>
                </div>
              ))}
              {messages.length < 4 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s) => (
                    <button 
                      key={s.q}
                      className="bg-white border border-blue-500/30 text-blue-700 px-3 py-1.5 rounded-full text-[11px] font-bold hover:bg-blue-700 hover:text-white transition-all shadow-sm"
                      onClick={() => handleSend(s.q)}
                    >
                      {s.q}
                    </button>
                  ))}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t border-gray-100 bg-white space-y-3">
              <a href="tel:0974516670" className="flex items-center justify-center gap-2 w-full bg-emerald-500 text-white py-2 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors">
                <Phone size={16} /> Gọi VimSupply: 0974 516 670
              </a>
              <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="flex gap-2">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Nhập tin nhắn..." className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-700" />
                <button type="submit" className="bg-blue-700 text-white p-2 rounded-xl hover:bg-blue-800 transition-transform active:scale-90"><Send size={18} /></button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-700 text-white p-4 rounded-full shadow-lg shadow-blue-700/40 flex items-center justify-center relative">
        <MessageCircle size={28} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
      </motion.button>
    </div>
  );
}
