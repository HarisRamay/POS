import "./MainContent.css"
import { useState } from "react";
import products from "./products";
import ProductCard from "./ProductCard";
import OrderCart from "./OrderCart";


export default function MainContent() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Products");
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);

    const addToCart = (product) => {

        setCart((currentCart) => {

            const existingProduct = currentCart.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {

                return currentCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );

            }

            return [
                ...currentCart,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });

        setCartOpen(true);
    };

    const increaseQuantity = (id) => {

        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );

    };
    const decreaseQuantity = (id) => {

        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );

    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "All Products" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });

    const handleOptionClick = (selectedCategory) => {
        setCategory(selectedCategory);
        setIsOpen(false);
    }
    return (
        <div className="mainContent">
            <h1>POS / New Order .....!!!!!</h1>
            <div className="searchContainer">
                <div className="searchBox">
                    <input type="text"
                        placeholder="Search Product....."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />

                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? "▲" : "▼"}
                    </button>

                </div>
                {isOpen && (
                    <div className="dropdownMenu">
                        <button onClick={() => handleOptionClick("All Products")}>
                            All Products
                        </button>
                        <button onClick={() => handleOptionClick("Pizza")}>
                            Pizza
                        </button>
                        <button onClick={() => handleOptionClick("Burgers")}>
                            Burgers
                        </button>
                        <button onClick={() => handleOptionClick("Pasta")}>
                            Pasta
                        </button>
                        <button onClick={() => handleOptionClick("Desserts")}>
                            Desserts
                        </button>
                        <button onClick={() => handleOptionClick("Beverages")}>
                            Beverages
                        </button>
                    </div>
                )}

            </div>
            <div className="productGrid">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAdd={addToCart} />
                ))}

            </div>
            {cartOpen && (
                <OrderCart
                    cart={cart}
                    onClose={() => setCartOpen(false)}
                     onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    
                />
            )}

        </div>



    );

}