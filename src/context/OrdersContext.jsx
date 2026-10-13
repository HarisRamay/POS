
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const OrdersContext = createContext(null);

const STORAGE_KEY = "pos_orders";

function loadOrders() {
  try {
    const savedOrders = localStorage.getItem(STORAGE_KEY);
    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch {
    return [];
  }
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  function addOrder(orderData) {
    const newOrder = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    setOrders((currentOrders) => [
      newOrder,
      ...currentOrders,
    ]);

    return newOrder;
  }

  function updateOrderStatus(orderId, newStatus) {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  }

  function clearOrders() {
    setOrders([]);
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        clearOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error(
      "useOrders must be used inside OrdersProvider"
    );
  }

  return context;
}
