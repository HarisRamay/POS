
import { useState } from "react";
import { Store, MapPin, Phone, Mail, Save, CheckCircle2 } from "lucide-react";
import "./Settings.css";

const DEFAULT_SETTINGS = {
  restaurantName: "RestroPOS",
  address: "",
  phone: "",
  email: "",
  currency: "PKR",
};

function loadSettings() {
  try {
    const saved = localStorage.getItem("pos_settings");
    return saved
      ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
      : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export default function Settings() {
  const [settings, setSettings] = useState(loadSettings);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSave = (e) => {
    e.preventDefault();

    try {
      localStorage.setItem("pos_settings", JSON.stringify(settings));
      setMessage("Settings saved successfully!");
    } catch {
      setMessage("Unable to save settings. Please try again.");
    }
  };

  return (
    <main className="settings-page">
      <header className="settings-page-header">
        <div>
          <p className="settings-eyebrow">CONFIGURATION</p>
          <h1>General Settings</h1>
          <p className="settings-page-subtitle">
            Manage your restaurant information and preferences.
          </p>
        </div>
      </header>

      {message && (
        <div className="settings-notice" role="status">
          <CheckCircle2 size={18} />
          <span>{message}</span>
        </div>
      )}

      <form className="settings-card" onSubmit={handleSave}>
        <div className="settings-card-title">
          <span className="settings-icon">
            <Store size={22} />
          </span>
          <div>
            <h2>Restaurant Information</h2>
            <p>Update the basic details of your restaurant.</p>
          </div>
        </div>

        <div className="settings-general-grid">
          <label className="settings-field">
            Restaurant Name
            <input
              name="restaurantName"
              value={settings.restaurantName}
              onChange={handleChange}
              placeholder="Enter restaurant name"
              required
            />
          </label>

          <label className="settings-field">
            Phone Number
            <span className="settings-input-icon">
              <Phone size={17} />
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </span>
          </label>

          <label className="settings-field">
            Email Address
            <span className="settings-input-icon">
              <Mail size={17} />
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                placeholder="restaurant@example.com"
              />
            </span>
          </label>

          <label className="settings-field">
            Currency
            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
            >
              <option value="PKR">PKR — Pakistani Rupee</option>
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
              <option value="AED">AED — UAE Dirham</option>
            </select>
          </label>

          <label className="settings-field settings-address-field">
            Restaurant Address
            <span className="settings-input-icon">
              <MapPin size={17} />
              <input
                name="address"
                value={settings.address}
                onChange={handleChange}
                placeholder="Enter restaurant address"
              />
            </span>
          </label>
        </div>

        <div className="settings-card-actions">
          <button className="settings-primary-btn" type="submit">
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}
