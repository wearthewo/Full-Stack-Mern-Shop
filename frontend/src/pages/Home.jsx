import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [inStock, setInStock] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fethAllProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fethAllProducts();
  }, []);

  // 🔁 Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500); // delay in ms

    return () => clearTimeout(timer);
  }, [searchInput]);

  // 🔎 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/products", {
          params: {
            search: debouncedSearch,
            category,
            sort,
            order,
            inStock,
            page,
          },
        });
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [debouncedSearch, category, sort, order, inStock, page]);

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="p-2 border rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="createdAt">Newest</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          <span>In Stock</span>
        </label>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            console.log(`Image URL: http://localhost:5000/${product.image}`);
            //console.log(product.image); // Check if the image path is correct
            return (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  //src={`http://localhost:5000/uploads/${product.image}`} // Ensure the path is correct
                  src={`/uploads/${product.image}`}
                  alt={product.name}
                  className="h-40 w-full object-cover mb-2"
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500">{product.price} €</p>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
