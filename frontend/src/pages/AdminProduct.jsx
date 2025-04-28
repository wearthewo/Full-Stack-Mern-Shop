import { useEffect, useState } from "react";
import { api } from "../utils/api";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products/admin");
      setProducts(data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleCreate = async () => {
    try {
      await api.post("/products/admin", newProduct);
      setNewProduct({ name: "", price: "", description: "" });
      fetchProducts();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleUpdate = async (productId) => {
    try {
      const updatedName = prompt("Enter new name:");
      const updatedPrice = prompt("Enter new price:");
      const updatedDesc = prompt("Enter new description:");
      await api.put(`/products/admin/${productId}`, {
        name: updatedName,
        price: updatedPrice,
        description: updatedDesc,
      });
      fetchProducts();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await api.delete(`/products/admin/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      {/* Create New Product */}
      <div className="border p-4 mb-6 rounded">
        <h2 className="text-xl font-bold mb-2">Create New Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          Create Product
        </button>
      </div>

      {/* List of Products */}
      {products.map((product) => (
        <div key={product._id} className="border p-4 mb-4 rounded">
          <p>
            <b>Name:</b> {product.name}
          </p>
          <p>
            <b>Price:</b> ${product.price}
          </p>
          <p>
            <b>Description:</b> {product.description}
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleUpdate(product._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProductsPage;
