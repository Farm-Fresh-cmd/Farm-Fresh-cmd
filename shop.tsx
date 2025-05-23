
import React, { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

const Shop: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const products: Product[] = [
    { id: 1, name: "Apple", price: 1.2 },
    { id: 2, name: "Banana", price: 0.8 },
    { id: 3, name: "Orange", price: 1.5 }
  ];

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <h1>Shop</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <h2>Cart</h2>
      <ul>
        {cart.map((product, index) => (
          <li key={index}>
            {product.name} - ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;
