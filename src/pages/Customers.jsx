
import { useState } from "react";
import "./Customers.css";
import AddCustomerModal from "../components/AddCustomerModal";

export default function Customers() {
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [customers, setCustomers] = useState([
        {
            id: 1,
            name: "Ahmed Raza",
            phone: "03001234567",
            email: "ahmed@gmail.com",
            orders: 12,
            totalSpent: 24500,
        },
        {
            id: 2,
            name: "Sara Khan",
            phone: "03127654321",
            email: "sara@gmail.com",
            orders: 4,
            totalSpent: 8200,
        },
        {
            id: 3,
            name: "Usman Malik",
            phone: "03339876543",
            email: "usman@gmail.com",
            orders: 2,
            totalSpent: 3750,
        },
    ]);

    const filteredCustomers = customers.filter((customer) => {
        const searchText = search.toLowerCase();

        return (
            customer.name.toLowerCase().includes(searchText) ||
            customer.phone.includes(searchText) ||
            customer.email.toLowerCase().includes(searchText)
        );
    });

    const handleAddCustomer = (customerData) => {
        const newCustomer = {
            id: Date.now(),
            ...customerData,
            orders: 0,
            totalSpent: 0,
        };

        setCustomers((previousCustomers) => [
            ...previousCustomers,
            newCustomer,
        ]);

        setShowModal(false);
    };

    const totalSpent = customers.reduce(
        (total, customer) => total + customer.totalSpent,
        0
    );

    const returningCustomers = customers.filter(
        (customer) => customer.orders > 1
    ).length;

    return (
        <div className="customers-page">
            <div className="customers-header">
                <div>
                    <h1>Customers</h1>
                    <p>Manage your customers and their purchase history.</p>
                </div>

                <button
                    className="add-customer-btn"
                    onClick={() => setShowModal(true)}
                >
                    + Add Customer
                </button>
            </div>

            <div className="customer-stats">
                <div className="stat-card">
                    <p>Total Customers</p>
                    <h2>{customers.length}</h2>
                </div>

                <div className="stat-card">
                    <p>Returning Customers</p>
                    <h2>{returningCustomers}</h2>
                </div>

                <div className="stat-card">
                    <p>Total Customer Sales</p>
                    <h2>Rs. {totalSpent.toLocaleString()}</h2>
                </div>
            </div>

            <div className="customers-content">
                <div className="customers-toolbar">
                    <h2>All Customers</h2>

                    <input
                        type="text"
                        placeholder="Search customer..."
                        className="customer-search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="customers-table-wrapper">
                    <table className="customers-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Orders</th>
                                <th>Total Spent</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.phone || "—"}</td>
                                        <td>{customer.email || "—"}</td>
                                        <td>{customer.orders}</td>
                                        <td>
                                            Rs. {customer.totalSpent.toLocaleString()}
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="customer-action-btn"
                                                onClick={() =>
                                                    alert(
                                                        `Customer: ${customer.name}\nPhone: ${customer.phone || "N/A"}\nEmail: ${customer.email || "N/A"}\nOrders: ${customer.orders}\nTotal Spent: Rs. ${customer.totalSpent.toLocaleString()}`
                                                    )
                                                }
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="no-customers">
                                        No customers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <AddCustomerModal
                    onClose={() => setShowModal(false)}
                    onAddCustomer={handleAddCustomer}
                />
            )}
        </div>
    );
}
