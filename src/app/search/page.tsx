import ProductCard from "@/component/ProductCard";
import { searchProducts } from "@/lib/db";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  const title = q
    ? `Kết quả tìm kiếm cho "${q}"`
    : "Tìm kiếm sản phẩm";
  const description = q
    ? `Xem các mẫu hoa phù hợp với từ khóa "${q}" tại Tiệm Hoa Vũng Tàu. Giao hàng nhanh trong ngày, mẫu mã đa dạng, giá tốt.`
    : "Tìm kiếm hoa tươi theo tên hoặc dịp tại Tiệm Hoa Vũng Tàu.";

  return {
    title,
    description,
    // Trang kết quả tìm kiếm là nội dung động, dễ trùng lặp/mỏng nội dung
    // nên không cho index nhưng vẫn cho phép bot đi theo các link trong trang
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title,
      description,
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
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/search${q ? `?q=${encodeURIComponent(q)}` : ""}`,
    },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const products = await searchProducts(q);

  return (
    <main className="category-container">
      <h1 className="category-title">Kết quả cho: &quot;{q}&quot;</h1>
      <p className="category-description">
        Top {products.length} sản phẩm {q} đẹp nhất dành cho bạn.
      </p>

      {products && products.length > 0 ? (
        <ul className="product-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </ul>
      ) : (
        <p className="empty-message">
          Rất tiếc, chúng tôi không tìm thấy sản phẩm nào phù hợp với từ khóa &quot;
          {q}&quot;.
        </p>
      )}
    </main>
  );
}
