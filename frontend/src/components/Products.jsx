import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Products = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login...");
    navigate("/login");
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("http://localhost:8000/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data is ", data.products);
        setData(data.products);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/products/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Item deleted...");
      })
      .then((res) => navigate("/products"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>products page</h1>
      <div style={{ border: "1px solid red" }}>
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <div
                key={item._id}
                style={{
                  border: "1px solid blue",
                  height: "auto",
                  padding: "1rem",
                }}
              >
                <h2>Name : {item.Name}</h2>
                <h3>Price : {item.Price}</h3>
                <h4>Category : {item.Category}</h4>
                <h5>Made in : {item.Made_In}</h5>
                <div>
                  <Link to={`/products/${item._id}`}>
                    <button>Update</button>
                  </Link>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </div>
            );
          })
        ) : (
          <h2>Your products list is empty, please add products...</h2>
        )}
      </div>
    </div>
  );
};
