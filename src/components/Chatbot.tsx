"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone } from "lucide-react";

type Message = { id: string; text: string; sender: "bot" | "user"; };

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Chào Sếp! Em là trợ lý AI của IHOME Việt Nam. Sếp cần tư vấn về nhiên liệu sinh khối Biomass hay lò hơi công nghiệp ạ?", sender: "bot" }
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
      let botReply = "Dạ bộ phận kinh doanh của IHOME đã nhận được thông tin. Sếp vui lòng để lại SĐT hoặc gọi Hotline 0974 516 670 để nhận báo giá nhiên liệu tốt nhất ạ!";
      if (text.includes("nhiên liệu")) botReply = "IHOME cung cấp Viên nén gỗ, Củi mùn cưa, Thanh củi ép chất lượng cao. Sếp cần số lượng bao nhiêu tấn mỗi tháng ạ?";
      if (text.includes("lò hơi")) botReply = "Dạ IHOME cung cấp giải pháp chuyển đổi lò hơi sang dùng sinh khối tiết kiệm 30-50% chi phí. Sếp cho em biết công suất lò của mình nhé?";
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: botReply, sender: "bot" };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-32 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[320px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[500px]">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-orange-600">I</div>
                <div><h3 className="font-bold text-sm">IHOME Assistant</h3><p className="text-[10px] text-white/80">⚡ Đang trực tuyến</p></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg"><X size={20} /></button>
            </div>
            <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender === "user" ? "bg-orange-500 text-white" : "bg-white text-slate-700 border border-gray-100"}`}>{msg.text}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t border-gray-100 bg-white space-y-3">
              <a href="tel:0974516670" className="flex items-center justify-center gap-2 w-full bg-orange-600 text-white py-2 rounded-xl font-bold text-sm hover:bg-orange-700 transition-colors">
                <Phone size={16} /> Gọi IHOME: 0974.516.670
              </a>
              <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="flex gap-2">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Nhập tin nhắn..." className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-600" />
                <button type="submit" className="bg-orange-600 text-white p-2 rounded-xl active:scale-90"><Send size={18} /></button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center relative">
        <MessageCircle size={28} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
      </motion.button>
    </div>
  );
}
