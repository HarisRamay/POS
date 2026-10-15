
import "./OrderCart.css";
import { useState } from "react";
import { memo } from "react";

function OrderCart({
    cart,
    onClose,
    onIncrease,
    onDecrease,
    onRemove,
    onPlaceOrder,
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

    const handlePlaceOrder = () => {
        if (cart.length === 0) {
            alert("Please add products before placing an order.");
            return;
        }

        // Shared order data: save a snapshot before clearing the cart.
        const orderData = {
            customer: "Walk-in Customer",
            items: cart.map((item) => ({
                id: item.id,
                name: item.name,
                category: item.category,
                price: item.price,
                quantity: item.quantity,
            })),
            subtotal,
            taxRate,
            tax,
            discount: appliedDiscount,
            total,
            payment: "Cash",
        };

        // Save through OrdersContext using the callback from MainContent.
        const savedOrder = onPlaceOrder(orderData);

        // Use the shared order ID on the receipt.
        const orderNumber =
            savedOrder?.id ?? `ORD-${Date.now().toString().slice(-6)}`;

        const orderDate = new Date().toLocaleString();

        const receiptItems = cart
            .map(
                (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `
            )
            .join("");

        const receiptWindow = window.open("", "_blank", "width=400,height=700");

        if (!receiptWindow) {
            alert(
                `Order ${orderNumber} was saved, but the receipt popup was blocked. Please allow pop-ups to print the receipt.`
            );
            return;
        }

        // Original receipt design preserved.
        receiptWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Receipt ${orderNumber}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            width: 300px;
            margin: 20px auto;
            color: #222;
          }

          h2, p {
            text-align: center;
            margin: 6px 0;
          }

          .divider {
            border-top: 1px dashed #555;
            margin: 12px 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
          }

          th, td {
            padding: 7px 2px;
            text-align: left;
            border-bottom: 1px solid #eee;
          }

          .summary p {
            display: flex;
            justify-content: space-between;
            text-align: left;
          }

          .summary .grand-total {
            font-size: 17px;
            font-weight: bold;
          }

          .thank-you {
            margin-top: 20px;
            font-size: 12px;
          }

          @media print {
            body {
              margin: 0 auto;
              width: 100%;
            }
          }
        </style>
      </head>

      <body>
        <h2>FixIT POS System</h2>
        <p>Order Receipt</p>

        <div class="divider"></div>

        <p>Order: ${orderNumber}</p>
        <p>${orderDate}</p>

        <div class="divider"></div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${receiptItems}
          </tbody>
        </table>

        <div class="divider"></div>

        <div class="summary">
          <p>
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
          </p>

          <p>
            <span>Tax (${taxRate}%)</span>
            <span>$${tax.toFixed(2)}</span>
          </p>

          <p>
            <span>Discount</span>
            <span>-$${appliedDiscount.toFixed(2)}</span>
          </p>

          <div class="divider"></div>

          <p class="grand-total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
          </p>
        </div>

        <p class="thank-you">Thank you for your visit!</p>
      </body>
    </html>
  `);

        receiptWindow.document.close();
        receiptWindow.focus();
        receiptWindow.print();
    };

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

                <button
                    className="placeOrderButton"
                    onClick={handlePlaceOrder}
                >
                    Place Order
                </button>

            </div>

        </aside>
    );
}

export default memo(OrderCart);
