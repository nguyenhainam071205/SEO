import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";
import BusinessSchema from "@/component/BusinessSchema";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  title: {
    default: "Shop hoa tươi vũng tàu uy tín, giá tốt",
    template: "%s - Shop hoa tươi vũng tàu uy tín, giá tốt",
  },
  description: "Shop hoa tươi 24/7 với đa dạng các loại hoa tươi như hoa sinh nhật, hoa 8/3, hoa tiệc, hoa Valentine. Giao hàng nhanh chóng tại Vũng Tàu.",

  // Từ khóa giúp Google hiểu được trang web của mình đang nói về vấn đề gì
  keywords: ["hoa tươi 24/7", "shop hoa tươi vũng tàu", "hoa tươi vũng tàu", "hoa sinh nhật vũng tàu", "hoa 8/3 vũng tàu", "hoa tiệc vũng tàu", "hoa Valentine vũng tàu"],

  // Định nghĩa cách trang web của mình hiển thị khi chia sẻ lên các nền tảng mạng xã hội
  openGraph: {
    title: "Hoa tươi 24/7 - Shop hoa tươi vũng tàu uy tín, giá tốt",
    description: "Shop hoa tươi 24/7 với đa dạng các loại hoa tươi như hoa sinh nhật, hoa 8/3, hoa tiệc, hoa Valentine. Giao hàng nhanh chóng tại Vũng Tàu.",
    url: baseURL,
    siteName: "Tiệm hoa vũng tàu",
    images: [
      {
        url: `/hoa.jpg`,
        width: 1200,
        height: 630,
        alt: "Tiệm hoa vũng tàu",
      },
    ],
    locale: "vi_VN",
    phoneNumbers: "0705016997",
    emails: "hainamcoi123456789@gmail.com",
    type: "website",
    countryName: "Việt Nam",
  },
  // Khai báo URL "chính chủ" (canonical) của trang, giúp Google gộp các URL trùng/tương tự
  // (vd: có "?utm=...", có/không "www", "/index") về một URL duy nhất, tránh bị phạt duplicate content
  alternates: {
    canonical: baseURL,
  },

  // URL gốc dùng để tự động ghép thành đường dẫn tuyệt đối cho các URL tương đối
  // khai báo bên trong metadata (vd: images "/hoa.jpg" ở openGraph phía trên).
  // Nếu không có metadataBase, Next.js sẽ cảnh báo và fallback về "http://localhost:3000"
  metadataBase: new URL(baseURL || "http://localhost:3000"),
  verification: {
    google: "IE1Xg9ystnD225uVc2Ed41Ks65SEXHULf8J1Plx2J6E",
  },
};

// Cấu hình thẻ <meta name="viewport"> cho trang, quyết định cách trình duyệt render trên các kích thước màn hình
export const viewport: Viewport = {
  // Đặt chiều rộng viewport bằng đúng chiều rộng thiết bị (thay vì render theo layout desktop rồi thu nhỏ),
  // giúp trang hiển thị responsive đúng trên điện thoại/tablet
  width: "device-width",

  // Mức zoom ban đầu khi trang được tải là 1 (100%, không phóng to/thu nhỏ)
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Dữ liệu có cấu trúc (JSON-LD) mô tả doanh nghiệp, giúp Google hiển thị
            thông tin cửa hàng (tên, ảnh, SĐT, địa chỉ,...) trong kết quả tìm kiếm */}
        <BusinessSchema />
      </head>
      <body>
        <body>
          <nav className="nav-bar">
            <div className="nav-content">
              <Link
                href="/"
                className="nav-logo"
              >
                🌸 Tiệm Hoa Vũng Tàu
              </Link>

              <div className="nav-links">
                <Link
                  href="/hoa-sinh-nhat"
                  className="nav-link-item"
                >
                  Hoa sinh nhật
                </Link>
                <Link
                  href="/hoa-8-3"
                  className="nav-link-item"
                >
                  Hoa 8/3
                </Link>
                <Link
                  href="/hoa-tiec"
                  className="nav-link-item"
                >
                  Hoa tiệc
                </Link>
                <Link
                  href="/hoa-valentine"
                  className="nav-link-item"
                >
                  Hoa Valentine
                </Link>
              </div>

              {/* Nút giả lập để giao diện cân đối */}
              <button className="hidden md:block px-4 py-2 text-sm font-semibold text-white bg-slate-600 rounded-full hover:bg-rose-700 transition-all">
                Liên hệ ngay
              </button>
            </div>
          </nav>
          {children}
        </body>
      </body>
    </html>
  );
}
