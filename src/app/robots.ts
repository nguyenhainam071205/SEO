import { MetadataRoute } from "next";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// Next.js sẽ tự động tạo file /robots.txt từ hàm này lúc build/runtime
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // Áp dụng quy tắc cho tất cả các bot/crawler (Googlebot, Bingbot,...)
      userAgent: "*",

      // Cho phép crawl toàn bộ trang bắt đầu từ "/"
      allow: "/",

      // Chặn crawl các trang không cần index: giỏ hàng, trang quản trị,
      // đơn hàng, thanh toán và liên hệ (thường là trang riêng tư/không có giá trị SEO)
      disallow: ["/cart", "/admin", "/order", "/checkout", "/contact"],
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}