
import { useState } from "react";

export default function AddCustomerModal({ onClose, onAddCustomer }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            return;
        }

        onAddCustomer({
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="customer-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <div>
                        <h2>Add New Customer</h2>
                        <p>Enter the customer's information below.</p>
                    </div>

                    <button
                        type="button"
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-form-group">
                        <label htmlFor="customer-name">
                            Customer Name *
                        </label>

                        <input
                            id="customer-name"
                            type="text"
                            name="name"
                            placeholder="Enter customer name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="customer-phone">
                            Phone Number
                        </label>

                        <input
                            id="customer-phone"
                            type="tel"
                            name="phone"
                            placeholder="03XXXXXXXXX"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="customer-email">
                            Email Address
                        </label>

                        <input
                            id="customer-email"
                            type="email"
                            name="email"
                            placeholder="customer@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="modal-cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="modal-submit-btn"
                        >
                            Add Customer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
