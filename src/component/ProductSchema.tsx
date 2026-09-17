import { Product, WithContext } from "schema-dts";

interface ProductSchemaProps {
  product: {
    id: string;
    name: string;
    images: string;
    description: string;
    price: string;
  }
}

export default function ProductSchema({ product }: ProductSchemaProps) {

  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.id}`,

    // Tên sản phẩm
    name: product.name,

    // Ảnh sản phẩm
    image: [
      `${process.env.NEXT_PUBLIC_BASE_URL}${product.images}`
    ],

    // Mô tả
    description: product.description,

    // Giá và đơn vị tiền tệ
    offers: {
      "@type": "Offer",
      priceCurrency: "VND",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock"
    },

    // Thương hiệu (nếu có)
    brand: {
      "@type": "Brand",
      name: "Tiệm hoa vũng tàu"
    },

    // URL gốc của trang sản phẩm
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.id}`,

    // URL phiên bản xem trên mobile
    mobileUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.id}`,

    // Đánh giá nếu có (tạm thời để trống)
    review: [],

    // Xếp hạng sao (tạm thời 0)
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "0",
      reviewCount: "0"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    >

    </script>
  )
}