import React from "react";
import Login from "./Authenticate/Login";
import Registration from "./Authenticate/Registration";

const Home = () => {
  return (
    <div>
      <Login />
      <Registration />
    </div>
  )
};

export default Home;