import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <h1>Home page </h1>
      <h5>Please do Login/Signup before accessing your products</h5>
      <Link to={"/login"}>
        <button>Login</button>
      </Link>
      <Link to={"/signup"}>
        <button>Signup</button>
      </Link>
      <Link to={"/products"}>
        <button>View Products</button>
      </Link>
      <Link to={"/addproduct"}>
        <button>Add product</button>
      </Link>
    </div>
  );
};
