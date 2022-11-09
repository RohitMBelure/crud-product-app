import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditProduct = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login...");
    navigate("/login");
  }

  useEffect(() => {
    getData();
  }, [id]);

  const getData = () => {
    fetch(`https://product-crud-app.onrender.com/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let temp = data.products;
        temp = temp.filter((item) => item._id === id);
        setData(temp[0]);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    fetch(`https://product-crud-app.onrender.com/products/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert("Update successful...");
        navigate("/products");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Edit Product Page</h1>
      <div>
        <div>
          <div>
            <label htmlFor="">Name : </label>
            <input
              type="text"
              value={data.Name}
              onChange={(e) =>
                setData({
                  ...data,
                  Name: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="">Price : </label>
            <input
              type="Number"
              value={data.Price}
              onChange={(e) =>
                setData({
                  ...data,
                  Price: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="">Category : </label>
            <input
              type="text"
              value={data.Category}
              onChange={(e) =>
                setData({
                  ...data,
                  Category: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="">Made In : </label>
            <input
              type="text"
              value={data.Made_In}
              onChange={(e) =>
                setData({
                  ...data,
                  Made_In: e.target.value,
                })
              }
            />
          </div>
          <div>
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};
