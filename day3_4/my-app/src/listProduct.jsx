import React, { useState } from 'react';

function ListProduct({ products }) {

    const [listProduct, setListProduct] = useState([
        { name: "Beer", price: 5, quantity: 10 },
        { name: "Wine", price: 15, quantity: 5 },
        { name: "Coke", price: 2, quantity: 20 },
        { name: "Pepsi", price: 2, quantity: 20 },
        { name: "Fanta", price: 2, quantity: 20 },
    ]);

    const handleDelete = (name) => {
        const filteredProducts = listProduct.filter((p) => p.name !== name); // Remove the product with the given id
        setListProduct(filteredProducts);
    };
    return (
        <div>
            <h1>List of Products</h1>
            <ul>
                {listProduct.map((item, index) => (
                    <li key={index}>
                        Name: {item.name},
                        Price: {item.price},
                        Quantity: {item.quantity}
                    
                        <button onClick={() => handleDelete(item.name)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default ListProduct;