import NavBar from "./Components/navBar";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link, HashRouter, Route, Routes } from "react-router-dom";
import AllData from "./Components/allData";
import CreateAccount from "./Components/CreateAccount";
import Deposit from "./Components/deposit";
import Home from "./Components/home";
import Login from "./Components/logIn";
import Withdraw from "./Components/withdraw";
import "./App.css";
import { UserProvider } from "../src/Components/context";


function App() {
  return (
    <div>
      <NavBar />
      <div className="body">
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreateAccount/" element={<CreateAccount />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/deposit/" element={<Deposit />} />
            <Route path="/withdraw/" element={<Withdraw />} />
            <Route path="/alldata/" element={<AllData />} />
          </Routes>
        </UserProvider>
      </div>
    </div>
  );
}

export default App;
