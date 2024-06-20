import "bootstrap/dist/css/bootstrap.min.css";
import {
  NavLinkPers,
  LinkPersonalizedButtonLook,
  ButtonPersonalized,
} from "./customePersonalizedComponents";
import { useAuth } from "./context";
import { useState, useEffect } from "react";

function NavBar() {
  const { user, logOut } = useAuth();


  console.log("user.email from context:", user.email);
  console.log("user.auth from context:", user.valAuth);

  function handleLogOut() {
    logOut();
  }

  return (
    <>
      <div className="hero">
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <a id="logo" className="navbar-brand" href="#">
              {" "}
              SecuredBank
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse nav justify-content-end "
              id="navbarNav"
            >
              <ul className="navbar-nav nav-underline nav-fill nav justify-content-end">
                <li className="nav-item">
                  <NavLinkPers
                    href="#/alldata/"
                    name="All data"
                    label="Database"
                  />
                </li>
                {user.valAuth ? (
                  <>
                    <li className="nav-item">
                      <NavLinkPers
                        href="#/deposit/"
                        name="Deposit"
                        label="Deposit funds"
                      />
                    </li>
                    <li className="nav-item">
                      <NavLinkPers
                        href="#/withdraw/"
                        name="Withdraw"
                        label="Withdraw funds"
                      />
                    </li>
                    <li className="nav-item">
                      <NavLinkPers
                        href="#/login/"
                        name="Home"
                        label="Home"
                      />
                    </li>

                    <li className="nav-item">
                      <ButtonPersonalized
                        handleOnclick={handleLogOut}
                        titleButton="LogOut"
                      ></ButtonPersonalized>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLinkPers
                        href="#/CreateAccount/"
                        name="Create Account"
                        label="Create New Account"
                      />
                    </li>

                    <li className="nav-item">
                      <LinkPersonalizedButtonLook
                        titleButton="LogIn"
                        handleOnclick="#/login/"
                      ></LinkPersonalizedButtonLook>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <br />
    </>
  );
}

export default NavBar;
