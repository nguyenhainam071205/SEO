import { MetadataRoute } from "next";
import { getCategories, getProducts } from "@/lib/db";

// File này định nghĩa "sơ đồ trang web" (sitemap) - danh sách toàn bộ URL
// mà chủ site muốn công cụ tìm kiếm (Google, Bing,...) biết đến và index.
// Nhờ đó bot không cần tự dò link để phát hiện trang, giúp trang mới/ít link trỏ đến
// (vd: sản phẩm mới đăng) vẫn được crawl và index nhanh hơn.
// Next.js dùng đúng tên file "sitemap.ts/.tsx" theo convention để tự sinh ra
// route /sitemap.xml, không cần tự viết XML thủ công.

// URL gốc của website, dùng để ghép thành URL tuyệt đối cho từng entry trong sitemap
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Next.js sẽ tự động tạo file /sitemap.xml từ hàm này lúc build/runtime
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Lấy toàn bộ danh mục và sản phẩm từ "database" (db.json) để sinh URL động
  const categories = await getCategories();
  const products = await getProducts();

  // Trang tĩnh: trang chủ, luôn tồn tại và ít thay đổi cấu trúc
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      // Tần suất Google nên quay lại crawl trang này
      changeFrequency: "daily",
      // Mức độ ưu tiên so với các URL khác trong sitemap (0 -> 1)
      priority: 1,
    },
  ];

  // Trang danh mục: mỗi category tương ứng 1 URL dạng "/[category]"
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/${category.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Trang chi tiết sản phẩm: mỗi product tương ứng 1 URL dạng "/products/[id]"
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // Gộp tất cả URL lại thành 1 sitemap duy nhất
  // Không đưa /search, /cart, /admin,... vào vì đây là trang động/riêng tư,
  // đã được chặn crawl trong robots.ts
  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
