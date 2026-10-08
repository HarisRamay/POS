import "./OrderCart.css";

export default function OrderCart({
    cart,
    onClose,
    onIncrease,
    onDecrease
}) {

    // Calculate subtotal
    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Tax = 10%
    const tax = subtotal * 0.10;

    // Fixed discount for now
    const discount = 2;

    // Final total
    const total = subtotal + tax - discount;


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
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                </div>


                <div className="summaryRow discountRow">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
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