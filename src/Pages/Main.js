import React from "react";
import Search from "../Components/Search";
import { AuthContext } from "../Contexts/AuthContext";
import Loader from "../Components/Loader";
import List from "../Components/List";

const Main = () => {
  const { process } = React.useContext(AuthContext);

  return (
    <div className="main d-flex align-items-center justify-content-center">
      {process === "search" ? <Search /> : null}
      {process === "loader" ? <Loader /> : null}
      {process === "list" ? <List /> : null}
    </div>
  );
};

export default Main;
