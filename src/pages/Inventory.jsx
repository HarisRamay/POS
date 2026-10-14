
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Inventory.css";

const initialProducts = [
  { id: 1, name: "Pepperoni Pizza", category: "Pizza", price: 12.99, stock: 25, lowStockThreshold: 10 },
  { id: 2, name: "Classic Burger", category: "Burgers", price: 8.99, stock: 18, lowStockThreshold: 10 },
  { id: 3, name: "Alfredo Pasta", category: "Pasta", price: 10.99, stock: 12, lowStockThreshold: 10 },
  { id: 4, name: "Chocolate Cake", category: "Desserts", price: 6.99, stock: 7, lowStockThreshold: 10 },
  { id: 5, name: "Coke", category: "Beverages", price: 2.99, stock: 32, lowStockThreshold: 10 },
  { id: 6, name: "Water", category: "Beverages", price: 1.99, stock: 50, lowStockThreshold: 10 },
  { id: 7, name: "French Fries", category: "Sides", price: 3.99, stock: 15, lowStockThreshold: 10 },
];

function getStockStatus(product) {
  if (product.stock === 0) return "Out of Stock";
  if (product.stock <= product.lowStockThreshold) return "Low Stock";
  return "In Stock";
}

export default function Inventory() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [stockChange, setStockChange] = useState(1);

  const emptyForm = {
    name: "",
    category: "Pizza",
    price: "",
    stock: "",
    lowStockThreshold: 10,
  };

  const [form, setForm] = useState(emptyForm);

  const categories = [
    "All Categories",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All Categories" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const totalItems = products.length;
  const inStock = products.filter(
    (product) => getStockStatus(product) === "In Stock"
  ).length;
  const lowStock = products.filter(
    (product) => getStockStatus(product) === "Low Stock"
  ).length;
  const outOfStock = products.filter(
    (product) => getStockStatus(product) === "Out of Stock"
  ).length;

  function openAddModal() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      lowStockThreshold: product.lowStockThreshold,
    });
    setModalOpen(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const productData = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      lowStockThreshold: Number(form.lowStockThreshold),
    };

    if (
      !productData.name ||
      productData.price < 0 ||
      productData.stock < 0 ||
      productData.lowStockThreshold < 0 ||
      form.price === "" ||
      form.stock === "" ||
      !Number.isFinite(productData.price) ||
      !Number.isFinite(productData.stock) ||
      !Number.isFinite(productData.lowStockThreshold)
    ) {
      alert("Please enter valid product details.");
      return;
    }

    if (editingId !== null) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingId
            ? { ...product, ...productData }
            : product
        )
      );
    } else {
      setProducts((current) => [
        ...current,
        { id: Date.now(), ...productData },
      ]);
    }

    setModalOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  }

  function deleteProduct(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((current) =>
        current.filter((product) => product.id !== id)
      );
    }
  }

  function updateStock(product, amount) {
    setProducts((current) =>
      current.map((item) =>
        item.id === product.id
          ? { ...item, stock: Math.max(0, item.stock + amount) }
          : item
      )
    );
  }

  return (
    <main className="inventoryPage">
      <div className="inventoryHeading">
        <div>
          <h1>Inventory</h1>
          <p>Manage your stock and keep track of available items.</p>
        </div>

        <button className="inventoryPrimaryButton" onClick={openAddModal}>
          + Add New Item
        </button>
      </div>

      <section className="inventorySummary">
        <article className="inventoryStat">
          <span>Total Products</span>
          <strong>{totalItems}</strong>
        </article>

        <article className="inventoryStat">
          <span>In Stock</span>
          <strong>{inStock}</strong>
        </article>

        <article className="inventoryStat">
          <span>Low Stock</span>
          <strong>{lowStock}</strong>
        </article>

        <article className="inventoryStat">
          <span>Out of Stock</span>
          <strong>{outOfStock}</strong>
        </article>
      </section>

      <section className="inventoryPanel">
        <div className="inventoryToolbar">
          <input
            type="search"
            placeholder="Search product..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="inventoryTableWrapper">
          <table className="inventoryTable">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => {
                const status = getStockStatus(product);

                return (
                  <tr key={product.id}>
                    <td className="inventoryProductName">
                      <span className="inventoryProductIcon">🍽️</span>
                      {product.name}
                    </td>

                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>${product.price.toFixed(2)}</td>

                    <td>
                      <span
                        className={`inventoryStatus ${status
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {status}
                      </span>
                    </td>

                    <td>
                      <div className="inventoryActions">
                        <button
                          title="Edit product"
                          onClick={() => openEditModal(product)}
                        >
                          Edit
                        </button>

                        <button
                          title="Add one unit to stock"
                          onClick={() => updateStock(product, 1)}
                        >
                          + Stock
                        </button>

                        <button
                          title="Delete product"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" className="inventoryEmpty">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="inventoryFooter">
          Showing {filteredProducts.length} of {totalItems} products
        </div>
      </section>

      {modalOpen && (
        <div
          className="inventoryModalBackdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModalOpen(false);
            }
          }}
        >
          <form className="inventoryModal" onSubmit={handleSubmit}>
            <div className="inventoryModalHeader">
              <h2>{editingId !== null ? "Edit Product" : "Add New Item"}</h2>
              <button
                type="button"
                className="inventoryCloseButton"
                onClick={() => setModalOpen(false)}
              >
                ×
              </button>
            </div>

            <label>
              Product Name
              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="Enter product name"
              />
            </label>

            <label>
              Category
              <select
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
              >
                {["Pizza", "Burgers", "Pasta", "Desserts", "Beverages", "Sides", "Other"].map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>
            </label>

            <div className="inventoryFormRow">
              <label>
                Price ($)
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={form.price}
                  onChange={(event) =>
                    setForm({ ...form, price: event.target.value })
                  }
                />
              </label>

              <label>
                Stock Quantity
                <input
                  type="number"
                  min="0"
                  step="1"
                  required
                  value={form.stock}
                  onChange={(event) =>
                    setForm({ ...form, stock: event.target.value })
                  }
                />
              </label>
            </div>

            <label>
              Low Stock Alert At
              <input
                type="number"
                min="0"
                step="1"
                required
                value={form.lowStockThreshold}
                onChange={(event) =>
                  setForm({
                    ...form,
                    lowStockThreshold: event.target.value,
                  })
                }
              />
            </label>

            <div className="inventoryModalActions">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>

              <button type="submit" className="inventoryPrimaryButton">
                {editingId !== null ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
