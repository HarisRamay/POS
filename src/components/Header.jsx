
import "./Header.css";
import { Link, NavLink } from "react-router-dom";

const categories = [
    "Pizza",
    "Appetizers",
    "Beverages",
    "Pasta",
    "Fried Items",
];

export default function Header() {
    return (
        <header className="navbar">
            <Link to="/mainpage" className="navbarBrand">
                <span className="brandIcon">P</span>

                <span className="brandText">
                    <strong>POS System</strong>
                    <small>Restaurant management</small>
                </span>
            </Link>

            <nav className="navbarCategories" aria-label="Product categories">
                {categories.map((category) => (
                    <NavLink
                        key={category}
                        to={`/mainpage?category=${encodeURIComponent(category)}`}
                        className="categoryLink"
                    >
                        {category}
                    </NavLink>
                ))}
            </nav>

            <Link to="/mainpage" className="headerButton">
                <span>Menu</span>
                <span className="menuArrow">↗</span>
            </Link>
        </header>
    );
}
