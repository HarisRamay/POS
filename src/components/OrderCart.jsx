import "./OrderCart.css";
import { useState } from "react";

export default function OrderCart({
    cart,
    onClose,
    onIncrease,
    onDecrease,
    onRemove,
}) {
    const [taxRate, setTaxRate] = useState(10);
    const [discount, setDiscount] = useState(0);

    // Calculate subtotal
    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );



    const tax = subtotal * (taxRate / 100);
    const appliedDiscount = Math.min(discount, subtotal + tax);
    const total = Math.max(0, subtotal + tax - appliedDiscount);


    return (
        <aside className="orderCart">

            {/* CART HEADER */}
            <div className="cartHeader">

                <h2>Current Order</h2>

                <button
                    className="closeCartButton"
                    onClick={onClose}
                >
                    ×
                </button>

            </div>


            {/* CART ITEMS */}
            <div className="cartItems">



                {cart.map((item) => (

                    <div
                        className="cartItem"
                        key={item.id}
                    >

                        <div className="cartItemInfo">

                            <h3>{item.name}</h3>

                            <p>
                                ${item.price}
                            </p>

                        </div>


                        {/* QUANTITY */}
                        <div className="quantityControls">

                            <button
                                onClick={() => onDecrease(item.id)}
                            >
                                −
                            </button>

                            <span>
                                {item.quantity}
                            </span>

                            <button
                                onClick={() => onIncrease(item.id)}
                            >
                                +
                            </button>

                        </div>
                        <button
                            className="deleteItemButton"
                            onClick={() => onRemove(item.id)}
                            aria-label={`Delete ${item.name}`}
                        >
                            Delete
                        </button>

                    </div>



                ))}

            </div>


            {/* ORDER SUMMARY */}
            <div className="orderSummary">

                <div className="summaryRow">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>


                <div className="summaryRow">
                    <label>Tax (%)</label>
                    <input
                        type="number"
                        min="0"
                        value={taxRate}
                        onChange={(e) =>
                            setTaxRate(Math.max(0, Number(e.target.value)))
                        }
                    />
                </div>

                <div className="summaryRow discountRow">
                    <label>Discount ($)</label>
                    <input
                        type="number"
                        min="0"
                        max={subtotal + tax}
                        value={discount}
                        onChange={(e) =>
                            setDiscount(
                                Math.min(
                                    subtotal + tax,
                                    Math.max(0, Number(e.target.value))
                                )
                            )
                        }
                    />
                </div>


                <div className="totalRow">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>


                <button className="placeOrderButton">
                    Place Order
                </button>

            </div>

        </aside>
    );
}