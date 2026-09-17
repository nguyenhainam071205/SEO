import ProductCard from "@/component/ProductCard";
import { formatVietnameseDate } from "@/lib";
import { getCategoryById, getProductsByCategory } from "@/lib/db";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[category]">) {
  const { category: categoryId } = await params;
  const category = await getCategoryById(categoryId);

  if (!category) {
    return notFound();
  }

  const categoryName = category.name.toLowerCase();

  return {
    title: `Mẫu ${categoryName} đẹp nhất Vũng Tàu trong ${formatVietnameseDate(new Date())}`,
    description: `${category.description} Đặt mua ${categoryName} online tại Tiệm Hoa Vũng Tàu, giao hàng nhanh trong ngày, mẫu mã đa dạng, giá tốt.`,
    keywords: ["hoa tươi 24/7", "shop hoa tươi vũng tàu", "hoa tươi vũng tàu", "hoa sinh nhật vũng tàu", "hoa 8/3 vũng tàu", "hoa tiệc vũng tàu", "hoa Valentine vũng tàu", `${categoryName} vũng tàu`, `${categoryName} đẹp nhất vũng tàu`, `${categoryName} giá rẻ vũng tàu`, `${categoryName} online vũng tàu`],

    openGraph: {
      title: `Mẫu ${categoryName} đẹp nhất Vũng Tàu trong ${formatVietnameseDate(new Date())}`,
      description: `${category.description} Đặt mua ${categoryName} online tại Tiệm Hoa Vũng Tàu, giao hàng nhanh trong ngày, mẫu mã đa dạng, giá tốt.`,
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
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${categoryId}`,
    },
  }
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const { category: categoryId } = await params;
  const category = await getCategoryById(categoryId);

  if (!category) {
    return notFound();
  }

  const categoryName = category.name.toLowerCase();
  const products = await getProductsByCategory(categoryId);

  return (
    <main className="category-container">
      <h1 className="category-title">Danh mục: {categoryName}</h1>
      <p className="category-description">
        Hiển thị các mẫu hoa thuộc nhóm {categoryName}...
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
          Hiện chưa có sản phẩm nào trong danh mục này.
        </p>
      )}
    </main>
  );
}
