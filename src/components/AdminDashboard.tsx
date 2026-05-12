"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plus, LogOut, Moon, Sun, Save, Trash2, ChevronLeft, Globe, Search, Eye, EyeOff, Code, Terminal, Key } from "lucide-react";
import { BlogPost } from "@/app/api/blog/route";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleLogin = () => {
    if (password === "vimsupply99") setIsLoggedIn(true);
    else alert("Sai mật khẩu Sếp ơi!");
  };

  const fetchPosts = async () => { const res = await fetch("/api/blog?admin=true"); setPosts(await res.json()); };
  useEffect(() => { if (isLoggedIn) fetchPosts(); }, [isLoggedIn]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    const method = editingPost.id ? "PUT" : "POST";
    const res = await fetch("/api/blog", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingPost) });
    if (res.ok) { setIsEditorOpen(false); fetchPosts(); alert("Đã lưu bài viết!"); }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Xóa bài này?")) return;
    await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
    fetchPosts();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl text-center">
          <div className="w-16 h-16 bg-blue-700 rounded-2xl mx-auto mb-6 flex items-center justify-center"><span className="text-white font-black text-xl">VS</span></div>
          <h1 className="text-white font-black text-2xl mb-2">VimSupply Admin</h1>
          <p className="text-slate-400 mb-8 text-sm">Đăng nhập để quản lý nội dung Blog</p>
          <div className="space-y-4">
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Nhập mật khẩu admin" className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 pr-12" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>
            <button onClick={handleLogin} className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl hover:bg-blue-600 shadow-lg shadow-blue-700/20">Đăng nhập</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${isDark ? "bg-slate-950 text-white" : "bg-gray-50 text-slate-900"}`}>
      <nav className={`fixed w-full z-40 border-b ${isDark ? "bg-slate-900/80 border-white/5" : "bg-white/80 border-gray-200"} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center"><span className="text-white font-black text-sm">VS</span></div>
            <span className="text-blue-500 font-black text-sm uppercase tracking-widest">VimSupply Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-white/5">{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
            <a href="/" className="text-xs font-bold px-4 py-2 rounded-full border border-current hover:bg-current hover:text-white flex items-center gap-2"><ChevronLeft size={14} /> Trang chủ</a>
            <button onClick={() => setIsLoggedIn(false)} className="text-red-500 p-2"><LogOut size={20} /></button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div><h1 className="text-3xl font-black">Quản Lý Bài Viết</h1><p className="text-slate-400 text-sm mt-1">Cập nhật tin tức vật tư B2B VimSupply</p></div>
          <button onClick={() => { setEditingPost({ id: "", slug: "", titleVi: "", titleEn: "", excerptVi: "", excerptEn: "", contentVi: "", contentEn: "", category: "Packaging", seoTitle: "", seoDescription: "", seoImage: "", tags: [], author: "VimSupply", published: true, createdAt: "", updatedAt: "" }); setIsEditorOpen(true); }} className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg"><Plus size={20} /> Viết Bài Mới</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className={`p-6 rounded-3xl border ${isDark ? "bg-slate-900 border-white/5 hover:border-blue-500/30" : "bg-white border-gray-100 hover:shadow-xl"}`}>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-500 px-2 py-1 rounded">{post.category}</span>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingPost(post); setIsEditorOpen(true); }} className="text-blue-400">Sửa</button>
                  <button onClick={() => deletePost(post.id)} className="text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.titleVi}</h3>
              <p className={`text-xs mb-4 line-clamp-2 ${isDark ? "text-slate-400" : "text-gray-500"}`}>{post.excerptVi}</p>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>{new Date(post.createdAt).toLocaleDateString("vi-VN")}</span>
                <span className={post.published ? "text-emerald-500" : "text-amber-500"}>{post.published ? "● Đã đăng" : "○ Bản nháp"}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={`mt-16 p-8 rounded-3xl border ${isDark ? "bg-slate-900 border-white/10" : "bg-white border-gray-100 shadow-xl"}`}>
          <div className="flex items-center gap-3 mb-6"><div className="bg-blue-600/10 text-blue-500 p-2 rounded-xl"><Terminal size={24} /></div><div><h2 className="text-xl font-black">Blog API - Cấu Hình Tool Tự Động</h2><p className="text-sm text-slate-500">Dùng cho các tool cào bài / AI Auto-Post</p></div></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-2xl border ${isDark ? "bg-slate-800/50 border-white/5" : "bg-gray-50 border-gray-200"}`}>
              <h3 className="font-bold mb-4 flex items-center gap-2"><Key size={16} /> URL & Method</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-3"><span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-bold">POST</span> <span>/api/blog</span></div>
                <div className="flex items-center gap-3"><span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">GET</span> <span>/api/blog?admin=true</span></div>
              </div>
              <div className="mt-6">
                <h4 className="font-bold text-sm mb-2 text-slate-400">Yêu cầu Headers:</h4>
                <div className="bg-black/50 p-3 rounded-lg font-mono text-xs text-green-400">
                  "Content-Type": "application/json"
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border ${isDark ? "bg-slate-800/50 border-white/5" : "bg-gray-50 border-gray-200"}`}>
              <h3 className="font-bold mb-4 flex items-center gap-2"><Code size={16} /> Cấu trúc JSON Payload (Ví dụ)</h3>
              <pre className="bg-black/50 p-4 rounded-xl font-mono text-xs text-sky-300 overflow-x-auto">
{`{
  "slug": "bai-viet-tu-dong",
  "titleVi": "Tiêu đề tiếng Việt",
  "titleEn": "English Title",
  "excerptVi": "Mô tả ngắn tiếng Việt",
  "excerptEn": "English excerpt",
  "contentVi": "<h2>Nội dung bài viết</h2>",
  "contentEn": "<h2>Article content</h2>",
  "category": "Tên chuyên mục",
  "seoTitle": "Tiêu đề SEO",
  "seoDescription": "Mô tả SEO",
  "seoImage": "/images/og-vimsupply.png",
  "tags": ["Từ khóa 1", "Từ khóa 2"],
  "author": "Auto Tool",
  "published": true
}`}
              </pre>
            </div>
          </div>
        </div>
      </main>
      <AnimatePresence>
        {isEditorOpen && editingPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsEditorOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border shadow-2xl flex flex-col bg-slate-900 border-white/10">
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-800/50"><h2 className="text-xl font-black flex items-center gap-2 text-white"><FileText /> {editingPost.id ? "Chỉnh Sửa" : "Tạo Bài Mới"}</h2><button onClick={() => setIsEditorOpen(false)} className="text-slate-400 hover:text-white">Đóng</button></div>
              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-8 space-y-8 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-blue-500 font-bold flex items-center gap-2"><Globe size={16} /> Tiếng Việt</h3>
                    <div><label className="text-xs text-slate-400 block mb-1 uppercase font-bold">Tiêu đề (Vi)</label><input type="text" value={editingPost.titleVi} onChange={(e) => setEditingPost({...editingPost, titleVi: e.target.value})} className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500" required /></div>
                    <div><label className="text-xs text-slate-400 block mb-1 uppercase font-bold">Mô tả ngắn (Vi)</label><textarea value={editingPost.excerptVi} onChange={(e) => setEditingPost({...editingPost, excerptVi: e.target.value})} className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 h-20 focus:outline-none focus:border-blue-500" /></div>
                    <div><label className="text-xs text-slate-400 block mb-1 uppercase font-bold">Nội dung (HTML - Vi)</label><textarea value={editingPost.contentVi} onChange={(e) => setEditingPost({...editingPost, contentVi: e.target.value})} className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 h-60 font-mono text-sm focus:outline-none focus:border-blue-500" /></div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sky-500 font-bold flex items-center gap-2"><Globe size={16} /> English</h3>
                    <div><label className="text-xs text-slate-400 block mb-1 uppercase font-bold">Title (En)</label><input type="text" value={editingPost.titleEn} onChange={(e) => setEditingPost({...editingPost, titleEn: e.target.value})} className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-sky-500" /></div>
                    <div><label className="text-xs text-slate-400 block mb-1 uppercase font-bold">Excerpt (En)</label><textarea value={editingPost.excerptEn} onChange={(e) => setEditingPost({...editingPost, excerptEn: e.target.value})} className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 h-20 focus:outline-none focus:border-sky-500" /></div>
                    <div><label className="text-xs text-slate-400 block mb-1 uppercase font-bold">Content (HTML - En)</label><textarea value={editingPost.contentEn} onChange={(e) => setEditingPost({...editingPost, contentEn: e.target.value})} className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 h-60 font-mono text-sm focus:outline-none focus:border-sky-500" /></div>
                  </div>
                </div>
                <div className="bg-blue-600/5 border border-blue-600/20 p-6 rounded-2xl space-y-6">
                  <div className="flex items-center gap-3"><div className="bg-blue-600 p-2 rounded-lg"><Search size={20} className="text-white" /></div><h3 className="font-black text-xl">Cấu Hình SEO</h3></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="text-xs text-blue-500 block mb-1 uppercase font-black tracking-widest">SEO Title *</label><input type="text" value={editingPost.seoTitle} onChange={(e) => setEditingPost({...editingPost, seoTitle: e.target.value})} className="w-full bg-slate-900 border border-blue-600/30 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" required /></div>
                    <div><label className="text-xs text-blue-500 block mb-1 uppercase font-black tracking-widest">SEO Description *</label><textarea value={editingPost.seoDescription} onChange={(e) => setEditingPost({...editingPost, seoDescription: e.target.value})} className="w-full bg-slate-900 border border-blue-600/30 rounded-xl px-4 py-3 h-24 focus:outline-none focus:border-blue-500" required /></div>
                    <div className="md:col-span-2"><label className="text-xs text-blue-500 block mb-1 uppercase font-black tracking-widest">SEO Image URL</label><input type="text" value={editingPost.seoImage} onChange={(e) => setEditingPost({...editingPost, seoImage: e.target.value})} className="w-full bg-slate-900 border border-blue-600/30 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" /></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div><label className="text-xs text-slate-400 block mb-1 uppercase font-bold">Slug</label><input type="text" value={editingPost.slug} onChange={(e) => setEditingPost({...editingPost, slug: e.target.value})} className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 text-xs" /></div>
                  <div><label className="text-xs text-slate-400 block mb-1 uppercase font-bold">Chuyên mục</label><select value={editingPost.category} onChange={(e) => setEditingPost({...editingPost, category: e.target.value})} className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 text-sm"><option value="Bao Bì">Bao Bì</option><option value="Vật Tư Cơ Khí">Vật Tư Cơ Khí</option><option value="Chiến Lược B2B">Chiến Lược B2B</option><option value="News">News</option></select></div>
                  <div><label className="text-xs text-slate-400 block mb-1 uppercase font-bold">Tác giả</label><input type="text" value={editingPost.author} onChange={(e) => setEditingPost({...editingPost, author: e.target.value})} className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 text-sm" /></div>
                  <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={editingPost.published} onChange={(e) => setEditingPost({...editingPost, published: e.target.checked})} className="w-5 h-5 accent-blue-600" /><label className="text-sm font-bold">Xuất bản</label></div>
                </div>
                <div className="pt-8 flex justify-end gap-4">
                  <button type="button" onClick={() => setIsEditorOpen(false)} className="px-8 py-3 rounded-xl border border-white/10 font-bold">Hủy</button>
                  <button type="submit" className="px-12 py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-black shadow-xl flex items-center gap-2"><Save size={20} /> LƯU BÀI VIẾT</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
