import "./ProductCard.css";
export default function ProductCard({ product, onAdd }) {
    return (
        <div className="productCard">

            <div className="productImage">
                <img src={product.image} alt={product.name} />
            </div>

            <div className="productInfo">
                <h3>{product.name}</h3>

                <p className="productCategory">
                    {product.category}
                </p>

                <div className="productBottom">
                    <span className="productPrice">
                        ${product.price}
                    </span>

                    <button
                        className="addButton"
                        onClick={() => onAdd(product)}
                    >
                        + Add
                    </button>
                </div>
            </div>

        </div>
    );
}