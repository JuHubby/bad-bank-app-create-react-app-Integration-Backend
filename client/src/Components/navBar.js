import "bootstrap/dist/css/bootstrap.min.css";
import {
  NavLinkPers,
  LinkPersonalizedButtonLook,
  ButtonPersonalized,
} from "./customePersonalizedComponents";
import { useAuth } from "./context";
import { useState, useEffect } from "react";

function NavBar() {
//   const [userAuthRoute, setUserAuthRoute] = useState(false);
  const { user, logOut } = useAuth();



//   useEffect(() => {
//     const isAuthenticatedUser = getUser();

//     if (isAuthenticatedUser) {
//       setUserAuthRoute(true);
//       console.log("data updated after fetching:", userAuthRoute); // Now you have access to the data
//     }
//     logOut();
//     console.log("data updated after fetching should be false:", userAuthRoute); // Now you have access to the data
//   }, []);

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
              BadBank
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
            <div className="collapse navbar-collapse " id="navbarNav">
              <ul className="navbar-nav nav-underline nav-fill">
              <li>
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#/alldata/"
                      >
                        AllData
                      </a>
                    </li>
                {user.valAuth ? (
                  <>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#/deposit/"
                      >
                        Deposit
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#/withdraw/"
                      >
                        Withdraw
                      </a>
                    </li>
                
                   

                    <li>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <br />
                        <ButtonPersonalized
                          handleOnclick={handleLogOut}
                          titleButton="LogOut"
                        ></ButtonPersonalized>
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#/CreateAccount/"
                      >
                        {" "}
                        Create Account
                      </a>
                    </li>
                    <li className="nav-item">
                      <LinkPersonalizedButtonLook
                        titleButton="LogIn"
                        handleOnclick="#/login/"
                      ></LinkPersonalizedButtonLook>
                    </li>
                  </>
                )}
                {/* <li className="nav-item">
                <NavLinkPers 
                href="#/CreateAccount/"
                name="Create Account"
                label="Create New Account"
                />
                </li>
                <li className="nav-item">
                <NavLinkPers 
                href="#/login/"
                name="Login"
                label="Sing In"
                />
                </li>
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
                href="#/alldata/"
                name="All Data"
                label="Data Table"
                />  
                </li>
              */}
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
