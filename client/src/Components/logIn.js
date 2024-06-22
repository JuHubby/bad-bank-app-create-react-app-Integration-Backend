import {
  ButtonPersonalized,
  CardPersonalized,
  LinkPersonalized,
  HeaderPersonalized,
  LinkPersonalizedOutline,
} from "./customePersonalizedComponents";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { useAuth } from "./context";
import { Form, useFormik, resetForm } from "formik";
import { DepositAuth } from "./deposit";
import { WithdrawAuth } from "./withdraw";

function Login() {
  const [data, setData] = useState();
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login, authenticated, logOut, currentUser, user, setUser } =
    useAuth();
  const ctx = useAuth();
  const [dissabledButton, setdissabledButton] = useState(true);

  console.log("currentUser", currentUser);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      var email = values.email;
      var password = values.password;

      setEmail(email);
      setPassword(password);
      console.log("values", values);

      const url = `/account/login`;
      console.log("after url");

      const getUser = async () => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const data = {
            email: email,
            password: password,
          };

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: "follow",
          };
          console.log("url:", url);
          const response = await fetch(url, requestOptions);

          if (response.status != 200) {
            throw new Error(
              `something went wrong, status code: ${response.status}`
            );
          }
          const userData = await response.json();
          console.log("userdata:", userData);
          return userData;
        } catch (err) {
          console.log(err);
        }
      };

      (async () => {
        const userData = await getUser();
        if (userData) {
          console.log("data updated:" + JSON.stringify(userData));
          var name = userData.name; //it helps with the delay of usestate
          var balance = userData.balance;
          setStatus("");
          setEmail(() => userData.email);
          setPassword(() => userData.password);
          setBalance(balance);
          setName(name);
          login(name, email, password, balance); //call firebase

          console.log("currentUser", currentUser);
          console.log("user info form:", name, email, balance, password);
          console.log("user info context:", user);
          return; //important
        }

        setStatus(
          <>
            <span className="alert alert-danger d-flex align-items-center">
              {" "}
              <p>
                {" "}
                Login failed: User or password not recognized. Please retry or
                register for a new account if you're not already part of our
                awesome Bank.
              </p>
            </span>
          </>
        );
        setTimeout(() => setStatus(""), 3000);
      })();
      clearForm();
    },

    validate: (values) => {
      let errors = {};

      if (!values.password) {
        errors.password = (
          <span className="alert alert-danger d-flex align-items-center">
            {" "}
            <strong> Field required</strong>
          </span>
        );
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
          values.password
        )
      )
        errors.password = (
          <span className="alert alert-danger d-flex align-items-center">
            {" "}
            <strong>
              {" "}
              The password must contain minimum 8 Characters, One Uppercase, One
              Lowercase, One Number and One Special Case Character
            </strong>
          </span>
        );
      if (!values.email) {
        errors.email = (
          <span className="alert alert-danger d-flex align-items-center">
            {" "}
            <strong> Field required</strong>
          </span>
        );
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = (
          <span className="alert alert-danger d-flex align-items-center">
            {" "}
            <strong> This field should include a valid email address</strong>
          </span>
        );
      }
      setdissabledButton(false);
      return errors;
    },
  });

  function clearForm() {
    formik.resetForm();
    setEmail("");
    setPassword("");
    setdissabledButton(true);
  }
  console.log("parse:", window.localStorage.getItem("user"));

  console.log("current user", currentUser);
  console.log("user info form:", name, email, balance, password);
  return (
    <>
      {/* <h6>{JSON.stringify(ctx)}</h6> */}

      {currentUser ? (
        <>
          <br />
          <CardPersonalized
            header={`Hello ${user.name} !`}
            width="auto"
            nameButton="Save"
            hdColor="dark"
            textCenter="true"
            status={status}
            body={<LogInAuth balance={user.balance} />}
          />
        </>
      ) : (
        <CardPersonalized
          width="30"
          textcenter="true"
          center="true"
          header="Log into your Account"
          nameButton="Save"
          hdColor="dark"
          status={status}
          body={
            <>
              <form onSubmit={formik.handleSubmit}>
                <strong>Email:</strong> <br />
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  id="email"
                  placeholder="Enter email address"
                ></input>{" "}
                <br></br>
                {formik.errors.email ? (
                  <div className="error-validation">{formik.errors.email}</div>
                ) : null}{" "}
                <br></br>
                <strong>Password:</strong> <br />
                <input
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  type="text"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                ></input>{" "}
                <br></br>
                {formik.errors.password ? (
                  <div className="error-validation">
                    {formik.errors.password}
                  </div>
                ) : null}{" "}
                <br></br>
                <div className="container text-center">
                  <div className="row">
                    <div className="col">
                      <ButtonPersonalized
                        titleButton="Log In"
                        type="submit"
                        name="submitBtn"
                        className="button"
                        disabled={dissabledButton}
                      />
                      <br />
                      <div className="col">
                        <LinkPersonalized
                          titleButton="Forgot your password?"
                          handleOnclick="#/login/"
                        />
                      </div>
                      <div className="col">
                        <LinkPersonalized
                          titleButton="Sig In"
                          handleOnclick="#/CreateAccount/"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </>
          }
        />
      )}
    </>
  );
}
function LogInAuth(props) {
  const { currentUser, logOut, user, logIn } = useAuth();
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  console.log("user info form:", user.name, user.balance);

  return (
    <>
      <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              <h1>Account Summary</h1>
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            class="accordion-collapse collapse show"
          >
            <div class="accordion-body ">
              <div class="d-flex justify-content-start">
                <h5>Account Number: xxx-xxx-xxx-0603</h5>
              </div>

              <div class="d-flex justify-content-end">
                <p>Your current balance is:</p>
              </div>
              <div class="d-flex justify-content-end">
                <h3> {USDollar.format(props.balance)}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <br />

      <div className="container-fluid">
        <div className="row position-relative">
          <div className="col ">
            <div className="position-relative top-50 start-50 translate-middle">
              <CardPersonalized
                width="75"
                // header="Welcome to the Bank"
                // title="Welcome to the Bank"
                text="Start using our bank app, equipped with innovative features named CoolBank."
                image="visa.png"
                textCenter="true"
              />
            </div>
          </div>
          <div className="col ">
            <div className="position-relative top-50 start-50 translate-middle">
              <h2>
                <strong>Start today!</strong>
                <br />
              </h2>
              <h4>
                <span>
                  With us, you have a variety of investment options to help grow
                  your money.
                </span>
              </h4>
              <br />
              <LinkPersonalizedOutline
                titleButton="Get started >>"
                handleOnclick="#/CreateAccount/"
              />
            </div>
          </div>
          <div className="col ">
            <div className="position-relative top-50 start-50 translate-middle">
              <div class="container text-center">
                <div class="row row-cols-2">
                  <div class="col">
                    <CardPersonalized
                      width="100"
                      header={"Stocks"}
                      //  title="Welcome to the Bank"
                      //  text="You can use this Bank App as a mobile application that lets you access your bank account from anywhere, at any time "
                      image="invest.png"
                      textCenter="true"
                      hdColor="warning"
                      //
                    />
                  </div>
                  <div class="col">
                    <CardPersonalized
                      width="100"
                       header="Bonds"
                      //  title="Welcome to the Bank"
                      //  text="You can use this Bank App as a mobile application that lets you access your bank account from anywhere, at any time "
                      image="invest.png"
                      textCenter="true"
                      hdColor="warning"
                      //
                    />
                  </div>
                  <div class="col">
                    <CardPersonalized
                      width="100"
                       header="Mutual Funds"
                      //  title="Welcome to the Bank"
                      //  text="You can use this Bank App as a mobile application that lets you access your bank account from anywhere, at any time "
                      image="invest.png"
                      textCenter="true"
                      hdColor="warning"
                      //
                    />
                  </div>
                  <div class="col">
                    <CardPersonalized
                      width="100"
                       header="Real State"
                      //  title="Welcome to the Bank"
                      //  text="You can use this Bank App as a mobile application that lets you access your bank account from anywhere, at any time "
                      image="invest.png"
                      textCenter="true"
                      hdColor="warning"
                      //
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
