import { Florist, WithContext } from "schema-dts";

export default function BusinessSchema() {
  const jsonLd: WithContext<Florist> = {
    "@context": "https://schema.org",
    "@type": "Florist",

    // Tên cửa hàng
    name: "Tiệm Hoa Vũng Tàu",

    // Ảnh đại diện của cửa hàng
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/hoa.jpg`,

    // URL trang chủ
    url: process.env.NEXT_PUBLIC_BASE_URL,

    // Số điện thoại liên hệ
    telephone: "0705016997",

    // Địa chỉ cửa hàng
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vũng Tàu",
      addressRegion: "Bà Rịa - Vũng Tàu",
      addressCountry: "VN",
    },

    // Khu vực phục vụ
    areaServed: "Vũng Tàu",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
