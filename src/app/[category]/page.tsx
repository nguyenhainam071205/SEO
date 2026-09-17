import ProductCard from "@/component/ProductCard";
import { getCategoryById, getProductsByCategory } from "@/lib/db";
import { notFound } from "next/navigation";

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
