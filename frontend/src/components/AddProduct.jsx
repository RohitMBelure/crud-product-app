import { useState } from "react";

export const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [madeIn, setMadeIn] = useState("");

  const toekn = localStorage.getItem("token");

  const handleSubmit = () => {
    const payload = {
      Name: name,
      Price: price,
      Category: category,
      Made_In: madeIn,
    };

    fetch("https://product-crud-app.onrender.com/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${toekn}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Add Product page</h1>
      <div>
        <input
          type="text"
          placeholder="product name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="Number"
          placeholder="product price"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="product category"
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="product made in"
          onChange={(e) => setMadeIn(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>Add product</button>
      </div>
    </div>
  );
};
