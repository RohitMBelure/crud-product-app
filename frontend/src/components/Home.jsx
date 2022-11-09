import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <h1>Home page </h1>
      <h2>Please do Login/Signup before accessing your products</h2>
      <Link to={"/login"}>
        <button>Login</button>
      </Link>
      <Link to={"/signup"}>
        <button>Signup</button>
      </Link>
    </div>
  );
};
