import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8724327895:AAG4lf55tebnB0RhCqxwoTa_-rG4T8QXutQ";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-5179603882";
const GAS_WEBHOOK_URL = process.env.GAS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbzOolIYJZMSlAGooqwVC1GfXsRfOd12D3z3wwX-eBbiesQIJ2P9FoVztFYBskfaDN4Z/exec";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, email, productType, note, language } = data;

    // 1. Send to Telegram
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramMessage = `
🏭 <b>[VimSupply] CÓ KHÁCH HÀNG MỚI</b> 🏭
━━━━━━━━━━━━━━━━━━━━
👤 <b>Tên:</b> ${name}
📞 <b>SĐT:</b> ${phone}
✉️ <b>Email:</b> ${email || 'Không có'}
📦 <b>Sản phẩm:</b> ${productType || 'Chưa chọn'}
📝 <b>Ghi chú:</b> ${note || 'Không có'}
🌐 <b>Ngôn ngữ:</b> ${language === 'vi' ? 'Tiếng Việt' : 'English'}
━━━━━━━━━━━━━━━━━━━━
🕒 <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN')}
      `;

      try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'HTML',
          }),
        });
      } catch (error) {
        console.error("Telegram error:", error);
      }
    }

    // 2. Send to Google Apps Script (Google Sheets & Auto-Reply Email)
    const PROJECT_GAS_URL = "https://script.google.com/macros/s/AKfycbzOolIYJZMSlAGooqwVC1GfXsRfOd12D3z3wwX-eBbiesQIJ2P9FoVztFYBskfaDN4Z/exec";
    const GLOBAL_GAS_URL = "https://script.google.com/macros/s/AKfycbzVK3sPVnbDfcRxk8n_5vi-gRU2X_1GTXVHuU8kcrk6Kfk3wkpqKRDJACtb3msUFRm6/exec";
    const GLOBAL_SHEET_ID = "1LAtBjiRbwTxt7qu9XSYwzbVMNYBvC6guq-Zv_Yp3Cf0";

    try {
      await Promise.all([
        // Gửi cho dự án
        fetch(PROJECT_GAS_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ ...data, source: "b2b.vimgroup.vn - VimSupply" }),
        }),
        // Gửi cho Database Tổng VIMGROUP
        fetch(GLOBAL_GAS_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ 
            ...data, 
            source: "b2b.vimgroup.vn (contact-form)",
            targetSheetId: GLOBAL_SHEET_ID 
          }),
        })
      ]);
    } catch (gasError) {
      console.error("GAS Synchronization Error (non-blocking):", gasError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
