import "./Header.css";

export default function Header(){

return(
    <nav className="navbar">
       <h2>POS System</h2>

       <a href="">Pizza</a>
        <a href="">Appetizers</a>
        <a href="">Beverages</a>
        <a href="">Pasta</a>
        <a href="">Fried Items</a>

       <button className="headerButton">
           Menu
       </button>
    </nav>
);

}